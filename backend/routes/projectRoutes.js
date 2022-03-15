const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {createProject, getProjects, getProjectById} = require ("../controllers/projectsController");


router.route("/create").post(protect, createProject)
router.route("/").get(protect,getProjects)
router.route("/:id").get(protect,getProjectById)



module.exports = router;
