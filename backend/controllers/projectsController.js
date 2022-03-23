const Project = require('../models/projectModel')
const asyncHandler = require("express-async-handler");

//Create Project
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
        res.status(201).send({
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
//Get Projects
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

//Delete Project
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }
  if (project) {
    await project.remove();
    res.json({ message: "Project removed" });
  }
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }

  const { title,soloists, seriesTags, activityTags, startDate, endDate, projectManager, status, description, programmes } = req.body;

  if (project) {
    project.title = title
    project.soloists = soloists
    project.seriesTags = seriesTags
    project.activityTags = activityTags
    project.startDate = startDate
    project.endDate = endDate
    project.projectManager = projectManager
    project.status = status
    project.description = description
    project.programmes = programmes

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});







module.exports = { createProject, getProjects, getProjectById, deleteProject, updateProject }