"use strict";

var auth = require("../middleware/auth");

var bcrypt = require("bcrypt");

var _ = require("lodash");

var _require = require("../models/user"),
    User = _require.User,
    validate = _require.validate;

var express = require("express");

var router = express.Router();
router.get("/me", auth, function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user._id).select("-password"));

        case 2:
          user = _context.sent;
          res.send(user);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/", function _callee2(req, res) {
  var _validate, error, user, salt, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _validate = validate(req.body), error = _validate.error;

          if (!error) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 5:
          user = _context2.sent;

          if (!user) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("User already registered."));

        case 8:
          user = new User(_.pick(req.body, ["name", "email", "password"]));
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 11:
          salt = _context2.sent;
          _context2.next = 14;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, salt));

        case 14:
          user.password = _context2.sent;
          _context2.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          token = user.generateAuthToken();
          res.header("x-auth-token", token).header("access-control-expose-headers", "x-auth-token").send(_.pick(user, ["_id", "name", "email"]));

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;