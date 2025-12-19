import axios from "axios";

export const createCategory = async (token, form) => {

    return axios.post('https://backendecom-efsw.onrender.com/category',

        form, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    })
}

export const listCategory = async () => {

    return axios.get('https://backendecom-efsw.onrender.com/category')

}

export const removeCategory = async (token, id) => {

    return axios.delete('https://backendecom-efsw.onrender.com/category/' + id, {

        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    )
}