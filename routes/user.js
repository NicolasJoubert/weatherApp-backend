var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

const { checkBody } = require("../modules/checkBody");
const User = require("../models/users.js");

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["name", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: req.body.email }).then((dbData) => {
    if (dbData === null) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      newUser.save().then(() => {
        res.json({ result: true });
      });
    } else {
      res.json({ result: false, error: "User already exists" });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: req.body.email, password: req.body.password }).then(
    (dbData) => {
      if (dbData) {
        res.json({ result: true });
      } else {
        res.json({ result: false, error: "User not found" });
      }
    }
  );
});

module.exports = router;
