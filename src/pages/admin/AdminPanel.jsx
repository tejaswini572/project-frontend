import { useState, useEffect } from "react"
import axios from "axios"
import PropTypes from "prop-types"

function AdminPanel({ setPage }) {
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState("")
    const [form, setForm] = useState({
        product_name: "", category: "", price: "", stock_quantity: ""
    })
    const [editId, setEditId] = useState(null)
    const token = localStorage.getItem("token")

    const headers = { Authorization: `Bearer ${token}` }

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/products/", { headers })
            setProducts(res.data)
        } catch {
            setMessage("Failed to fetch products")
        }
    }

    useEffect(() => { fetchProducts() }, [])

    const handleSubmit = async () => {
        try {
            const payload = {
                product_name: form.product_name,
                category: form.category,
                price: Number.parseFloat(form.price),
                stock_quantity: Number.parseInt(form.stock_quantity)
            }
            if (editId) {
            if (!Number.isInteger(editId)) {
                setMessage("Invalid product id")
                return
            }
            const safeId = encodeURIComponent(editId)
            await axios.put(`http://localhost:8000/api/products/${safeId}`, payload, { headers })
            setMessage("Product updated!")
            } else {
                await axios.post("http://localhost:8000/api/products/", payload, { headers })
                setMessage("Product added!")
            }
            setForm({ product_name: "", category: "", price: "", stock_quantity: "" })
            setEditId(null)
            fetchProducts()
        } catch {
            setMessage("Operation failed")
        }
    }

    const handleEdit = (product) => {
        setForm({
            product_name: product.product_name,
            category: product.category,
            price: product.price,
            stock_quantity: product.stock_quantity
        })
        setEditId(product.product_id)
    }

    const handleDelete = async (id) => {
        if(!Number.isInteger(id)) {
            setMessage("Invalid product id")
            return
        }
        try {
            const safeId = encodeURIComponent(id)
            await axios.delete(`http://localhost:8000/api/products/${safeId}`, { headers })
            setMessage("Product deleted!")
            fetchProducts()
        } catch {
            setMessage("Delete failed")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
                    <div className="flex gap-4">
                        <button onClick={() => setPage("activityLog")}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
                            Activity Log
                        </button>
                        <button onClick={() => setPage("dashboard")}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                            Back to Dashboard
                        </button>
                    </div>
                </div>

                
                <div className="bg-white p-6 rounded-xl shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4">{editId ? "Edit Product" : "Add Product"}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Product Name" value={form.product_name}
                            onChange={(e) => setForm({ ...form, product_name: e.target.value })}
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <input placeholder="Category" value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <input placeholder="Price" value={form.price} type="number"
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <input placeholder="Stock Quantity" value={form.stock_quantity} type="number"
                            onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })}
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    {message && <p className="text-sm mt-2 text-green-500">{message}</p>}
                    <div className="flex gap-4 mt-4">
                        <button onClick={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
                            {editId ? "Update Product" : "Add Product"}
                        </button>
                        {editId && (
                            <button onClick={() => { setEditId(null); setForm({ product_name: "", category: "", price: "", stock_quantity: "" }) }}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg">
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-gray-600">Name</th>
                                <th className="px-6 py-3 text-gray-600">Category</th>
                                <th className="px-6 py-3 text-gray-600">Price</th>
                                <th className="px-6 py-3 text-gray-600">Stock</th>
                                <th className="px-6 py-3 text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.product_id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{p.product_name}</td>
                                    <td className="px-6 py-4">{p.category}</td>
                                    <td className="px-6 py-4">₹{p.price}</td>
                                    <td className="px-6 py-4">{p.stock_quantity}</td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button onClick={() => handleEdit(p)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(p.product_id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

AdminPanel.propTypes = {
    setPage: PropTypes.func.isRequired
}
export default AdminPanel