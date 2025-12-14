import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white '>
            <div className="md:mycontainer flex justify-between items-center px-4 py-5 h-14 ">
                <div className='logo font-bold text-2xl'>
                    <span className='text-green-700 '>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP&gt;</span>
                </div>

                <button className='text-white bg-green-600 rounded-full flex gap-1 justify-between items-center font-bold pr-1 ring-1 ring-white'>
                    <img className='w-10 invert p-1' src="img/github.svg" alt="svg" />GitHub
                </button>
            </div>
        </nav>
    )
}

export default Navbar
 