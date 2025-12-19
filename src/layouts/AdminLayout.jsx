import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from '../components/admin/SidebarAdmin'
import HeaderAdmin from '../components/admin/HeaderAdmin'
import FooterAdmin from '../components/admin/FooterAdmin'

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <SidebarAdmin isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <HeaderAdmin setIsOpen={setIsOpen} />

                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <Outlet />
                </main>

                <FooterAdmin />
            </div>
        </div>
    )
}

export default AdminLayout
