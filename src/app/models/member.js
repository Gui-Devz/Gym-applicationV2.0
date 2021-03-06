const db = require("../../config/db");
const { age, formatBrowser } = require("../../lib/utils");
const { merge } = "../../routes.js";

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
        created_at,
        id_instructor
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
      dataPost.instructors,
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
        birth=$7,
        id_instructor=$8
      WHERE id=$9
    `;
    const values = [
      dataPut.name,
      dataPut.email,
      dataPut.avatar_url,
      dataPut.gender,
      dataPut.cities,
      dataPut.activities,
      formatBrowser(dataPut.birth).iso,
      dataPut.instructors,
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

  instructorsSelectionOptions(callback) {
    const query = `
      SELECT id, name FROM instructors
    `;

    db.query(query, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },
  paginate(args) {
    let { filter, limit, offset, callback } = args;

    let query = "",
      filterQuery = "";

    if (filter) {
      filterQuery = `
        WHERE members.name ILIKE '%${filter}%' OR
        members.services ILIKE '%${filter}%'`;
    }

    query = `
      SELECT members.*, (SELECT count(*) FROM members) AS total FROM members
      ${filterQuery}
      ORDER BY members.id DESC
      LIMIT ${limit} OFFSET ${offset}`;

    db.query(query, function (err, results) {
      if (err) throw `Database ERROR ${err}`;

      callback(results.rows);
    });
  },
};
