import React from 'react';

const LoginPage = () => {
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
      <div className='lg:basis-1/2'>
        {/* Red Box */}
        <div>
          {/* Heading */}
          <div></div>
          {/* Form Container */}
          <div>
            {/* Label */}
            <div></div>
            {/* Textbox */}
            <div></div>
            {/* Label */}
            <div></div>
            {/* Textbox */}
            <div></div>
          </div>
          {/* Submit Button */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
