import React from "react";
import { Button } from "@/components/ui/button";

export default function SignOnchainsecond() {
  const signers = [
    { id: 1, email: "uzorIfeanyi@gmail.com",name:"uzor Ifeanyi", status: "Signed" },
    { id: 2, email: "leasyB@gmail.com",name:"lexi uzor Ifeanyi" ,status: "Signed" },
  ];

  return (
    <div className=" bg-[#0f0f0f] text-white flex justify-center  p-6">
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-8 w-full max-w-3xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">NDA Contract</h2>

        {/* Document Viewer Placeholder */}
        <div className="bg-[#0f0f0f] border border-gray-700 rounded-lg h-64 flex justify-center items-center text-gray-500 mb-4">
          <p>📄 Document Preview</p>
        </div>

        <div className="flex justify-center mb-6">
          <Button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold hover:opacity-90">
            View Docs
          </Button>
        </div>

        {/* Signer Table */}
        <table className="min-w-full text-sm border-t border-gray-700">
          <thead>
            <tr className="text-gray-300 text-left">
              <th className="py-3">Signer</th>
              <th className="py-3">Email</th>
              <th className="py-3">Name</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {signers.map((signer) => (
              <tr
                key={signer.id}
                className="border-t border-gray-700 hover:bg-[#2a2a2a] transition-all"
              >
                <td className="py-3">{signer.id}</td>
                <td className="py-3">{signer.email}</td>
                <td className="py-3">{signer.name}</td>
                <td
                  className={`py-3 ${
                    signer.status === "Signed" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {signer.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Onchain Section */}
        <div className="mt-6 flex justify-between items-center border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm">
            Sign Onchain: <span className="text-white font-semibold">0.02 ETH</span>
          </p>
          <Button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold hover:opacity-90">
            Sign Onchain
          </Button>
        </div>
      </div>
    </div>
  );
}
