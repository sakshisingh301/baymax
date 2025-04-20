import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="w-full bg-baymax-red shadow-md px-6 py-4 flex items-center justify-between font-ubuntu">
          {/* Left - Logo / Brand */}
          <Link to="/patientlookup" className="text-2xl font-main font-bold text-white">
            Baymax
          </Link>
    
          {/* Right - Logout Button */}
          <button
            className="bg-white/30 font-main text-xl text-white border border-white px-4 py-2 rounded hover:bg-transparent transition cursor-pointer"
            onClick={() => navigate('/')}
            >
            Logout
          </button>
        </nav>
      );
}

export default Navbar;