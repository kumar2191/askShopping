const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
process.env.SECRET_KEY = "secret";
const User = require("../models/User");


//Register
exports.register = (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    selectedOption: req.body.selectedOption,
    phone: req.body.phone
  };
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + "Registered!" });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
};

//login
exports.login = (req, res) => {
  
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            selectedOption: user.selectedOption
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        } else {
          // Passwords don't match
          res.json({ error: "password Invaid" });
        }
      } else {
        res.json({ error: "you are not register" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
};

//Get Customer
exports.get_user = (req,res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
};

//update
exports.update = (req,res)=>{
  var decoded = jwt.verify(req.headers["authorization"],process.env.SECRET_KEY);
  User.updateOne({_id:decoded._id},{$set:req.body})
    .then(docs => {
      res.status(200).json({
        message: "Update sucessfuly",
        Update_Data: docs
      });
    })
    .catch(err => {
      res.status(402).json({
        error: err
      });
    });
};