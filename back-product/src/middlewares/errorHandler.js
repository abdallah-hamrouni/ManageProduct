module.exports = (err, req, res, next) => {
  console.error(err);

  // Erreur DB
  if (err && err.code) {
    return res.status(500).json({
      message: "Erreur serveur (base de données).",
      details: err.code,
    });
  }

  res.status(500).json({ message: "Erreur serveur.", details: err?.message ?? "unknown" });
};
