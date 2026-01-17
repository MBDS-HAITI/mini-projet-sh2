let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let studentSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },

  birthDay: {
    type: Date,
  },

  email: { type: String, lowercase: true, trim : true },
  selfPhone: { type: String, default: null },
  referencePhone: { type: String, required: true },
  address: { type: String, required: true },

  integrationDate: { type: Date, required: true },

  code: { type: String, unique: true },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
});

let Student = mongoose.model('Student', studentSchema);

let degreeSchema = new Schema({
    name: {type :String, required : true},
    code: {type: String, unique:true, required: true}
});

let Degree = mongoose.model('Degree', degreeSchema);

let agendaSchema = new Schema({
    name: {type :String, required : true},
    date: {type: Date, required: true},
    hDebut: {type : String, required : false},
    hEnd : {type : String, required : false},
    type : {type: String,
    enum: ["Evaluation", "Rentrée", "Fermeture", "Cours", "Evénement", "Réunion"]},
    refData : {type : String, required : false},
    description : {type : String},
    cible : {type :String, 
      enum : ["ADMIN", "SCOLARITE", "STUDENT", "ALL"],
      default : "ALL"
    },
    repeatedInterval : {type: String,
    enum: ["NA", "Day", "Week", "Month", "Year"], default : "NA"}
},
{timestamps : true}
);
agendaSchema.index({ date: 1 });
agendaSchema.index({ type: 1 });
agendaSchema.index({ cible: 1 });
let Agenda = mongoose.model('Agenda', agendaSchema);

let courseSchema = Schema({
    name: {type : String, required : true},
    code: {type: String, unique:true, required: true},
    program : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Program",
        required : true
    }
});

let Course = mongoose.model('Course', courseSchema);

let evaluationType = new Schema({
    name : {type : String, required:true},
    coefficient : {type: Number, default : 1}
});

let EvaluationType = mongoose.model('EvaluationType', evaluationType);

let gradeSchema = new Schema({
    studentCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentCourses",
        required: true
    },
    evaluationType :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "EvaluationType",
        required : true
    },
    grade: {
        type: Number,
        required: true,
        min : 0
    },
    baseGrade : {
        type: Number, 
        required: true,
        min : 1,
        validate: {
        validator: function (value) {
        return value >= this.grade;
        },
        message: "La base de la note doit être supérieure ou égale à la note obtenue"
        }
    },
    date: { type: Date, default: Date.now }
});
gradeSchema.index({ studentCourse: 1 });
gradeSchema.index(
  { studentCourse: 1, evaluationType: 1 },
  { unique: true }
);
let Grade = mongoose.model('Grade', gradeSchema);

let userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim : true
  },
  password: { type: String, required: true },

  address: { type: String, required: true },
  telephone: { type: String, required: true },

  role: {
    type: String,
    enum: ["ADMIN", "SCOLARITE", "STUDENT"],
    required: true
  },

  createdAt: { type: Date, default: Date.now }
});

const bcrypt = require("bcrypt");

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});
let User = mongoose.model('User', userSchema);

let programSchema = new Schema({
  name: {
    type: String,
    required : true
  },
  degree : {
    type : mongoose.Schema.Types.ObjectId,
        ref : "Degree",
        required : true
  }
});

let Program = mongoose.model('Program', programSchema);

let studentCoursesSchema = new Schema({
inscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inscription",
    required: true
  },
   course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  status: {
    type: String,
    enum: ["EN_COURS", "VALIDÉ", "ÉCHOUÉ", "ABANDONNÉ"],
    default: "EN_COURS"
  }
});
studentCoursesSchema.index(
  { inscription: 1, course: 1},
  { unique: true }
);
studentCoursesSchema.index({ course: 1 });

let StudentCourses = mongoose.model('StudentCourses', studentCoursesSchema);

let inscriptionSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true
  },
  status: {
    type: String,
    enum: ["INSCRIT", "TERMINÉ", "ABANDONNÉ"],
    default: "INSCRIT"
  }
},
  {
    timestamps: true
  }
);
inscriptionSchema.index(
  { student: 1, program: 1, session: 1 },
  { unique: true }
);
inscriptionSchema.index({ session: 1 }); 

let Inscription = mongoose.model('Inscription', inscriptionSchema);

let sessionSchema = Schema({
  name : {type : String, required : true},  
  academicYear: {
        type : String,
        required : true,
        match: [
      /^\d{4}(\/\d{4})?$/,
      "année académique invalide. Exemple attendu : 2024 ou 2024/2025"
    ]
    },
    startDate: Date,
    endDate: Date,
    quota : {type : Number, default:1}
});

let Session = mongoose.model('Session', sessionSchema);

let logSchema = Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
    login: {type : Date, default : "2026-01-12T00:55:42.466+00:00"}
  },
    {
      timestamps : true
    }
);

let Log = mongoose.model('Log', logSchema);
// Exports the modeles
module.exports = {
    Student: Student,
    Degree : Degree,
    Course: Course,
    Grade: Grade,
    Agenda : Agenda,
    User : User,
    Inscription : Inscription,
    Session : Session,
    EvaluationType : EvaluationType,
    Log : Log,
    Program : Program,
    StudentCourses : StudentCourses
}
