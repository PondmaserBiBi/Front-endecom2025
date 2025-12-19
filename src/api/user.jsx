import axios from "axios";

export const userCart = async (token, cart) => {

    return axios.post('https://backendecom-efsw.onrender.com/user/cart', cart, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    })
}

export const listuserCart = async (token) => {

    return axios.get('https://backendecom-efsw.onrender.com/user/cart', {

        headers: {
            Authorization: `Bearer ${token}`
        }

    })
}

export const saveAddress = async (token, address) => {

    return axios.post('https://backendecom-efsw.onrender.com/user/address',

        { address },

        {

            headers: {
                Authorization: `Bearer ${token}`
            }

        })
}
export const saveOrder = async (token, payload) => {

    return axios.post('https://backendecom-efsw.onrender.com/user/order',

        payload,

        {

            headers: {
                Authorization: `Bearer ${token}`
            }

        })
}
export const getOrders = async (token) => {

    return axios.get('https://backendecom-efsw.onrender.com/user/order',

        {

            headers: {
                Authorization: `Bearer ${token}`
            }

        })
}
