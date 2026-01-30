let {Session} = require('../model/schemas');

function getAll(req, res) {
  const { endDate } = req.query;
  let filter = {};

  if (endDate) {
    filter.endDate = { $gt: new Date(endDate) };
  }
  

  Session.find(filter)
    .then(sessions => res.json(sessions))
    .catch(err => res.status(500).json(err));
}

function getSession(req, res) {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).json({ message: "ID de session manquant" });
  }

  Session.findById(_id)
    .then(session => {
      if (!session) {
        return res.status(404).json({ message: "Session introuvable" });
      }
      res.json(session);
    })
    .catch(err => res.status(500).json(err));
}


function create(req, res) {
    let session = new Session();
    session.name = req.body.name;
    session.academicYear = req.body.academicYear;
    session.startDate= re.body.startDate;
    session.endDate=req.body.endDate;
    session.quota =req.body.quota;

    session.save()
        .then((savedSession) => {
                res.json({message: `session saved with id ${savedSession.id}!`});
            }
        ).catch((err) => {
        res.send('cant post session ', err);
    });
}

module.exports = {getAll, getSession, create};
