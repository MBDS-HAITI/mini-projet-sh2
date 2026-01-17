let {Student, Program} = require('../model/schemas');

function getAll(req, res) {
    if(req.body.studentId){
        Program.find(req.body.student, req.body.session).then((programs) => {
        res.send(programs);
    }).catch((err) => {
        res.send(err);
    });
    }

    Program.find().then((programs) => {
        res.send(programs);
    }).catch((err) => {
        res.send(err);
    });
}


function create(req, res) {
    let student = new Program();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.integrationDate = req.body.integrationDate;

    student.save()
        .then((student) => {
                res.json({message: `student saved with id ${student.id}!`});
            }
        ).catch((err) => {
        res.send('cant post student ', err);
    });
}

function getStudent(req, res){
    Student.find(req.query.studentId).then((student) => {
        res.send(student);
    }).catch((err) => {
        res.send(err);
    });
}

module.exports = {getAll, create, getStudent};
