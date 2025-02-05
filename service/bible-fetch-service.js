const BibleIndex = require("../models").bibleIndex;
const Bible = require("../models").bible;
const mongoose = require("mongoose");

//更新戀愛聖經指標 (每天午夜00:00)
const runBibleFetchService = async () => {
  try {
    //連結 mongoDB
    mongoose
      .connect(process.env.MONGODB_CONNECTION)
      .then(() => {
        console.log("連結到 mongoDB");
      })
      .catch((e) => {
        console.log(e);
      });

    const bibleIndex = await BibleIndex.findOne({});
    const counts = await Bible.countDocuments();

    let currentIndex = bibleIndex.saveIndex;

    if (currentIndex == counts) {
      //目前已經是最後一筆了
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    await BibleIndex.updateOne({
      saveIndex: currentIndex,
    });

    console.log("指標已更新");
  } catch (e) {
    console.log("提醒還沒上線的用戶上線", e);
  }
};

runBibleFetchService();
