let {Student, Inscription, Session, Course, Program} = require('../model/schemas');

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
    
    Inscription.find().then((ins) => {
        res.send(ins);
    }).catch((err) => {
        res.send(err);
    });
}


function create(req, res) {
    if(!req.body.id){
        Inscription.find(req.query.id).then((ins) => {
        ins.status = req.body.status;
        ins.program = req.body.programId;
        ins.student = req.body.studentId;
        ins.session = req.body.sessionId;
        ins.save().then((saved) => {
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
    
    inscription.save()
        .then((ins) => {
                res.json({message: `student saved with id ${ins.id}!`});
            }
        ).catch((err) => {
        res.send('cant post inscription ', err);
    });
    }

    
}

function getInscription(req, res){
    Inscription.find(req.query.id).then((ins) => {
        res.send(ins);
    }).catch((err) => {
        res.send(err);
    });
}

module.exports = {getAll, create, getInscription};
