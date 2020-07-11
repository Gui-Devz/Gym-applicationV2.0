const express = require("express");
const routes = express.Router();
const instructors = require("./app/controllers/instructors");
const members = require("./app/controllers/members");

//INSTRUCTOR ROUTES
routes.get("/", (req, res) => {
  return res.redirect("/instructors");
});
routes.get("/instructors", (req, res) => {
  return res.render("instructors/index", { instructors: data.instructors });
});
routes.get("/instructors/create", (req, res) => {
  return res.render("instructors/create");
});
routes.get("/instructors/:id", instructors.show);
routes.get("/instructors/:id/edit", instructors.edit);
routes.post("/instructors", instructors.post);
routes.put("/instructors", instructors.put);
routes.delete("/instructors", instructors.delete);

// MEMBERS ROUTES

routes.get("/members", (req, res) => {
  return res.render("members/index", { members: data.members });
});

routes.get("/members/create", (req, res) => {
  return res.render("members/create");
});

routes.get("/members/:id", members.show);
routes.get("/members/:id/edit", members.edit);

routes.post("/members", members.post);
routes.put("/members", members.put);
routes.delete("/members", members.delete);

module.exports = routes;
