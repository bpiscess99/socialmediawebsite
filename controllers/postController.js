const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

// all post
const allPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find() // this funtion will show the all posts
      .populate("postedBy", "_id name Photo") //populate function will give us the complete delete of user who posted
      .populate("comments.postedBy", "_id name") //populate function will give us the complete delete of user who posted
      .sort("-createdAt") // our post will come in descending orders
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
});

// create post
const createPost = asyncHandler(async (req, res) => {
  try {
    const { body, photo } = req.body;
    console.log(photo);

    if (!body || !photo) {
      res.status(422);
      throw new Error("Please add all the fields");
    }
    console.log(req.user);
    const post = await new Post({
      body,
      photo,
      postedBy: req.user,
    });
    const result = post.save();
    return res.json({ post: result });
  } catch (error) {
    console.log(error);
  }
});

//   Check who posted
const myPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user._id }) // for find the posts
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name") //populate function will give us the complete delete of user who posted
      .sort("-createdAt") // through our posts will come in descendig order
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
});

// Show the name of likes
const userLikes = asyncHandler(async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        // postId will be write in frontend with same name while fetching
        $push: { likes: req.user._id }, // push mean when somebody will like the post his id will show
      },
      {
        new: true, // true mean which user will like and his id will be add here
      }
    ).populate("postedBy", "_id name Photo");
    return res.json({ like: result });
  } catch (err) {
    console.log(err);
  }
});

// Show the name of unlikes
const userUnLikes = asyncHandler(async (req, res) => {
  try {
    const result = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id }, // pull mean when somebody will unlike. His id will show
      },
      {
        new: true, // true mean which user will like and his id will be add here
        // exec is call back function we use this when we update even we can use .then call back function as well
      }
    ).populate("postedBy", "_id name Photo");
    return res.json({ unlike: result });
  } catch (err) {
    console.log(err);
  }
});

// Comment
const userComment = asyncHandler(async (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };
  const result = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name Photo");
  // .then((result) => {
  //  return res.json({comment: result})
  // }).catch(err => console.log(err))
  if (!result) {
    res.status(401);
    throw new Error("comment not created");
  }
  res.json({ comment: result });
});

//  Delete Post Api
const deletePost = asyncHandler(async (req, res) => {
  // console.log(req.params.postId)
  const post = await Post.findOne({ _id: req.params.postId }).populate(
    "postedBy",
    "_id"
  );
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  if (post.postedBy._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("UnAuthorized");
  }
  await post.deleteOne();
  res.json({ message: "Successfully deleted" });
});

// show following post
const followingPost = asyncHandler(async (req, res) => {
  const posts = await Post.find({ postedBy: { $in: req.user.following } })
    //$in is mongodb function who match the post the person we following and following coming from Mongodb
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name");

  if (!posts) {
    res.status(401);
    throw new Error("No Posts found");
  }
  return res.json(posts);
});

module.exports = {
  createPost,
  allPosts,
  myPosts,
  userLikes,
  userUnLikes,
  userComment,
  deletePost,
  followingPost,
};
