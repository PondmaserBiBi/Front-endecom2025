import axios from "axios";


export const getOrdersAdmin = async (token) => await axios.get('https://backendecom-efsw.onrender.com/admin/orders',

    {

        headers: {
            Authorization: `Bearer ${token}`
        }
    })


export const changeOrdersStatus = async (token, orderId, orderStatus) => {

    return await axios.put('https://backendecom-efsw.onrender.com/admin/order-status', {

        orderId,
        orderStatus,
    },

        {

            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}


export const listUsers = async (token) => {
    return await axios.get("https://backendecom-efsw.onrender.com/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const ChangeStatus = async (token, value) => {
    return await axios.post("https://backendecom-efsw.onrender.com/change-status", value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const ChangeRole = async (token, value) => {
    return await axios.post("https://backendecom-efsw.onrender.com/change-role", value, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const listDashboard = async (token) => {
    
    return await axios.get("https://backendecom-efsw.onrender.com/admin", {

        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}