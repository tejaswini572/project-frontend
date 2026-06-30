import axios from "axios"
import { useState } from  "react"
import PropTypes from "prop-types"

function AddCustomer({ setPage }){
    const [firstName, setFirstName ]= useState("")
    const [lastName,setLastName ]= useState("")
    const [email,setEmail ]= useState("")
    const [phone,setPhone]= useState("")
    const [message,setMessage] = useState("")

    const handleAddCustomer = async() => {
        try {
            const response = await axios.post("http://localhost:8000/api/users/", {
                first_name: firstName,
                last_name:lastName,
                email:email,
                phone:phone,
            
        },{withCredentials : true})
        setMessage("Customer addedd successfully")
    }
        catch(error){
            const detail=error.response?.data?.detail
            setMessage(typeof detail === "string"? detail :"Error occured"
            )
        }
    }

           return (<div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Customer</h2>
                <input value={firstName} onChange={e=> setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"/>
                <input value={lastName} onChange={e=> setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={email} onChange={e=> setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <input value={phone} onChange ={ e=> setPhone(e.target.value)}
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4" />
                <button onClick={handleAddCustomer} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg mb-4">
                    Add Customer
                </button>
                {message && <p className="text-center text-sm text-green-500">{message}</p>}
                <p onClick={() => setPage("customerList")} className="text-center text-sm mt-4 text-blue-500 cursor-pointer hover:underline">
                    Back to Customers
                </p>
            </div>
        </div>
    )
}

AddCustomer.propTypes = {
    setPage: PropTypes.func.isRequired
}

export default AddCustomer