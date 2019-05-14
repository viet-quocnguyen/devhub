const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

const validateProfile = require("../../validation/profile");

/**
 * @route   GET api/profiles/
 * @desc    Get current user profile
 * @access  Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(profile => {
        if (!profile) {
          errors["profile"] = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

/**
 * @route   GET api/profiles/handle/:handle
 * @desc    Get profile by handle
 * @access  Public
 */
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name"])
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    });
});

/**
 * @route   GET api/profiles/user/:id
 * @desc    Get profile by id
 * @access  Public
 */
router.get("/user/:id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route   GET api/profiles/all
 * @desc    Get all profiles
 * @access  Public
 */
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name"])
    .then(profiles => {
      if (!profiles) {
        errors.profile = "There is no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

/**
 * @route   POST api/profiles/
 * @desc    Create user profile
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.handle = req.body.handle;
    profileFields.company = req.body.company;
    profileFields.status = req.body.status;
    profileFields.bio = req.body.bio;
    profileFields.github = req.body.github;

    const { errors, isValid } = validateProfile(profileFields);
    if (!isValid) {
      return res.status(401).json(errors);
    }

    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
          (err, profile) => {
            res.json(profile);
          }
        );
      } else {
        // Create
        Profile.findOne({ handle: req.body.handle }).then(profile => {
          if (profile) {
            errors.handle = "Handle already exists";
            res.status(400).json(errors);
          } else {
            newProfile = new Profile(profileFields);
            newProfile.save().then(profile => {
              res.json(profile);
            });
          }
        });
      }
    });
  }
);

/**
 * @route   DELETE api/profiles/
 * @desc    Delete user profile and account
 * @access  Private
 */
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ user: req.user.id })
      .then(() => {
        User.findOneAndDelete({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

module.exports = router;
