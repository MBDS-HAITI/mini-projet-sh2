let {Student, Program, Degree} = require('../model/schemas');

function getAll(req, res) {
  const { degree } = req.query;

  const filter = {};

  if (degree) {
    filter.degree = degree;
  }

  Program.find(filter)
    .then(programs => res.json(programs))
    .catch(err => res.status(500).json(err));
}

function create(req, res) {
  const program = new Program({
    name: req.body.name,
    degree: req.body.degree
  });

  program.save()
    .then(savedProgram => {
      res.status(201).json({
        message: `Program saved with id ${savedProgram._id}`,
        program: savedProgram
      });
    })
    .catch(err => {
      res.status(400).json({
        message: "Can't post program",
        error: err
      });
    });
}

function getProgram(req, res) {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).json({ message: "L'id du programme est manquant" });
  }

  Program.findById(_id)
    .then(program => {
      if (!program) {
        return res.status(404).json({ message: "Programme non trouvé" });
      }
      res.json(program);
    })
    .catch(err => res.status(500).json(err));
}

function getDegree(req, res){
    Degree.find()
    .then(degrees => res.json(degrees))
    .catch(err => res.status(500).json(err));
}

module.exports = {getAll, create, getProgram, getDegree};
