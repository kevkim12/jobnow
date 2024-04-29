// Worked on by Kevin Kim

import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  // Gets the values of isLoggedIn and logout from the AuthContext
  const { isLoggedIn, logout } = useAuth();

  /*
  Returns the Navbar component. It displays a logo on the left and navigation links on the right.
  If isLoggedIn is true, then the navigation button for "Saved" is displayed. In addition, the text
  for the login button changes to "Log out." If isLoggedIn is false, then the navigation button for
  "Saved" is not displayed and the text for the login button changes to "Login."
  */
  return (
    <div className="flex justify-between items-center p-4 bg-black w-full">
      <img src={logo} alt="logo" className="w-1/12 pl-3" />
      <div>
        <NavLink className="hover:text-theme font-roboto text-white text-xl py-6 px-6 rounded" to={"/"}>
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink className="hover:text-theme font-roboto text-white text-xl py-6 px-6 rounded" to={"/saved"}>
            Saved
          </NavLink>
        )}
        <NavLink className="hover:text-theme font-roboto text-white text-xl py-6 px-6 rounded" to={"/gigs"}>
          Gigs
        </NavLink>
        <NavLink className="hover:text-theme font-roboto text-white text-xl py-6 px-6 rounded" to={"/jobs"}>
          Jobs
        </NavLink>
        {isLoggedIn ? (
          <NavLink className="font-roboto text-white text-xl py-2 px-4 rounded bg-theme ml-2.5 hover:text-theme hover:bg-slate-200" to="/login" onClick={logout}>
            Log out
          </NavLink>
        ) : (
          <NavLink className="font-roboto text-white text-xl py-2 px-4 rounded bg-theme ml-2.5 hover:text-theme hover:bg-slate-200" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
