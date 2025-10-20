import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Replace with your Button
import { UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input"; // You can create or import this
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Document, Page, pdfjs } from 'react-pdf';

export default function FinanacepaymentRequest() {
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState("");
  const [contractname, setContractName] = useState("");
  const [interest, setInterest] = useState("");
  const [open, setOpen] = useState(false);

  const handleUpload = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
  };

  const handleSign = () => {
    console.log("Signing onchain with:", { file, amount, interest });
    setOpen(true);
  };
  const signers = [
    { id: 1,name:"uzor Ifeanyi",verificationtype:"GovernmentId",verificationstatus:"verified"},
    { id: 2,name:"lexi uzor Ifeanyi",verificationtype:"GovernmentId",verificationstatus:"not yet verified"},
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-gray-700 rounded-lg p-8 space-y-6">
        <h2 className="text-xl font-semibold mb-4">Add Document</h2>
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
                      <th className="py-3">Name</th>
                      <th className="py-3">Verification Type</th>
                      <th className="py-3">Verification Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signers.map((signer) => (
                      <tr
                        key={signer.id}
                        className="border-t border-gray-700 hover:bg-[#2a2a2a] transition-all"
                      >
                        <td className="py-3">{signer.id}</td>
                        <td className="py-3">{signer.name}</td>
                        <td className="py-3">{signer.verificationtype}</td>
                        <td className="py-3">{signer.verificationstatus}</td>
                       
                      </tr>
                    ))}
                  </tbody>
                </table>

     
        
          <div className="block text-sm mb-1 text-gray-300">
            Expires In: {7 } Days
          </div>
          <div className="block text-sm mb-1 text-gray-300">
            Asset Type: USDT
          </div>
          <div className="block text-sm mb-1 text-gray-300">
            Amount to be paid: 1000000
          </div>
          <div className="block text-sm mb-1 text-gray-300">
             Interest in (%): 10
          </div>
          <div className="block text-sm mb-1 text-gray-300">
             Early payment : 9000000
          </div>
         
         
       

        

        {/* Expiration */}
       

        {/* Sign Button */}
        <div className="text-right">
          
          <Button
            onClick={handleSign}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
          >
            Finace payment request
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#1a1a1a] text-white p-6">
          <h3 className="text-lg font-semibold mb-4">Signing in progress...</h3>
          <p className="text-gray-400 text-sm">
            We're processing your onchain signature. Please confirm in your wallet.
          </p>
        </DialogContent>
      </Dialog>
    </div>

    
  );
}
