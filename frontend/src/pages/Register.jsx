import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault(); 
        navigate('/patientlookup'); 
      };

    return (
        <div className='grid grid-cols-2 lg:grid-row h-screen'>
          {/* Left Container */}
          <div className='lg:basis-1/2 relative overflow-hidden'>
            {/* Heading */}
            <div className='h-[25vh] flex flex-col justify-end gap-4'>
              <div className='flex pl-15'>
              <p className='font-main text-3xl'>Welcome to</p>
              </div>
              <div className='flex justify-center'>
              <p className='font-main text-7xl '>Baymax!</p>
              </div>
            </div>
            <div className='grid grid-cols-2 min-h-screen'>
            {/* Baymax Image */}
            <div className='relative left-0 bottom-0 -scale-x-100 bg-[url(/wave.png)] bg-no-repeat translate-y-[10%]'>
            </div>
            {/* Short Context */}
            <div className='relative h-screen translate-y-[15%]'>
              <p className='font-ubuntu text-xl text-black p-10'>
                Your personal nurse companion! <br/> <br/>
                Get started to make your patient enrollment experience faster and smoother.
              </p>
            </div>
            </div>
          </div>
    
        {/* Right Container */}
          <div className='flex justify-center items-center pl-30 lg:basis-1/2'>
            {/* Red Box */}
            <div className='flex flex-col bg-baymax-red h-[65vh] w-full rounded-l-4xl justify-between items-center'>
              {/* Heading */}
              <div className='font-ubuntu text-3xl h-1/10 pt-15'>
                Nurses Register
              </div>
              {/* Form Container */}
              <form className='flex flex-col w-full max-w-sm space-y-6 pb-20 items-center' onSubmit={handleSignup}>
                <div className='w-full'>
                  {/* Label */}
                  <label htmlFor="name" className="block font-ubuntu text-white text-xl">
                    Name
                  </label>
                  {/* Textbox */}
                  <input
                    type="text"
                    id="name"
                    className="mt-1 w-full rounded-md border-2 border-gray-300 px-4 py-2 text-white focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div className='w-full pb-7'>
                  {/* Label */}
                  <label htmlFor="name" className="block font-ubuntu text-white text-xl">
                    Password
                  </label>
                  {/* Textbox */}
                  <input
                    type="password"
                    id="password"
                    className="mt-1 w-full rounded-md border-2 border-gray-300 px-4 py-2 text-white focus:outline-none"
                    placeholder="Enter your password"
                  />
                </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-1/2 text-black bg-white font-medium px-6 py-2 mt-4 cursor-pointer hover:bg-transparent border-2 border-white hover:text-white transition"
              >
                Sign up!
              </button>
              <Link to="/" className="text-600 underline">
                 Existing user? Go to login!
              </Link>
              </form>
            </div>
          </div>
        </div>
      );
};

export default Register