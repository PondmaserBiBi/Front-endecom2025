import React, { useState } from "react"
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js"

import { saveOrder } from "../api/user"
import useEcomStore from "../store/ecom-store"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function CheckoutForm() {

    const token = useEcomStore((state) => state.token)
    const clearCart = useEcomStore((state) => state.clearCart)

    const navigate = useNavigate()

    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)

        const payload = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        })

        console.log("payload", payload)

        if (payload.error) {
            setMessage(payload.error.message)
            toast.error(payload.error.message)
        }
        else if (payload.paymentIntent.status === "succeeded") {

            saveOrder(token, payload)
                .then((res) => {
                    clearCart()
                    toast.success("Payment Success!!!")
                    navigate("/user/history")
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {
            toast.warning("ชำระเงินไม่สำเร็จ")
        }

        setIsLoading(false)
    }

    const paymentElementOptions = {
        layout: "tabs",
    }

    return (
        <div className="
            min-h-screen flex items-center justify-center
            bg-gradient-to-br from-indigo-50 to-purple-100
            px-3 py-8 sm:px-6
        ">

            <div className="
                w-full max-w-md sm:max-w-lg 
                bg-white p-5 sm:p-8
                rounded-2xl shadow-xl border border-gray-100
            ">

                <h2 className="
                    text-xl sm:text-2xl font-bold text-center 
                    text-gray-800 mb-3
                ">
                    💳 ชำระเงินออนไลน์
                </h2>

                <p className="
                    text-xs sm:text-sm text-center text-gray-500 
                    mb-6 sm:mb-8
                ">
                    กรุณากรอกข้อมูลการชำระเงินให้ครบถ้วน
                </p>

                <form
                    className="space-y-6"
                    id="payment-form"
                    onSubmit={handleSubmit}
                >

                    <div className="p-3 sm:p-4 border rounded-xl bg-gray-50">
                        <PaymentElement
                            id="payment-element"
                            options={paymentElementOptions}
                        />
                    </div>

                    <button
                        className="
                            w-full py-3 sm:py-4 
                            rounded-xl text-white 
                            font-semibold text-base sm:text-lg
                            transition-all duration-300
                            bg-gradient-to-r from-indigo-500 to-purple-600
                            hover:from-indigo-600 hover:to-purple-700
                            disabled:opacity-50 disabled:cursor-not-allowed
                            shadow-lg active:scale-95
                        "
                        disabled={isLoading || !stripe || !elements}
                        id="submit"
                    >
                        <span id="button-text" className="flex items-center justify-center">
                            {isLoading ? (
                                <div
                                    className="
                                        w-6 h-6 
                                        border-4 border-white 
                                        border-t-transparent 
                                        rounded-full animate-spin
                                    "
                                ></div>
                            ) : (
                                "Pay Now"
                            )}
                        </span>
                    </button>

                    {message && (
                        <div
                            id="payment-message"
                            className="
                                text-center text-red-600 
                                bg-red-50 p-3 rounded-lg 
                                border border-red-200
                                text-sm
                            "
                        >
                            {message}
                        </div>
                    )}
                </form>

            </div>
        </div>
    )
}
