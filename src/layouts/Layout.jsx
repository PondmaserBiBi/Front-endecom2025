import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FooterAdmin from '../components/admin/FooterAdmin'

const Layout = () => {
    return (
        <div>

            <Navbar />


            <main className='mx-auto h-full'>

                <Outlet />

            </main>

            <FooterAdmin />

        </div>
    )
}

export default Layout