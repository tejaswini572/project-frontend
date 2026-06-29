import { useState, useEffect } from "react"
import axios from "axios"

function EditCustomer({setPage,customerId}) {
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone] = useState("")
    const [message,setMessage]= useState("")

    useEffect(()=>{
        const fetchCustomer= async() =>{
            const response= await axios.get(`http://localhost:8000/api/users/${customerId}`, {withCredentials: true})
            setFirstName(response.data.first_name)
            setLastName(response.data.last_name)
            setEmail(response.data.email)
            setPhone(response.data.phone)
        }
        fetchCustomer()
    },[])


  const handleEditCustomer = async () => {
    try {
        const response = await axios.put(`http://localhost:8000/api/users/${customerId}`, {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone
        }, { withCredentials: true })
        setMessage("Customer updated successfully")
    } catch (error) {
        const detail = error.response?.data?.detail
        setMessage(typeof detail === "string" ? detail : "Error occurred")
    }
}
return (
        <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Customer</h2>
                <input value={firstName} onChange={e => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={lastName} onChange={e => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <button onClick={handleEditCustomer}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg mb-4">
                    Update Customer
                </button>
                {message && <p className="text-center text-sm text-green-500">{message}</p>}
                <p onClick={() => setPage("customerList")}
                    className="text-center text-sm mt-4 text-blue-500 cursor-pointer hover:underline">
                    Back to Customers
                </p>
            </div>
        </div>
    )
}

export default EditCustomer
