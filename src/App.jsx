import { useState } from "react"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ChangePassword from "./pages/auth/ChangePassword"
import Dashboard from "./pages/Dashboard"
import ProductList from "./pages/products/ProductList"
import ProductDetail from "./pages/products/ProductDetail" 
import AddProduct from "./pages/products/AddProduct"
import EditProduct from "./pages/products/EditProduct"
import CustomerList from "./pages/customer/CustomerList"
import CustomerDetail from "./pages/customer/CustomerDetail"
import AddCustomer from "./pages/customer/AddCustomer"
import EditCustomer from "./pages/customer/EditCustomer"
import OrderList from "./pages/orders/OrderList"
import OrderDetail from "./pages/orders/OrderDetails"
import AddOrder from "./pages/orders/AddOrder"
import EditOrder from "./pages/orders/EditOrder"
import AdminPanel from "./pages/admin/AdminPanel"
import ActivityLog from "./pages/admin/ActivityLog"

function App(){
  const [page,setPage] = useState("login")
  const [selectedProductId,setSelectedProductId]=useState(null)
  const [selectedCustomerId,setSelectedCustomerId]=useState(null)
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  const isAdmin = localStorage.getItem("is_admin") === "true"

  return (
    <div>
      {page === "login" && <Login setPage={setPage}/>}
      {page === "register" && <Register setPage={setPage} />}
      {page === "forgotpassword" && <ForgotPassword setPage={setPage} />}
      {page === "changePassword" && <ChangePassword setPage={setPage}/>}
      {page === "dashboard" && <Dashboard setPage={setPage}/>}
      { page === "productList" && <ProductList setPage={setPage} setSelectedProductId={setSelectedProductId}/>}
      {page === "productDetail" && <ProductDetail setPage ={setPage} productId={selectedProductId}/>}
      {page === "addProduct" && <AddProduct setPage={setPage}/> }
      {page === "editProduct" && <EditProduct setPage={setPage} productId={selectedProductId}/>}
      {page === "customerList" && <CustomerList setPage={setPage} setSelectedCustomerId={setSelectedCustomerId}/>}
      {page === "customerDetail" && <CustomerDetail setPage={setPage} customerId={selectedCustomerId}/>}
      {page === "addCustomer" && <AddCustomer setPage={setPage}/>}
      {page === "editCustomer" && <EditCustomer setPage={setPage} customerId ={selectedCustomerId}/>}
      {page === "orderList" && <OrderList setPage={setPage} setSelectedOrderId={setSelectedOrderId}/>}
      {page === "orderDetail" && <OrderDetail setPage={setPage} orderId={selectedOrderId}/>}
      {page === "addOrder" && <AddOrder setPage={setPage}/>}
      {page === "editOrder" && <EditOrder setPage={setPage} orderId ={selectedOrderId}/>}

      {isAdmin && page === "adminPanel" && <AdminPanel setPage={setPage}/>}
      {isAdmin && page === "activityLog" && <ActivityLog setPage={setPage}/>}
    </div>
  )
}
export default App