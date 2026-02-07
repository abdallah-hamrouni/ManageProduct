require("dotenv").config();
const app = require("./app");
const initDatabase = require("./init/initDatabase");

const PORT = process.env.PORT || 5000;

(async () => {
  await initDatabase();

 app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on http://0.0.0.0:${PORT}`);
});

})();
