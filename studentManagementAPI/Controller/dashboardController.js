const {
  Student,
  User,
  Program,
  Session,
  Course,
  Inscription,
  StudentCourses,
  Grade,
  Log
} = require("../model/schemas");
let mongoose = require('mongoose');
let functions = require("../functions");

async function getDashboardFilters (req, res) {
  
  const sessions = await Session.find({}, {
    name: 1,
    academicYear: 1
  }).sort({ academicYear: -1 });

  const programs = await Program.find({}, {
    name: 1,
    code: 1
  }).sort({ name: 1 });

  const roles = ["ADMIN", "SCOLARITE", "STUDENT"];

  const academicYears = await Session.distinct("academicYear");

  res.json({
    sessions,
    programs,
    roles,
    academicYears
  });
};

async function getAggData(req, res) {
  try {
    const { sessionId, programId, academicYear } = req.query;

    const match = functions.buildMatchFilters(req.query);

    const pipeline = [
      { $match: match },
      {
        $lookup: {
          from: "sessions",
          localField: "session",
          foreignField: "_id",
          as: "session"
        }
      },
      { $unwind: "$session" }
    ];

    if (academicYear) {
      pipeline.push({
        $match: { "session.academicYear": academicYear }
      });
    }

    const inscriptions = await Inscription.aggregate(pipeline);

    /* -----------------------------
       STATS INSCRIPTIONS
    ------------------------------ */
    const totalInscriptions = inscriptions.length;

    const activeInscriptions = inscriptions.filter(
      i => i.status === "INSCRIT"
    ).length;

    const droppedInscriptions = inscriptions.filter(
      i => i.status === "ABANDONNÉ"
    ).length;

    const activeRate = totalInscriptions
      ? (activeInscriptions / totalInscriptions) * 100
      : 0;

    const abandonRate = totalInscriptions
      ? (droppedInscriptions / totalInscriptions) * 100
      : 0;

    /* -----------------------------
       ÉTUDIANTS DISTINCTS (FIX)
    ------------------------------ */
    const studentIds = [
      ...new Set(inscriptions.map(i => i.student.toString()))
    ];
    const totalStudents = studentIds.length;

    /* -----------------------------
       USERS
    ------------------------------ */
    const usersByRoleAgg = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    const usersByRole = {};
    let totalUsers = 0;

    usersByRoleAgg.forEach(u => {
      usersByRole[u._id] = u.count;
      totalUsers += u.count;
    });

    /* -----------------------------
       AUTRES
    ------------------------------ */
    const totalPrograms = await Program.countDocuments();
    const totalCourses = await Course.countDocuments();

    res.json({
      totalStudents,
      totalUsers,
      usersByRole,
      totalPrograms,
      totalCourses,
      totalInscriptions,
      activeInscriptions,
      activeRate: Number(activeRate.toFixed(2)),
      abandonRate: Number(abandonRate.toFixed(2))
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur lors du chargement des statistiques globales"
    });
  }
}


async function getInscriptionsData(req, res) {
  try {
    /* -----------------------------
       1️⃣ Filtres directs
    ------------------------------ */
    const match = functions.buildMatchFilters(req.query);
    const { academicYear } = req.query;

    /* =============================
       📈 Inscriptions par session
       ============================= */
    const byTimePipeline = [
      { $match: match },

      {
        $lookup: {
          from: "sessions",
          localField: "session",
          foreignField: "_id",
          as: "session"
        }
      },
      { $unwind: "$session" }
    ];

    if (academicYear) {
      byTimePipeline.push({
        $match: { "session.academicYear": academicYear }
      });
    }

    byTimePipeline.push(
      {
        $group: {
          _id: "$session.name",
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: "$total"
        }
      },
      { $sort: { name: 1 } }
    );

    const byTime = await Inscription.aggregate(byTimePipeline);

    /* =============================
       📊 Inscriptions par programme
       ============================= */
    const bySessionProgramPipeline = [
      { $match: match },

      {
        $lookup: {
          from: "programs",
          localField: "program",
          foreignField: "_id",
          as: "program"
        }
      },
      { $unwind: "$program" },

      {
        $group: {
          _id: "$program.name",
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: "$total"
        }
      },
      { $sort: { name: 1 } }
    ];

    const bySessionProgram = await Inscription.aggregate(bySessionProgramPipeline);

    /* -----------------------------
       3️⃣ Réponse
    ------------------------------ */
    res.json({
      byTime,
      bySessionProgram
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur lors du chargement des données d'inscriptions"
    });
  }
}


