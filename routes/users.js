var express = require('express');
var router = express.Router();
const Joi = require("joi");

router.get('/signin', function (req, res, next) {
  res.render('users/signin', { result: null });
});

const signinSchema = Joi.object({
  email: Joi.string().email().max(50).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,50}")).required(),
});

router.post('/signin', function (req, res, next) {
  const result = signinSchema.validate(req.body);

  if (result.error) {
    res.sendStatus(400);
  }
  const email = req.body.email;
  const password = req.body.password;

  let signinResult = false;
  if (email === "test@test.com" && password === "123") {
    signinResult = true;
    res.render('users/signin_ok', { result: signinResult });
  } else {
    res.render("users/signin", { result: signinResult });
  }
});

module.exports = router;
