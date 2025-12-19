import React from 'react'
import { FiMenu } from "react-icons/fi"

const HeaderAdmin = ({ setIsOpen }) => {
    return (
        <header className='bg-white shadow-md h-16 flex items-center justify-between px-6 sticky top-0 z-20'>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className='md:hidden text-2xl text-gray-700 hover:text-blue-600 transition-colors duration-200'
            >
                <FiMenu />
            </button>

            <h1 className='font-bold text-lg text-gray-800'>Admin Management</h1>

            {/* Optional right section */}
            <div className='flex items-center gap-4'>
                {/* Add profile/avatar here */}
            </div>
        </header>
    )
}

export default HeaderAdmin
