const express = require("express");

const Follow = require("../models/FollowModel");
const User = require("../models/UserModel");
const router = express.Router();

router.post("/followUser", async (req, res) => {
  const { currentUser, user } = req.body;
  try {
    // Follow Transaction
    // Following Update
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const update = { $push: { following: user } };
    await Follow.findOneAndUpdate(
      { userId: currentUser.userId },
      update,
      options
    );

    // Follower Update
    const _options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const _update = { $push: { follower: currentUser } };
    await Follow.findOneAndUpdate({ userId: user.userId }, _update, _options);

    // User Transaction
    const userOptions = { upsert: true, setDefaultsOnInsert: true };
    // Ang nag follow
    const updateUser = { $inc: { countFollowing: +1 } };
    await User.findByIdAndUpdate(
      { _id: currentUser.userId },
      updateUser,
      userOptions
    );

    // Ang ge follow
    const _updateUser = { $inc: { countFollower: +1 } };
    await User.findByIdAndUpdate(
      { _id: user.userId },
      _updateUser,
      userOptions
    );

    // true => following
    res.send(true);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong adding follower." });
  }
});

router.post("/followingUser", async (req, res) => {
  const { userId, otherUserId } = req.body;
  try {
    const userFollow = await Follow.find({
      $and: [{ userId: userId }, { "following.userId": otherUserId }],
    });

    if (userFollow.length > 0) res.send(true);
    else return res.send(false);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went retreiving following user." });
  }
});

router.post("/unFollowUser", async (req, res) => {
  const { userId, otherUserId } = req.body;

  try {
    // Follow Transaction
    // Unfollowing
    const update = { $pull: { following: { userId: otherUserId } } };
    await Follow.findOneAndUpdate({ userId: userId }, update);

    // Unfollow
    const _update = { $pull: { follower: { userId: userId } } };
    await Follow.findOneAndUpdate({ userId: otherUserId }, _update);

    // User Transaction
    // Ang nag follow
    const updateUser = { $inc: { countFollowing: -1 } };
    await User.findByIdAndUpdate({ _id: userId }, updateUser);

    // Ang ge follow
    const _updateUser = { $inc: { countFollower: -1 } };
    await User.findByIdAndUpdate({ _id: otherUserId }, _updateUser);

    // false => not following anymore
    res.send(false);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong unfollowing user." });
  }
});

router.post("/getFollowers", async (req, res) => {
  const { userId } = req.body;
  try {
    const followers = await Follow.findOne({ userId: userId });

    if(followers){
      res.send(followers.follower);
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong fetching followers." });
  }
});

module.exports = router;
