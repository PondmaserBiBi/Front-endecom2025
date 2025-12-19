import axios from "axios";

export const createProduct = async (token, form) => {

    return axios.post('https://backendecom-efsw.onrender.com/product', form, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    })
}

export const listProduct = async (count = 20) => {

    return axios.get('https://backendecom-efsw.onrender.com/products/' + count)
}




export const readProduct = async (token, id) => {

    return axios.get('https://backendecom-efsw.onrender.com/product/' + id, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    })
}


export const updateProduct = async (token, id, form) => {

    return axios.put('https://backendecom-efsw.onrender.com/product/' + id, form, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    })
}

export const deleteProduct = async (token, id) => {

    return axios.delete('https://backendecom-efsw.onrender.com/product/' + id, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    })
}


export const upLoadFiles = async (token, form) => {

    return axios.post('https://backendecom-efsw.onrender.com/images', {

        image: form
    }, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    })
}


export const removeFiles = async (token, public_id) => {

    return axios.post('https://backendecom-efsw.onrender.com/removeimages', {

        public_id

    }, {

        headers: {
            Authorization: `Bearer ${token}`
        }

    })
}


export const searchFilters = async (arg) => {

    return axios.post('https://backendecom-efsw.onrender.com/search/filters', arg)
}


export const listproductBy = async (sort, order, limit) => {

    return axios.post('https://backendecom-efsw.onrender.com/productby', {

        sort,
        order,
        limit
    })
}

