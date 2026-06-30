import { useState, useEffect } from "react"
import axios from "axios"
import PropTypes from "prop-types"

function CustomerDetail({ setPage, customerId }) {
    const [customer, setCustomer] = useState(null)

    const isValidId = (id) => Number.isInteger(Number(id)) && Number(id) > 0

    useEffect(() => {
        if (!isValidId(customerId)) return
        const fetchCustomer = async () => {
            const response = await axios.get(`http://localhost:8000/api/users/${customerId}`, { withCredentials: true })
            setCustomer(response.data)
        }
        fetchCustomer()
    }, [])

    const handleDelete = async () => {
        if (!isValidId(customerId)) return
        try {
            await axios.delete(`http://localhost:8000/api/users/${customerId}`, { withCredentials: true })
            setPage("customerList")
        } catch (error) {
            alert("Error deleting the customer")
        }
    }

    if (!customer) return <p>Loading...</p>

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{customer.first_name} {customer.last_name}</h2>
                <p className="text-gray-500 mb-2">Email: {customer.email}</p>
                <p className="text-gray-400 mb-4">Phone: {customer.phone}</p>
                <button
                    onClick={() => setPage("customerList")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Back
                </button>
                <button
                    onClick={() => setPage("editCustomer")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg ml-2">
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg ml-2">
                    Delete
                </button>
            </div>
        </div>
    )
}

CustomerDetail.propTypes = {
    setPage: PropTypes.func.isRequired,
    customerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

export default CustomerDetail