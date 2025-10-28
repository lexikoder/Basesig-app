import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";


// Dummy contract data
const contracts = [
  {
    id: "C-001",
    signers: ["UI", "XI"],
    status: "Completed",
    createdAt: "2025-10-01",
    completedAt: "2025-10-05",
  },
  {
    id: "C-002",
    signers: ["AB", "CD"],
    status: "Completed",
    createdAt: "2025-09-20",
    completedAt: "2025-09-25",
  },
];

const activities = [
  {
    transactionHash: "0x12a4b8f9cde56...",
    contractId: "C-0932",
    email:"uzorifeanyi1011@gmail.com",
    documentHash: "bafkreigh2akiscaildc...",
    documentName: "NDA Agreement.pdf",
  },
  {
    transactionHash: "0x12a4b8f9cde56...",
    contractId: "C-0932",
    email:"uzorifeanyi1011@gmail.com",
    documentHash: "bafkreigh2akiscaildc...",
    documentName: "NDA Agreement.pdf",
  }
]

const pendingContracts = [
  {
    id: "C-001",
    signers: ["UI", "XI"],
    Contractdocs: "International sales contract",
    createdAt: "2025-09-20",
    completedAt: "2025-09-25",
    
  },
  {
    id: "C-002",
    signers: ["AB", "CD"],
    Contractdocs: "International sales contract",
    createdAt: "2025-09-20",
    completedAt: "2025-09-25",
    
  },
];

interface ContractData {
  _id: string;
  contractid: string;
  documenthash: string;
  contractname: string;
  signerid: string;
  recipientid: string;
  signerstatus: "signed" | "pending" | "rejected"; // you can extend this
  recipientstatus: "signed" | "pending" | "rejected";
  expiresin: string;
  documenturl: string;
  requestearlyfundasset: string;
  paymentstatus: "pending" | "completed" | "failed"; // possible values
  createdAt: string;
  updatedAt: string;
  participants:[string]
  __v: number;
  createdat: string;
  signerTxonchain?: string;
  recipientTxonchain?: string;
  completedAt?: string;
  contractcompleted: boolean;
}






export default function ContractFinancingPage() {
    const [open, setOpen] = useState(false);
    // const [open, setOpenPending] = useState(false);
    const [copied, setCopied] = useState(null);
    const [getallcompleted, setgetallcompleted] = useState<ContractData[]>([]);
    const [getallcompletedforfinance, setgetallcompletedforfinance] = useState<ContractData[]>([]);
    const [loading, setLoading] = useState(true);
    const handleCopy = async (text,label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
      const fetchUsers = async () => {
        try {
          

        
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/contract/getallcompletedusercontract`, {
            withCredentials: true, // 👈 if backend sends cookies
          });
          const res2 = await axios.get(`${import.meta.env.VITE_API_URL}/api/contract/getallcompletedusercontractforfinancing`, {
            withCredentials: true, // 👈 if backend sends cookies
          });
          
          console.log(res.data.data)
          console.log(res2.data.data)
          setgetallcompleted(res.data.data);
          setgetallcompletedforfinance(res2.data.data)
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

  return (
    <>
    
   <div className="min-h-screen bg-[#0f0f0f] text-white p-6 ">
  <div className="max-w-6xl mx-auto bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 ">
    <h2 className="text-xl font-semibold mb-6">Contract financing application</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#232323] text-gray-300 text-left">
            <th className="py-3 px-4 border-b border-gray-700">Contract ID</th>
            <th className="py-3 px-4 border-b border-gray-700">Signers</th>
            <th className="py-3 px-4 border-b border-gray-700">Contract Docs</th>
            <th className="py-3 px-4 border-b border-gray-700">Created at</th>
            <th className="py-3 px-4 border-b border-gray-700">Completed at</th>
            <th className="py-3 px-4 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {getallcompleted.map((contract, index) => (
            <tr key={index} className="hover:bg-[#2a2a2a] transition-all border-b border-gray-700">
              <td className="py-3 px-4">{contract.contractid}</td>
              <td className="py-3 px-4 flex space-x-2">
                
                  {contract.participants.map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white flex items-center justify-center text-xs font-bold"
                  >
                    {initials}
                  </div>
                ))}
              
              </td>
              <td className="py-3 px-4 text-red-300">{contract.contractname}</td>
              <td className="py-3 px-4 text-red-300">{contract.createdat}</td>
              <td className="py-3 px-4 text-red-300">{contract.completedAt}</td>
              
              <td className="py-3 px-4">
                <Link
                        to={`/dashboard/contract-financing/apply/${contract.contractid}`}
                        className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium shadow-md transition-all hover:opacity-90 hover:shadow-lg hover:scale-[1.02]"
                      >Apply for early payment</Link>
                {/* <Button
                  // onClick={() => setOpenPending(true)}
                  className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
                >
                  Sign OnChain
                </Button> */}
              </td>
            </tr>
          ))}
          {getallcompleted.length === 0 && (
            <tr>
              <td className="text-center text-gray-500 py-6" colSpan={5}>
                No contracts yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>



  <br />
  <br />
    {/* COMPLETED CONTRACTS */}
   

    {/* PENDING CONTRACTS */}
    
  

  </div>

   <div className="max-w-6xl mx-auto bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 ">
    <h2 className="text-xl font-semibold mb-6">Contract Financing Request</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#232323] text-gray-300 text-left">
            <th className="py-3 px-4 border-b border-gray-700">Contract ID</th>
            <th className="py-3 px-4 border-b border-gray-700">Signers</th>
            <th className="py-3 px-4 border-b border-gray-700">Contract Docs</th>
            <th className="py-3 px-4 border-b border-gray-700">Created at</th>
            <th className="py-3 px-4 border-b border-gray-700">Completed at</th>
            <th className="py-3 px-4 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {getallcompletedforfinance.map((contract, index) => (
            <tr key={index} className="hover:bg-[#2a2a2a] transition-all border-b border-gray-700">
              <td className="py-3 px-4">{contract.contractid}</td>
              <td className="py-3 px-4 flex space-x-2">
                
                  {contract.participants.map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white flex items-center justify-center text-xs font-bold"
                  >
                    {initials}
                  </div>
                ))}
                
              </td>
              <td className="py-3 px-4 text-red-300">{contract.contractname}</td>
              <td className="py-3 px-4 text-red-300">{contract.createdat}</td>
              <td className="py-3 px-4 text-red-300">{contract.completedAt}</td>
              
              <td className="py-3 px-4">
                <Link
                        to={`/dashboard/contract-financing/finance-request/${contract.contractid}`}
                        className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium shadow-md transition-all hover:opacity-90 hover:shadow-lg hover:scale-[1.02]"
                      >Finance payment request</Link>
                {/* <Button
                  // onClick={() => setOpenPending(true)}
                  className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
                >
                  Sign OnChain
                </Button> */}
              </td>
            </tr>
          ))}
          {getallcompletedforfinance.length === 0 && (
            <tr>
              <td className="text-center text-gray-500 py-6" colSpan={5}>
                No contracts yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

   
    
  

  </div>
</div>

    </>
  );
}
