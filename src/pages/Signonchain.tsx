import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Replace with your Button
import { UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input"; // You can create or import this
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Document, Page, pdfjs } from 'react-pdf';

export default function SignContractPage() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [contractname, setContractName] = useState("");
  const [expiration, setExpiration] = useState("7");
  const [open, setOpen] = useState(false);

  const handleUpload = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
  };

  const handleSign = () => {
    console.log("Signing onchain with:", { file, email, expiration });
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-gray-700 rounded-lg p-8 space-y-6">
        <h2 className="text-xl font-semibold mb-4">Add Document</h2>

        {/* Upload */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 p-6 rounded-lg">
          {file ? (
            <div className="h-56 overflow-hidden border border-gray-600 rounded mb-4">
          <Document
  file="/ifeanyi.pdf"
  onLoadSuccess={() => console.log('PDF loaded')}
  onLoadError={(error) => console.error('Failed to load PDF:', error)}
>
  <Page pageNumber={1} width={400} />
</Document>


</div>
          ) : (
            <UploadCloud className="w-12 h-12 text-gray-400 mb-2" />
          )}
          
          <Label
            htmlFor="upload"
            className="cursor-pointer inline-block px-4 py-2 mt-2 rounded bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90 transition"
          >
            {file ? "Change File" : "Upload"}
          </Label>
          
          <input
            id="upload"
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            className="hidden"
          />
        </div>

         <div>
          <Label htmlFor="ContractName" className="block text-sm mb-1 text-gray-300">
            Contract name
          </Label>
          <Input
            id="contractname"
            type="text"
            value={contractname}
            onChange={(e) => setContractName(e.target.value)}
            placeholder="Contract name"
            className="w-full bg-[#0f0f0f] border border-gray-700 text-white"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="block text-sm mb-1 text-gray-300">
            Add recipient signer
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-[#0f0f0f] border border-gray-700 text-white"
          />
        </div>

        

        {/* Expiration */}
        <div>
          <Label htmlFor="expiration" className="block text-sm mb-1 text-gray-300">
            Expires in (Days)
          </Label>
          <Input
            id="expiration"
            type="text"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            placeholder="e.g., 7 days"
            className="w-full bg-[#0f0f0f] border border-gray-700 text-white"
          />
        </div>

        {/* Sign Button */}
        <div className="text-right">
          <p className="text-sm text-gray-400 mb-2">
            Sign onchain · Cost: <span className="text-pink-400">0.002 ETH</span>
          </p>
          <Button
            onClick={handleSign}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
          >
            Sign Onchain
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
