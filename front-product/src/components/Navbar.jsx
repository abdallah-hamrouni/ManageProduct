import { NavLink } from "react-router-dom";

const linkBase =
  "px-3 py-2 rounded-xl text-sm font-semibold transition";
const linkIdle = "text-slate-600 hover:text-slate-900 hover:bg-slate-100";
const linkActive = "text-slate-900 bg-slate-100";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-black">
            P
          </div>
          <div>
            <div className="font-black text-slate-900 leading-tight">Products Admin</div>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            Produits
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
