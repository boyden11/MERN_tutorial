const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {createProject, getProjects, getProjectById, updateProject, deleteProject} = require ("../controllers/projectsController");


router.route("/create").post(protect, createProject)
router.route("/").get(protect,getProjects)
router.route("/:id").get(protect,getProjectById).patch(protect, updateProject).delete(protect, deleteProject)



module.exports = router;
