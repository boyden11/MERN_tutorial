const mongoose = require("mongoose");
// const Session = require("./session");
// const dayjs = require('dayjs')

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    soloists: {
      type: Array,
      required: true,
      default: []
    },
    seriesTags:{
        type: Array,
        required: true,
        default: []
    },
    activityTags:{
        type: Array,
        required: true,
        default: []
    },
    startDate: {
      type: Number,
      default: 4796668800000,
    },
    endDate: {
      type: Number,
      default: 4796668800001,
    },
    projectManager: {
        type: String,
        required: true,
        default: "No project manager allocated"
    },
    status: {
      type: String,
      default: "planning",
    },
    notes: {
        type: Array,
        required: true,
        default: []
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// projectSchema.virtual("sessions", {
//   ref: "Session",
//   localField: "_id",
//   foreignField: "projectID",
// });

// projectSchema.virtual('works', {
//     ref:'Work',
//     localField: '_id',
//     foreignField: 'project'
// })

// // projectSchema.virtual('startDate')
// //     .get(function() {
// //         return this.sessions[0].date
// //     })

// projectSchema.pre('findOneAndDelete', async function (next){
//     const project = this
//     const id = project._conditions._id
//     await Session.deleteMany({project:id})
//     next()
// })

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
