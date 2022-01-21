// build your `/api/projects` router here
const express = require("express");
const Projects = require("./model");

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get("/", async (req, res, next) => {
 const project = Projects.findProject();
 try {
  res.status(200).json(project);
 } catch (err) {
  res.status(404).json({ message: "sorry couldn't find this project" });
 }
});

module.exports = router;
