const mongoose = require("mongoose");
const { Schema } = mongoose;

//製作每日聖經 Schema
const bibbeIndexchema = new Schema({
  //紀錄更新日期
  recordDate: {
    //2024/10/17
    type: String,
    required: true,
  },

  //存儲的聖經指標
  saveIndex: {
    type: Number,
    required: true,
  },

  //更新時間
  updateTime: {
    type: Number,
    default: Date.now,
  },
});

//隱藏 _id,__v
bibbeIndexchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
module.exports = mongoose.model("BibleIndex", bibbeIndexchema);
