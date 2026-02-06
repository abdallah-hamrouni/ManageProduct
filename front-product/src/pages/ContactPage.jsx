export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">Contact</h1>
          <p className="text-slate-600 mt-2">
            Page statique (exemple). Tu peux la remplacer par un vrai formulaire plus tard.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">Email</div>
              <div className="text-slate-600">support@products-app.local</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">Téléphone</div>
              <div className="text-slate-600">+33 6 00 00 00 00</div>
            </div>

            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">Adresse</div>
              <div className="text-slate-600">
                10 Rue Exemple, 35000 Rennes, France
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 p-4">
            <div className="text-sm font-semibold text-slate-900">À propos</div>
            <p className="text-slate-600 mt-1">
              Cette application est une démo CRUD Fullstack : React (Tailwind) + Express + MySQL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
