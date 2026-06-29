import { useState, useEffect } from "react"
import axios from "axios"

function ActivityLog({ setPage }) {
    const [logs, setLogs] = useState([])
    const [message, setMessage] = useState("")
    const token = localStorage.getItem("token")

    const headers = { Authorization: `Bearer ${token}` }

    const fetchLogs = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/admin/activity-log", { headers })
            setLogs(res.data)
        } catch {
            setMessage("Failed to fetch logs")
        }
    }

    useEffect(() => { fetchLogs() }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Activity Log</h1>
                    <button onClick={() => setPage("adminPanel")}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                        Back to Admin Panel
                    </button>
                </div>

                {message && <p className="text-red-500 mb-4">{message}</p>}

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-gray-600">User</th>
                                <th className="px-6 py-3 text-gray-600">Action</th>
                                <th className="px-6 py-3 text-gray-600">Details</th>
                                <th className="px-6 py-3 text-gray-600">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.log_id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{log.user_email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                            ${log.action === "login" ? "bg-green-100 text-green-700" :
                                            log.action === "add_product" ? "bg-blue-100 text-blue-700" :
                                            log.action === "update_product" ? "bg-yellow-100 text-yellow-700" :
                                            "bg-red-100 text-red-700"}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{log.details ?? "-"}</td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{log.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ActivityLog