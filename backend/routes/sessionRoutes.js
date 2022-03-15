const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createSession,
  getSessions,
  getSessionByProject,
  deleteSession,
  getSessionById,
  updateSession
} = require("../controllers/sessionController");

router.route("/").get(protect, getSessions);
router.route("/byProject/:id").get(protect, getSessionByProject);
router.route("/create").post(protect, createSession);
router.route("/:id").get(protect, getSessionById).put(protect, updateSession).delete(protect, deleteSession);

module.exports = router;
