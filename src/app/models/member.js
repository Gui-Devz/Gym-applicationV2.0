const db = require("../../config/db");
const { age, formatBrowser } = require("../../lib/utils");

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM members`, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },

  create(dataPost, callback) {
    const query = `
      INSERT INTO members (
        name,
        email,
        avatar_url,
        gender,
        city,
        activities,
        birth,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;

    const values = [
      dataPost.name,
      dataPost.email,
      dataPost.avatar_url,
      dataPost.gender,
      dataPost.cities,
      dataPost.activities,
      formatBrowser(dataPost.birth).iso,
      formatBrowser(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0].id);
    });
  },

  find(id, callback) {
    const query = `
    SELECT members.*, instructors.name AS instructor_name
    FROM members LEFT JOIN instructors ON (instructors.id = members.id_instructor)
    WHERE members.id = $1`;
    db.query(query, [id], function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },

  update(dataPut, callback) {
    const query = `
      UPDATE members SET 
        name=$1,
        email=$2,
        avatar_url=$3,
        gender=$4,
        city=$5,
        activities=$6,
        birth=$7
      WHERE id=$8
    `;
    const values = [
      dataPut.name,
      dataPut.email,
      dataPut.avatar_url,
      dataPut.gender,
      dataPut.cities,
      dataPut.activities,
      formatBrowser(dataPut.birth).iso,
      dataPut.id,
    ];
    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },

  delete(id, callback) {
    const query = `
      DELETE FROM members WHERE id = $1
    `;

    db.query(query, [id], function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
};
