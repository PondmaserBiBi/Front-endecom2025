import React from 'react'
import { FaShoppingCart } from "react-icons/fa"
import useEcomStore from '../../store/ecom-store'

const Productcard = ({ product }) => {

    const actionAddtocart = useEcomStore((state) => state.actionAddtocart)

    return (
        <div className="
            bg-black/40
            border border-white/10
            rounded-2xl
            overflow-hidden
            shadow-lg
            hover:shadow-xl
            transition-all
            duration-300
            text-white
            flex flex-col
        ">

            {/* Image */}
            <div className="
                w-full h-52
                bg-black
                flex items-center justify-center
                overflow-hidden
            ">
                {product.images && product.images.length > 0 ? (
                    <img
                        src={product.images[0].url}
                        alt={product.title}
                        className="
                            w-full h-full object-cover
                            transition duration-300
                            hover:scale-105
                        "
                    />
                ) : (
                    <span className="text-gray-400">No Image</span>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">

                <div>
                    <h3 className="
                        text-lg font-bold
                        mb-2 line-clamp-1
                        text-white
                    ">
                        {product.title}
                    </h3>

                    <p className="text-sm text-gray-400 line-clamp-2">
                        {product.description}
                    </p>
                </div>

                {/* Bottom */}
                <div className="mt-4 flex items-center justify-between">

                    <span className="
                        text-lg font-semibold
                        text-green-400
                    ">
                        ฿{product.price}
                    </span>

                    <button
                        onClick={() => actionAddtocart(product)}
                        className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            p-3 rounded-xl
                            transition
                        "
                    >
                        <FaShoppingCart />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Productcard
