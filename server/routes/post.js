const express = require("express");
const router = express.Router();
const restResponse = require("../common/response");
const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

//@route POST api/posts
//@desc Create post
//@access private

router.post("/", verifyToken, async (req, res) => {
  console.log("post " + req.userId);
  const { title, description, url, status } = req.body;
  //simple validate
  if (title == "")
    return res.status(400).json(restResponse(false, "title is required"));
  try {
    const newPost = new Post({
      title,
      description,
      url,
      status: status || "TO LEARN",
      user: req.userId,
    });
    console.log(newPost);

    await newPost.save();
    res.status(200).json(restResponse(true, "create successfully", newPost));
  } catch (error) {
    console.log(error);
    res.status(400).json(restResponse(false, "Post fail"));
  }
});

//@route GET api/posts
//@desc Read post
//@access private

router.get("/", verifyToken, async (req, res) => {
  console.log("get" + req.userId);

  try {
    console.log(req.userId);

    const allPost = await Post.find({
      user: req.userId,
    }).populate("user", ["username"]);
    res.status(200).json(restResponse(true, "create successfully", allPost));
  } catch (error) {
    console.log(error);
    res.status(500).json(restResponse(false, "Internal server error"));
  }
});

//@route PUT api/posts/:id
//@desc Update post
//@access private

router.put("/:id", verifyToken, async (req, res) => {
  console.log("post " + req.userId);
  const { title, description, url, status } = req.body;
  //simple validate
  if (title == "")
    return res.status(400).json(restResponse(false, "title is required"));
  try {
    let updatedPost = {
      title: title,
      description: description || "",
      url: url || "",
      status: status || "TO LEARN",
    };
    const updatePostCondition = {
      _id: req.params.id,
      user: req.userId,
    };
    await Post.findOneAndUpdate(updatePostCondition, updatedPost, {
      new: true,
    });
    //check user not authorised update post
    if (!updatedPost)
      return res
        .status(401)
        .json(restResponse(false, "post not found or user not authorised"));
    res
      .status(200)
      .json(restResponse(true, "excellent progress successfully", updatedPost));
  } catch (error) {
    console.log(error);
    res.status(400).json(restResponse(false, "Post fail"));
  }
});

//@route DELETE api/posts/:id
//@desc Update post
//@access private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletePostCondition = {
      _id: req.params.id,
      user: req.userId,
    };

    const deletePost = await Post.findOneAndDelete(deletePostCondition);
    //check user not authorised
    if (!deletePost)
      return res
        .status(401)
        .json(restResponse(false, "post not found or user not authorised"));
    res
      .status(200)
      .json(restResponse(true, "delete progress successfully", deletePost));
  } catch (error) {
    console.log(error);
    res.status(400).json(restResponse(false, "Post fail"));
  }
});

//@route GET api/posts
//@desc Read post
//@access private

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const getPostConditionById = {
      _id: req.params.id,
      user: req.userId,
    };

    const getPostById = await Post.findOne(getPostConditionById);
    //check user not authorised
    if (!getPostById)
      return res
        .status(401)
        .json(restResponse(false, "post not found or user not authorised"));
    res
      .status(200)
        .json(restResponse(true, "delete progress successfully", getPostById));
  } catch (error) {
    console.log(error);
    res.status(400).json(restResponse(false, "Post fail"));
  }
});

module.exports = router;
