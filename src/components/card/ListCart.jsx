import React from 'react'
import { FaList, FaShoppingBag } from "react-icons/fa"
import useEcomStore from '../../store/ecom-store'
import { Link, useNavigate } from 'react-router-dom'
import { userCart } from '../../api/user'
import { toast } from 'react-toastify'

const ListCart = () => {

    const navigate = useNavigate()
    const cart = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)
    const TotalPrice = useEcomStore((state) => state.TotalPrice)

    const handleSavecart = async () => {
        await userCart(token, { cart })
            .then(() => {
                toast.success('บันทึกใส่ตะกร้าเรียบร้อย')
                navigate('/checkout')
            })
            .catch((error) => {
                console.log(error)
                toast.warning(error.response.data.message)
            })
    }

    return (
        <div className="min-h-screen bg-[#0f172a] px-3 py-6 sm:px-6 md:px-10 text-white">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-6">
                <div className="flex justify-between items-center bg-[#1e293b] p-4 sm:p-5 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3">
                        <FaShoppingBag className="text-blue-400 text-2xl sm:text-3xl" />
                        <h1 className="text-lg sm:text-2xl font-bold">
                            ตะกร้าสินค้า
                        </h1>
                    </div>

                    <span className="text-blue-400 font-semibold text-sm sm:text-base">
                        {cart.length} รายการ
                    </span>
                </div>
            </div>


            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ========== LEFT (ITEMS) ========== */}
                <div className="lg:col-span-2 bg-[#1e293b] rounded-2xl p-4 sm:p-6 shadow-xl">

                    <h2 className="mb-4 sm:mb-6 font-semibold text-base sm:text-lg">
                        รายการสินค้า
                    </h2>

                    {cart.length === 0 && (
                        <div className="text-center py-20 text-gray-400">
                            ไม่มีสินค้าในตะกร้า
                        </div>
                    )}

                    <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">

                        {cart.map((item, index) => (
                            <div
                                key={index}
                                className="
                                flex flex-col sm:flex-row gap-4
                                bg-[#0f172a] p-4 rounded-2xl
                                border border-gray-700
                                hover:bg-[#1e293b] transition
                                "
                            >

                                {/* IMAGE */}
                                <div className="
                                    w-full sm:w-28 sm:h-28 h-44
                                    rounded-xl overflow-hidden bg-black/40
                                ">
                                    {
                                        item.images?.length > 0
                                            ? (
                                                <img
                                                    src={item.images[0].url}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            )
                                            : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                                    No Image
                                                </div>
                                            )
                                    }
                                </div>

                                {/* INFO */}
                                <div className="flex-1 flex flex-col justify-between gap-3">

                                    <div>
                                        <p className="font-semibold text-base sm:text-lg">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                                            {item.description}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-2">
                                            {item.price.toLocaleString()} x {item.count}
                                        </p>
                                    </div>

                                    {/* PRICE */}
                                    <div className="
                                        text-right text-blue-400 
                                        font-bold text-base sm:text-lg
                                    ">
                                        ฿{(item.price * item.count).toLocaleString()}
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                </div>


                {/* ========== RIGHT (SUMMARY) ========== */}
                <div className="
                    bg-[#1e293b] rounded-2xl p-5 sm:p-6 shadow-xl space-y-6
                    h-fit lg:sticky lg:top-8
                ">

                    <div className="flex items-center gap-3">
                        <FaList className="text-blue-400" />
                        <h2 className="text-base sm:text-lg font-bold">
                            สรุปรายการ
                        </h2>
                    </div>

                    <div className="space-y-3 text-sm sm:text-base">

                        <div className="flex justify-between">
                            <span className="text-gray-400">จำนวนสินค้า</span>
                            <span className="font-semibold">{cart.length} รายการ</span>
                        </div>

                        <div className="border-t border-gray-700 pt-4 flex justify-between text-lg sm:text-xl font-bold">
                            <span>รวมสุทธิ</span>
                            <span className="text-green-400">
                                ฿{TotalPrice().toLocaleString()}
                            </span>
                        </div>

                    </div>

                    {user ? (
                        <button
                            disabled={cart.length < 1}
                            onClick={handleSavecart}
                            className={`
                                w-full py-3 sm:py-4 rounded-xl 
                                font-bold text-base sm:text-lg
                                transition duration-300
                                ${cart.length < 1
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]'}
                            `}
                        >
                            ไปชำระเงิน
                        </button>
                    ) : (
                        <Link to="/login">
                            <button
                                className="
                                w-full py-3 sm:py-4 rounded-xl
                                bg-blue-600 hover:bg-blue-700
                                font-bold transition
                            "
                            >
                                กรุณาเข้าสู่ระบบ
                            </button>
                        </Link>
                    )}

                    <Link to="/shop">
                        <button
                            className="
                            w-full py-3 sm:py-4 rounded-xl
                            border border-blue-500 text-blue-400
                            hover:bg-blue-500/10 transition
                        "
                        >
                            กลับไปเลือกสินค้า
                        </button>
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default ListCart
