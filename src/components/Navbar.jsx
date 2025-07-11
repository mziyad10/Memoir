import React, { useState } from 'react'

import ImageKitWrapper from './Image';

const Navbar = () => {
    const [open,setOpen] = useState(false);
  return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between'>

      {/* LOGO */}
    <div className="flex items-center gap-4 text-2xl font-bold">
    <ImageKitWrapper src="logo.png" alt="Memoir Logo" w={32} h={32} />
        <span>MEMOIR</span>
    </div>

      {/* MOBILE MENU */}
      <div className="md:hidden">

      {/* MOBILE BUTTON */}
        <div className="cursor-pointer text-2xl"onClick={()=>setOpen((prev)=>!prev)}>
        {open ? "X" : "☰"}
        </div>

        {/* MOBILE LINK LIST */}
        <div className={`w-full h-screen flex flex-col items-center gap-8 font-medium text-lg bg-[#FFFFF7] justify-center absolute top-16 transition-all ease-in-out ${open ? "-right-0":"-right-[100%]"}`}>
        
        <a href="">Home</a>
        <a href="">Trending</a>
        <a href="">Most Popular</a>
        <a href="">About</a>
        <a href="">
            <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 🔐</button>
        </a>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <a href="">Home</a>
        <a href="">Trending</a>
        <a href="">Most Popular</a>
        <a href="">About</a>
        <a href="">
            <button className='py-2 px-4 rounded-3xl bg-blue-800 text-white'>Login 🔐</button>
        </a>
      </div>

    </div>
  )
}

export default Navbar
