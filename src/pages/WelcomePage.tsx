import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="bg-[#0f0f0f] flex flex-col justify-center items-center text-white px-6">
        <div className="w-full max-w-sm text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg"></div>
            <h1 className="text-xl font-semibold">Basesig</h1>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Welcome to Basesig 🎉</h2>
            <p className="text-gray-400 text-sm">
              Your account has been successfully created.  
              You can now log in and start exploring your dashboard.
            </p>
          </div>

          {/* Continue Button */}
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Go to Login
          </Button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#101010] via-[#1a1a1a] to-[#ff7ae5] text-white">
        <div className="text-center px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <p className="text-lg font-medium">
              Welcome aboard! Let’s get started with your Basesig journey 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
