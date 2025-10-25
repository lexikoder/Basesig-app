import React, { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Use your Button component or ShadCN
import { ArrowRight } from "lucide-react";
import { ChevronDown, LogOut } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import {useWaitForTransactionReceipt, useWriteContract ,useReadContract,useSendTransaction,useBalance} from 'wagmi';
import {useCapabilities, useWriteContracts } from "wagmi/experimental";
import { Copy, Check } from "lucide-react";
import axios from "axios";
// import { ConnectButton } from "@coinbase/onchainkit/wallet";
// import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
// // import pdf from "@/assets/ifeanyi.pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
// // import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
// // import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
// // pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();



const activities = [
  {
    transactionHash: "0x12a4b8f9cde56...",
    contractId: "C-0932",
    documentHash: "bafkreigh2akiscaildc...",
    documentName: "NDA Agreement.pdf",
  },
  {
    transactionHash: "0x12a4b8f9cde56...",
    contractId: "C-0932",
    documentHash: "bafkreigh2akiscaildc...",
    documentName: "NDA Agreement.pdf",
  },
  {
    transactionHash: "0x12a4b8f9cde56...",
    contractId: "C-0932",
    documentHash: "bafkreigh2akiscaildc...",
    documentName: "NDA Agreement.pdf",
  },
  {
    transactionHash: "0x12a4b8f9cde56...",
    contractId: "C-0932",
    documentHash: "bafkreigh2akiscaildc...",
    documentName: "NDA Agreement.pdf",
  },
  {
    transactionHash: "0x12a4b8f9cde56...",
    contractId: "C-0932",
    documentHash: "bafkreigh2akiscaildc...",
    documentName: "NDA Agreement.pdf",
  },
  {
    transactionHash: "0x12a4b8f9cde56...",
    contractId: "C-0932",
    documentHash: "bafkreigh2akiscaildc...",
    documentName: "NDA Agreement.pdf",
  },
];

interface DataType {
  documenthash :string
  contractid:string
  contractname :string
  signerTxonchain:string
}

export default function Dashboard() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
     const [open, setOpen] = useState(false);
     const [copied, setCopied] = useState(null);
     const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const {isConnected} = useAccount()
  const [users, setUsers] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [activities, setactivities] = useState<DataType[]>([]);
  const shortenAddress = (addr: string) => {
    if (!addr){
      return ""
    }
    return `${addr?.slice(0, 6)}...${addr?.slice(-4)}`;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/getuserinfo`, {
          withCredentials: true, // 👈 if backend sends cookies
        });
        const res2 = await axios.get(`${import.meta.env.VITE_API_URL}/api/contract/getallactivities`, {
          withCredentials: true, // 👈 if backend sends cookies
        });
        
        console.log(res.data.data)
        console.log(res2.data.data)
        setUsers(res.data.data.name);
        setactivities(res2.data.data)
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

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
    const allContracts = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Example: 9 total contracts
    const visibleContracts = showAll ? allContracts : allContracts.slice(0, 3);
  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-[#141414] p-6 border-r border-gray-800">
        <h1 className="text-2xl font-bold text-white mb-10">basesig</h1>
        <nav className="space-y-4 text-gray-400">
          {["Home", "Contracts", "Messenger", "Wallet", "Lend"].map((item) => (
            <div key={item} className="hover:text-pink-500 cursor-pointer">
              {item}
            </div>
          ))}
        </nav>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 p-2">
        {/* Header */}
        <div className="flex justify-end mb-6">
          {/* <div className="relative"> */}
            {/* <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-[#1a1a1a] px-4 py-2 rounded-full border border-gray-700 hover:border-pink-500 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white flex items-center justify-center text-sm font-bold">
                UZ
              </div>
            
            </button> */}

            {/* {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg z-50">
                <button
                  onClick={() => console.log("Logout clicked")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-pink-500 hover:bg-[#232323] flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )} */}
          {/* </div> */}
        </div>
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6">
        <div className="flex  justify-between items-center mb-10">
          <div>
            <h2 className="text-xl font-semibold">Welcome back</h2>
            <div className="flex items-center mt-2 space-x-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
        {/* You can replace this with <img src={user.avatar} /> if you have images */}
        {users.split(" ").map(name => name[0]).join("") .toUpperCase()}
      </div>
      <div>
        <p className="text-white font-medium">{users}</p>
        <div>
          {account.status === 'disconnected' ?<Link to={`https://www.base.org/names`} className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium shadow-md transition-all hover:opacity-90 hover:shadow-lg hover:scale-[1.02]" >Get A Base NAme</Link>:`${users.split(" ")[0].toLowerCase()}.base.eth`}
        </div>
        <p className="text-gray-500 text-sm">{shortenAddress(account.address)}</p>

      </div>
    {/* */}
    </div>
          </div>
         

{account.status === 'connected' && (
          <Button type="button" onClick={() => disconnect()}className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90">
            Disconnect
          </Button>
        )}
      {account.status === 'disconnected'  && connectors.map((connector) => (
           <Button  key={connector.uid}
           onClick={() => connect({ connector })}
           type="button" className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90">
           
         Connect Wallet
           
         </Button>
        
        ))}
      
  

          {/* <Button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90">
            Create Signature
          </Button> */}
        </div>
        </div> 

        {/* Agreements Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Agreements</h3>
            <Link
             to="/dashboard/signcontractonchain"
  className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium shadow-md transition-all hover:opacity-90 hover:shadow-lg hover:scale-[1.02]"
            >
              Upload Contract Onchain
            </Link>
          </div>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleContracts.map((_, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 hover:border-pink-500/40 transition-all"
              >
                <h4 className="text-white text-md font-medium mb-2">International sales contract</h4>
                <div className="h-56 overflow-hidden border border-gray-600 rounded mb-4">
        {/* <Document file="/ifeanyi.pdf">
          <Page pageNumber={1} width={300} />
        </Document> */}

        <Document
        // {visibleContracts[index].documenturl}
  file="/ifeanyi.pdf"
  onLoadSuccess={() => console.log('PDF loaded')}
  onLoadError={(error) => console.error('Failed to load PDF:', error)}
>
  <Page pageNumber={1} width={400} />
</Document>
      </div>
      
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-black" 
                  onClick={() => setOpen(true)}
                >
                  View Docs
                </Button>
                <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl h-[80vh] p-0">
          {/* <DialogHeader className="p-4 border-b"> */}
            {/* <DialogTitle>Document Viewer</DialogTitle> */}
          {/* </DialogHeader> */}

          {/* PDF Viewer */}
          <div className="w-full h-full">
            <iframe
              src="/ifeanyi.pdf"
              title="Document"
              className="w-full h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
                
              </div>
              
            ))}
            {allContracts.length > 3 && (
        <div className="mt-8">
          {/* <Link
  to="/dashboard/viewmoredocs"
  className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium shadow-md transition-all hover:opacity-90 hover:shadow-lg hover:scale-[1.02]"
>
  View More
</Link> */}
          {/* <Button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
          >
            {showAll ? "View Less" : "View More"}
          </Button> */}
        </div>
      )}
          </div>
        </div>

        {/* Recent Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
           <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 text-gray-300">
      <h3 className="text-lg font-semibold mb-4 text-white"></h3>

      {activities.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent activity yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#232323] text-gray-300 text-left">
                <th className="py-3 px-4 border-b border-gray-700">Transaction Hash</th>
                <th className="py-3 px-4 border-b border-gray-700">Contract ID</th>
                <th className="py-3 px-4 border-b border-gray-700">Document Hash</th>
                <th className="py-3 px-4 border-b border-gray-700">Document Name</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#2a2a2a] transition-all border-b border-gray-700"
                >
                  <td className="py-3 px-4 text-pink-400 truncate max-w-[200px]">
                     <button
                      onClick={() =>
                        handleCopy(activity.signerTxonchain, `tx-${index}`)
                      }
                      className="p-1 hover:text-pink-400 transition"
                      title="Copy"
                    >
                      {copied === `tx-${index}` ? (
                        <Check size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                    <span className="truncate max-w-[180px] text-pink-400">
                      {activity.signerTxonchain}
                    </span>
                   
                  </td>
                  <td className="py-3 px-4">{activity.contractid}</td>
                  <td className="py-3 px-4 truncate max-w-[200px]">
                    {activity.documenthash}
                  </td>
                  <td className="py-3 px-4">{activity.contractname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
        </div>

        {/* Footer */}
        {/* <footer className="mt-16 text-center text-sm text-gray-600 fixed bottom-0  width-full ">
          All rights reserved © 2025
        </footer> */}
      </main>
    </div>
  );
}
