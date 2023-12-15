const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const { createAccessToken } =  require("../libs/jwt.js");
const jwt = require("jsonwebtoken")
const { TOKEN_SECRET } = require("../config")

const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userFound = await User.findOne ({email})
    if(userFound) return res.status(400).json( ["The email alredy exists"])


    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    // creacion del usuario en base de datos
    const userSaved = await newUser.save();
    //obtencion del token
    const token = await createAccessToken({
        id: userSaved._id,
      });
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });
    // respuesta al frontend
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(500).json({ message: "User not found" });
    // se pregunta si es igual la password
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(500).json({ message: "invalid credential" });
    //obtencion del token
    const token = await createAccessToken({
      id: userFound._id,
    });
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });
    // respuesta al frontend
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

const profile = async (req,res) => {
  const userFound = await User.findById(req.user.id)

  if(!userFound) return res.status(400).json({ message: "User not found"})
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  })
}

const verifyToken = async (req, res)=>{
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
}

module.exports = {
  register,
  login,
  logout,
  profile,
  verifyToken
};
