import { useState, useEffect } from "react"
import axios from "axios"
import PropTypes from "prop-types"

function CustomerList({ setPage, setSelectedCustomerId }) {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await axios.get("http://localhost:8000/api/users/", { withCredentials: true })
            setCustomers(response.data)
        }
        fetchCustomers()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <button
                type="button"
                onClick={() => setPage("dashboard")}
                className="text-blue-500 cursor-pointer hover:underline mb-4 inline-block bg-transparent border-none">
                ← Back to Dashboard
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Customers</h2>
            <button onClick={() => setPage("addCustomer")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mb-6">+Add Customer</button>
            <div className="grid grid-cols-3 gap-6">
                {customers.map(c => (
                    <button
                        key={c.customer_id}
                        type="button"
                        onClick={() => {
                            setSelectedCustomerId(c.customer_id)
                            setPage("customerDetail")
                        }}
                        className="bg-white rounded-xl shadow-md p-6 cursor-pointer">
                        <h3 className="text-lg font-semibold text-gray-800">{c.first_name} {c.last_name}</h3>
                        <p className="text-gray-500 text-sm">{c.email}</p>
                        <p className="text-gray-400 text-sm">{c.phone}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

CustomerList.propTypes = {
    setPage: PropTypes.func.isRequired,
    setSelectedCustomerId: PropTypes.func.isRequired
}

export default CustomerList