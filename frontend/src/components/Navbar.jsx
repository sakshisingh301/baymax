import React from 'react';

const Navbar = () => {
    return (
        <nav className="w-full bg-baymax-red shadow-md px-6 py-4 flex items-center justify-between font-ubuntu">
          {/* Left - Logo / Brand */}
          <div className="text-2xl font-main font-bold text-white">
            Baymax
          </div>
    
          {/* Right - Logout Button */}
          <button
            className="bg-white/30 font-main text-xl text-white border border-white px-4 py-2 rounded hover:bg-transparent transition cursor-pointer"
            onClick={() => {
              // Handle logout logic here
              console.log('Logging out...');
            }}
          >
            Logout
          </button>
        </nav>
      );
}

export default Navbar;