import { NavLink } from "react-router-dom";
import Footer from "./layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-cover">
      <div className="w-full rounded p-10 md:p-40 mb-4 bg-cover bg-[url('/moving-out-image.webp')] h-80">
        <div className="flex flex-col items-start justify-between h-full">
          <h1 className="mb-2 text-2xl font-bold text-center text-white lg:text-left md:text-3xl lg:text-4xl md:mb-4 font-outline-1 text-shadow-lg shadow-black font-inter">
            Looking for quick gigs?
          </h1>
          <NavLink
            to="/gigs"
            className="self-end px-4 py-2 text-xl font-bold text-center text-white rounded bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:from-blue-700 hover:via-blue-900 hover:to-blue-500 md:text-3xl lg:text-4xl md:px-6"
          >
            Find Gigs Now
          </NavLink>
        </div>
      </div>
      <div className="w-full rounded p-10 md:p-40 mb-4 bg-cover bg-[url('/people-working.jpeg')] h-80">
        <div className="flex flex-col items-start justify-between h-full">
          <h1 className="mb-2 text-2xl font-bold text-center text-white lg:text-left md:text-3xl lg:text-4xl md:mb-4 font-outline-1 text-shadow-lg shadow-black font-inter">
            Looking for employment?
          </h1>
          <NavLink
            to="/jobs"
            className="self-end px-4 py-2 text-xl font-bold text-center text-white rounded bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:from-blue-700 hover:via-blue-900 hover:to-blue-500 md:text-3xl lg:text-4xl md:px-6"
          >
            Find Jobs Now
          </NavLink>
        </div>
      </div>
      <div className="w-full rounded p-10 md:p-40 bg-cover bg-[url('/home-background.png')] h-80">
        <div className="flex flex-col items-center justify-around h-full">
          <h1 className="mb-2 text-2xl text-center text-blue-500 lg:text-left md:text-3xl lg:text-4xl md:mb-4">
            Find the right work for you!
          </h1>
          <NavLink
            to="/signup"
            className="px-4 py-2 text-xl font-bold text-center text-white rounded bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 hover:from-blue-700 hover:via-blue-900 hover:to-blue-500 md:text-3xl lg:text-4xl lg:py-2 lg:px-6"
          >
            Click Here to Sign Up Now
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  );
}
