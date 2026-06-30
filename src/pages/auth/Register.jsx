import { useState } from "react"
import axios from "axios"
import PropTypes from "prop-types"

function Register({ setPage }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleRegister = async () => {
        try {
             const response = await axios.post("http://localhost:8000/api/auth/register", {
                email: email,
                password: password
            },{ withCredentials: true })  
            setMessage("Registered successfully")
        } catch(error){
    const detail = error.response?.data?.detail
    if(typeof detail === "string"){
        setMessage(detail)
    } else {
        setMessage("Error occurred")
    }
}
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button onClick={handleRegister}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition">
                    Register
                </button>
                return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Change Password</h2>
                <input type="email" placeholder="Enter your email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="password" placeholder="Enter old password" value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="password" placeholder="Enter new password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button onClick={handleChangePassword}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition">
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => setPage("login")}
                    className="block w-full text-center text-sm mt-4 text-blue-500 cursor-pointer hover:underline bg-transparent border-none">
                    Already have an account? Login
                </button>

                
            </div>
        </div>
    ) have an account? Login
                
            </div>
        </div>
    )
}

Register.propTypes = {
    setPage: PropTypes.func.isRequired
}

export default Register