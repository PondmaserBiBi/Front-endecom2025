import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, deleteProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link } from 'react-router-dom'
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const initialState = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []
}

const FormProduct = () => {

    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)




    const [form, setForm] = useState(initialState)

    useEffect(() => {

        getCategory()
        getProduct(100)

    }, [])

    const handleonChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value
        })


    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const response = await createProduct(token, form)

            toast.success(`เพิ่ม ${response.data.title} สำเร็จ`)

            await getProduct()

            setForm(initialState)

        } catch (error) {

            console.log(error)
            toast.error("เกิดข้อผิดพลาด")
        }

    }

    const handleDelete = async (id) => {

        if (window.confirm('Confirm Delete?')) {
            try {

                const response = await deleteProduct(token, id)


                useEcomStore.setState((state) => ({
                    products: state.products.filter((item) => item.id !== id)
                }))

                toast.success(response.data)
            } catch (error) {
                console.log(error)
                toast.error("เกิดข้อผิดพลาด")
            }
        }
    }




    return (

        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">

            <div className="bg-white p-6 rounded-2xl shadow-lg">

                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    เพิ่มสินค้าใหม่
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Title */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-600">ชื่อสินค้า</label>
                        <input
                            type="text"
                            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            value={form.title}
                            onChange={handleonChange}
                            placeholder="Title"
                            name="title"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-600">ราคา</label>
                        <input
                            type="number"
                            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            value={form.price}
                            onChange={handleonChange}
                            placeholder="Price"
                            name="price"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="mb-1 font-semibold text-gray-600">รายละเอียดสินค้า</label>
                        <textarea
                            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            value={form.description}
                            onChange={handleonChange}
                            placeholder="Description"
                            name="description"
                            rows="3"
                        />
                    </div>

                    {/* Quantity */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-600">จำนวนสินค้า</label>
                        <input
                            type="number"
                            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            value={form.quantity}
                            onChange={handleonChange}
                            placeholder="Quantity"
                            name="quantity"
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-600">หมวดหมู่</label>
                        <select
                            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            name="categoryId"
                            onChange={handleonChange}
                            required
                            value={form.categoryId}
                        >
                            <option value="" disabled>Please Select</option>

                            {categories.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Upload */}
                    <div className="md:col-span-2">
                        <label className="font-semibold text-gray-600 mb-2 block">
                            รูปสินค้า
                        </label>

                        <div className="border-2 border-dashed border-blue-400 rounded-xl p-5 hover:border-blue-600 transition">
                            <Uploadfile form={form} setForm={setForm} />

                            {/* Preview */}
                            {form.images.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    {form.images.map((img, index) => (
                                        <div key={index} className="overflow-hidden rounded-lg shadow-md">
                                            <img
                                                src={img.url}
                                                alt="product"
                                                className="w-full h-32 object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Button */}
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
                        >
                            เพิ่มสินค้า
                        </button>
                    </div>

                </form>
            </div>

            {/* TABLE */}
            <div className="bg-white mt-10 p-6 rounded-2xl shadow-lg overflow-x-auto">

                <h2 className="text-xl font-bold mb-4 text-gray-800">
                    รายการสินค้า
                </h2>

                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                            <th className="p-2">No.</th>
                            <th className="p-2">รูป</th>
                            <th className="p-2">ชื่อ</th>
                            <th className="p-2">รายละเอียด</th>
                            <th className="p-2">ราคา</th>
                            <th className="p-2">คงเหลือ</th>
                            <th className="p-2">ขายแล้ว</th>
                            <th className="p-2">จัดการ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product, index) => (
                            <tr
                                key={product.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="p-2">{index + 1}</td>

                                <td className="p-2">
                                    {product.images.length > 0 ? (
                                        <img
                                            className="w-16 h-16 object-cover rounded-md"
                                            src={product.images[0].url}
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center">
                                            No Img
                                        </div>
                                    )}
                                </td>

                                <td className="p-2 font-medium">{product.title}</td>
                                <td className="p-2 line-clamp-2">
                                    {product.description}
                                </td>
                                <td className="p-2 text-blue-600 font-bold">
                                    ฿{product.price}
                                </td>
                                <td className="p-2">{product.quantity}</td>
                                <td className="p-2">{product.sold}</td>

                                <td className="p-2 flex gap-2">
                                    <Link
                                        to={'/admin/product/' + product.id}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md"
                                    >
                                        <FaPencilAlt />
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md cursor-pointer"
                                    >
                                        <FaTrashAlt />

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )

}

export default FormProduct