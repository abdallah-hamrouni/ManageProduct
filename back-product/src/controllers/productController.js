const pool = require("../config/dbRoot");

function validateProduct(body) {
  const errors = [];
  const nom = String(body.nom ?? "").trim();
  const categorie = String(body.categorie ?? "").trim();
  const description = String(body.description ?? "");
  const prixNum = Number(body.prix);

  if (!nom) errors.push("Le nom est obligatoire.");
  if (!categorie) errors.push("La catégorie est obligatoire.");
  if (!Number.isFinite(prixNum) || prixNum < 0) errors.push("Le prix doit être un nombre >= 0.");

  return { errors, data: { nom, description, prix: prixNum, categorie } };
}

exports.getAll = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Produit introuvable." });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { errors, data } = validateProduct(req.body);
    if (errors.length) return res.status(400).json({ message: "Validation échouée.", errors });

    const { nom, description, prix, categorie } = data;
    const [result] = await pool.query(
      "INSERT INTO products (nom, description, prix, categorie) VALUES (?, ?, ?, ?)",
      [nom, description, prix, categorie]
    );

    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { errors, data } = validateProduct(req.body);
    if (errors.length) return res.status(400).json({ message: "Validation échouée.", errors });

    const { nom, description, prix, categorie } = data;

    const [result] = await pool.query(
      "UPDATE products SET nom = ?, description = ?, prix = ?, categorie = ? WHERE id = ?",
      [nom, description, prix, categorie, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Produit introuvable." });

    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: "Produit introuvable." });

    res.json({ message: "Produit supprimé avec succès." });
  } catch (err) {
    next(err);
  }
};
