const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema(
  {
    body: {
      type: String,
      requried: true,
    },

    photo: {
      type: String,
      required: true,
    },

    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],

    comments: [{

        comment: {
          type: String,
        },

        postedBy: { 
            type: ObjectId, 
            ref: "User" 
        },
      }],

    postedBy: {
      // if we want to contact from one table to another we ref
      type: ObjectId,
      ref: "User", // this will link to post model
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
