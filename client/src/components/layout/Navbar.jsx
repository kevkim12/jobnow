import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 bg-black w-full z-1000 sticky top-0">
      <img src={logo} alt="logo" className="w-20 pl-3 h-auto" />
      <div>
        <NavLink className="hover:text-theme font-roboto text-white lg:text-xl lg:py-6 lg:px-6 md:text-lg md:py-4 md:px-4 py-2 px-2 rounded" to={"/"}>
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink className="hover:text-theme font-roboto text-white lg:text-xl lg:py-6 lg:px-6 md:text-lg md:py-4 md:px-4 py-2 px-2 rounded" to={"/saved"}>
            Saved
          </NavLink>
        )}
        <NavLink className="hover:text-theme font-roboto text-white lg:text-xl lg:py-6 lg:px-6 md:text-lg md:py-4 md:px-4 py-2 px-2 rounded" to={"/gigs"}>
          Gigs
        </NavLink>
        <NavLink className="hover:text-theme font-roboto text-white lg:text-xl lg:py-6 lg:px-6 md:text-lg md:py-4 md:px-4 py-2 px-2 rounded" to={"/jobs"}>
          Jobs
        </NavLink>
        {isLoggedIn ? (
          <NavLink className="font-roboto text-white lg:text-xl lg:py-2 lg:px-4 md:text-lg md:py-2 md:px-4 py-1 px-2 rounded bg-theme ml-2.5 hover:text-theme hover:bg-slate-200" to="/login" onClick={logout}>
            Log out
          </NavLink>
        ) : (
          <NavLink className="font-roboto text-white lg:text-xl lg:py-2 lg:px-4 md:text-lg md:py-2 md:px-4 py-1 px-2 rounded bg-theme ml-2.5 hover:text-theme hover:bg-slate-200" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
