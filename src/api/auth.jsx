import axios from "axios";


export const currentUser = async (token) => await axios.post('https://backendecom-efsw.onrender.com/currentuser',
    {}, {

    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const currentAdmin = async (token) => {

    return await axios.post('https://backendecom-efsw.onrender.com/currentadmin',
        {}, {

        headers: {

            Authorization: `Bearer ${token}`
        }
    })
}