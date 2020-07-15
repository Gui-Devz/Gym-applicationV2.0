const db = require("../../config/db");
const { age, formatBrowser } = require("../../lib/utils");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM instructors`, function (err, results) {
      if (err) return res.send("Fuu... Something gone wrong!");

      callback(results.rows);
    });
  },

  create(dataPost, callback) {
    const query = `
      INSERT INTO instructors (
        name,
        avatar_url,
        gender,
        services,
        birth,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      dataPost.name,
      dataPost.avatar_url,
      dataPost.gender,
      dataPost.services,
      formatBrowser(dataPost.birth).iso,
      formatBrowser(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) return res.send(`Fuu... Something gone wrong!`);

      callback(results.rows[0].id);
    });
  },

  find(id, callback) {
    db.query(`SELECT * FROM instructors WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) return res.send("Fuu... Something gone wrong");

      callback(results.rows[0]);
    });
  },
};
