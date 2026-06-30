import axios from "axios"
import { useState, useEffect } from "react"
import PropTypes from "prop-types"

function EditProduct({ setPage, productId }) {
    const [productName, setProductName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [stockQuantity, setStockQuantity] = useState("")
    const [message, setMessage] = useState("")

    const isValidId = (id) => Number.isInteger(Number(id)) && Number(id) > 0

    useEffect(() => {
        if (!isValidId(productId)) return
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:8000/api/products/${productId}`, { withCredentials: true })
            setProductName(response.data.product_name)
            setCategory(response.data.category)
            setPrice(response.data.price)
            setStockQuantity(response.data.stock_quantity)
        }
        fetchProduct()
    }, [])

    const handleEditProduct = async () => {
        if (!isValidId(productId)) {
            setMessage("Invalid product id")
            return
        }
        try {
            const response = await axios.put(`http://localhost:8000/api/products/${productId}`, {
                product_name: productName,
                category: category,
                price: price,
                stock_quantity: stockQuantity
            }, { withCredentials: true })
            setMessage("Product updated successfully")
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>
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
                <button onClick={handleEditProduct}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg mb-4">
                    Update Product
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

EditProduct.propTypes = {
    setPage: PropTypes.func.isRequired,
    productId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

export default EditProduct