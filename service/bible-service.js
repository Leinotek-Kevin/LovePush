const BibleIndex = require("../models").bibleIndex;
const Bible = require("../models").bible;
let isFetchingLock = false; //狀態變數

const update = async () => {
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
};

//設定每天 00:00抓一次
const startFetching = () => {
  const now = new Date();
  const startHour = 0; //凌晨12點

  if (now.getHours() === startHour && !isFetchingLock) {
    console.log("每日聖經：進入更新時間範圍內");
    isFetchingLock = true; //設定正在抓取

    //符合條件立即抓取一次
    update();

    //設定結束時間
    setTimeout(() => {
      clearInterval(interal); //停止抓取
      console.log("停止抓取最新開獎結果");
      isFetchingLock = false; //重置狀態
    }, 60 * 60 * 1000); //持續一小時
  } else {
    if (isFetchingLock) {
      console.log(
        "每日聖經：已進入抓取時間範圍並已啟動抓取排程" + isFetchingLock
      );
    } else {
      console.log("每日聖經：當前不再抓取時間範圍內");
    }
  }
};

module.exports = startFetching;
