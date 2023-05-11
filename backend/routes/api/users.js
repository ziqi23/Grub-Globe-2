const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport')
const {loginUser, restoreUser} = require('../../config/passport')
const { isProduction } = require('../../config/keys')
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const multer = require("multer");
const upload = multer({dest: 'uploads/'})

// Upload profile picture route
router.post('/upload', upload.single("file"), async (req, res) => {
  if (req.file === undefined) {
    return res.send("you must select a file.");
  }
  // const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
  // return res.send(imgUrl);
  // Add req.file to current user and save
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /users"
  })
});

router.get('/current', restoreUser, function(req, res, next) {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
});

router.post('/login', validateLoginInput, async function(req, res, next) {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
})

router.post('/register', validateRegisterInput, async function(req, res, next) {
  const user = await User.findOne({
    $or: [{email: req.body.email}, {username: req.body.username}]
  });

  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  })
})

module.exports = router;
