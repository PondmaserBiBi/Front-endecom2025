import React, { useEffect } from 'react'
import Productcard from '../components/card/Productcard'
import useEcomStore from '../store/ecom-store'
import SearchCard from '../components/card/SearchCard'
import CartCard from '../components/card/CartCard'

const Shop = () => {
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className="
            w-full 
            bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_60%)]
            text-white
            p-6
        ">

            {/* Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_0%,rgba(34,197,94,0.15),transparent)]"></div>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">

                {/* Searchbar */}
                <div className="
                    bg-white/10
                    backdrop-blur-xl
                    border border-white/20
                    rounded-2xl
                    shadow-lg
                    p-4
                    h-full
                ">
                    <SearchCard />
                </div>

                {/* Product Grid */}
                <div className="lg:col-span-2">
                    <h3 className="
                        text-3xl
                        font-bold
                        mb-6
                        text-green-400
                        drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]
                    ">
                        ⚽ สินค้าทั้งหมด
                    </h3>

                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <Productcard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center mt-10">
                            ไม่มีสินค้า
                        </p>
                    )}
                </div>

                {/* Cart */}
                <div className="
                    bg-white/10
                    backdrop-blur-xl
                    border border-white/20
                    rounded-2xl
                    shadow-lg
                    p-4
                    h-full
                ">
                    <CartCard />
                </div>

            </div>
        </div>
    )
}

export default Shop
