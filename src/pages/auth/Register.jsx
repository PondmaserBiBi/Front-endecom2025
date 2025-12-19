import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()
    const [form, setForm] = useState({ email: "", password: "", confirmpassword: "" })

    const handleOnChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.password !== form.confirmpassword) {
            return toast.error('Confirm Password does not match')
        }
        try {
            const response = await axios.post('https://backendecom-efsw.onrender.com/register', form)
            toast.success(response.data)
            navigate('/login')


        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Register Failed'
            toast.error(errorMsg)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">สมัครสมาชิก</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={handleOnChange}
                        required
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={handleOnChange}
                        required
                    />
                    <input
                        type="password"
                        name='confirmpassword'
                        placeholder='Confirm Password'
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={handleOnChange}
                        required
                    />
                    <button
                        type='submit'
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    มีบัญชีแล้ว?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        เข้าสู่ระบบ
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register
