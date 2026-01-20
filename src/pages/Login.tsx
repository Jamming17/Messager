import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { user, login, logout } = useAuth();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    useEffect(() => {
        logout();
    }, []);

    //TODO: Add sanitisation and hashing
    function sanitise(input: string): string {
        return input;
    }

    const handleLogin = async () => {
        setError("");
        setSuccess("");
    
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}login`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ username: sanitise(username), password: sanitise(password) })
            });

            const data = await res.json();

            if(!res.ok) {
                setError(data.error || "Login failed");
            } else {
                setSuccess("Login successful!");
                setError("");

                login(data.user, data.token);
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        }
    }

    if (!user) {
        return (
            <div className="p-4 mt-16 max-w-3xl mx-auto text-center bg-gray-300/90 text-gray-800 rounded">
                <h2 className="text-3xl font-bold mb-4">Login</h2>
                <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mb-2 p-2 border bg-gray-200" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-2 p-2 border bg-gray-200" />
                
                <button className="bg-purple-800 hover:bg-purple-800/85 active:bg-purple-900 text-white text-xl px-8 py-1 mt-4 rounded shadow" onClick={handleLogin}>Confirm</button>
                <button className="bg-red-800 hover:bg-red-800/85 active:bg-red-900 text-white text-xl px-8 py-1 mt-4 rounded shadow" onClick={logout}>Log Out</button>


                {error && <p className="text-red-600 mt-4">{error}</p>}
                {success && <p className="text-green-600 mt-4">{success}</p>}

                <p className="text-md pt-8 text-gray-500">Don't have an account? Register <Link to="/blog/register" className="underline">here</Link>.</p>
            </div>
        );
    } else {
        return <Navigate to="/" replace/>
    }
}

export default Login;