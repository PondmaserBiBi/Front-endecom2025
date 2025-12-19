import React, { useState, useEffect } from 'react'
import { getOrders } from '../../api/user'
import useEcomStore from '../../store/ecom-store'

const HistoryCard = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (!token) return

        handleGetOrders()

        const interval = setInterval(() => {
            handleGetOrders()
        }, 3000) 

        return () => clearInterval(interval)
    }, [token])

    const handleGetOrders = () => {
        getOrders(token)
            .then((res) => {
                setOrders(res.data.orders)
            })
            .catch((err) => console.log(err))
    }


    const formatStatus = (status) => {
        switch (status) {
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


    const statusColor = (status) => {
        switch (status) {
            case 'PAID':
                return 'bg-green-500'
            case 'PENDING':
                return 'bg-gray-500'
            case 'CANCEL':
                return 'bg-red-500'
            default:
                return 'bg-gray-500'
        }
    }


    return (
        <div className="max-w-5xl mx-auto p-5 bg-slate-900 min-h-screen">
            <h1 className="text-2xl font-bold mb-5 text-white">ประวัติการสั่งซื้อ</h1>

            {orders?.length === 0 && (
                <p className="text-center text-gray-300">ยังไม่มีรายการสั่งซื้อ</p>
            )}

            <div className="space-y-8">
                {orders?.map(order => (
                    <div key={order.id} className="border rounded-xl shadow-sm p-5 bg-white">
                        <div className="flex justify-between items-center mb-4 border-b pb-3">
                            <div className="text-sm">
                                <p className="font-semibold">Order ID : {order.id}</p>
                                <p className="text-gray-500">
                                    วันที่ : {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className={`px-4 py-1 rounded-full text-white text-sm ${statusColor(order.orderStatus)}`}>
                                {formatStatus(order.orderStatus)}
                            </div>

                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="p-2 border">สินค้า</th>
                                        <th className="p-2 border text-center">ราคา</th>
                                        <th className="p-2 border text-center">จำนวน</th>
                                        <th className="p-2 border text-center">รวม</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.products?.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="p-2 border">{item.product?.title}</td>
                                            <td className="p-2 border text-center">{item.product?.price?.toLocaleString()} ฿</td>
                                            <td className="p-2 border text-center">{item.count}</td>
                                            <td className="p-2 border text-center">{(item.product?.price * item.count).toLocaleString()} ฿</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mt-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">ราคาสุทธิ</p>
                                <p className="text-xl font-bold text-green-600">{order.cartTotal?.toLocaleString()} ฿</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HistoryCard
