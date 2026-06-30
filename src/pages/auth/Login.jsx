import { useState } from "react"
import axios from "axios"
import PropTypes from "prop-types"

const JWT_PATTERN = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/

function sanitizeToken(value) {
    if (typeof value !== "string") return ""
    const trimmed = value.trim()
    return JWT_PATTERN.test(trimmed) ? trimmed : ""
}

function sanitizeEmail(value) {
    if (typeof value !== "string") return ""
    
    const cleaned = value.trim().replace(/[^a-zA-Z0-9@._+-]/g, "")
    return cleaned.slice(0, 254)
}

function Login({ setPage }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", {
                email: email,
                password: password
            }, { withCredentials: true })

            const sanitizedToken = sanitizeToken(response.data.access_token)
            if (sanitizedToken.length === 0) {
                throw new Error("Invalid token received")
            }
            const isAdmin = Boolean(response.data.is_admin)
            const sanitizedEmail = sanitizeEmail(email)

            localStorage.setItem("token", sanitizedToken)
            localStorage.setItem("user_email", sanitizedEmail)
            localStorage.setItem("is_admin", String(isAdmin))

            setPage("dashboard")
        } catch (error) {
            const detail = error.response?.data?.detail
            if (typeof detail === "string") {
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
                <button
                    type="button"
                    onClick={() => setPage("register")}
                    className="block w-full text-center text-sm mt-4 text-blue-500 cursor-pointer hover:underline bg-transparent border-none">
                    Don't have an account? Register
                </button>
                <button
                    type="button"
                    onClick={() => setPage("forgotpassword")}
                    className="block w-full text-center text-sm mt-2 text-blue-500 cursor-pointer hover:underline bg-transparent border-none">
                    Forgot Password?
                </button>
            </div>
        </div>
    )
}

Login.propTypes = {
    setPage: PropTypes.func.isRequired
}

export default Login