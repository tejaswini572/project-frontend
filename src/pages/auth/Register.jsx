import { useState } from "react"
import axios from "axios"

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
                {message && <p className="text-center text-sm mt-4 text-green-500">{message}</p>}
                <p onClick={() => setPage("login")}
                    className="text-center text-sm mt-4 text-blue-500 cursor-pointer hover:underline">
                    Already have an account? Login
                </p>
            </div>
        </div>
    )
}

export default Register