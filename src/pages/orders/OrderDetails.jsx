import {useState, useEffect} from "react"
import axios from "axios"

function OrderDetail({setPage, orderId}){
    const [order, setOrder] = useState(null)
    const [items, setItems] = useState([])

    useEffect(()=>{
        const fetchOrder = async()=>{
            const response = await axios.get(`http://localhost:8000/api/carts/${orderId}`, {withCredentials: true})
            setOrder(response.data)
        }
        fetchOrder()
    },[])
    useEffect(()=>{
    const fetchItems = async()=>{
        const response = await axios.get(`http://localhost:8000/api/order_item/order/${orderId}`, {withCredentials: true})
        setItems(response.data)
    }
    fetchItems()
},[])

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/carts/${orderId}`, {withCredentials: true})
            setPage("orderList")
        } catch (error) {
            alert("Cannot delete this order — it still has items. Remove all items first.")
    }
    }
    const handleRemoveItem = async (orderItemId) => {
    try {
        await axios.delete(`http://localhost:8000/api/order_item/${orderItemId}`, {withCredentials: true})
        setItems(items.filter(item => item.order_item_id !== orderItemId))
         const response = await axios.get(`http://localhost:8000/api/carts/${orderId}`, {withCredentials: true})
        setOrder(response.data)
    } catch (error) {
        alert("Error removing item")
    }
}
    if(!order) return <p>Loading...</p>

    return(
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order #{order.order_id}</h2>
                <p className="text-gray-500 mb-2">Customer ID: {order.customer_id}</p>
                <p className="text-blue-500 font-bold mb-2">Total: ${order.total_amount}</p>
                <p className="text-gray-400 mb-4">Status: {order.status}</p>
                <div className="mb-4">
    <h3 className="text-md font-semibold text-gray-700 mb-2">Items in this order:</h3>
    {items.map(item => (
        <div key={item.order_item_id} className="border-t pt-2 mt-2 flex justify-between items-center">
            <div>
                <p className="text-sm text-gray-600">Product ID: {item.product_id}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Unit Price: ${item.unit_price}</p>
            </div>
            <button 
                onClick={() => handleRemoveItem(item.order_item_id)}
                className="bg-red-400 hover:bg-red-500 text-white text-xs px-3 py-1 rounded-lg">
                Remove
            </button>
        </div>
    ))}
</div>
                <button 
                    onClick={()=> setPage("orderList")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Back
                </button>
                <button 
                    onClick={()=> setPage("editOrder")}
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

export default OrderDetail