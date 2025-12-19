import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { RiDashboard3Line } from "react-icons/ri"
import { MdOutlineManageAccounts, MdProductionQuantityLimits, MdLogout } from "react-icons/md"
import { TbCategory } from "react-icons/tb"
import { BsBoxSeam } from "react-icons/bs";
import useEcomStore from '../../store/ecom-store'

const SidebarAdmin = ({ isOpen, setIsOpen }) => {

    const navigate = useNavigate()
    const logout = useEcomStore((state) => state.logout)

    const menuClass = ({ isActive }) =>
        isActive
            ? 'bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center gap-3 shadow-md'
            : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded-lg flex items-center gap-3 duration-200'


    const handleLogout = () => {
        logout()
        setIsOpen(false)
        navigate('/login')
    }

    return (
        <>

            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:relative z-30 bg-gray-900 text-white w-64
                flex flex-col h-screen
                transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 transition-transform duration-300 shadow-lg
            `}>

                {/* Logo */}
                <div className='h-20 bg-gray-950 flex items-center justify-center text-xl font-bold tracking-wider'>
                    🚀 Admin Panel
                </div>

                {/* Menu */}
                <nav className='flex-1 p-4 space-y-2 text-sm'>

                    <NavLink
                        to={'/admin'}
                        end
                        className={menuClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <RiDashboard3Line className="text-lg" />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to={'manage'}
                        className={menuClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <MdOutlineManageAccounts className="text-lg" />
                        Manage
                    </NavLink>

                    <NavLink
                        to={'category'}
                        className={menuClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <TbCategory className="text-lg" />
                        Category
                    </NavLink>

                    <NavLink
                        to={'product'}
                        className={menuClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <MdProductionQuantityLimits className="text-lg" />
                        Product
                    </NavLink>

                    <NavLink
                        to={'orders'}
                        className={menuClass}
                        onClick={() => setIsOpen(false)}
                    >
                        <BsBoxSeam className="text-lg" />
                        Orders
                    </NavLink>

                </nav>

                {/* Logout */}
                <div className='p-4 border-t border-gray-700'>
                    <button
                        onClick={handleLogout}
                        className='
                            w-full text-left
                            text-gray-300 px-4 py-2
                            hover:bg-red-600 hover:text-white
                            rounded-lg flex items-center gap-3 duration-200
                        '
                    >
                        <MdLogout className="text-lg" />
                        Logout
                    </button>
                </div>

            </div>
        </>
    )
}

export default SidebarAdmin
