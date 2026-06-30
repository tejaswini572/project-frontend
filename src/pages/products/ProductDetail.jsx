import {useState,useEffect } from "react"
import axios from "axios"
import PropTypes from "prop-types"

function ProductDetail({setPage,productId}){
    const [product,setProduct]=useState(null)
   const [customerId, setCustomerId] = useState("")  // replaces orderId
const [quantity, setQuantity] = useState("")
const [cartMessage, setCartMessage] = useState("")

const isValidId = (id) => Number.isInteger(Number(id)) && Number(id) > 0

    useEffect(()=>{
        if (!isValidId(productId)) return
    const fetchProduct=async()=>{
    const response= await axios.get(`http://localhost:8000/api/products/${productId}`,{withCredentials: true})
        setProduct(response.data)
    }
    fetchProduct()
    },[])

    const handleDelete = async () => {
    if (!isValidId(productId)) return    
    try {
        await axios.delete(`http://localhost:8000/api/products/${productId}`, {withCredentials: true})
        setPage("productList")
    } catch (error) {
        console.error(error)
        alert("Error deleting product")
    }
}
const handleAddToCart = async () => {
    if (!isValidId(customerId)) return
    try {
        const orderResponse = await axios.get(`http://localhost:8000/api/carts/active/${customerId}`, {withCredentials: true})
        const activeOrderId = orderResponse.data.order_id

        await axios.post("http://localhost:8000/api/order_item/", {
            order_id: activeOrderId,
            product_id: productId,
            quantity: quantity,
            unit_price: product.price
        }, { withCredentials: true })

        setCartMessage("Added to cart successfully")
    } catch (error) {
        setCartMessage("Error adding to cart")
    }
}
if(!product) return <p>Loading...</p>
return(
<div className="min-h-screen bg-gray-100 p-8">
    <div className="bg-white rounded-xl shadow-md p-8 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.product_name}</h2>
         <p className="text-gray-500 mb-2">Category: {product.category}</p>
                <p className="text-blue-500 font-bold mb-2">Price: ${product.price}</p>
                <p className="text-gray-400 mb-4">Stock: {product.stock_quantity}</p>
                <div className="mb-4">
    <input value={customerId} onChange={e => setCustomerId(e.target.value)}
    placeholder="Customer ID"
    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2" />
    <input value={quantity} onChange={e => setQuantity(e.target.value)}
        placeholder="Quantity"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2" />
    <button onClick={handleAddToCart}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
        Add to Cart
    </button>
    {cartMessage && <p className="text-center text-sm text-green-500 mt-2">{cartMessage}</p>}
</div>
                <button 
                    onClick={()=> setPage("productList")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Back
                </button>
                <button 
    onClick={handleDelete}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg ml-2">
    Delete
</button>
                <button 
    onClick={()=> setPage("editProduct")}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg ml-2">
    Edit
</button>
            </div>
        </div>
    )
}

ProductDetail.propTypes = {
    setPage: PropTypes.func.isRequired,
    productId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}


export default ProductDetail