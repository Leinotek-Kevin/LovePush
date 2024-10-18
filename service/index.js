const bibleService = require("./bible-service");

//設定每天執行
const startFetching = () => {
  //每日聖經
  bibleService();
};

//部署的時候直接執行一次
// startFetching();
//每一小時檢查一次
setInterval(startFetching, 60 * 60 * 1000);
