import { NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="content-wrap flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <BrandLogo light showTagline />
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-300">
          <NavLink className="transition hover:text-white" to="/">
            Home
          </NavLink>
          <NavLink className="transition hover:text-white" to="/gigs">
            Gigs
          </NavLink>
          <NavLink className="transition hover:text-white" to="/jobs">
            Jobs
          </NavLink>
          <NavLink className="transition hover:text-white" to="/login">
            Login
          </NavLink>
        </div>
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} JobNow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
