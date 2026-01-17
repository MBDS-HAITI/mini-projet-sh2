let {Student, Inscription, Program, Session, EvaluationType, StudentCourses, Grades} = require('../model/schemas');
let mongoose = require('mongoose');
function getAll(req, res) {
    Student.find().then((students) => {
        res.send(students);
    }).catch((err) => {
        res.send(err);
    });
}


function create(req, res) {
    let student = new Student();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.integrationDate = req.body.integrationDate;
    student.birthDay = req.body.birthDay;
    student.email = req.body.email;
    student.selfPhone= req.body.selfPhone;
    student.referencePhone= req.body.referencePhone;
    student.address= req.body.address;
    student.code= req.body.code;

    student.save()
        .then((student) => {
                res.json({message: `student saved with id ${student.id}!`});
            }
        ).catch((err) => {
        res.send('cant post student ', err);
    });
}


async function getStudent(req, res) {
  try {
    const { studentId } = req.params;

    const data = await Inscription.aggregate([
  /* 1️⃣ Inscription de l'étudiant */
  {
    $match: {
      student: new mongoose.Types.ObjectId(studentId)
    }
  },

  /* 2️⃣ Session */
  {
    $lookup: {
      from: "sessions",
      localField: "session",
      foreignField: "_id",
      as: "session"
    }
  },
  { $unwind: "$session" },

  /* 3️⃣ StudentCourses */
  {
    $lookup: {
      from: "studentcourses",
      localField: "_id",
      foreignField: "inscription",
      as: "studentCourses"
    }
  },

  /* 4️⃣ Courses */
  {
    $lookup: {
      from: "courses",
      localField: "studentCourses.course",
      foreignField: "_id",
      as: "courses"
    }
  },

  /* 5️⃣ Grades */
  {
    $lookup: {
      from: "grades",
      localField: "studentCourses._id",
      foreignField: "studentCourse",
      as: "grades"
    }
  },

  /* 6️⃣ Evaluation types */
  {
    $lookup: {
      from: "evaluationtypes",
      localField: "grades.evaluationType",
      foreignField: "_id",
      as: "evaluationTypes"
    }
  },

  /* 7️⃣ Structure finale */
  {
    $project: {
      status: 1,
      session: {
        name: "$session.name",
        academicYear: "$session.academicYear",
        quota: "$session.quota"
      },

      courses: {
        $map: {
          input: "$studentCourses",
          as: "sc",
          in: {
            course: {
              $arrayElemAt: [
                "$courses",
                {
                  $indexOfArray: ["$courses._id", "$$sc.course"]
                }
              ]
            },

            status: "$$sc.status",

            grades: {
              $map: {
                input: {
                  $filter: {
                    input: "$grades",
                    as: "g",
                    cond: { $eq: ["$$g.studentCourse", "$$sc._id"] }
                  }
                },
                as: "g",
                in: {
                  evaluationType: {
                    $arrayElemAt: [
                      "$evaluationTypes",
                      {
                        $indexOfArray: [
                          "$evaluationTypes._id",
                          "$$g.evaluationType"
                        ]
                      }
                    ]
                  },

                  grade: {
                    $multiply: [
                      { $divide: ["$$g.grade", "$$g.baseGrade"] },
                      100
                    ]
                  },

                  coefficient: {
                    $arrayElemAt: [
                      "$evaluationTypes.coefficient",
                      {
                        $indexOfArray: [
                          "$evaluationTypes._id",
                          "$$g.evaluationType"
                        ]
                      }
                    ]
                  },

                  date: {
                    $dateToString: {
                      format: "%d/%m/%Y",
                      date: "$$g.date"
                    }
                  }
                }
              }
            },

            /* 📊 Moyenne par cours */
            average: {
              $let: {
                vars: {
                  notes: {
                    $map: {
                      input: {
                        $filter: {
                          input: "$grades",
                          as: "g",
                          cond: { $eq: ["$$g.studentCourse", "$$sc._id"] }
                        }
                      },
                      as: "g",
                      in: {
                        value: {
                          $multiply: [
                            {
                              $divide: ["$$g.grade", "$$g.baseGrade"]
                            },
                            100
                          ]
                        },
                        coefficient: {
                          $arrayElemAt: [
                            "$evaluationTypes.coefficient",
                            {
                              $indexOfArray: [
                                "$evaluationTypes._id",
                                "$$g.evaluationType"
                              ]
                            }
                          ]
                        }
                      }
                    }
                  }
                },
                in: {
                  $cond: [
                    { $gt: [{ $size: "$$notes" }, 0] },
                    {
                      $multiply: [
                        {
                          $divide: [
                            {
                              $sum: {
                                $map: {
                                  input: "$$notes",
                                  as: "n",
                                  in: {
                                    $multiply: [
                                      "$$n.value",
                                      "$$n.coefficient"
                                    ]
                                  }
                                }
                              }
                            },
                            {
                              $sum: {
                                $map: {
                                  input: "$$notes",
                                  as: "n",
                                  in: "$$n.coefficient"
                                }
                              }
                            }
                          ]
                        },
                        "$session.quota"
                      ]
                    },
                    null
                  ]
                }
              }
            }
          }
        }
      }
    }
  }
]);
res.json(data);
}
catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur lors du chargement du dossier académique étudiant"
    });
  }
}



module.exports = {getAll, create, getStudent};
