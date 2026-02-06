export default function ProductTable({ items, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-sm text-slate-600">
            <th className="px-4 py-3">Nom</th>
            <th className="px-4 py-3">Catégorie</th>
            <th className="px-4 py-3">Prix</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-slate-500" colSpan={5}>
                Aucun produit pour le moment.
              </td>
            </tr>
          ) : (
            items.map((p) => (
              <tr key={p.id} className="border-t text-sm hover:bg-slate-50/70">
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-900">{p.nom}</div>
                  {p.description && (
                    <div className="text-slate-500 line-clamp-1">{p.description}</div>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-700">{p.categorie}</td>
                <td className="px-4 py-3 font-medium">{Number(p.prix).toFixed(2)} €</td>
                <td className="px-4 py-3 text-slate-500">
                  {new Date(p.date_ajout).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="rounded-xl px-3 py-2 text-sm font-semibold border border-slate-200 hover:bg-slate-100 transition"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => onDelete(p)}
                      className="rounded-xl px-3 py-2 text-sm font-semibold border border-rose-200 text-rose-700 hover:bg-rose-50 transition"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
