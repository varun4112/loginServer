const user = require("../Model/userSchema");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      res.status(406).json("Account already exists, Please Login");
    } else {
      const newUser = new user({
        userName,
        email,
        password,
      });
      console.log(newUser);
      await newUser.save();
      console.log(`${userName},${email},${password}`);
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`register api failed, Error:${err}`);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email, password });
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY
    );
    if (existingUser) {
      res.status(200).json({ existingUser, token });
    } else {
      res.status(401).json(`User not found`);
      
    }
  } catch (err) {
    res.status(401).json(`login api failed, Error:${err}`);
  }
};
