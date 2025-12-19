import React, { useState, useEffect } from 'react'
import { createCategory, removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { FaTrash } from "react-icons/fa"

const FormCategory = () => {

    const token = useEcomStore((state) => state.token)

    const [name, setName] = useState('')
    const categories = useEcomStore((state) => state.categories)
    const getcategories = useEcomStore((state) => state.getCategory)

    useEffect(() => {
        getcategories(token)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name) {
            return toast.warning('Please fill data')
        }

        try {
            const response = await createCategory(token, { name })

            toast.success(`Add Category ${response.data.name} success!`)
            setName('')
            getcategories(token)

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Confirm delete?')) return

        try {
            const response = await removeCategory(token, id)
            toast.success(`Delete ${response.data.name} success`)
            getcategories(token)

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    return (
        <div className='max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg'>

            {/* Title */}
            <h1 className='text-2xl font-bold mb-6 text-gray-800'>
                📦 Category
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className='flex gap-3 mb-8'>
                <input
                    type="text"
                    placeholder="Enter category name..."
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button
                    type="submit"
                    className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
                >
                    + Add
                </button>
            </form>

            {/* Category List */}
            <div className='space-y-3'>
                {categories.length > 0 ? (
                    categories.map((item) => (
                        <div
                            key={item.id}
                            className='flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition'
                        >
                            <span className='text-gray-700 font-medium'>
                                {item.name}
                            </span>

                            <button
                                onClick={() => handleDelete(item.id)}
                                className='flex items-center gap-1 text-red-600 hover:text-red-700'
                            >
                                <FaTrash />
                                <span>Delete</span>
                            </button>
                        </div>
                    ))
                ) : (
                    <p className='text-center text-gray-500'>
                        No categories found.
                    </p>
                )}
            </div>

        </div>
    )
}

export default FormCategory
