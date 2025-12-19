import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { FaSearch, FaRedoAlt } from "react-icons/fa"

const SearchCard = () => {

    const getProduct = useEcomStore((state) => state.getProduct)
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [text, setText] = useState('')
    const [categorySelected, setCategorySelected] = useState([])
    const [price, setPrice] = useState([0, 30000])
    const [ok, setOk] = useState(false)

    useEffect(() => {
        getCategory()
    }, [])

    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                actionSearchFilters({ query: text })
            } else {
                getProduct()
            }
        }, 400)

        return () => clearTimeout(delay)
    }, [text])

    const handleCheck = (e) => {
        const value = String(e.target.value)
        const inState = [...categorySelected]
        const find = inState.indexOf(value)

        if (find === -1) {
            inState.push(value)
        } else {
            inState.splice(find, 1)
        }

        setCategorySelected(inState)

        if (inState.length > 0) {
            actionSearchFilters({ category: inState })
        } else {
            getProduct()
        }
    }

    useEffect(() => {
        actionSearchFilters({ price })
    }, [ok])

    const handlePrice = (value) => {
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 400)
    }

    const handleReset = () => {
        setText('')
        setCategorySelected([])
        setPrice([0, 30000])
        getProduct()
    }

    return (
        <div className="
            bg-black/40
            border border-white/10
            rounded-2xl
            p-6
            space-y-7
            text-white
        ">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-green-400">
                    ค้นหาสินค้า
                </h1>

                <button
                    onClick={handleReset}
                    className="
                        flex items-center gap-2 
                        text-sm font-medium 
                        px-3 py-1.5 
                        rounded-lg
                        bg-green-700
                        hover:bg-green-800
                        transition
                    "
                >
                    <FaRedoAlt />
                    Reset
                </button>
            </div>

            {/* SEARCH */}
            <div className="space-y-2">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="ค้นหาสินค้า..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="
                            w-full pl-10 pr-3 py-2.5
                            bg-black/60
                            border border-white/10
                            rounded-xl
                            text-white
                            placeholder-gray-500
                            outline-none
                            focus:border-green-600
                        "
                    />
                </div>
            </div>

            {/* CATEGORY */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-300">
                    หมวดหมู่สินค้า
                </h3>

                <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">

                    {categories.map((category) => (
                        <label
                            key={category.id}
                            className={`
                                flex items-center gap-2 px-3 py-2 
                                rounded-xl border cursor-pointer 
                                transition-all text-sm
                                ${categorySelected.includes(String(category.id))
                                    ? 'bg-green-700/60 border-green-600'
                                    : 'bg-black/50 border-white/10 hover:border-green-600/50'
                                }
                            `}
                        >
                            <input
                                type="checkbox"
                                value={category.id}
                                onChange={handleCheck}
                                checked={categorySelected.includes(String(category.id))}
                                className="accent-green-600 w-4 h-4"
                            />
                            <span>{category.name}</span>
                        </label>
                    ))}

                </div>
            </div>

            {/* PRICE */}
            <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-300">
                    ช่วงราคา
                </h3>

                <div className="flex justify-between text-sm font-semibold text-green-400">
                    <span>฿ {price[0].toLocaleString()}</span>
                    <span>฿ {price[1].toLocaleString()}</span>
                </div>

                <Slider
                    onChange={handlePrice}
                    range
                    min={0}
                    max={30000}
                    value={price}
                    trackStyle={[{ backgroundColor: "#16a34a" }]}
                    handleStyle={[
                        { borderColor: "#16a34a", backgroundColor: "#000" },
                        { borderColor: "#16a34a", backgroundColor: "#000" }
                    ]}
                    railStyle={{ backgroundColor: "#1f2933" }}
                />
            </div>

            {/* STATUS */}
            {(categorySelected.length > 0 || text) && (
                <div className="
                    bg-black/60
                    border border-green-700/50
                    text-green-400
                    p-3 rounded-xl text-sm font-medium
                ">
                    {categorySelected.length > 0 && (
                        <p>เลือกแล้ว {categorySelected.length} หมวดหมู่</p>
                    )}

                    {text && (
                        <p>ค้นหาด้วยคำว่า “{text}”</p>
                    )}
                </div>
            )}

        </div>
    )
}

export default SearchCard
