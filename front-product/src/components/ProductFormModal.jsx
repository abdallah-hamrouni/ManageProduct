import { useEffect, useMemo, useState } from "react";

const empty = { nom: "", description: "", prix: "", categorie: "" };

export default function ProductFormModal({ open, mode, initialValue, onClose, onSubmit }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState([]);

  const title = useMemo(() => (mode === "edit" ? "Modifier le produit" : "Ajouter un produit"), [mode]);

  useEffect(() => {
    if (!open) return;
    setErrors([]);
    if (mode === "edit" && initialValue) {
      setForm({
        nom: initialValue.nom ?? "",
        description: initialValue.description ?? "",
        prix: initialValue.prix ?? "",
        categorie: initialValue.categorie ?? "",
      });
    } else {
      setForm(empty);
    }
  }, [open, mode, initialValue]);

  if (!open) return null;

  function validate() {
    const e = [];
    if (!form.nom.trim()) e.push("Nom obligatoire.");
    if (!String(form.categorie).trim()) e.push("Catégorie obligatoire.");
    const prixNum = Number(form.prix);
    if (!Number.isFinite(prixNum) || prixNum < 0) e.push("Prix invalide (>= 0).");
    setErrors(e);
    return e.length === 0;
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit({
      nom: form.nom.trim(),
      description: form.description,
      prix: Number(form.prix),
      categorie: String(form.categorie).trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-xl border border-slate-200">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="rounded-lg px-2 py-1 hover:bg-slate-100">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {errors.length > 0 && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
              <ul className="list-disc pl-5">
                {errors.map((er, i) => (
                  <li key={i}>{er}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nom</label>
            <input
              value={form.nom}
              onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Ex: Souris gaming"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full min-h-[90px] rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Détails du produit..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Prix (€)</label>
              <input
                value={form.prix}
                onChange={(e) => setForm((f) => ({ ...f, prix: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Ex: 49.99"
                inputMode="decimal"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Catégorie</label>
              <input
                value={form.categorie}
                onChange={(e) => setForm((f) => ({ ...f, categorie: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Ex: Informatique"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 font-semibold border border-slate-200 hover:bg-slate-100 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-xl px-4 py-2 font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              {mode === "edit" ? "Enregistrer" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
