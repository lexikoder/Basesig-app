import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import {  useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  // Wallet,
  DollarSign,
  FileCheck,
  HandCoins,
} from "lucide-react";
import axios from "axios";
import { useContract } from "@/context";

export default function DashboardLayout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()
   const menuItems = [
    { name: "Home", path: "/dashboard", icon: <Home size={18} /> },
    { name: "Contracts", path: "/dashboard/contracts", icon: <FileText size={18} /> },
    // { name: "Wallet", path: "/dashboard/wallet", icon: <Wallet size={18} /> },
    { name: "Contract Financing", path: "/dashboard/contract-financing", icon: <HandCoins size={18} /> },
    { name: "Financed Contracts", path: "/dashboard/financed-contract", icon: <FileCheck size={18} /> },
    // { name: "Refund Payment", path: "/dashboard/make-payment", icon: <DollarSign size={18} /> },
  ];
  //  const [loading, setLoading] = useState(true);
  const location = useLocation();
   const [users, setUsers] = useState<string>();
    const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/getuserinfo`, {
          withCredentials: true, // 👈 if backend sends cookies
        });
       
        
     
        setUsers(res.data.data.name);
        
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
         setLoading(false);
      }
    };

    fetchUsers();
  }, []);

 if (loading)
  return (
    <div className="flex justify-center items-center h-screen bg-[#0a0a0a]">
      <div className="relative">
        {/* Gradient Ring */}
        <div className="w-12 h-12 rounded-full border-4 border-transparent border-t-pink-500 border-r-orange-400 animate-spin"></div>

        {/* Center Glow or Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-xs">
            ⚡
          </div>
        </div>
      </div>
    </div>
  );
  const handleSign = async() => {
        //  
          // console.log("Signing onchain with:", { file, email, expiration });
       
           
        // setOpen(true);
         
          try {
            // console.log(datas.contractid,
            //       writeData)
         const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/contract/logout`, 
                
                //  {headers: { "Content-Type": "multipart/form-data" },
                 {withCredentials: true});
      
           navigate("/login")
          } catch (error) {
            console.error("POST failed:", error);
          } finally {
           
           
          }
        
          
        }
  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      {/* Sidebar */}
     <aside className="w-64 bg-[#141414] p-6 border-r border-gray-800 min-h-screen">
      <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg"></div>
            <h1 className="text-xl font-semibold">Basesig</h1>
          </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90 "
                    : "text-gray-400 hover:text-white hover:bg-[#1f1f1f]"
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-end ">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-[#1a1a1a] px-4 py-2 rounded-full border border-gray-700 hover:border-pink-500 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white flex items-center justify-center text-sm font-bold">
             {users.split(" ").map(name => name[0]).join("").toUpperCase()}
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg z-50">
                <button
                  onClick={() => handleSign()}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-pink-500 hover:bg-[#232323] flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Where page content renders */}
        <Outlet />
      </main>
    </div>
  );
}
