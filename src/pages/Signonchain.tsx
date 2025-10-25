import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Replace with your Button
import { UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input"; // You can create or import this
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Document, Page, pdfjs } from 'react-pdf';
import axios from "axios";
import {useAccount, useWriteContract,useWaitForTransactionReceipt,useSendTransaction } from 'wagmi'
import abi from "../Abi.json";
import { Abi } from "viem";
import { baseSepolia } from "viem/chains";
interface DataType {
  contractid: string;
  documenthash: string;
}

export default function SignContractPage() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [contractname, setContractName] = useState("");
  const [expiration, setExpiration] = useState("7");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [error, setError] = useState("");       // 🧩 State to hold error message
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [datas, setDatas] = useState();
  const [datas, setDatas] = useState<DataType | null>(null);
  const {address} = useAccount();
  const { data: writeData, writeContractAsync } = useWriteContract();
  const { data: receipt } = useWaitForTransactionReceipt({
    hash: writeData,
  });
console.log(address)
  const handleUpload = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
console.log(file)
  };
  
  const handleSign = async(e) => {
  //  
    // console.log("Signing onchain with:", { file, email, expiration });
    if (!datas) {
  console.error("datas is undefined");
  return;
}
      const txhash =     await writeContractAsync(
      {
        abi,
        address: '0xaa4FF9b3b0659Dd0d96D40026805BF54FF7B84Ff',
        functionName: 'signOnchain',
        args: [
          email,
          datas.contractid,
          datas.documenthash,
          876103385800,
          28,
          "0x5d9f9eb0e7dd60166b5388f74c2ee565c020f26d6afd461f3b7ee17d97dfbd9b",
          "0x0288e4cfd66199771b39c256599219946840a289f6d39490bbf6f6e5934b43e0"
        ],
        chain: baseSepolia,
        account: address
      },
  );
   console.log("hello")
   setOpen(true);
    try {
      console.log(datas.contractid,
            writeData)
   const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/contract/signcontract`, 
           {
            contractid:datas.contractid,
            txOnchain:txhash
           },
          //  {headers: { "Content-Type": "multipart/form-data" },
           {withCredentials: true});

      if (res.status === 201) {
        setSuccess(true); // mark success to display new button
        // setDatas(res.data.data)
      }
    } catch (error) {
      console.error("POST failed:", error);
    } finally {
      setTimeout(() => {
  setOpen(false);
  setOpen2(true);
}, 5000);
     
    }
  
    
  }


  const Upload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

// Append a file
formData.append("file", file)
formData.append("contractname", contractname);
formData.append("recipientemail", email);
formData.append("expiresin",expiration);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/contract/uploaddoc`, formData,
           {headers: { "Content-Type": "multipart/form-data" },
           withCredentials: true});

      if (res.status === 201) {
        setSuccess(true); // mark success to display new button
        setDatas(res.data.data)
      }
    } catch (error) {
      console.error("POST failed:", error);
    } finally {
      setLoading(false);
    }
  };
// const Upload = async(e) => {
//   e.preventDefault();
//         setError("");
//         setSuccess("");
//           try {
//           const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/contract/uploaddoc`, {
//           file,
          
//           }, {withCredentials: true});
    
//         setSuccess("Contract created successfully! 🎉");
//           // navigate("/dashboard" , { replace: true })
    
//         } catch (err) {
//           console.error("Error creating contract:", err);
    
//           // 👇 Display a friendly message to the user
//           if (err.response) {
//             // Server responded with an error
//             setError(err.response.data.error || "Something went wrong on the server.");
//           } else if (err.request) {
//             // No response from the server
//             setError("No response from the server. Please check your connection.");
//           } else {
//             // Request setup issue
//             setError("Error setting up request. Try again later.");
//           }}
//         }
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
          {!success ? 
        <Button
            onClick={Upload}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
          >
            {loading ? "loading..." : "upload"}
          </Button>
          
       
      : (
         <Button
            onClick={handleSign}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
          >
            Sign Onchain
          </Button>
      )}
          
         
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#1a1a1a] text-white p-6">
          <h3 className="text-lg font-semibold mb-4">Signing in progress...</h3>
          <p className="text-gray-400 text-sm">
            We're processing your onchain signature.
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={open2} onOpenChange={setOpen2}>
  <DialogContent className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Signing successful</h3>
    <p className="text-green-100 text-sm">
      You have successfully signed this contract
    </p>
  </DialogContent>
</Dialog>
    </div>
  );
}
