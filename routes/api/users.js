const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("username", "Username is required")
      .not()
      .isEmpty(),
    check("username", "Please enter a username with 4 to 64 characters").isLength({
      min: 4,
      max: 64
    }),
    check("password", "Please enter a password with at least 5 characters").isLength({
      min: 5,
      max: 128
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors, proceed:
    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username: username.toLowerCase() });

      if (user) {
        return res.status(400).json({ errors: [{ msg: "Username already taken" }] });
      }

      user = new User({
        username: username.toLowerCase(),
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user to MongoDB Collection
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.jwtSecret, { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;
        res.json({ token });
        console.log(`user with username: ${username.toLowerCase()} registered`);
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
