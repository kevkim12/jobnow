import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-cover">
      <div className="w-full rounded p-40 mb-4 bg-cover bg-[url('/moving-out-image.webp')] h-80">
        <div className="flex flex-col items-start justify-between h-full">
          <h1 className="text-center lg:text-left text-white text-4xl mb-4 font-outline-1 text-shadow-lg shadow-black font-bold font-inter">Looking for quick gigs?</h1>
          <NavLink to="/gigs" className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:from-blue-700 hover:via-blue-900 hover:to-blue-500 text-white font-bold text-4xl py-2 px-6 rounded self-end">
            Find Gigs Now
          </NavLink>
        </div>
      </div>
      <div className="w-full rounded p-40 mb-4 bg-cover bg-[url('/people-working.jpeg')] h-80">
        <div className="flex flex-col items-start justify-between h-full">
          <h1 className="text-center lg:text-left text-white text-4xl mb-4 font-outline-1 text-shadow-lg shadow-black font-bold font-inter">Looking for employment?</h1>
          <NavLink to="/jobs" className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:from-blue-700 hover:via-blue-900 hover:to-blue-500 text-white font-bold text-4xl py-2 px-4 rounded self-end">
            Find Jobs Now
          </NavLink>
        </div>
      </div>
      <div className="w-full rounded p-40 bg-cover bg-[url('/home-background.png')] h-80">
        <div className="flex flex-col items-center justify-between h-full">
          <h1 className="text-center lg:text-left text-blue-500 text-4xl mb-4">Find the right work for you!</h1>
          <NavLink to="/signup" className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:from-blue-700 hover:via-blue-900 hover:to-blue-500 text-white font-bold text-4xl py-2 px-6 rounded">
            Click Here to Sign Up Now
          </NavLink>
        </div>
      </div>
    </div>
  );
}
