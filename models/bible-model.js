const mongoose = require("mongoose");
const { Schema } = mongoose;

//製作每日聖經 Schema
const bibbleSchema = new Schema({
  //目前指標
  currentIndex: {
    type: Number,
    required: true,
    default: 1,
  },

  //聖經網址
  currentUrl: {
    type: String,
    required: true,
  },

  //更新時間
  updateTime: {
    type: Number,
    default: Date.now,
  },
});

//隱藏 _id,__v
bibbleSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
module.exports = mongoose.model("Bible", bibbleSchema);
