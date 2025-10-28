import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 const [error, setError] = useState("");       // 🧩 State to hold error message
  const [success, setSuccess] = useState("");

  const handleLogin = async(e) => {
    if (email && password) {
      // Normally you'd call your backend here for authentication
       e.preventDefault();
    setError("");
    setSuccess("");
      try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      email,
      password
      }, {withCredentials: true});

    setSuccess("Contract created successfully! 🎉");
      navigate("/dashboard" , { replace: true })

    } catch (err) {
      console.error("Error creating contract:", err);

      // 👇 Display a friendly message to the user
      if (err.response) {
        // Server responded with an error
        setError(err.response.data.message || "Something went wrong on the server.");
      } else if (err.request) {
        // No response from the server
        setError("No response from the server. Please check your connection.");
      } else {
        // Request setup issue
        setError("Error setting up request. Try again later.");
      }
      // navigate to OTP verification page
    }
    } else {
      alert("Please fill in both fields.")
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="bg-[#0f0f0f] flex flex-col justify-center items-center text-white px-6">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg"></div>
            <h1 className="text-xl font-semibold">Basesig</h1>
          </div>

          {/* Title */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="text-gray-400 text-sm">
              Login to continue to your account
            </p>
          </div>

          {/* Email Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1a1a1a] text-white border-gray-700"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#1a1a1a] text-white border-gray-700"
              />
            </div>
          </div>
          {error && <p className="mt-4 text-red-400">{error}</p>}
      {success && <p className="mt-4 text-green-400">{success}</p>}
          {/* Login Button */}
          <div>Test Email: uzorifeanyi123@gmail.com</div>
          <div>password: 10111011</div>
          <div>Test Email: uzorifeanyi1011@gmail.com</div>
          <div>password: 10111011</div>
          <Button
            onClick={handleLogin}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Login
          </Button>

          {/* Sign-up Text */}
          <p className="text-gray-400 text-sm text-center">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-400 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#101010] via-[#1a1a1a] to-[#ff7ae5] text-white">
        <div className="text-center px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <p className="text-lg font-medium">
              Access your Basesig dashboard securely 🔐
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
