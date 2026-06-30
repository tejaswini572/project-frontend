import { useState, useEffect } from "react"
import axios from "axios"
import PropTypes from "prop-types"

function EditOrder({ setPage, orderId }) {
    const [customerId, setCustomerId] = useState("")
    const [totalAmount, setTotalAmount] = useState("")
    const [status, setStatus] = useState("")
    const [message, setMessage] = useState("")

    const isValidId = (id) => Number.isInteger(Number(id)) && Number(id) > 0

    useEffect(() => {
        if (!isValidId(orderId)) return
        const fetchOrder = async () => {
            await axios.get(`http://localhost:8000/api/carts/${orderId}`, { withCredentials: true })
            setCustomerId(response.data.customer_id)
            setTotalAmount(response.data.total_amount)
            setStatus(response.data.status)
        }
        fetchOrder()
    }, [])

    const handleEditOrder = async () => {
        if (!isValidId(orderId)) {
            setMessage("Invalid order id")
            return
        }
        try {
            const response = await axios.put(`http://localhost:8000/api/carts/${orderId}`, {
                customer_id: customerId,
                total_amount: totalAmount,
                status: status
            }, { withCredentials: true })
            setMessage("Order updated successfully")
        } catch (error) {
            const detail = error.response?.data?.detail
            setMessage(typeof detail === "string" ? detail : "Error occurred")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Order</h2>
                <input value={customerId} onChange={e => setCustomerId(e.target.value)}
                    placeholder="Customer ID"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={totalAmount} onChange={e => setTotalAmount(e.target.value)}
                    placeholder="Total Amount"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={status} onChange={e => setStatus(e.target.value)}
                    placeholder="Status"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <button onClick={handleEditOrder}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg mb-4">
                    Update Order
                </button>
                {message && <p className="text-center text-sm text-green-500">{message}</p>}
                <button
                    type="button"
                    onClick={() => setPage("orderList")}
                    className="block w-full text-center text-sm mt-4 text-blue-500 cursor-pointer hover:underline bg-transparent border-none">
                    Back to Orders
                </button>
            </div>
        </div>
    )
}

EditOrder.propTypes = {
    setPage: PropTypes.func.isRequired,
    orderId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

export default EditOrder