async function getCoursesData(req, res) {
  try {
    const { sessionId, academicYear, programId } = req.query;

    /* ======================================================
       1️⃣ ÉTUDIANTS PAR COURS
    ======================================================= */
    const studentsPipeline = [

      // StudentCourses → Inscription
      {
        $lookup: {
          from: "inscriptions",
          localField: "inscription",
          foreignField: "_id",
          as: "inscription"
        }
      },
      { $unwind: "$inscription" },

      // Inscription → Session
      {
        $lookup: {
          from: "sessions",
          localField: "inscription.session",
          foreignField: "_id",
          as: "session"
        }
      },
      { $unwind: "$session" },

      // StudentCourses → Course
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: "$course" },

      // Course → Program
      {
        $lookup: {
          from: "programs",
          localField: "course.program",
          foreignField: "_id",
          as: "program"
        }
      },
      { $unwind: "$program" }
    ];

    // 🔎 Filtres communs
    if (sessionId) {
      studentsPipeline.push({
        $match: {
          "inscription.session": new mongoose.Types.ObjectId(sessionId)
        }
      });
    }

    if (academicYear) {
      studentsPipeline.push({
        $match: {
          "session.academicYear": academicYear
        }
      });
    }

    if (programId) {
      studentsPipeline.push({
        $match: {
          "program._id": new mongoose.Types.ObjectId(programId)
        }
      });
    }

    studentsPipeline.push(
      {
        $group: {
          _id: "$course._id",
          name: { $first: "$course.name" },
          value: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          value: 1
        }
      },
      { $sort: { value: -1 } }
    );

    const studentsByCourse = await StudentCourses.aggregate(studentsPipeline);

    /* ======================================================
       2️⃣ NOTES PAR COURS (NORMALISÉES SUR 100)
    ======================================================= */
    const gradesPipeline = [

      // Grade → StudentCourses
      {
        $lookup: {
          from: "studentcourses",
          localField: "studentCourse",
          foreignField: "_id",
          as: "studentCourse"
        }
      },
      { $unwind: "$studentCourse" },

      // StudentCourses → Inscription
      {
        $lookup: {
          from: "inscriptions",
          localField: "studentCourse.inscription",
          foreignField: "_id",
          as: "inscription"
        }
      },
      { $unwind: "$inscription" },

      // Inscription → Session
      {
        $lookup: {
          from: "sessions",
          localField: "inscription.session",
          foreignField: "_id",
          as: "session"
        }
      },
      { $unwind: "$session" },

      // StudentCourses → Course
      {
        $lookup: {
          from: "courses",
          localField: "studentCourse.course",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: "$course" },

      // Course → Program
      {
        $lookup: {
          from: "programs",
          localField: "course.program",
          foreignField: "_id",
          as: "program"
        }
      },
      { $unwind: "$program" }
    ];

    // 🔎 mêmes filtres
    if (sessionId) {
      gradesPipeline.push({
        $match: {
          "inscription.session": new mongoose.Types.ObjectId(sessionId)
        }
      });
    }

    if (academicYear) {
      gradesPipeline.push({
        $match: {
          "session.academicYear": academicYear
        }
      });
    }

    if (programId) {
      gradesPipeline.push({
        $match: {
          "program._id": new mongoose.Types.ObjectId(programId)
        }
      });
    }

    gradesPipeline.push(
      // 🎯 normalisation sur 100
      {
        $addFields: {
          grade100: {
            $multiply: [
              { $divide: ["$grade", "$baseGrade"] },
              100
            ]
          }
        }
      },

      {
        $group: {
          _id: "$course._id",
          name: { $first: "$course.name" },
          min: { $min: "$grade100" },
          max: { $max: "$grade100" },
          avg: { $avg: "$grade100" }
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          min: { $round: ["$min", 2] },
          max: { $round: ["$max", 2] },
          avg: { $round: ["$avg", 2] }
        }
      },
      { $sort: { avg: -1 } }
    );

    const gradesStatsByCourse = await Grade.aggregate(gradesPipeline);

    /* ======================================================
       3️⃣ RÉPONSE
    ======================================================= */
    return res.json({
      studentsByCourse,
      gradesStatsByCourse
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erreur lors du chargement des données des cours"
    });
  }
}


async function getUsingData(req, res) {
  try {
    const { role, startDate, endDate } = req.query;

    /* ======================================================
       1️⃣ MATCH COMMUN POUR LES LOGS
    ======================================================= */
    const logMatch = {};

    if (startDate || endDate) {
      logMatch.createdAt = {};
      if (startDate) logMatch.createdAt.$gte = new Date(startDate);
      if (endDate) logMatch.createdAt.$lte = new Date(endDate);
    }

    /* ======================================================
       2️⃣ RÉPARTITION DES RÔLES (USERS)
       (⚠️ pas filtré par date)
    ======================================================= */
    const usersByRole = await User.aggregate([
      role ? { $match: { role } } : { $match: {} },

      {
        $group: {
          _id: "$role",
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: "$total"
        }
      }
    ]);

    /* ======================================================
       3️⃣ UTILISATION DE L'APP (VISITES / JOUR)
    ======================================================= */
    const appUsagePipeline = [];

    if (Object.keys(logMatch).length) {
      appUsagePipeline.push({ $match: logMatch });
    }

    appUsagePipeline.push(
      {
        $group: {
          _id: {
            year: { $year: "$login" },
            month: { $month: "$login" },
            day: { $dayOfMonth: "$login" }
          },
          visits: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
      {
        $project: {
          _id: 0,
          name: {
            $concat: [
              { $toString: "$_id.day" }, "/",
              { $toString: "$_id.month" }
            ]
          },
          value: "$visits"
        }
      }
    );

    const appUsage = await Log.aggregate(appUsagePipeline);

    /* ======================================================
       4️⃣ CONNEXIONS PAR RÔLE
    ======================================================= */
    const connectionsPipeline = [];

    if (Object.keys(logMatch).length) {
      connectionsPipeline.push({ $match: logMatch });
    }

    connectionsPipeline.push(
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" }
    );

    if (role) {
      connectionsPipeline.push({
        $match: { "user.role": role }
      });
    }

    connectionsPipeline.push(
      {
        $group: {
          _id: "$user.role",
          totalConnections: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: "$totalConnections"
        }
      }
    );

    const connectionsByRole = await Log.aggregate(connectionsPipeline);

    /* ======================================================
       5️⃣ RÉPONSE
    ======================================================= */
    return res.json({
      usersByRole,
      appUsage,
      connectionsByRole
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Erreur lors du chargement des données d'utilisation"
    });
  }
}


module.exports = {getDashboardFilters, getAggData, getInscriptionsData, getCoursesData, getUsingData};