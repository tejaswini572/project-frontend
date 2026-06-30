import PropTypes from "prop-types"

function Dashboard({ setPage }) {
     const isAdmin = localStorage.getItem("is_admin") === "true"
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h2>
                <button 
                    onClick={() => setPage("productList")}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg mb-4">
                    Products
                </button>
                <button 
                    onClick={() => setPage("customerList")}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg mb-4">
                    Customers
                </button>
                <button 
                    onClick={() => setPage("orderList")}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg">
                    Orders
                </button>
                
                {isAdmin && (
                    <button
                        onClick={() => setPage("adminPanel")}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg">
                        Admin Panel 🔐
                    </button>
                )}
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    setPage: PropTypes.func.isRequired
}

export default Dashboard