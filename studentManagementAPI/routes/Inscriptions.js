
let {Student, Inscription, Session, Course, Program, StudentCourses} = require('../model/schemas');

function getAll(req, res) {
    if(req.body.studentId){
        Inscription.find(req.body.studentId).then((ins) => {
        res.send(ins);
    }).catch((err) => {
        res.send(err);
    });
    }
    
    if(req.body.sessionId){
       Inscription.find(req.body.sessionId).then((ins) => {
        res.send(ins);
    }).catch((err) => {
        res.send(err);
    }); 
    }

    if(req.body.programId){
       Inscription.find(req.body.programId).then((ins) => {
        res.send(ins);
    }).catch((err) => {
        res.send(err);
    }); 
    }
    
    Inscription.find().then((ins) => {
        res.send(ins);
    }).catch((err) => {
        res.send(err);
    });
}


function create(req, res) {
    if(req.body.id){
        Inscription.find(req.body.id).then((ins) => {
        ins.status = req.body.status;
        ins.program = req.body.programId;
        ins.student = req.body.studentId;
        ins.session = req.body.sessionId;
        inscription.save().then((saved) => {
                res.json({message: `inscription saved with id ${saved.id}!`});
            }
        );
    }).catch((err) => {
        console.log(err.message);
    });
    }
    else{
     let inscription = new Inscription();   
    inscription.program = req.body.programId;
    inscription.student = req.body.studentId;
    inscription.session = req.body.sessionId;
    inscription.programId = req.body.programId;
    
    inscription.save()
        .then(async (ins) => {
            const coursesToSave = req.body.courseIds.map(courseId => ({
                inscription: ins._id,
                course: courseId
            }));
            try {
                await StudentCourses.insertMany(coursesToSave);

                res.json({
                    message: `Inscription réussie pour l'étudiant !`,
                    inscriptionId: ins._id
                });
            } catch (error) {
                res.status(500).json({message: "Erreur lors de l'enregistrement des cours", error});
            }
        } ).catch((err) => {
        res.send('cant post inscription ', err);
    });
    }

    
}

function getInscription(req, res){
    const {_id} = req.query;
    if(!_id){
        return res.status(400).json({message:"L'id de l'inscription manque"});
    }
    Inscription.findById(_id)
    .then(insc => {
      if (!insc) {
        return res.status(404).json({ message: "Inscription non trouvée" });
      }
      res.json(insc);
    })
    .catch(err => res.status(500).json(err));
}

module.exports = {getAll, create, getInscription};
