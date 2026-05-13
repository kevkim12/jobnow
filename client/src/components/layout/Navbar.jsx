import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-slate-950 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

  return (
    <header className="sticky top-0 z-1000 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
      <nav className="content-wrap flex min-h-20 flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <NavLink
          aria-label="JobNow home"
          to={"/"}
          className="w-fit rounded-md focus:outline-none focus:ring-4 focus:ring-teal-100"
        >
          <BrandLogo showTagline />
        </NavLink>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          <NavLink className={navLinkClass} to={"/"} end>
            Home
          </NavLink>
          {isLoggedIn && (
            <NavLink className={navLinkClass} to={"/saved"}>
              Saved
            </NavLink>
          )}
          <NavLink className={navLinkClass} to={"/gigs"}>
            Gigs
          </NavLink>
          <NavLink className={navLinkClass} to={"/jobs"}>
            Jobs
          </NavLink>
          {isLoggedIn ? (
            <NavLink
              className="ml-auto rounded-md bg-teal-500 px-4 py-2 text-sm font-black text-slate-950 shadow-sm transition hover:bg-teal-400 sm:ml-2"
              to="/login"
              onClick={logout}
            >
              Log out
            </NavLink>
          ) : (
            <NavLink
              className="ml-auto rounded-md bg-teal-500 px-4 py-2 text-sm font-black text-slate-950 shadow-sm transition hover:bg-teal-400 sm:ml-2"
              to="/login"
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
