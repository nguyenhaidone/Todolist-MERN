const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verify = require("../middleware/auth");
const restResponse = require("../common/response");
require("dotenv").config();

const User = require("../models/User");

//@route GET api/auth
//@desc check if user is logged in
//@access public
router.get("/", verify, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    console.log(user);
    if (!user) {
      return res.status(404).json(restResponse(false, "Account not found"));
    } else {
      res.status(200).json(restResponse(true, "Get success", user));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(restResponse(false, "Internal server error"));
  }
});

//@route POST api/auth/register
//@desc Register user
//@access public

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send(restResponse(false, "Auth fail"));

  try {
    //check for existing user
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .send(restResponse(false, "Username already taken"));
    //hash pass
    const hashPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashPassword,
    });
    await newUser.save();

    //return access token
    const accessToken = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    res
      .status(200)
      .json(restResponse(true, "create successfully", accessToken));
  } catch (error) {
    console.log(error);
    res.status(500).json(restResponse(false, "Internal server error"));
  }
});

//@route POST api/auth/register
//@desc Register user
//@access public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send(restResponse(false, "auth fail"));

  try {
    //check existing user
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json(restResponse(false, "incorrect username"));
    //user found
    const pass = await argon2.verify(user.password, password);
    if (!pass)
      return res.status(400).json(restResponse(false, "incorrect password"));

    //all pass and return token
    const accessToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json(restResponse(true, "login successfully", accessToken));
  } catch (error) {
    console.log(error);
    res.status(500).json(restResponse(false, "Internal server error"));
  }
});

module.exports = router;
