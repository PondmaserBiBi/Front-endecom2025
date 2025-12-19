import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import { getOrdersAdmin, changeOrdersStatus } from '../../api/Admin'
import { toast } from 'react-toastify'

const TableOrders = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    const handleGetOrder = (token) => {
        getOrdersAdmin(token)
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (!token) return
        handleGetOrder(token)

        const interval = setInterval(() => handleGetOrder(token), 5000)
        return () => clearInterval(interval)
    }, [token])

    const handleChangeOrderStatus = (orderId, orderStatus) => {
        changeOrdersStatus(token, orderId, orderStatus)
            .then(() => {
                toast.success('Update Status Orders Success')
                handleGetOrder(token)
            })
            .catch(err => console.log(err))
    }

    const statusColor = (status) => {
        switch (status) {
            case 'succeeded':
            case 'PAID':
                return 'bg-green-500 text-white'
            case 'PENDING':
                return 'bg-yellow-500 text-white'
            case 'CANCEL':
                return 'bg-red-500 text-white'
            default:
                return 'bg-gray-400 text-white'
        }
    }

    const statusText = (status) => {
        switch (status) {
            case 'succeeded':
            case 'PAID':
                return 'ชำระเงินแล้ว'
            case 'PENDING':
                return 'รอดำเนินการ'
            case 'CANCEL':
                return 'ยกเลิก'
            default:
                return status
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] p-4 md:p-8 text-white">
            <h1 className="text-2xl font-bold mb-6">📦 รายการคำสั่งซื้อทั้งหมด</h1>

            {/* ===== MOBILE VIEW (CARD) ===== */}
            <div className="space-y-5 md:hidden">
                {orders?.map((order, index) => (
                    <div
                        key={order.id}
                        className="bg-[#1e293b] p-5 rounded-2xl space-y-3 shadow-lg"
                    >
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-blue-400">
                                Order #{index + 1}
                            </p>
                            <span className={`px-3 py-1 rounded-full text-xs ${statusColor(order.orderStatus)}`}>
                                {statusText(order.orderStatus)}
                            </span>
                        </div>

                        <div className="text-sm text-gray-300">
                            <p><span className="font-semibold">Email:</span> {order.orderedBy?.email}</p>
                            <p><span className="font-semibold">ที่อยู่:</span> {order.orderedBy?.address}</p>
                        </div>

                        <div className="space-y-2 text-sm">
                            {order.products.map((product) => (
                                <div key={product.id} className="flex justify-between">
                                    <span>{product.product.title}</span>
                                    <span>{product.count} x {product.product.price?.toLocaleString()} ฿</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-gray-600">
                            <span className="font-bold">รวม:</span>
                            <span className="font-bold text-green-400">
                                {order.cartTotal?.toLocaleString()} ฿
                            </span>
                        </div>

                        <select
                            value={order.orderStatus}
                            onChange={(e) => handleChangeOrderStatus(order.id, e.target.value)}
                            className="w-full mt-3 bg-[#0f172a] border border-gray-600 rounded-lg p-2 text-sm"
                        >
                            <option value="PENDING">รอดำเนินการ</option>
                            <option value="PAID">ชำระเงินแล้ว</option>
                            <option value="CANCEL">ยกเลิก</option>
                        </select>
                    </div>
                ))}
            </div>

            {/* ===== DESKTOP VIEW (TABLE) ===== */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg">
                <table className="min-w-full bg-[#1e293b] overflow-hidden rounded-xl">
                    <thead className="bg-[#020617] text-gray-300">
                        <tr>
                            <th className="py-4 px-4 text-left">#</th>
                            <th className="py-4 px-4 text-left">ผู้ใช้งาน</th>
                            <th className="py-4 px-4 text-left">สินค้า</th>
                            <th className="py-4 px-4 text-center">รวม</th>
                            <th className="py-4 px-4 text-center">สถานะ</th>
                            <th className="py-4 px-4 text-center">จัดการ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders?.map((order, index) => (
                            <tr
                                key={order.id}
                                className="border-b border-gray-700 hover:bg-[#334155] transition"
                            >
                                <td className="py-4 px-4">{index + 1}</td>

                                <td className="py-4 px-4">
                                    <p className="font-semibold">{order.orderedBy?.email}</p>
                                    <p className="text-sm text-gray-400">{order.orderedBy?.address}</p>
                                </td>

                                <td className="py-4 px-4 text-sm">
                                    {order.products.map((product) => (
                                        <div key={product.id} className="mb-1">
                                            <p>{product.product.title}</p>
                                            <span className="text-gray-400">
                                                {product.count} x {product.product.price?.toLocaleString()} ฿
                                            </span>
                                        </div>
                                    ))}
                                </td>

                                <td className="py-4 px-4 text-center font-bold text-green-400">
                                    {order.cartTotal?.toLocaleString()} ฿
                                </td>

                                <td className="py-4 px-4 text-center">
                                    <span className={`px-4 py-1 rounded-full text-sm ${statusColor(order.orderStatus)}`}>
                                        {statusText(order.orderStatus)}
                                    </span>
                                </td>

                                <td className="py-4 px-4 text-center">
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => handleChangeOrderStatus(order.id, e.target.value)}
                                        className="bg-[#020617] border border-gray-600 rounded-lg px-3 py-2"
                                    >
                                        <option value="PENDING">รอดำเนินการ</option>
                                        <option value="PAID">ชำระเงินแล้ว</option>
                                        <option value="CANCEL">ยกเลิก</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableOrders
