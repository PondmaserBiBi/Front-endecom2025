import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const actionLogin = useEcomStore((state) => state.actionLogin)

    const [form, setForm] = useState({ email: "", password: "" })

    const handleOnChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await actionLogin(form)
            const role = response.data.payload.role
            if (role === 'admin') navigate('/admin')
            else navigate(-1)
            toast.success('Welcome Back')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login Failed')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">เข้าสู่ระบบ</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={handleOnChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={handleOnChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    ยังไม่มีบัญชี?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        สมัครสมาชิก
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
