import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios";

export default function CreatePasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const location = useLocation();
  const {
      email,
      firstName ,
      lastName ,
      role ,
       approvedId ,
       companyname ,
        country
      } = location.state || {};
const [error, setError] = useState("");       // 🧩 State to hold error message
  const [success, setSuccess] = useState(""); 

  const handleCreatePassword = async(e) => {
    if (!password || !confirmPassword) {
      alert("Please fill in both fields.")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.")
      return
    }

          e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      email,
      firstname:firstName ,
      lastname:lastName ,
      role ,
       approvedId ,
       companyname ,
        country,
        password
      });

    setSuccess("Contract created successfully! 🎉");
     navigate("/welcome")

    } catch (err) {
      console.error("Error creating contract:", err);

      // 👇 Display a friendly message to the user
      if (err.response) {
        // Server responded with an error
        setError(err.response.data.error || "Something went wrong on the server.");
      } else if (err.request) {
        // No response from the server
        setError("No response from the server. Please check your connection.");
      } else {
        // Request setup issue
        setError("Error setting up request. Try again later.");
      }

    // Normally, you’d send this to your backend API to create the account
    console.log("Password created:", password)
    localStorage.setItem("userPassword", password)
    // navigate("/welcome") // or wherever you want to go next
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
            <h1 className="text-xl font-semibold">basesig</h1>
          </div>

          {/* Title */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Create Password</h2>
            <p className="text-gray-400 text-sm">
              Set up a strong password for your account
            </p>
          </div>

          {/* Password Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Create new password
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#1a1a1a] text-white border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-[#1a1a1a] text-white border-gray-700"
              />
            </div>
          </div>

          {/* Create Password Button */}
          <Button
            onClick={handleCreatePassword}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Continue
          </Button>

          {/* Back to Login */}
          {/* <p className="text-gray-400 text-sm text-center">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:underline"
            >
              Log in
            </button>
          </p> */}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#101010] via-[#1a1a1a] to-[#ff7ae5] text-white">
        <div className="text-center px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <p className="text-lg font-medium">
              Secure your basesig account with a strong password 🔐
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

