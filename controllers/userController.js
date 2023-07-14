const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Post = require("../models/postModel");


// search bar api to find the user
const searchUser = asyncHandler(async (req, res) => {
    const {query} = req.query;
    const user = await User.find({ name: { $regex: query, $options: 'i' } });

    if(!user){
        res.status(404)
        throw new Error("User not found")
    }
    return res.json(user)
});

// get user profile
const displayProfile = asyncHandler(async(req, res) => {
    
     const user = await User.findOne({_id: req.params.id}).select("-password")    
     if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    const post = await Post.find(({postedBy: req.params.id}))
     .populate("postedBy", "id")
     if(!post){
        res.status(401)
            throw new Error('Post not Found')
     } 

    //  const userProfile ={
    //     user,
    //     posts
    //  }

     return res.status(200).json({user, post})     
});

// Follower to user
const userFollower = asyncHandler(async(req, res) => {
    const follower = await User.findByIdAndUpdate(
        
        req.body.followId, 
        {$push:{followers: req.user._id}},
        {new: true}
        )

    if(!follower){
        res.status(401)
        throw new Error('Follower Not Found!')
    }

    const following = await User.findByIdAndUpdate(
        req.user._id,
        {$push:{following: req.body.followId}}, 
        {new: true}
        )

    if(!following){
        res.status(401)
        throw new Error('Following Not Found!')
    }
    return res.json({follower, following})
})

// UnFollower to user
const userUnFollower = asyncHandler(async(req, res) => {

    const follower = await User.findByIdAndUpdate(
        req.body.followId, 
        {$pull:{followers: req.user._id}},
        {new: true}
        );
        
    if(!follower){
        res.status(401)
        throw new Error('Follower Not Found!')
    }

    const following = await User.findByIdAndUpdate(
        req.user._id,
        {$pull:{following: req.body.followId}}, 
        {new: true}
        );

    if(!following){
        res.status(401)
        throw new Error('Following Not Found!')
    }

    return res.json({follower, following})
});

// upload profile pic

const uploadProfilePic = asyncHandler(async (req, res) => {
   const user = await User.findByIdAndUpdate(
    req.user._id, 
    { $set:{Photo: req.body.photo}}, // set mean old pic will delete and new pic will replace
    {new: true}
    );
    if(!user){
        res.status(401)
        throw new Error("No profile pic")
    }
    return res.json(user)
});


module.exports = {
    displayProfile,
    userFollower,
    userUnFollower,
    uploadProfilePic,
    searchUser
};