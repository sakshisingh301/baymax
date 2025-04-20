import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-baymax-red text-white font-ubuntu px-6 py-6 shadow-md">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Contributor Section */}
        <div className="flex gap-16">
          {/* Contributor 1 */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white overflow-hidden">
              <img src="/mahima.jpg" alt="Contributor 1" className="w-full h-full object-cover" />
            </div>
            <p className="mt-2 text-lg font-semibold">Mahima Rudrapati</p>
            <p className="text-sm">Frontend Developer</p>
          </div>

          {/* Contributor 2 */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white overflow-hidden">
              <img src="/sakshi.jpg" alt="Contributor 2" className="w-full h-full object-cover" />
            </div>
            <p className="mt-2 text-lg font-semibold">Sakshi Singh</p>
            <p className="text-sm">Backend Developer</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm border-t border-white pt-4 w-full text-center">
          For HackDavis 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
