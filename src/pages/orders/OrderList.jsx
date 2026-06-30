import { useState, useEffect } from "react"
import axios from "axios"
import PropTypes from "prop-types"

function OrderList({ setPage, setSelectedOrderId }) {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get("http://localhost:8000/api/carts/", { withCredentials: true })
            setOrders(response.data)
        }
        fetchOrders()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <button
                type="button"
                onClick={() => setPage("dashboard")}
                className="text-blue-500 cursor-pointer hover:underline mb-4 inline-block bg-transparent border-none">
                ← Back to Dashboard
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders</h2>
            <button
                onClick={() => setPage("addOrder")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mb-6">
                + Add Order
            </button>
            <div className="grid grid-cols-3 gap-6">
                {orders.map(o => (
                    <div key={o.order_id}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            setSelectedOrderId(o.order_id)
                            setPage("orderDetail")
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                setSelectedOrderId(o.order_id)
                                setPage("orderDetail")
                            }
                        }}
                        className="bg-white rounded-xl shadow-md p-6 cursor-pointer">
                        <h3 className="text-lg font-semibold text-gray-800">Order #{o.order_id}</h3>
                        <p className="text-gray-500 text-sm">Customer ID: {o.customer_id}</p>
                        <p className="text-blue-500 font-bold mt-2">${o.total_amount}</p>
                        <p className="text-gray-400 text-sm">Status: {o.status}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

OrderList.propTypes = {
    setPage: PropTypes.func.isRequired,
    setSelectedOrderId: PropTypes.func.isRequired
}

export default OrderList