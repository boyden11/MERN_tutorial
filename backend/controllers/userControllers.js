const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler (async (req, res) => {
    const { username, organisation, password, seriesTags, activityTags } = req.body

    // const userExists = await User.findOne({organisation});
    // if (userExists){
    //     res.status(400)
    //     throw new Error('User already exists')
    // }
    const user = await User.create({
        username,
        organisation,
        password,
        seriesTags,
        activityTags
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            organisation: user.organisation,
            isAdmin: user.isAdmin,
            seriesTags: user.seriesTags,
            activityTags: user.activityTags,
            token: generateToken(user._id)

        })
    } else {
        res.status(400)
        throw new Error ('Error Occured!')

    }
})

const authUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})
    if (user && (await user.matchPassword(password))){
        res.json({      
            _id: user._id,
            username: user.username,
            organisation: user.organisation,
            isAdmin: user.isAdmin,
            seriesTags: user.seriesTags,
            activityTags: user.activityTags,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Whoops! We couldn't find you - please try again.");
    }
});


module.exports = {registerUser, authUser}