import React, { useState, useEffect } from 'react'
import { listDashboard } from '../../api/Admin'
import useEcomStore from '../../store/ecom-store'

const TableStat = () => {

    const token = useEcomStore((state) => state.token)

    const [stats, setStats] = useState({});

    useEffect(() => {

        handlegetStats(token)

    }, [token])


    const handlegetStats = async () => {

        try {

            const response = await listDashboard(token)

            setStats(response.data)

        } catch (error) {

            console.log(error)

        }

    }


    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <h1 className='text-3xl font-bold text-gray-900 mb-6'>
                Dashboard Stats
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>

                {/* Total Users */}
                <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition'>
                    <h3 className='text-gray-500 text-lg mb-2'>
                        จำนวนผู้ใช้ทั้งหมด
                    </h3>
                    <p className='text-4xl font-bold text-blue-600'>
                        {stats.totalUsers || 0}
                    </p>
                </div>

                {/* Total Orders */}
                <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition'>
                    <h3 className='text-gray-500 text-lg mb-2'>
                        จำนวนออเดอร์ทั้งหมด
                    </h3>
                    <p className='text-4xl font-bold text-orange-500'>
                        {stats.totalOrders || 0}
                    </p>
                </div>

                {/* Total Product */}
                <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition'>
                    <h3 className='text-gray-500 text-lg mb-2'>
                       Collection ของสินค้า
                    </h3>
                    <p className='text-4xl font-bold text-green-600'>
                        {stats.totalProduct || 0}
                    </p>
                </div>

                {/* Total Sales */}
                <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition'>
                    <h3 className='text-gray-500 text-lg mb-2'>
                        ยอดขายรวมทั้งหมด
                    </h3>
                    <p className='text-4xl font-bold text-purple-600'>
                        {stats.totalSales || 0} ฿
                    </p>
                </div>

            </div>
        </div>
    )

}

export default TableStat