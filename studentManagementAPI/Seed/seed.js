const mongoose = require("mongoose");
require("dotenv").config();

const {
  Student,
  Course,
  Grade,
  Degree,
  User,
  Inscription,
  Session,
  EvaluationType,
  Log,
  Program,
  StudentCourses
} = require("../model/schemas");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connecté");

    // 1️⃣ Nettoyage (facultatif mais recommandé)
    await Promise.all([
        Student.deleteMany({}),
        Course.deleteMany({}),
        Grade.deleteMany({}),
        Degree.deleteMany({}),
        Program.deleteMany({}),
        User.deleteMany({}),
        Inscription.deleteMany({}),
        Session.deleteMany({}),
        EvaluationType.deleteMany({}),
        StudentCourses.deleteMany({}),
        Log.deleteMany({})
    ]);

    console.log("🧹 Base nettoyée");

    // Debut insertion
        //Degree
        const licence = await Degree.create({
            name: "Master of Sciences",
            code: "Msc"
        });


        //Program
        const genieInfo = await Program.create({
            name: "MBDS",
            degree: licence._id
        });

        //Session
        const session2025 = await Session.create({
            name : "S1-2025/2026",
            academicYear: "2025/2026",
            startDate: new Date("2025-10-01"),
            endDate: new Date("2026-07-15"),
            quota: 1
        });

        //users
        const admin = await User.create({
            firstName: "Admin",
            lastName: "System",
            email: "admin@mbdshaiti.com",
            password: "Admin123@",
            role: "ADMIN",
            address: "FDS UEH",
            telephone: "+50947308348"
        });

        const scolarite = await User.create({
            firstName: "Marie",
            lastName: "Jean",
            email: "scolarite@school.com",
            password: "Jmarie123@",
            role: "SCOLARITE",
            address: "FDS UEH",
            telephone: "+50947308348"
        });

        //Student
        const student1 = await Student.create({
            firstName: "Henry",
            lastName: "Samantha",
            birthDay: new Date("1996-09-25"),
            email: "henrysamantha37@gmail.com",
            referencePhone: "+50943234567",
            address: "Port-au-Prince",
            integrationDate: new Date("2025-10-01"),
            code: "STU2025001",
            userId: null
        });

        //Courses
        const algo = await Course.create({
            name: "Spring boot",
            code: "MBDS101",
            program: genieInfo._id
        });

        const bd = await Course.create({
            name: "Big Data",
            code: "MBDS102",
            program: genieInfo._id
        });

        // inscription

        const inscription1 = await Inscription.create({
            student: student1._id,
            program: genieInfo._id,
            session: session2025._id
        });

        //StudentCourses
        const scAlgo = await StudentCourses.create({
            inscription: inscription1._id,
            course: algo._id
        });

        const scBd = await StudentCourses.create({
            inscription: inscription1._id,
            course: bd._id
        });

        //EvaluationType

        const cc = await EvaluationType.create({
            name: "Contrôle continu",
            coefficient: 0.4
        });

        const exam = await EvaluationType.create({
            name: "Examen final",
            coefficient: 0.6
        });

        //Grade
        await Grade.create({
            studentCourse: scAlgo._id,
            evaluationType: cc._id,
            grade: 19,
            baseGrade: 20
        });

            await Log.create({
    user: admin._id
    });
    // Fin insertion

    console.log("🌱 Seed terminé avec succès");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur seed :", err);
    process.exit(1);
  }
}

seed();
