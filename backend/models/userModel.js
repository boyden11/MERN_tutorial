const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    organisation: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    seriesTags: {
      type: Array,
      required: true,
      default: [],
    },
    activityTags: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model("User", userSchema);
module.exports = User