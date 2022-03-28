const mongoose = require("mongoose");
const Session = require("./sessionModel");


const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    programmes:{
      type: Array,
      default: [{
        works: []
      }]
    },
    soloists: {
      type: Array,
      default: []
    },
    seriesTags:{
        type: Array,
        default: []
    },
    activityTags:{
        type: Array,
  
        default: []
    },
    startDate: {
      type: Number
    },
    endDate: {
      type: Number
    },
    projectManager: {
        type: String,
        default: "No project manager allocated"
    },
    status: {
      type: String,
      default: 'light pencil',
    },
    notes: {
        type: Array,
  
        default: []
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,

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

projectSchema.pre('remove', async function (next){
    const project = this
    const id = project._id
    await Session.deleteMany({project:id})
    next()
})

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
