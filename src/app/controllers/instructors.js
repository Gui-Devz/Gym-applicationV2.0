const Instructor = require("../models/instructor");
const { age, formatBrowser } = require("../../lib/utils");

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
    const { id } = req.params;

    Instructor.find(id, function (instructor) {
      if (!instructor) return res.send("Instructor not found!");

      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(",");
      instructor.created_at = formatBrowser(instructor.created_at).format;

      return res.render("instructors/show", { instructor });
    });
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
