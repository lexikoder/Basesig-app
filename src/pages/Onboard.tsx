import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import countries from "world-countries"
// import Select from "react-select";  
// import CountrySelect from "@/components/Countries";

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState("")
  const [country, setCountry] = useState("")
  const [approvedId, setApprovedId] = useState("")
  // const [country, setCountry] = useState("")


  const handleOnboarding = () => {
    // firstName && lastName && role && country && approvedId
    if (firstName && lastName && role  && approvedId) {
      // Handle the onboarding process, e.g., send data to backend
      console.log("Onboarding with:", { firstName, lastName, role, country, approvedId })
      localStorage.setItem("userDetails", JSON.stringify({ firstName, lastName, role, country, approvedId }))
      navigate("/createpassword") // Navigate to the next step of onboarding
    } else {
      alert("Please fill in all fields.")
    }
  }
 
  // Format countries for react-select
// const formattedCountries = countries.map((country) => ({
//   label: country.name.common,
//   value: country.cca2,
// })) 

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="bg-[#0f0f0f] flex flex-col justify-center items-center text-white px-6">
        <div className="w-full max-w-sm space-y-8">

          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg"></div>
            <h1 className="text-xl font-semibold">Basesign</h1>
          </div>
          {/* Title */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Onboarding</h2>
            <p className="text-gray-400 text-sm">Complete the fields below to continue</p>
          </div>

          {/* First Name */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">First Name</label>
              <Input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#1a1a1a] text-white border-gray-700"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Last Name</label>
              <Input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#1a1a1a] text-white border-gray-700"
              />
            </div>

            {/* Role */}
            {/* <div>
              <label className="block text-sm text-gray-400 mb-1">Who are you registering as?</label>
              <Input
                type="text"
                placeholder="Enter your role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-[#1a1a1a] text-white border-gray-700"
              />
            </div> */}
            <div>
  <label className="block text-sm text-gray-400 mb-1">Who are you registering as?</label>
  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-md px-3 py-2"
  >
    <option value="">Select your role</option>
    <option value="Business">Business</option>
    <option value="Vendor">Vendor</option>
    <option value="Lender">Lender</option>
  </select>
</div>

            {/* Country */}
            {/* <div>
              <label className="block text-sm text-gray-400 mb-1">Country</label>
              <Input
                type="text"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-[#1a1a1a] text-white border-gray-700"
              />
            </div> */}

            {/* Country Selector */}
{/* <div>
  <label className="block text-sm text-gray-400 mb-1">Country</label>
  <Select
    options={formattedCountries}
    value={formattedCountries.find((c) => c.value === country)}
    onChange={(selected) => setCountry(selected?.value)}
    className="text-black"
    classNamePrefix="select"
    placeholder="Select your country"
  />
</div> */}
{/* <CountrySelect country={country} setCountry={setCountry} /> */}
            {/* Approved ID */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Approved ID</label>
              <Input
                type="text"
                placeholder="Enter your approved ID"
                value={approvedId}
                onChange={(e) => setApprovedId(e.target.value)}
                className="bg-[#1a1a1a] text-white border-gray-700"
              />
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleOnboarding}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Continue
          </Button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#101010] via-[#1a1a1a] to-[#ff7ae5] text-white">
        <div className="text-center px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <p className="text-lg font-medium">Complete your onboarding process</p>
          </div>
        </div>
      </div>
    </div>
  )
}
