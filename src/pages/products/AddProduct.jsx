import axios from "axios"
import { useState } from "react"
import PropTypes from "prop-types"

function AddProduct({ setPage }) {
    const [productName, setProductName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [stockQuantity, setStockQuantity] = useState("")
    const [message, setMessage] = useState("")

    const handleAddProduct = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/products/", {
                product_name: productName,
                category: category,
                price: price,
                stock_quantity: stockQuantity
            }, { withCredentials: true })
            setMessage("Product added successfully")
        } catch (error) {
            const detail = error.response?.data?.detail
            if (typeof detail === "string") {
                setMessage(detail)
            } else {
                setMessage("Error occurred")
            }
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Product</h2>
                <input value={productName} onChange={e => setProductName(e.target.value)}
                    placeholder="Product Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={category} onChange={e => setCategory(e.target.value)}
                    placeholder="Category"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={price} onChange={e => setPrice(e.target.value)}
                    placeholder="Price"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={stockQuantity} onChange={e => setStockQuantity(e.target.value)}
                    placeholder="Stock Quantity"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <button onClick={handleAddProduct}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg mb-4">
                    Add Product
                </button>
                {message && <p className="text-center text-sm text-green-500">{message}</p>}
                <button
                    type="button"
                    onClick={() => setPage("productList")}
                    className="block w-full text-center text-sm mt-4 text-blue-500 cursor-pointer hover:underline bg-transparent border-none">
                    Back to Products
                </button>
            </div>
        </div>
    )
}

AddProduct.propTypes = {
    setPage: PropTypes.func.isRequired
}

export default AddProduct