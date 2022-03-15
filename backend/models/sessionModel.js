const mongoose = require("mongoose");
const Project = require("./projectModel");

const sessionSchema = new mongoose.Schema(
  {
    activity: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Number,

      required: true,
    },
    endTime: {
      type: Number,
      required: true,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      default: "tbc",
    },
    public: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "planning",
    },
    personnel: {
      type: "Array",
      default: [],
    },
    staff: {},
    notes: {
      type: Array,
      default: [],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Project",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

// sessionSchema.virtual("project", {
//   ref: "Project",
//   localField: "projectID",
//   foreignField: "_id",
//   justOne: true,
// });

// projectSchema.virtual('sessions', {
//     ref:'Session',
//     localField: '_id',
//     foreignField: 'project'
// })

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

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
