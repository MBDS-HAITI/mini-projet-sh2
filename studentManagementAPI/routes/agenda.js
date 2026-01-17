let { StudentCourses, Student, Agenda, EvaluationType, Course } = require("../model/schemas");

async function getAgenda(req, res) {
  try {
    const { role, studentId } = req.user;

    // 1️⃣ Base : événements visibles par le rôle
    let baseCible = ["ALL"];

    if (role === "ADMIN") baseCible.push("ADMIN", "SCOLARITE", "STUDENT");
    if (role === "SCOLARITE") baseCible.push("SCOLARITE", "STUDENT");
    if (role === "STUDENT") baseCible.push("STUDENT");

    // 2️⃣ Cas ADMIN / SCOLARITE → accès large
    if (role === "ADMIN" || role === "SCOLARITE") {
      const events = await Agenda.find({
        cible: { $in: baseCible }
      }).sort({ date: 1 });

      return res.json(events);
    }

    // 3️⃣ Cas STUDENT (le plus délicat)
    // 🔎 On récupère les cours où l’étudiant est INSCRIT
    const studentCourses = await StudentCourses.find()
      .populate({
        path: "inscription",
        match: {
          student: studentId,
          status: "INSCRIT"
        }
      })
      .select("course");

    // ⚠️ Filtrer ceux dont l’inscription existe (match populate)
    const validCourses = studentCourses
      .filter(sc => sc.inscription)
      .map(sc => sc.course.toString());

    // 4️⃣ Récupération des événements
    const events = await Agenda.find({
      cible: { $in: baseCible },
      $or: [
        { refData: null },                       // événements ALL
        { type: "Cours", refData: { $in: validCourses } },
        { type: "Evaluation", refData: { $in: validCourses } }
      ]
    }).sort({ date: 1 });

    res.json(events);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur récupération agenda" });
  }
}

async function createAgendaEvent(req, res) {
  try {
    const { role } = req.user;

    if (!["ADMIN", "SCOLARITE"].includes(role)) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    const {
      name,
      date,
      hDebut,
      hEnd,
      type,
      refData,
      description,
      cible,
      repeatedInterval
    } = req.body;

    if (!name || !date || !type) {
      return res.status(400).json({ message: "Champs obligatoires manquants" });
    }

    // Validation métier
    if (type === "Evaluation") {
      if (!refData || !description) {
        return res.status(400).json({
          message: "Evaluation requiert refData (EvaluationType) et description (Course)"
        });
      }

      // Vérifier EvaluationType
      const evalTypeExists = await EvaluationType.exists({ _id: refData });
      if (!evalTypeExists) {
        return res.status(400).json({ message: "EvaluationType invalide" });
      }

      // Vérifier Course
      const courseExists = await Course.exists({ _id: description });
      if (!courseExists) {
        return res.status(400).json({ message: "Course invalide" });
      }
    }

    if (type === "Cours" && refData) {
      const courseExists = await Course.exists({ _id: refData });
      if (!courseExists) {
        return res.status(400).json({ message: "Course invalide" });
      }
    }

    const event = await Agenda.create({
      name,
      date,
      hDebut,
      hEnd,
      type,
      refData: refData || null,
      description,
      cible: cible || "ALL",
      repeatedInterval: repeatedInterval || "NA"
    });

    res.status(201).json(event);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur création événement" });
  }
}

module.exports = {getAgenda, createAgendaEvent}