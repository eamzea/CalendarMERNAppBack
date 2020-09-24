const { request, response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/jwt");

const loginUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "There is no user registered with that email",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Incorrect Password",
      });
    }

    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
      msg: "User logged",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the manager",
    });
  }
};

const newUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Already is an user with that email",
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
      msg: "User created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the manager",
    });
  }
};

const renewToken = async (req = request, res = response) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);

  res.status(201).json({
    ok: true,
    token,
    uid,
    name,
    msg: "Token renew",
  });
};

module.exports = {
  loginUser,
  newUser,
  renewToken,
};
