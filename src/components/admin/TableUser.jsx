import React, { useEffect, useState } from 'react'
import { ChangeStatus, listUsers, ChangeRole } from '../../api/Admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'

const TableUser = () => {

    const token = useEcomStore((state) => state.token)
    const [users, setUsers] = useState([])

    useEffect(() => {

        if (token) {
            handlegetUsers(token)
        }
    }, [token])

    const handlegetUsers = (token) => {
        
        listUsers(token)
            .then((res) => {
                setUsers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeStatus = (userId, userStatus) => {
        const value = {
            id: userId,
            enabled: !userStatus
        }

        ChangeStatus(token, value)
            .then((res) => {
                handlegetUsers(token)
                toast.success('Change Status Success')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeRole = (userId, userRole) => {
        const value = {
            id: userId,
            role: userRole
        }

        ChangeRole(token, value)
            .then((res) => {
                handlegetUsers(token)
                toast.success('Change Role Successfully')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (

        <div className="min-h-screen p-8 bg-gray-100">

            <h1 className="text-2xl font-bold mb-6 text-gray-700">
                👤 Manage Users
            </h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">

                <table className="min-w-full border-collapse">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="py-4 px-4 text-left">ลำดับ</th>
                            <th className="py-4 px-4 text-left">Email</th>
                            <th className="py-4 px-4 text-left">สิทธิ์</th>
                            <th className="py-4 px-4 text-left">สถานะ</th>
                            <th className="py-4 px-4 text-left">จัดการ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.map((user, index) => (

                            <tr
                                key={user.id}
                                className={`border-b hover:bg-gray-100 transition ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    }`}
                            >
                                <td className="py-3 px-4">{index + 1}</td>

                                <td className="py-3 px-4 font-medium text-gray-700">
                                    {user.email}
                                </td>

                                <td className="py-3 px-4">
                                    <select
                                        className="border rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        onChange={(e) => handleChangeRole(user.id, e.target.value)}
                                        value={user.role}
                                    >
                                        <option>user</option>
                                        <option>admin</option>
                                    </select>
                                </td>

                                <td className="py-3 px-4">
                                    <span
                                        className={`px-3 py-1 text-sm rounded-full font-semibold 
                                        ${user.enabled
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                            }`}
                                    >
                                        {user.enabled ? 'Active' : 'Inactive'}
                                    </span>
                                </td>

                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => handleChangeStatus(user.id, user.enabled)}
                                        className={`px-4 py-1.5 rounded-lg text-white font-semibold text-sm 
                                        transition ${user.enabled
                                                ? 'bg-red-500 hover:bg-red-600'
                                                : 'bg-green-500 hover:bg-green-600'
                                            }`}
                                    >
                                        {user.enabled ? 'Disable' : 'Enable'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        😢 No Users Found
                    </div>
                )}

            </div>
        </div>
    )
}

export default TableUser
