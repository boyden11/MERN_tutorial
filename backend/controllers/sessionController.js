const Session = require ('../models/sessionModel')
const asyncHandler = require("express-async-handler");

const createSession = asyncHandler(async (req, res) => {
  const {activity, date, startTime, endTime, venue, public, project } = req.body;

  const session = await Session.create({
    user: req.user._id,
    project,
    activity,
    date,
    startTime,
    endTime,
    venue,
    public
  });

  if (session) {
    res.status(201).json({
        id: session._id,
        project: session.project,
        date: session.date
    });
  } else {
    res.status(400);
    throw new Error("Error occured.");
  }
});

const getSessionByProject = asyncHandler(
    async(req,res) => {
        const sessions = await Session.find({project: req.params.id})

        if (sessions){
          sessions.sort((a,b) =>{
            return a.startTime - b.startTime
          })
            res.status(201).json(sessions)
        } else {
            res.status(400)
            throw new Error("No session found.")
        }
        

    }
)

const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.find({ session: req.params.id });

  if (session) {
    res.status(201).json(session);
  } else {
    res.status(400);
    throw new Error("No session found.");
  }
});

const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);
  // if (session.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You cannot perform this action");
  // }
  if (session) {
    await session.remove();
    res.json({ message: "Session removed" });
  }
});

const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ user: req.user._id });
  res.json(sessions);
});

const updateSession = asyncHandler(async (req, res) => {
  const { activity, date, startTime, endTime, venue, status } = req.body;

  const session = await Session.findById(req.params.id);

  if (session) {
    session.activity = activity;
    session.date = date;
    session.startTime = startTime;
    session.endTime = endTime;
    session.venue = venue;
    session.status = status;



    const updatedSession = await session.save();
    res.json(updateSession);
  } else {
    res.status(404);
    throw new Error("Session not found");
  }
});


module.exports = { createSession, getSessionByProject, deleteSession, getSessions, getSessionById, updateSession }
//