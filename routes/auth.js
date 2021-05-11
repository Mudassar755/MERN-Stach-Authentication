const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const crypto = require("crypto");


const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

//@route   POST api/auth
//@desc    Get User
//@access  Private

router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route   POST api/auth/login
//@desc    Authentication user & get Token
//@access  Public

router.post("/login",
  [
    check("email", "please include a valid email ").isEmail(),
    // check("password", "password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User does not exist" }] });
      }

      // const isMatch = await bcrypt.compare(password, user.password);

      // if (!isMatch) {
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: "Email or Password is incorrect" }] });
      // }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("JwtSecret"),
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/validate", async (req, res) => {
  const { token: validationToken, id } = req.body;
  // console.log("req.Bodyyy", req.body)
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: id,
        validationToken,
      },
      {
        valid: true,
      }
      );
      // console.log("req.Bodyyy", user)
    if (!user) {
      // return res.json({msg: "User Token is incorrect or expired!" })
      return res.status(400)
      .json({ errors: [{ msg: "Token is incorrect or expired!" }] });
    }
    const token = await user.generateAuthToken();
    // await mailService.sendEmail(
    //   {
    //     to: user.email,
    //     from: config.get('USER'),
    //     subject: "Successfully Registered",
    //   },
    //   {
    //     id: user._id,
    //     name: user.name
    //   },
    //   "welcome"
    // );
    res.send({
      user,
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

 
})

module.exports = router;
