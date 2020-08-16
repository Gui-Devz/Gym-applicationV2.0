const Member = require("../models/member");
const { age, formatBrowser } = require("../../lib/utils");
const { merge } = require("../../routes");

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
      callback(members) {
        const paginationData = {
          totalPages: Math.ceil(members[0].total / limit),
          page: Number(page),
        };

        return res.render("members/index", {
          members,
          filter,
          paginationData,
        });
      },
    };

    Member.paginate(args);
  },

  create(req, res) {
    Member.instructorsSelectionOptions(function (options) {
      return res.render("members/create", { instructorsOptions: options });
    });
  },

  post(req, res) {
    const urlEncoded = req.body;

    const keys = Object.keys(urlEncoded);

    for (const key of keys) {
      if (req.body[key] == "") {
        return res.send("Fill all the fields");
      }
    }

    Member.create(urlEncoded, function (memberID) {
      return res.redirect(`/members/${memberID}`);
    });
  },

  show(req, res) {
    const { id } = req.params;

    Member.find(id, function (member) {
      if (!member) return res.send("Member not found!");

      member.age = formatBrowser(member.birth).birthday;
      member.activities = member.activities.split(",");
      member.created_at = formatBrowser(member.created_at).format;

      return res.render("members/show", { member });
    });
  },

  edit(req, res) {
    const { id } = req.params;

    Member.find(id, function (member) {
      if (!member) return res.send("Member not found!");

      member.birth = formatBrowser(member.birth).iso;

      Member.instructorsSelectionOptions(function (options) {
        return res.render("members/edit", {
          member,
          instructorsOptions: options,
        });
      });
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

    Member.update(urlEncoded, function (member) {
      return res.redirect(`/members/${urlEncoded.id}`);
    });
  },

  delete(req, res) {
    const id = req.body.id;

    Member.delete(id, function (member) {
      return res.redirect("/members");
    });
  },
};
