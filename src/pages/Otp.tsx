// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useNavigate } from "react-router-dom"

// export default function Otp() {
//   const [otp, setOtp] = useState("")
//   const navigate = useNavigate()

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log("OTP entered:", otp)
//     // Verify OTP here (backend call or blockchain logic)
//     navigate("/dashboard") // redirect after successful verification
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
//       <div className="w-full max-w-sm space-y-6 text-center">
//         <h1 className="text-2xl font-semibold">Verify your email</h1>
//         <p className="text-gray-600">
//           Enter the 6-digit code sent to your email
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input
//             type="text"
//             maxLength={6}
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//             className="text-center tracking-widest"
//           />
//           <Button
//             type="submit"
//             className="w-full bg-black text-white hover:bg-gray-800"
//           >
//             Verify
//           </Button>
//         </form>

//         <p className="text-sm text-gray-600">
//           Didn’t receive the code?{" "}
//           <button
//             type="button"
//             className="text-blue-600 hover:underline"
//             onClick={() => alert("Resend OTP triggered")}
//           >
//             Resend
//           </button>
//         </p>
//       </div>
//     </div>
//   )
// }



import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { OTPInput,OTPInputProps ,Otp InputOTPGroup, InputOTPSlot } from "input-otp"
// import InputOTP from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"

export default function OtpPage() {
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()
  // const email = localStorage.getItem("signupEmail") || ""

  const handleVerify = () => {
    if (otp.length === 6) {
      // Normally you'd call your backend here to verify OTP
      console.log("OTP Verified:", otp)
      navigate("/onboard") // or any next route
    } else {
      alert("Please enter the full 6-digit code.")
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="bg-[#0f0f0f] flex flex-col justify-center items-center text-white px-6">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
         <div className="flex justify-center">
          <div className="flex items-center space-x-2 mb-6 ">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg"></div>
            <h1 className="text-xl font-semibold">Basesign</h1>
          </div>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Verify your email</h2>
            <p className="text-gray-400 text-sm">
              We’ve sent a 6-digit code to your email
              {/* <span className="font-medium text-white">{email}</span> */}
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(val) => setOtp(val)}
            >
              <InputOTPGroup className="flex gap-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-12 h-12 border border-gray-700 text-xl text-center bg-[#1a1a1a] text-white rounded-lg focus:outline-none focus:border-pink-500"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
           

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Verify
          </Button>

          <p className="text-gray-400 text-sm text-center">
            Didn’t receive the code?{" "}
            <button className="text-blue-400 hover:underline">
              Resend
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#101010] via-[#1a1a1a] to-[#ff7ae5] text-white">
        <div className="text-center px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <p className="text-lg font-medium">
              Secure your account with OTP verification 🔒
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
