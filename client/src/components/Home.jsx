import { NavLink } from 'react-router-dom';
import backgroundImage from '../assets/home-background.png';
import movingOut from "../assets/movingoutimage2.webp";
import peopleWorking from "../assets/peopleworking.jpeg";

export default function Home() {
  return (
    // background image
    <div className="flex flex-col items-center justify-center bg-cover" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* first horizontal bar with image */}
      <div className="w-full rounded p-40 mb-4" style={{ backgroundImage: `url(${movingOut})`, backgroundSize: 'cover', height: '80vh' }}>
        <div className="flex flex-col items-start justify-between h-full">
          {/* text */}
          <h1 className="text-center lg:text-left text-white text-4xl mb-4" style={{ textShadow: '2px 2px 2px black' }}>Looking for quick gigs?</h1>
          {/* link to Gigs componenet */}
          <NavLink to="/gigs" className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:from-blue-700 hover:via-blue-900 hover:to-blue-500 text-white font-bold text-4xl py-2 px-6 rounded self-end">
            Find Gigs Now
          </NavLink>
        </div>
      </div>
      {/* second horizontal bar with image */}
      <div className="w-full rounded p-40 mb-4" style={{ backgroundImage: `url(${peopleWorking})`, backgroundSize: 'cover', height: '80vh' }}>
        <div className="flex flex-col items-start justify-between h-full">
          {/* text */}
          <h1 className="text-center lg:text-left text-white text-4xl mb-4" style={{ textShadow: '2px 2px 2px black' }}>Looking for employment?</h1>
          {/* link to Jobs */}
          <NavLink to="/jobs" className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:from-blue-700 hover:via-blue-900 hover:to-blue-500 text-white font-bold text-4xl py-2 px-4 rounded self-end">
            Find Jobs Now
          </NavLink>
        </div>
      </div>
      {/* third horizontal bar */}
      <div className="w-full rounded p-40 mb-4" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '80vh' }}>
        <div className="flex flex-col items-center justify-between h-full">
          {/* centered text */}
          <h1 className="text-center lg:text-left text-blue-500 text-4xl mb-4">Find the right work for you!</h1>
          {/* link to Signup */}
          <NavLink to="/signup" className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:from-blue-700 hover:via-blue-900 hover:to-blue-500 text-white font-bold text-4xl py-2 px-6 rounded">
            Click Here to Sign Up Now
          </NavLink>
        </div>
      </div>
    </div>
  );
}
