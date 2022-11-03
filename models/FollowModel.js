const mongoose = require("mongoose");

const FollowSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    follower: {
      type: [
        {
          userId: mongoose.Schema.Types.ObjectId,
          userUid: String,
          userName: String,
          userImageURL: String,
          followMeDate: Date,
        },
      ],
      require,
    },
    following: {
      type: [
        {
          userId: mongoose.Schema.Types.ObjectId,
          userUid: String,
          userName: String,
          userImageURL: String,
          followingDate: Date,
        },
      ],
      require,
    },
  },
  { timeStamps: true }
);

const Follow = mongoose.model("Follow", FollowSchema);

module.exports = Follow;
