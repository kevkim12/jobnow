import {NavLink} from 'react-router-dom';

import logo from '../../assets/logo.png'

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-black w-full">
      <img src={logo} alt="logo" className="w-1/12 pl-3" />
      <div className="">
        <NavLink className="hover:text-theme font-roboto text-white text-xl py-6 px-6 rounded" to={`/`}>
          Home
        </NavLink>
        <NavLink className="hover:text-theme font-roboto text-white text-xl py-6 px-6 rounded" to={`/gigs`}>
          Gigs
        </NavLink>
        <NavLink className="font-roboto text-white text-xl py-2 px-4 rounded bg-theme ml-2.5" to={`/login`}>
          Login
        </NavLink>
      </div>
    </div>
  );
}