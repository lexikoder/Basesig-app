import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Or your own button
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Check } from "lucide-react";


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
    status: "Pending",
    createdAt: "2025-10-01",
    completedAt: "2025-10-05",
  },
  {
    id: "C-002",
    signers: ["AB", "CD"],
    status: "Pending",
    createdAt: "2025-09-20",
    completedAt: "2025-09-25",
  },
];

export default function ContractsPage() {
    const [open, setOpen] = useState(false);
    // const [open, setOpenPending] = useState(false);
    const [copied, setCopied] = useState(null);
    const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
    
   <div className="min-h-screen bg-[#0f0f0f] text-white p-6 ">
  <div className="max-w-6xl mx-auto bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 ">
    <h2 className="text-xl font-semibold mb-6">Pending Contracts</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#232323] text-gray-300 text-left">
            <th className="py-3 px-4 border-b border-gray-700">Contract ID</th>
            <th className="py-3 px-4 border-b border-gray-700">Signers</th>
            <th className="py-3 px-4 border-b border-gray-700">Status</th>
            <th className="py-3 px-4 border-b border-gray-700">Created At</th>
            <th className="py-3 px-4 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingContracts.map((contract, index) => (
            <tr key={index} className="hover:bg-[#2a2a2a] transition-all border-b border-gray-700">
              <td className="py-3 px-4">{contract.id}</td>
              <td className="py-3 px-4 flex space-x-2">
                {contract.signers.map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white flex items-center justify-center text-xs font-bold"
                  >
                    {initials}
                  </div>
                ))}
              </td>
              <td className="py-3 px-4 text-red-300">{contract.status}</td>
              <td className="py-3 px-4 text-gray-400">{contract.createdAt}</td>
              <td className="py-3 px-4">
                <Link
                        to="/dashboard/contracts/signonchain"
                        className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium shadow-md transition-all hover:opacity-90 hover:shadow-lg hover:scale-[1.02]"
                      >Sign OnChain</Link>
                {/* <Button
                  // onClick={() => setOpenPending(true)}
                  className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
                >
                  Sign OnChain
                </Button> */}
              </td>
            </tr>
          ))}
          {pendingContracts.length === 0 && (
            <tr>
              <td className="text-center text-gray-500 py-6" colSpan={5}>
                No pending contracts yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* DIALOG - reuse or add another */}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-auto bg-[#0f0f0f] text-white">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-white">Signed Contract Onchain</DialogTitle>
        </DialogHeader>

        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 text-gray-300">
          {activities.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent activity yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#232323] text-gray-300 text-left">
                    <th className="py-3 px-4 border-b border-gray-700">Transaction Hash</th>
                    <th className="py-3 px-4 border-b border-gray-700">Contract ID</th>
                    <th className="py-3 px-4 border-b border-gray-700">Email</th>
                    <th className="py-3 px-4 border-b border-gray-700">Document Hash</th>
                    <th className="py-3 px-4 border-b border-gray-700">Document Name</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={index} className="hover:bg-[#2a2a2a] transition-all border-b border-gray-700">
                      <td className="py-3 px-4 text-pink-400 truncate max-w-[200px]">
                        <span className="truncate max-w-[180px] text-pink-400">
                          {activity.transactionHash}
                        </span>
                        <button
                          onClick={() => handleCopy(activity.transactionHash, `tx-${index}`)}
                          className="p-1 hover:text-pink-400 transition"
                          title="Copy"
                        >
                          {copied === `tx-${index}` ? (
                            <Check size={16} className="text-green-400" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4">{activity.contractId}</td>
                      <td className="py-3 px-4">{activity.email}</td>
                      <td className="py-3 px-4 truncate max-w-[200px]">{activity.documentHash}</td>
                      <td className="py-3 px-4">{activity.documentName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <br />
          Contract Document:
          <br />
          <Button
                            size="sm"
                            variant="outline"
                            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90" 
                            onClick={() => setOpen(true)}
                          >
                            View Docs
                          </Button>
        </div>
      </DialogContent>
     
    </Dialog>

  <br />
  <br />
    {/* COMPLETED CONTRACTS */}
    <h2 className="text-xl font-semibold mb-6">Completed Contracts</h2>
    <div className="overflow-x-auto mb-10">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#232323] text-gray-300 text-left">
            <th className="py-3 px-4 border-b border-gray-700">Contract ID</th>
            <th className="py-3 px-4 border-b border-gray-700">Signers</th>
            <th className="py-3 px-4 border-b border-gray-700">Status</th>
            <th className="py-3 px-4 border-b border-gray-700">Created At</th>
            <th className="py-3 px-4 border-b border-gray-700">Completed At</th>
            <th className="py-3 px-4 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, index) => (
            <tr key={index} className="hover:bg-[#2a2a2a] transition-all border-b border-gray-700">
              <td className="py-3 px-4">{contract.id}</td>
              <td className="py-3 px-4 flex space-x-2">
                {contract.signers.map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white flex items-center justify-center text-xs font-bold"
                  >
                    {initials}
                  </div>
                ))}
              </td>
              <td className="py-3 px-4 text-green-400">{contract.status}</td>
              <td className="py-3 px-4 text-gray-400">{contract.createdAt}</td>
              <td className="py-3 px-4 text-gray-400">{contract.completedAt}</td>
              <td className="py-3 px-4">
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
                >
                  View More
                </Button>
              </td>
            </tr>
          ))}
          {contracts.length === 0 && (
            <tr>
              <td className="text-center text-gray-500 py-6" colSpan={6}>
                No completed contracts yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>

    {/* PENDING CONTRACTS */}
    

  </div>
</div>

    </>
  );
}
