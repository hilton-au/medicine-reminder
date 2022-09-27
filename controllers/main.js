const cloudinary = require("../middleware/cloudinary");
const Meds = require("../models/Medicine")

module.exports = {
  getProfile: async (req, res) => {
    try {
      res.render("profile.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getMedicineReminders: async (req, res) => {
    try {
      const reminders = await Meds.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean();
      res.render("medicineReminders.ejs", {reminders: reminders });
    } catch (err) {
      console.log(err);
    }
  },
  addMeds: async (req, res) => {
    try {
      await Meds.create({
        name: req.body.medicineName,
        frequency: req.body.frequency,
        user: req.user.id,
      });
      console.log("Reminder has been added!");
      res.redirect(`/medicineReminders`);
    } catch (err) {
      console.log(err);
    }
  },
  addTaken: async (req, res) => {
    try {
      await Meds.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { timesTaken: 1 },
          lastTakenAt: Date.now(),
        }
      );
      console.log("Times taken +1");
      res.redirect(`/medicineReminders`);
    } catch (err) {
      console.log(err);
    }
  },
  // getPost: async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id);
  //     const comments = await Comment.find({postID: req.params.id}).sort({ createdAt: "desc" }).lean();
  //     res.render("post.ejs", { post: post, user: req.user, comments: comments });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // createPost: async (req, res) => {
  //   try {
  //     // Upload image to cloudinary
  //     const result = await cloudinary.uploader.upload(req.file.path);

  //     await Post.create({
  //       title: req.body.title,
  //       image: result.secure_url,
  //       cloudinaryId: result.public_id,
  //       caption: req.body.caption,
  //       likes: 0,
  //       user: req.user.id,
  //     });
  //     console.log("Post has been added!");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // deletePost: async (req, res) => {
  //   try {
  //     // Find post by id
  //     let post = await Post.findById({ _id: req.params.id });
  //     // Delete image from cloudinary
  //     await cloudinary.uploader.destroy(post.cloudinaryId);
  //     // Delete post from db
  //     await Post.remove({ _id: req.params.id });
  //     console.log("Deleted Post");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     res.redirect("/profile");
  //   }
  // },
};
