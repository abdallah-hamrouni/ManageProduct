const rootPool = require("../config/dbRoot");
const pool = require("../config/dbRoot");

async function initDatabase() {
  try {
    console.log("🔧 Initialisation de la base de données...");

    // 1️⃣ Créer la base si elle n'existe pas
    await rootPool.query(`
      CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}
      CHARACTER SET utf8mb4
      COLLATE utf8mb4_unicode_ci
    `);

    // 2️⃣ Créer la table products
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(120) NOT NULL,
        description TEXT,
        prix DECIMAL(10,2) NOT NULL,
        categorie VARCHAR(80) NOT NULL,
        date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Base et tables prêtes.");
  } catch (err) {
    console.error("❌ Erreur init DB:", err.message);
    process.exit(1);
  }
}

module.exports = initDatabase;
