const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const mailService = require("../services/mailService");


const router = express.Router();

//@route   POST api/users
//@desc    Register user
//@access  Public
router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check("email", "please include a valid email").isEmail(),
    // check("password", "password must be 6 characters or more").isLength({
    //   min: 6
    // })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //need to understand
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }

      user = new User({
        name,
        email,
      });

      // const salt = await bcrypt.genSalt(10);

      // user.password = await bcrypt.hash(password, salt);

      await user.save();

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
      if (user) {
        await mailService.sendEmail(
          {
            to: email,
            from: config.get('USER'),
            subject: "Confirmation Code",
          },
          {
            validationToken: user.validationToken,
            id: user._id,
            name: user.name
          },
          "confirmationCode"
        );
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
