import axios from "axios"
import { useState } from "react"
import PropTypes from "prop-types"

function AddOrder({ setPage }) {
    const [customerId, setCustomerId] = useState("")
    const [totalAmount, setTotalAmount] = useState("")
    const [status, setStatus] = useState("")
    const [message, setMessage] = useState("")

    const handleAddOrder = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/carts/", {
                customer_id: customerId,
                total_amount: totalAmount,
                status: status
            }, { withCredentials: true })
            setMessage("Order added successfully")
        } catch (error) {
            const detail = error.response?.data?.detail
            setMessage(typeof detail === "string" ? detail : "Error occurred")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Order</h2>
                <input value={customerId} onChange={e => setCustomerId(e.target.value)}
                    placeholder="Customer ID"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={totalAmount} onChange={e => setTotalAmount(e.target.value)}
                    placeholder="Total Amount"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={status} onChange={e => setStatus(e.target.value)}
                    placeholder="Status (e.g. pending)"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <button onClick={handleAddOrder}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg mb-4">
                    Add Order
                </button>
                {message && <p className="text-center text-sm text-green-500">{message}</p>}
                <p onClick={() => setPage("orderList")}
                    className="text-center text-sm mt-4 text-blue-500 cursor-pointer hover:underline">
                    Back to Orders
                </p>
            </div>
        </div>
    )
}

AddOrder.propTypes = {
    setPage: PropTypes.func.isRequired
}
export default AddOrder