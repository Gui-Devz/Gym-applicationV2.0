const db = require("../../config/db");
const { age, formatBrowser } = require("../../lib/utils");

module.exports = {
  all(callback) {
    const query = `
      SELECT instructors.*, count(members) AS members_count 
      FROM instructors LEFT JOIN members ON (instructors.id = members.id_instructor)
      GROUP BY instructors.id
      ORDER BY members_count DESC
    `;
    db.query(query, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },

  findBy(filter, callback) {
    const query = `
      SELECT instructors.*, count(members) AS members_count 
      FROM instructors LEFT JOIN members ON (instructors.id = members.id_instructor)
      WHERE instructors.name ILIKE '%${filter}%'
      OR instructors.services ILIKE '%${filter}%'
      GROUP BY instructors.id
      ORDER BY members_count DESC
    `;
    db.query(query, function (err, results) {
      if (err) throw `Database Error! ${err}`;

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
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0].id);
    });
  },

  find(id, callback) {
    db.query(`SELECT * FROM instructors WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },

  update(dataPut, callback) {
    const query = `
      UPDATE instructors SET 
        avatar_url = $1,
        name = $2,
        birth = $3,
        gender = $4 ,
        services = $5
      WHERE id=$6
    `;
    const values = [
      dataPut.avatar_url,
      dataPut.name,
      formatBrowser(dataPut.birth).iso,
      dataPut.gender,
      dataPut.services,
      dataPut.id,
    ];
    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },

  delete(id, callback) {
    const query = `
      DELETE FROM instructors WHERE id = $1
    `;

    db.query(query, [id], function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback();
    });
  },
};
