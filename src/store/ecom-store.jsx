import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/Category'
import { listProduct, searchFilters } from '../api/Product'
import _, { isEqual } from 'lodash'

const ecomStore = (set, get) => ({

    user: null,
    token: null,
    categories: [],
    products: [],
    carts: [],
    logout: () => {

        set({
            user: null,
            token: null,
            categories: [],
            products: [],
            carts: [],
        })
    },



    actionAddtocart: (product) => {
        const carts = get().carts

        const updateCart = [...carts, { ...product, count: 1 }]
        const unique = _.unionWith(updateCart, isEqual)

        set({ carts: unique })
    },

    actionupdateQuantity: (productId, newQuantity) => {
        set((state) => ({
            carts: state.carts.map((item) =>
                item.id === productId
                    ? { ...item, count: Math.max(1, newQuantity) }
                    : item
            )
        }))
    },

    actionRemoveProduct: (productId) => {
        set((state) => ({
            carts: state.carts.filter((item) => item.id !== productId)
        }))
    },


    clearCart: () => {
        set({ carts: [] })
        localStorage.removeItem('ecom-store')
    },

    TotalPrice: () => {
        return get().carts.reduce((total, item) => {
            return total + item.price * item.count
        }, 0)
    },



    actionLogin: async (form) => {
        const response = await axios.post('https://backendecom-efsw.onrender.com/login', form)

        set({
            user: response.data.payload,
            token: response.data.token
        })

        return response
    },

    logout: () => {
        set({
            user: null,
            token: null,
            carts: []
        })
        localStorage.removeItem('ecom-store')
    },



    getCategory: async () => {
        try {
            const response = await listCategory()
            set({ categories: response.data })
        } catch (error) {
            console.log(error)
        }
    },



    getProduct: async (count) => {
        try {
            const response = await listProduct(count)
            set({ products: response.data })
        } catch (error) {
            console.log(error)
        }
    },

    actionSearchFilters: async (arg) => {
        try {
            const response = await searchFilters(arg)
            set({ products: response.data })
        } catch (error) {
            console.log(error)
        }
    },

    clearCart: () => {

        set({ carts: [] })
    },

})

const usePersist = {
    name: 'ecom-store',
    storage: createJSONStorage(() => localStorage),
}



const useEcomStore = create(persist(ecomStore, usePersist))

export default useEcomStore
