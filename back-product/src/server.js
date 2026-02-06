require("dotenv").config();
const app = require("./app");
const initDatabase = require("./init/initDatabase");

const PORT = process.env.PORT || 5000;

(async () => {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
  });
})();
