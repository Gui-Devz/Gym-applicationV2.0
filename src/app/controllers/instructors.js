const Instructor = require("../models/instructor");
const { age, formatBrowser } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    let { filter, limit, page } = req.query;

    page = page || 1;
    limit = limit || 3;

    let offset = limit * (page - 1);

    let args = {
      filter,
      limit,
      offset,
      callback(instructors) {
        const paginationData = {
          totalPages: Math.ceil(instructors[0].total / limit),
          page: Number(page),
        };

        return res.render("instructors/index", {
          instructors,
          filter,
          paginationData,
        });
      },
    };

    Instructor.paginate(args);
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

    Instructor.create(urlEncoded, function (instructorID) {
      return res.redirect(`/instructors/${instructorID}`);
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
    const { id } = req.params;

    Instructor.find(id, function (instructor) {
      if (!instructor) return res.send("Instructor not found!");

      instructor.age = formatBrowser(instructor.birth).iso;

      return res.render("instructors/edit", { instructor });
    });
  },

  put(req, res) {
    const urlEncoded = req.body;

    const keys = Object.keys(urlEncoded);

    for (const key of keys) {
      if (req.body[key] == "") {
        return res.send("Fill all the fields");
      }
    }

    Instructor.update(urlEncoded, function (instructor) {
      return res.redirect(`/instructors/${urlEncoded.id}`);
    });
  },

  delete(req, res) {
    const id = req.body.id;

    Instructor.delete(id, function (instructor) {
      return res.redirect("/instructors");
    });
  },
};
