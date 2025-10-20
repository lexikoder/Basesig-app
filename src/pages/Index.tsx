// import React from "react";
// import { Hero } from "@/components/Hero";
// import { Features } from "@/components/Features";
// import { Footer } from "@/components/Footer";

// const Index = () => {
//   return (
//     <div className="min-h-screen">
//       <Hero />
//       <Features />
//       <Footer />
//     </div>
//   );
// };

// export default Index;

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
// import { FcGoogle } from "react-icons/fc"
// import { FaGithub } from "react-icons/fa"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type FormData = z.infer<typeof formSchema>

export default function Signup() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    localStorage.setItem("signupEmail", data.email)
    navigate("/otp")
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="bg-[#0f0f0f] flex flex-col justify-center items-center text-white px-6">
        <div className="w-full max-w-sm space-y-6">
          {/* Logo placeholder */}
          <div className="flex justify-center">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg"></div>
            <h1 className="text-xl font-semibold">Basesign</h1>
          </div>
          </div>

          <h2 className="text-2xl font-semibold text-center">Create an account</h2>

          {/* Social login buttons */}
          <div className="space-y-3">
            {/* <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-transparent text-white border-gray-700 hover:bg-gray-800"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button> */}

            {/* <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-transparent text-white border-gray-700 hover:bg-gray-800"
            >
              <FaGithub className="text-xl" />
              Continue with GitHub
            </Button> */}
          </div>

          

          {/* Email form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="bg-[#1a1a1a] border-gray-700 text-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* <p className="text-gray-400 text-xs">
              By continuing, you agree to the{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p> */}

            <Button
              type="submit" onClick={() => navigate("/otp")}
              className="w-full bg-white text-black hover:bg-gray-200"
            >
              Continue
            </Button>
          </form>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-700" />
            <span className="text-gray-400 text-sm">OR</span>
            <div className="h-px flex-1 bg-gray-700" />
          </div>
          <p className="text-gray-400 text-sm text-center">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#101010] via-[#1a1a1a] to-[#ff7ae5] text-white">
        <div className="text-center px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <p className="text-lg font-medium">
            Create an account to  upload your contracts securely on-chain 🔐
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}