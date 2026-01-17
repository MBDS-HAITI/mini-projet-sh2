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

    // 🧹 Nettoyage
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

    // =====================
    // 🎓 Degrees
    // =====================
    const msc = await Degree.create({ name: "Master of Sciences", code: "MSC" });
    const licence = await Degree.create({ name: "Licence", code: "LIC" });

    // =====================
    // 📚 Programs
    // =====================
    const mbds = await Program.create({
      name: "MBDS",
      degree: msc._id
    });

    const genieCivil = await Program.create({
      name: "Génie Civil",
      degree: licence._id
    });

    // =====================
    // 🗓️ Sessions
    // =====================
    const session2025 = await Session.create({
      name: "S1-2025/2026",
      academicYear: "2025/2026",
      startDate: new Date("2025-10-01"),
      endDate: new Date("2026-02-15"),
      quota: 30
    });

    const session2026 = await Session.create({
      name: "S2-2025/2026",
      academicYear: "2025/2026",
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-06-30"),
      quota: 30
    });

    // =====================
    // 👤 Users
    // =====================
    const admin = await User.create({
      firstName: "Admin",
      lastName: "System",
      email: "admin@school.com",
      password: "Admin2123@",
      role: "ADMIN",
      address: "FDS UEH",
      telephone: "+50940000001"
    });

    const admin1 = await User.create({
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
      password: "Marie123@",
      role: "SCOLARITE",
      address: "FDS UEH",
      telephone: "+50940000002"
    });

    const prof = await User.create({
      firstName: "Jean",
      lastName: "Pierre",
      email: "prof@school.com",
      password: "Prof123@",
      role: "SCOLARITE",
      address: "Port-au-Prince",
      telephone: "+50940000003"
    });

    const userStudent = await User.create({
      firstName: "Samantha",
      lastName: "Henry",
      email: "sh@mbdshaiti.com",
      password: "Shenry123@",
      role: "STUDENT",
      address: "Port-au-Prince",
      telephone: "+50940000003"
    });

    // =====================
    // 🎓 Students
    // =====================
    const student1 = await Student.create({
      firstName: "Samantha",
      lastName: "Henry",
      birthDay: new Date("1996-09-25"),
      email: "sh@mbdshaiti.com",
      referencePhone: "+50943000001",
      address: "Port-au-Prince",
      integrationDate: new Date("2025-10-01"),
      code: "STU2025001",
      userId : userStudent._id
    });

    const student2 = await Student.create({
      firstName: "David",
      lastName: "Louis",
      birthDay: new Date("1998-04-12"),
      email: "david@gmail.com",
      referencePhone: "+50943000002",
      address: "Delmas",
      integrationDate: new Date("2025-10-01"),
      code: "STU2025002"
    });

    const student3 = await Student.create({
      firstName: "Sarah",
      lastName: "Charles",
      birthDay: new Date("1997-01-18"),
      email: "sarah@gmail.com",
      referencePhone: "+50943000003",
      address: "Pétion-Ville",
      integrationDate: new Date("2025-10-01"),
      code: "STU2025003"
    });

    // =====================
    // 📘 Courses
    // =====================
    const courses = await Course.insertMany([
      { name: "Spring Boot", code: "MBDS101", program: mbds._id },
      { name: "Big Data", code: "MBDS102", program: mbds._id },
      { name: "Cloud Computing", code: "MBDS103", program: mbds._id },
      { name: "Résistance des matériaux", code: "GC101", program: genieCivil._id },
      { name: "Hydraulique", code: "GC102", program: genieCivil._id }
    ]);

    // =====================
    // 📝 Inscriptions
    // =====================
    const insc1 = await Inscription.create({
      student: student1._id,
      program: mbds._id,
      session: session2025._id
    });

    const insc2 = await Inscription.create({
      student: student2._id,
      program: mbds._id,
      session: session2025._id
    });

    const insc3 = await Inscription.create({
      student: student3._id,
      program: genieCivil._id,
      session: session2025._id
    });

    // =====================
    // 📌 StudentCourses
    // =====================
    const sc1 = await StudentCourses.create({
      inscription: insc1._id,
      course: courses[0]._id
    });

    const sc2 = await StudentCourses.create({
      inscription: insc1._id,
      course: courses[1]._id
    });

    const sc3 = await StudentCourses.create({
      inscription: insc2._id,
      course: courses[2]._id
    });

    // =====================
    // 🧪 Evaluation Types
    // =====================
    const cc = await EvaluationType.create({ name: "Contrôle Continu", coefficient: 0.4 });
    const exam = await EvaluationType.create({ name: "Examen Final", coefficient: 0.6 });

    // =====================
    // 📊 Grades
    // =====================
    await Grade.insertMany([
      { studentCourse: sc1._id, evaluationType: cc._id, grade: 18, baseGrade: 20 },
      { studentCourse: sc1._id, evaluationType: exam._id, grade: 17, baseGrade: 20 },
      { studentCourse: sc2._id, evaluationType: cc._id, grade: 15, baseGrade: 20 },
      { studentCourse: sc3._id, evaluationType: exam._id, grade: 16, baseGrade: 20 }
    ]);

    // =====================
    // 📜 Logs
    // =====================
    await Log.insertMany([
      { user: admin._id},
      { user: admin1._id},
      { user: scolarite._id},
      { user: prof._id}
    ]);

    console.log("🌱 Seed terminé avec succès");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur seed :", err);
    process.exit(1);
  }
}

seed();
