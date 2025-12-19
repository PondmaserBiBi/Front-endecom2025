import React, { useState, useEffect } from 'react'
import { listuserCart, saveAddress } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

const SumCard = () => {

    const token = useEcomStore((state) => state.token)

    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    const [address, setAddress] = useState('')
    const [savedaddress, setSavedaddress] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (token) handleGetUserCart(token)
    }, [token])

    const handleGetUserCart = (token) => {
        listuserCart(token)
            .then((res) => {
                setProducts(res.data.products)
                setCartTotal(res.data.cartTotal)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSaveAddress = () => {
        if (!address) {
            return toast.warning('กรุณากรอกที่อยู่')
        }

        saveAddress(token, address)
            .then(() => {
                toast.success('บันทึกที่อยู่สำเร็จ')
                setSavedaddress(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handletopayment = () => {
        if (!savedaddress) {
            return toast.warning('กรุณากรอกที่อยู่ก่อนชำระเงิน')
        }

        navigate('/user/payment')
    }

    return (
        <div className="mx-auto w-full bg-slate-900 p-8 rounded-2xl border border-slate-700 text-slate-100 shadow-xl">

            <h2 className="text-2xl font-bold mb-6 text-center">
                🧾 สรุปรายการสั่งซื้อ
            </h2>

            <div className="flex flex-wrap gap-8">


                <div className="flex-1 space-y-4 bg-slate-800 p-6 rounded-xl border border-slate-700">

                    <div className="flex items-center gap-2 mb-2">
                        <FaMapMarkerAlt className="text-emerald-400" />
                        <h3 className="font-bold text-lg">ที่อยู่การจัดส่ง</h3>
                    </div>

                    <textarea
                        required
                        placeholder="กรอกที่อยู่สำหรับจัดส่งสินค้า..."
                        className="
                            w-full bg-slate-900 border border-slate-700 
                            rounded-lg p-3 text-slate-100 
                            focus:outline-none focus:border-emerald-500
                        "
                        rows={5}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <button
                        onClick={handleSaveAddress}
                        className="
                            w-full bg-emerald-600 hover:bg-emerald-500
                            text-white font-semibold
                            px-5 py-2 rounded-lg transition
                        "
                    >
                        บันทึกที่อยู่
                    </button>

                </div>

                <div className="flex-1 space-y-4 bg-slate-800 p-6 rounded-xl border border-slate-700">

                    <div className="flex items-center gap-2 mb-3">
                        <FaMoneyBillWave className="text-emerald-400" />
                        <h3 className="font-bold text-lg">สรุปรายการ</h3>
                    </div>

                    {products.length > 0 ? (
                        products.map((item, index) => (

                            <div
                                key={index}
                                className="border-b border-slate-700 pb-3 mb-3"
                            >

                                <div className="flex justify-between text-slate-300 text-sm mb-1">
                                    <p className="font-medium">{item.product.title}</p>
                                    <p>{item.count} ชิ้น</p>
                                </div>

                                <div className="flex justify-between text-emerald-400 font-semibold">
                                    <p>
                                        {Number(item.product.price).toLocaleString()} x {item.count}
                                    </p>
                                    <p>
                                        {(item.product.price * item.count).toLocaleString()} บาท
                                    </p>
                                </div>

                            </div>

                        ))
                    ) : (
                        <p className="text-center text-slate-400 py-10">
                            ไม่มีสินค้าในตะกร้า
                        </p>
                    )}

                    <div className="flex justify-between text-slate-300 text-sm">

                        <p>ค่าจัดส่ง</p>
                        <p>00.00 บาท</p>
                    </div>

                    <div className="flex justify-between text-slate-300 text-sm">
                        <p>ส่วนลด</p>
                        <p>0.00 บาท</p>
                    </div>

                    <hr className="border-slate-600" />

                    <div className="flex justify-between font-bold text-xl">
                        <p>ยอดรวมสุทธิ</p>
                        <p className="text-emerald-400">
                            {Number(cartTotal).toLocaleString()} บาท
                        </p>
                    </div>

                    <button
                        onClick={handletopayment}
                        disabled={!savedaddress}
                        className={`
                            w-full mt-4 py-3 rounded-lg font-bold transition
                            ${savedaddress
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                            }
                        `}
                    >
                        ดำเนินการชำระเงิน
                    </button>

                </div>
            </div>

        </div>
    )
}

export default SumCard
