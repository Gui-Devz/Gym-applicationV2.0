const utils = require("../../lib/utils");
const Instructor = require("../models/instructor");

module.exports = {
  index(req, res) {
    Instructor.all(function (instructors) {
      return res.render("instructors/index", { instructors });
    });
  },

  create(req, res) {
    return res.render("instructors/create");
  },

  post(req, res) {
    const urlEncoded = req.body;

    const keys = Object.keys(urlEncoded);

    for (const key of keys) {
      if (req.body[key] == "") {
        return res.send("Fill all the fields");
      }
    }

    Instructor.create(urlEncoded, function (instructor) {
      return res.redirect(`/instructors/${instructor}`);
    });
  },

  show(req, res) {
    return;
  },

  edit(req, res) {
    return;
  },

  put(req, res) {
    const urlEncoded = req.body;

    const keys = Object.keys(urlEncoded);

    for (const key of keys) {
      if (req.body[key] == "") {
        return res.send("Fill all the fields");
      }
    }

    return;
  },

  delete(req, res) {
    return;
  },
};
