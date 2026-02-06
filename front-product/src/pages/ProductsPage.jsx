import { useEffect, useMemo, useState } from "react";
import { ProductsAPI } from "../api/products";
import ProductTable from "../components/ProductTable";
import ProductFormModal from "../components/ProductFormModal";
import Toast from "../components/Toast";

export default function ProductsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create | edit
  const [editing, setEditing] = useState(null);

  const [toast, setToast] = useState(null);

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) =>
      [p.nom, p.categorie, p.description].some((v) => String(v ?? "").toLowerCase().includes(q))
    );
  }, [items, query]);

  function showToast(type, title, message) {
    setToast({ type, title, message });
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => setToast(null), 2500);
  }

  async function refresh() {
    setLoading(true);
    try {
      const data = await ProductsAPI.list();
      setItems(data);
    } catch (e) {
      showToast("error", "Erreur", e?.response?.data?.message ?? "Impossible de charger les produits.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  function openCreate() {
    setModalMode("create");
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(p) {
    setModalMode("edit");
    setEditing(p);
    setModalOpen(true);
  }

  async function handleSubmit(payload) {
    try {
      if (modalMode === "create") {
        await ProductsAPI.create(payload);
        showToast("success", "Succès", "Produit créé.");
      } else {
        await ProductsAPI.update(editing.id, payload);
        showToast("success", "Succès", "Produit modifié.");
      }
      setModalOpen(false);
      await refresh(); // état propre → re-fetch après action
    } catch (e) {
      const data = e?.response?.data;
      const msg =
        data?.errors?.join(" ") ||
        data?.message ||
        "Une erreur est survenue pendant l’opération.";
      showToast("error", "Erreur", msg);
    }
  }

  async function handleDelete(p) {
    const ok = window.confirm(`Supprimer "${p.nom}" ?`);
    if (!ok) return;

    try {
      await ProductsAPI.remove(p.id);
      showToast("success", "Succès", "Produit supprimé.");
      await refresh();
    } catch (e) {
      showToast("error", "Erreur", e?.response?.data?.message ?? "Suppression impossible.");
    }
  }

  return (
  <div className="min-h-screen bg-slate-50">
    <Toast toast={toast} onClose={() => setToast(null)} />

    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header “hero” */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Gestion de Produits</h1>
            
      
          </div>

          <div className="flex gap-2">
            <button
              onClick={openCreate}
              className="rounded-2xl px-5 py-2.5 font-semibold bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
            >
              + Ajouter un produit
            </button>
          </div>
        </div>

        {/* Barre recherche + “stats” */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="text-slate-500">🔎</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-500"
                placeholder="Rechercher (nom, catégorie, description...)"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="rounded-xl px-2 py-1 text-sm hover:bg-slate-200/60"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="text-xs text-slate-500">Produits affichés</div>
            <div className="text-2xl font-black text-slate-900">
              {filtered.length}
              <span className="text-sm font-semibold text-slate-500"> / {items.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="mt-6">
        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-slate-600 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-slate-400 animate-pulse" />
              <div className="font-semibold">Chargement des produits...</div>
            </div>
          </div>
        ) : (
          <ProductTable items={filtered} onEdit={openEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>

    <ProductFormModal
      open={modalOpen}
      mode={modalMode}
      initialValue={editing}
      onClose={() => setModalOpen(false)}
      onSubmit={handleSubmit}
    />
  </div>
);

}
