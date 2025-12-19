import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, readProduct, listProduct, updateProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'


const initialState = {
    title: "Asus",
    description: "desc",
    price: 10090,
    quantity: 15,
    categoryId: '',
    images: []
}

const FormEditProduct = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [form, setForm] = useState(initialState)

    useEffect(() => {

        getCategory(token)
        fetchProduct(token, id, form)


    }, [])

    const fetchProduct = async (token, id, form) => {

        try {

            const response = await readProduct(token, id, form)

            setForm(response.data)

        } catch (error) {

            console.log(error)

        }

    }

    const handleonChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value
        })


    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const response = await updateProduct(token, id, form)

            toast.success(`เพิ่ม ${response.data.title} สำเร็จ`)
            navigate('/admin/product')


        } catch (error) {

            console.log(error)
            toast.error("เกิดข้อผิดพลาด")
        }

    }



    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">

            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    แก้ไขข้อมูลสินค้า
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Title */}
                    <div className="flex flex-col text-left">
                        <label className="font-semibold mb-1">ชื่อสินค้า</label>
                        <input
                            type="text"
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.title}
                            onChange={handleonChange}
                            name="title"
                            placeholder="กรอกชื่อสินค้า"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col text-left">
                        <label className="font-semibold mb-1">รายละเอียด</label>
                        <textarea
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            value={form.description}
                            onChange={handleonChange}
                            name="description"
                            rows="3"
                            placeholder="กรอกรายละเอียดสินค้า"
                        />
                    </div>

                    {/* Price & Quantity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="flex flex-col text-left">
                            <label className="font-semibold mb-1">ราคา</label>
                            <input
                                type="number"
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.price}
                                onChange={handleonChange}
                                name="price"
                                placeholder="ราคา"
                            />
                        </div>

                        <div className="flex flex-col text-left">
                            <label className="font-semibold mb-1">จำนวนสินค้า</label>
                            <input
                                type="number"
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.quantity}
                                onChange={handleonChange}
                                name="quantity"
                                placeholder="จำนวน"
                            />
                        </div>

                    </div>

                    {/* Category */}
                    <div className="flex flex-col text-left">
                        <label className="font-semibold mb-1">หมวดหมู่</label>
                        <select
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="categoryId"
                            onChange={handleonChange}
                            value={form.categoryId}
                        >
                            <option value="" disabled>เลือกหมวดหมู่</option>
                            {categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Upload */}
                    <div className="flex flex-col text-left">
                        <label className="font-semibold mb-2 text-gray-700">
                            รูปสินค้า
                        </label>

                        <div className="border-2 border-dashed border-blue-400 rounded-xl p-5 hover:border-blue-600 transition">

                            <Uploadfile form={form} setForm={setForm} />


                            {form.images.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">

                                    {form.images.map((img, index) => (
                                        <div
                                            key={index}
                                            className="relative group rounded-xl overflow-hidden shadow-md"
                                        >
                                            <img
                                                src={img.url}
                                                alt="product"
                                                className="h-32 w-full object-cover"
                                            />


                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                                <span className="text-white text-sm">
                                                    รูปที่ {index + 1}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            )}

                            {/* ถ้ายังไม่มีรูป */}
                            {form.images.length === 0 && (
                                <div className="text-center text-gray-400 mt-4">
                                    ยังไม่มีรูปภาพสินค้า
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-6">

                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            บันทึกการแก้ไข
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/admin/product')}
                            className="flex-1 bg-gray-400 text-white py-3 rounded-xl font-semibold hover:bg-gray-500 transition duration-300"
                        >
                            ยกเลิก
                        </button>

                    </div>

                </form>
            </div>

        </div>
    )

}

export default FormEditProduct