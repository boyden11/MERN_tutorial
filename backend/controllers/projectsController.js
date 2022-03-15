const Project = require('../models/projectModel')
const asyncHandler = require("express-async-handler");

const createProject = asyncHandler( async (req, res) => {
    const {title, seriesTags, activityTags, soloists} = req.body

    const project = await Project.create({
        user: req.user._id,
        title,
        seriesTags,
        activityTags,
        soloists
    })

    if (project){
        res.status(201).json({
          _id: project._id,
          title: project.title,
          seriesTags: project.seriesTags,
          activityTags: project.activityTags,
          soloists: project.soloists
        });
    } else {
        res.status(400)
        throw new Error ("Error occured.")
    }

})

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
    if (projects) {
      res.json(projects);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
});


const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

module.exports = { createProject, getProjects, getProjectById }