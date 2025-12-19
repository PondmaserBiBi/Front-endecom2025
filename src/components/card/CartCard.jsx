import React from 'react'
import useEcomStore from '../../store/ecom-store'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from "react-icons/fa";

const CartCard = () => {

    const carts = useEcomStore((state) => state.carts)
    const actionupdateQuantity = useEcomStore((state) => state.actionupdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const TotalPrice = useEcomStore((state) => state.TotalPrice)

    return (
        <div className="w-full bg-slate-900 p-5 rounded-2xl border border-slate-700 space-y-6">

         
            <h1 className='font-bold text-2xl flex items-center gap-2 text-slate-100'>
                🛒 ตะกร้าสินค้า
            </h1>

            {carts.length === 0 && (
                <p className="text-center text-slate-500 py-10">
                    ยังไม่มีสินค้าในตะกร้า
                </p>
            )}

           
            <div className="space-y-4">

                {carts.map((item, index) => (

                    <div
                        key={index}
                        className='flex gap-4 p-3 rounded-xl border border-slate-700 bg-slate-800'
                    >

             
                        <div className='w-20 h-20 flex-shrink-0'>
                            {
                                item.images && item.images.length > 0
                                    ? (
                                        <img
                                            className='w-full h-full object-cover rounded-xl border border-slate-700'
                                            src={item.images[0].url}
                                            alt={item.title}
                                        />
                                    ) : (
                                        <div
                                            className='w-full h-full bg-slate-700 rounded-xl 
                                            flex items-center justify-center text-sm text-slate-300'
                                        >
                                            No Image
                                        </div>
                                    )
                            }
                        </div>

                  
                        <div className='flex-1 flex flex-col justify-between'>

                            <div className='flex justify-between items-start gap-3'>

                                <div>
                                    <p className='font-semibold text-md text-slate-100'>
                                        {item.title}
                                    </p>

                                    <p className='text-xs text-slate-400 line-clamp-2'>
                                        {item.description}
                                    </p>
                                </div>

                                <button
                                    onClick={() => actionRemoveProduct(item.id)}
                                    className='text-slate-400 hover:text-red-500 transition'
                                >
                                    <FaTrashAlt />
                                </button>

                            </div>

                            <div className='flex justify-between items-center mt-3'>

                          
                                <div className='flex items-center bg-slate-900 rounded-full border border-slate-700 overflow-hidden'>

                                    <button
                                        onClick={() => actionupdateQuantity(item.id, item.count - 1)}
                                        className='w-8 h-8 flex justify-center items-center text-slate-300 hover:bg-slate-800'
                                    >
                                        −
                                    </button>

                                    <span className='w-8 text-center font-semibold text-sm text-white'>
                                        {item.count}
                                    </span>

                                    <button
                                        onClick={() => actionupdateQuantity(item.id, item.count + 1)}
                                        className='w-8 h-8 flex justify-center items-center text-slate-300 hover:bg-slate-800'
                                    >
                                        +
                                    </button>

                                </div>

                              
                                <div className='font-bold text-emerald-400 px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-sm'>
                                    ฿{item.price * item.count}
                                </div>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

          
            {carts.length > 0 && (
                <>
                    <div className='border-t border-slate-700 pt-4 flex justify-between items-center text-lg font-bold'>
                        <span className='text-slate-300'>
                            รวมทั้งหมด
                        </span>

                        <span className='text-emerald-400 text-xl'>
                            ฿{TotalPrice()}
                        </span>
                    </div>

                    <Link to='/cart'>
                        <button
                            className='
                                w-full py-3 rounded-xl
                                bg-emerald-600
                                hover:bg-emerald-500
                                text-white font-bold text-lg
                                transition
                            '
                        >
                            ดำเนินการชำระเงิน
                        </button>
                    </Link>
                </>
            )}

        </div>
    )
}

export default CartCard
