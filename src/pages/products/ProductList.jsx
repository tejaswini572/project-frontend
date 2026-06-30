import { useState, useEffect } from "react"
import axios from "axios"
import PropTypes from "prop-types"

function ProductList({ setPage, setSelectedProductId }) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get("http://localhost:8000/api/products/", { withCredentials: true })
            setProducts(response.data)
        }
        fetchProducts()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <button
                type="button"
                onClick={() => setPage("dashboard")}
                className="text-blue-500 cursor-pointer hover:underline mb-4 inline-block bg-transparent border-none">
                ← Back to Dashboard
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Products</h2>
            <button
                onClick={() => setPage("addProduct")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mb-6">
                + Add Product
            </button>
            <div className="grid grid-cols-3 gap-6">
                {products.map(p => (
                    <div key={p.product_id}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            setSelectedProductId(p.product_id)
                            setPage("productDetail")
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                setSelectedProductId(p.product_id)
                                setPage("productDetail")
                            }
                        }}
                        className="bg-white rounded-xl shadow-md p-6 cursor-pointer">
                        <h3 className="text-lg font-semibold text-gray-800">{p.product_name}</h3>
                        <p className="text-gray-500 text-sm">{p.category}</p>
                        <p className="text-blue-500 font-bold mt-2">${p.price}</p>
                        <p className="text-gray-400 text-sm">Stock: {p.stock_quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

ProductList.propTypes = {
    setPage: PropTypes.func.isRequired,
    setSelectedProductId: PropTypes.func.isRequired
}

export default ProductList