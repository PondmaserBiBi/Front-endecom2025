import React, { useEffect, useState } from 'react'
import { listproductBy } from '../../api/Product'

const Bestseller = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        loaddata()
    }, [])

    const loaddata = async () => {
        try {
            const res = await listproductBy('sold', 'desc', 6)
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className='bg-gradient-to-b from-[#051937] via-[#073a63] to-[#051937]'>


            <div className="max-w-6xl mx-auto px-4 py-10">

                <h2 className="text-2xl font-bold mb-6 text-center text-white">
                    🔥 สินค้าขายดี
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
                        >
                            {/* รูปสินค้า */}
                            <div className="h-[250px] bg-gray-100 overflow-hidden">
                                <img
                                    src={item.images?.[0]?.url || "/img/no-image.png"}
                                    alt={item.title}
                                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                                />
                            </div>


                            <div className="p-5 space-y-2">

                                <h3 className="text-lg font-semibold line-clamp-1">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-gray-500 line-clamp-2">
                                    {item.description}
                                </p>

                                <div className="flex justify-between items-center pt-4">

                                    <span className="text-green-600 font-bold text-lg">
                                        ฿{Number(item.price).toLocaleString()}
                                    </span>

                                    <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                                        ขายได้ {item.sold} ชิ้น
                                    </span>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Bestseller
