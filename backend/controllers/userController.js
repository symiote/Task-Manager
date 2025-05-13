const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.status(400).json({
        message: "userName already exists",
      });
    }
    if (username.length < 3) {
      return res.status(400).json({
        message: "password conatins at least 6 digits",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "userName should have altleast 4 characters",
      });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        message: "email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(201).json({ message: "signed in succesfully" });
  } catch (err) {
    console.log("error in signup process", err);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

exports.Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ message: "all feilds are required" });
  }
  console.log(username, " ", password);

  try {
    const existUser = await User.findOne({ username });
    if (!existUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const comparePassWord = await bcrypt.compare(password, existUser.password);
    if (!comparePassWord) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("u are login");

    const authClaims = [
      { name: username },
      { jti: jwt.sign({}, process.env.JWT_SECRET || "tcmTM") },
    ];
    const token = jwt.sign({ authClaims }, process.env.JWT_SECRET || "tcmTM", {
      expiresIn: "2d",
    });

    return res.status(200).json({ id: existUser._id, token: token });
  } catch (err) {
    console.log("error in login process", err);
    res.status(500).json({ message: "Error login user", error: err.message });
  }
};
