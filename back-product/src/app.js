const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// ✅ 1️⃣ Initialiser app EN PREMIER
const app = express();

// ✅ 2️⃣ Middlewares globaux
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// ✅ 3️⃣ Routes
app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/products", productRoutes);

// ✅ 4️⃣ Middlewares d'erreur
app.use(notFound);
app.use(errorHandler);

module.exports = app;
