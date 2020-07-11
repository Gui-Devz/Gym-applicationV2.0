const utils = require("../../lib/utils");

module.exports = {
  index(req, res) {
    return;
  },

  create(req, res) {
    return;
  },

  post(req, res) {
    const urlEncoded = req.body;

    const keys = Object.keys(urlEncoded);

    for (const key of keys) {
      if (req.body[key] == "") {
        return res.send("Fill all the fields");
      }
    }

    let { avatar_url, birth, name, services, gender } = req.body;

    return;
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
