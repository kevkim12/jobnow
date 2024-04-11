import {NavLink} from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center p-4 bg-black w-full">
      <h3 className="text-white">Logo</h3>
      <div className="">
        <NavLink className="hover:text-sky-500 text-white font-bold py-2 px-6 rounded" to={`/`}>
          Home
        </NavLink>
        <NavLink className="hover:text-sky-500 text-white font-bold py-2 px-6 rounded" to={`/jobs`}>
          Jobs
        </NavLink>
        <NavLink className="hover:text-sky-500 text-white font-bold py-2 px-6 rounded" to={`/gigs`}>
          Gigs
        </NavLink>
      </div>
    </div>
  );
}