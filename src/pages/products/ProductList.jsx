import {useState, useEffect} from "react"
import axios from "axios"

function ProductList({setPage,setSelectedProductId}){
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async()=>{
            const response = await axios.get("http://localhost:8000/api/products/", {withCredentials: true})
            setProducts(response.data)
        }
        fetchProducts()
    },[])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <p onClick={() => setPage("dashboard")}
                className="text-blue-500 cursor-pointer hover:underline mb-4 inline-block">
                ← Back to Dashboard
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Products</h2>
            <button 
                onClick={() => setPage("addProduct")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mb-6">
                + Add Product
            </button>
            <div className="grid grid-cols-3 gap-6">
                {products.map(p => (
                    <div key={p.product_id} className="bg-white rounded-xl shadow-md p-6 cursor-pointer"
                        onClick={()=>{
                            setSelectedProductId(p.product_id)
                            setPage("productDetail")
                        }}>
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

export default ProductList