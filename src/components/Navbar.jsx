import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa"
import { HiMenuAlt3, HiX } from "react-icons/hi"
import useEcomStore from '../store/ecom-store'
import { IoHome } from "react-icons/io5";
import { GiShoppingBag } from "react-icons/gi";

const Navbar = () => {

    const carts = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const logout = useEcomStore((state) => state.logout)

    const [open, setOpen] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        setOpenProfile(false)
        setOpen(false)
        navigate('/login')
    }

    return (
        <nav className='
            bg-gradient-to-r from-[#051937] via-[#073a63] to-[#051937]
            shadow-lg sticky top-0 z-50
        '>

            <div className='container mx-auto px-4'>

                <div className='flex justify-between items-center h-16 text-white'>


                    <div className='flex items-center gap-10'>

                        {/* LOGO */}
                        <Link
                            className='text-2xl font-extrabold tracking-wider text-green-400 drop-shadow-lg'
                            to='/'
                        >
                            PND STORE
                        </Link>

                        {/* MENU desktop */}
                        <div className='hidden md:flex items-center gap-8 font-medium'>

                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center gap-2 text-green-400 border-b-2 border-green-400 pb-1"
                                        : "flex items-center gap-2 hover:text-green-400 transition"
                                }
                            >
                                <IoHome className='text-lg' />
                                Home
                            </NavLink>

                            <NavLink
                                to='/shop'
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center gap-2 text-green-400 border-b-2 border-green-400 pb-1"
                                        : "flex items-center gap-2 hover:text-green-400 transition"
                                }
                            >
                                <GiShoppingBag className='text-lg' />
                                Shop
                            </NavLink>

                            <NavLink
                                to='/cart'
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-green-400 border-b-2 border-green-400 pb-1 flex items-center gap-2"
                                        : "flex items-center gap-2 hover:text-green-400 transition"
                                }
                            >
                                <div className='relative'>
                                    <FaShoppingCart className='text-xl' />

                                    {carts.length > 0 && (
                                        <span className='
                        absolute -top-2 -right-3 
                        w-6 h-6 rounded-full
                        bg-red-600 text-white text-xs
                        flex items-center justify-center
                        font-bold shadow-lg
                    '>
                                            {carts.length}
                                        </span>
                                    )}
                                </div>

                                Cart
                            </NavLink>

                        </div>

                    </div>


                    <div className='hidden md:flex items-center gap-4'>

                        {!user ? (

                            <>
                                <Link
                                    to='/register'
                                    className='px-5 py-1.5 border border-green-400 text-green-400
                          rounded-full hover:bg-green-400 hover:text-black transition-all'
                                >
                                    Register
                                </Link>

                                <Link
                                    to='/login'
                                    className='px-6 py-1.5 rounded-full
                          bg-green-500 text-black font-bold
                          hover:bg-green-400 hover:shadow-green-500/50 hover:shadow-lg
                          transition-all'
                                >
                                    Login
                                </Link>
                            </>

                        ) : (

                            <div className="relative">

                                {/* Avatar */}
                                <img
                                    src='https://iconape.com/wp-content/png_logo_vector/avatar-4.png'
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-green-400"
                                    onClick={() => setOpenProfile(!openProfile)}
                                />

                                {/* Dropdown */}
                                {openProfile && (
                                    <div className='
                                            absolute right-0 mt-3 w-52
                                          bg-white text-black
                                            rounded-xl shadow-xl
                                            overflow-hidden
                                        '>

                                        <div className='px-4 py-3 bg-gray-100 text-sm'>
                                            <p className='font-bold'>{user.name}</p>
                                            <p className='text-xs text-gray-500'>{user.email}</p>
                                        </div>

                                        <Link
                                            to="/user/history"
                                            onClick={() => setOpenProfile(false)}
                                            className='block px-4 py-3 hover:bg-gray-200'
                                        >
                                            🧾 ประวัติการสั่งซื้อ
                                        </Link>

                                        {user.role === "admin" && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setOpenProfile(false)}
                                                className='block px-4 py-3 hover:bg-gray-200'
                                            >
                                                ⚙️ Admin Dashboard
                                            </Link>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className='w-full text-left px-4 py-3 hover:bg-red-500 hover:text-white'
                                        >
                                            🚪 Logout
                                        </button>

                                    </div>
                                )}
                            </div>
                        )}

                    </div>


                    <button
                        onClick={() => setOpen(!open)}
                        className='md:hidden text-3xl'
                    >
                        {open ? <HiX /> : <HiMenuAlt3 />}
                    </button>

                </div>

                {/* mobile menu */}
                {open && (
                    <div className='
                    md:hidden mt-3 mb-4
                    bg-black/60 backdrop-blur-lg
                    rounded-xl p-4 space-y-4
                    text-white shadow-lg
                '>

                        <NavLink
                            onClick={() => setOpen(false)}
                            to='/'
                            className='block py-2 border-b border-white/20'
                        >
                            Home
                        </NavLink>

                        <NavLink
                            onClick={() => setOpen(false)}
                            to='/shop'
                            className='block py-2 border-b border-white/20'
                        >
                            Shop
                        </NavLink>

                        <NavLink
                            onClick={() => setOpen(false)}
                            to='/cart'
                            className='flex items-center gap-3 py-2 border-b border-white/20'
                        >
                            <FaShoppingCart />
                            Cart ({carts.length})
                        </NavLink>

                        {!user ? (
                            <>
                                <Link
                                    onClick={() => setOpen(false)}
                                    to='/register'
                                    className='block py-2 text-center
                        border border-green-400 text-green-400 rounded-lg
                        hover:bg-green-400 hover:text-black'
                                >
                                    Register
                                </Link>

                                <Link
                                    onClick={() => setOpen(false)}
                                    to='/login'
                                    className='block py-2 text-center
                        bg-green-500 text-black font-bold rounded-lg
                        hover:bg-green-400'
                                >
                                    Login
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    onClick={() => setOpen(false)}
                                    to="/user/history"
                                    className="block py-2 border-b border-white/20"
                                >
                                    🧾 History
                                </Link>

                                {user.role === "admin" && (
                                    <Link
                                        onClick={() => setOpen(false)}
                                        to="/admin"
                                        className="block py-2 border-b border-white/20"
                                    >
                                        ⚙️ Admin Dashboard
                                    </Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className='block w-full py-2 text-left text-red-400'
                                >
                                    🚪 Logout
                                </button>
                            </>
                        )}

                    </div>
                )}

            </div>

        </nav>
    )
}

export default Navbar
