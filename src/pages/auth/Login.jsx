import { useState } from "react"
import axios from "axios"

function Login({ setPage }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", {
                email: email,
                password: password
            },{ withCredentials: true })  
    
            const token = typeof response.data.access_token === "string"? response.data.access_token : ""
            const isAdmin = Boolean(response.data.is_admin)
            const sanitizedEmail = String(email).trim()

            localStorage.setItem("token", token)      
            localStorage.setItem("user_email", sanitizedEmail)                      
            localStorage.setItem("is_admin", String(isAdmin))
            
            setPage("dashboard")
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
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button onClick={handleLogin}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
                    Login
                </button>
                {message && <p className="text-center text-sm mt-4 text-green-500">{message}</p>}
                <p onClick={() => setPage("register")}
                    className="text-center text-sm mt-4 text-blue-500 cursor-pointer hover:underline">
                    Don't have an account? Register
                </p>
                <p onClick={() => setPage("forgotpassword")}
                    className="text-center text-sm mt-2 text-blue-500 cursor-pointer hover:underline">
                    Forgot Password?
                </p>
            </div>
        </div>
    )
}

export default Login