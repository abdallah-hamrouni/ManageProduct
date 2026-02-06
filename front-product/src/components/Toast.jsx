export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const base =
    "fixed top-4 right-4 z-50 rounded-xl px-4 py-3 shadow-lg border backdrop-blur";
  const variant =
    toast.type === "success"
      ? "bg-emerald-50/90 border-emerald-200 text-emerald-900"
      : toast.type === "error"
      ? "bg-rose-50/90 border-rose-200 text-rose-900"
      : "bg-slate-50/90 border-slate-200 text-slate-900";

  return (
    <div className={`${base} ${variant}`}>
      <div className="flex items-start gap-3">
        <div className="text-sm">
          <p className="font-semibold">{toast.title}</p>
          {toast.message && <p className="opacity-90">{toast.message}</p>}
        </div>
        <button
          onClick={onClose}
          className="ml-2 rounded-lg px-2 py-1 text-sm hover:bg-black/5"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
