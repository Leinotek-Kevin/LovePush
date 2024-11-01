const router = require("express").Router();
const Bible = require("../models").bible;
const BibleIndex = require("../models").bibleIndex;

//取得指定每日一句聖經
router.get("/today-bible", async (req, res) => {
  try {
    const bilbeData = await BibleIndex.findOne();
    const currentIndex = bilbeData.saveIndex;

    const data = await Bible.findOne({ currentIndex });
    if (data) {
      return res.status(200).send({
        status: true,
        message: "獲取每日一句聖經",
        data,
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "耶穌今天在忙喔！祝你今天依舊幸運",
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server Error",
    });
  }
});

//更新目前每日一句聖經位置
router.post("/update-index", async (req, res) => {
  let { index } = req.body;

  try {
    const data = await BibleIndex.findOneAndUpdate(
      {},
      { saveIndex: index },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).send({
      status: true,
      message: "更新成功",
      data,
    });
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server Error",
    });
  }
});

//取得目前的聖經位置
router.get("/current-index", async (req, res) => {
  try {
    const data = await BibleIndex.findOne({});

    return res.status(200).send({
      status: true,
      message: "獲得成功",
      data,
    });
  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
