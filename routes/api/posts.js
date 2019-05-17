const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");

const validatePost = require("../../validation/post");
/**
 * @route   GET api/posts/
 * @desc    Get All Posts
 * @access  Public
 */
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ post: "No post found" }));
});

/**
 * @route   GET api/posts/:id
 * @desc    Get Post by id
 * @access  Public
 */
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("comments.user")
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ post: "No post found" }));
});

/**
 * @route   POST api/posts
 * @desc    Create Post
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

/**
 * @route   POST api/posts/like/:id
 * @desc    Like/Unlike Post
 * @access  Private
 */
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => {
            return like.user == req.user.id;
          }).length > 0
        ) {
          // Unlike Post
          post.likes = post.likes.filter(like => {
            return like.user != req.user.id;
          });
          return post.save().then(post => res.json(post));
        }
        // Like Post
        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: "No post found" }));
  }
);

/**
 * @route   POST api/posts/comment/:id
 * @desc    Creating comment
 * @access  Private
 */
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        let newComment = {
          user: req.user.id,
          text: req.body.text
        };
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: "No post found" }));
  }
);

/**
 * @route   DELETE api/posts/:id
 * @desc    Delete post
 * @access  Private
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check if current user is the author
        if (req.user.id.toString() !== post.user.toString()) {
          return res.status(401).json({ authorization: "User not authorized" });
        }

        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ post: "No post found" }));
  }
);

/**
 * @route   DELETE api/posts/comment/:id/:comment_id
 * @desc    Delete comment
 * @access  Private
 */
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Get the comment delete
        let comment = post.comments.filter(comment => {
          return comment.id == req.params.comment_id;
        });

        // Check if comment exists
        if (comment.length == 0) {
          return res.status(404).json({ comment: "No comment found" });
        }
        if (!(comment[0].user == req.user.id || post.user == req.user.id)) {
          return res.status(401).json({ comment: "Unauthorized" });
        }
        post.comments = post.comments.filter(comment => {
          return comment.id != req.params.comment_id;
        });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: "No post found" }));
  }
);
module.exports = router;
