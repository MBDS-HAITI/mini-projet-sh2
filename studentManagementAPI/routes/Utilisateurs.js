
let {User}= require('../model/schemas')
let {Student} = require('../model/schemas')
let{Log} = require('../model/schemas')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

function getAll(req, res) {
    User.find().then((users) => {
        res.send(users);
    }).catch((err) => {
        res.send(err);
    });
}


async function create(req, res) {
   try {
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      role: req.body.role,
      telephone: req.body.telephone
    });

    const savedUser = await user.save();

    if (savedUser.role === "STUDENT" && req.body.studentId) {
      const student = await Student.findById(req.body.studentId);
      if (student && !student.userId) {
        student.userId = savedUser._id;
        await student.save();
        res.status(201).json({ message: "User created", id: savedUser._id });
      }
      else if(student?.userId){
            res.status(500).json({ message: "L'etudiant a déjà un compte" });
      }
      else{
            res.status(500).json({ message: "Etudiant non trouvé" });
      }
      
    }

    res.status(201).json({ message: "User created", id: savedUser._id });
  } catch(err) {
  console.error("Erreur création user :", err);
  res.status(500).json({
    message: "Erreur serveur",
    error: err.message
  });}
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let studentId = null;
    if (user.role === "STUDENT") {
      const student = await Student.findOne({ userId: user._id });
      studentId = student?._id || null;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, studentId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    await Log.create({ user: user._id });

    res.json({
      accessToken: token,
      tokenType: "Bearer",
      expiresIn: process.env.JWT_EXPIRES_IN,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        studentd : studentId
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}




module.exports = {getAll, create, login};