import axios from "axios";


export const payment = async (token) => await axios.post('https://backendecom-efsw.onrender.com/user/create-payment-intent',
    {}, {

    headers: {
        Authorization: `Bearer ${token}`
    }
})