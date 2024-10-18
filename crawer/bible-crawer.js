const fs = require("fs");
const bible = require("../models").bible;

//讀取 bible 文件 並灌入資料庫
const crawerBible = async () => {
  fs.readFile("./bible.txt", "utf8", async (err, data) => {
    if (err) {
      return null;
    }

    await bible.deleteMany();
    const urls = data.split(",");

    urls.forEach(async (url) => {
      const index = url.match(/bible_(\d+)/)[1];
      await bible.create({
        currentIndex: index,
        currentUrl: url,
      });
    });

    return data;
  });
};

module.exports = crawerBible;
