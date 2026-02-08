const express = require("express");
const cors = require("cors");
const client = require("prom-client");

const productRoutes = require("./routes/productRoutes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

/* =======================
   CORS
======================= */
const corsOrigin = process.env.CORS_ORIGIN || "*";

app.use(cors({
  origin: corsOrigin === "*" ? "*" : corsOrigin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

/* =======================
   PROMETHEUS METRICS
======================= */

// registre Prometheus
const register = new client.Registry();

// métriques système (CPU, mémoire, event loop…)
client.collectDefaultMetrics({ register });

// métrique HTTP (latence + nombre de requêtes)
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Durée des requêtes HTTP",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

register.registerMetric(httpRequestDuration);

// middleware pour mesurer les requêtes
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer({
    method: req.method,
  });

  res.on("finish", () => {
    end({
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
  });

  next();
});

// endpoint Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

/* =======================
   ROUTES
======================= */

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/products", productRoutes);

/* =======================
   ERRORS
======================= */

app.use(notFound);
app.use(errorHandler);

module.exports = app;
