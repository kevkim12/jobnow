import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="sticky top-0 flex items-center justify-between w-full p-4 bg-black z-1000">
      <img src={logo} alt="logo" className="w-20 h-auto pl-3" />
      <div>
        <NavLink
          className="px-2 py-2 text-white rounded hover:text-theme font-roboto lg:text-xl lg:py-6 lg:px-6 md:text-lg md:py-4 md:px-4"
          to={"/"}
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink
            className="px-2 py-2 text-white rounded hover:text-theme font-roboto lg:text-xl lg:py-6 lg:px-6 md:text-lg md:py-4 md:px-4"
            to={"/saved"}
          >
            Saved
          </NavLink>
        )}
        <NavLink
          className="px-2 py-2 text-white rounded hover:text-theme font-roboto lg:text-xl lg:py-6 lg:px-6 md:text-lg md:py-4 md:px-4"
          to={"/gigs"}
        >
          Gigs
        </NavLink>
        <NavLink
          className="px-2 py-2 text-white rounded hover:text-theme font-roboto lg:text-xl lg:py-6 lg:px-6 md:text-lg md:py-4 md:px-4"
          to={"/jobs"}
        >
          Jobs
        </NavLink>
        {isLoggedIn ? (
          <NavLink
            className="font-roboto text-white lg:text-xl lg:py-2 lg:px-4 md:text-lg md:py-2 md:px-4 py-1 px-2 rounded bg-theme ml-2.5 hover:text-theme hover:bg-slate-200"
            to="/login"
            onClick={logout}
          >
            Log out
          </NavLink>
        ) : (
          <NavLink
            className="font-roboto text-white lg:text-xl lg:py-2 lg:px-4 md:text-lg md:py-2 md:px-4 py-1 px-2 rounded bg-theme ml-2.5 hover:text-theme hover:bg-slate-200"
            to="/login"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
