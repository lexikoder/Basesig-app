import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Replace with your Button
import { UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input"; // You can create or import this
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAccount, useWriteContract } from "wagmi";
import { baseSepolia } from "viem/chains";
import abi from "../Erc20Abi.json";

export interface IUser {
  _id: string;
  verificationtype: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  verified: boolean;
  companyname: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IContract {
  _id: string;
  contractid: string;
  documenthash: string;
  contractname: string;
  signerid: IUser;
  recipientid: IUser;
  signerstatus: "pending" | "signed" | "rejected"; // optional union type
  recipientstatus: "pending" | "signed" | "rejected";
  expiresin: string;
  documenturl: string;
  requestearlyfundasset: string;
  paymentstatus: "pending" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function FinanacepaymentRequest() {
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState("");
  const [contractname, setContractName] = useState("");
  const [interest, setInterest] = useState("");
  // const [open, setOpen] = useState(false);
  const { contractid } = useParams<{ contractid: string }>();
      const [loading, setLoading] = useState(true);
      const [contract, setcontract] = useState<IContract>();
       const {address} = useAccount();
         const { data: writeData, writeContractAsync } = useWriteContract();
        
     const [open, setOpen] = useState(false);
       const [open2, setOpen2] = useState(false);
     const [opendocs,setOpendocs] =  useState(false);

  useEffect(() => {
          const fetchUsers = async () => {
            try {
              const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/contract/getcontractdetails/${contractid}`, {
                withCredentials: true, // 👈 if backend sends cookies
              });
              // const res2 = await axios.get(`${import.meta.env.VITE_API_URL}/api/contract/getallactivities`, {
              //   withCredentials: true, // 👈 if backend sends cookies
              // });
              
              console.log(res.data.data)
              // console.log(res2.data.data)
              setcontract(res.data.data);
              // setactivities(res2.data.data)
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


        const handleSign = async(e) => {
      //  
        // console.log("Signing onchain with:", { file, email, expiration });
       const txhash =     await writeContractAsync(
           {
             abi,
             address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
             functionName: 'transfer',
             args: [
              "0x9E1A4104c7e6eE707945532bEd57DFBa36d40Cef",
              "1000000"
             ],
             chain: baseSepolia,
             account: address
           },
       );
         
      setOpen(true);
       
        try {
          // console.log(datas.contractid,
          //       writeData)
       const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/contract/contractfinancing`, 
               {
                contractid:contract.contractid,
                txOnchain:txhash
               },
              //  {headers: { "Content-Type": "multipart/form-data" },
               {withCredentials: true});
    
          if (res.status === 201) {
            // setSuccess(true); // mark success to display new button
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

  // const handleUpload = (e) => {
  //   const uploaded = e.target.files[0];
  //   setFile(uploaded);
  // };

  // const handleSign = () => {
  //   console.log("Signing onchain with:", { file, amount, interest });
  //   setOpen(true);
  // };
  const signers = [
    { id: 1,name:"uzor Ifeanyi",verificationtype:"GovernmentId",verificationstatus:"verified"},
    { id: 2,name:"lexi uzor Ifeanyi",verificationtype:"GovernmentId",verificationstatus:"not yet verified"},
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-gray-700 rounded-lg p-8 space-y-6">
        <h2 className="text-xl font-semibold mb-4">Add Document</h2>
         <div className="flex items-center justify-center w-1/2 h-56 overflow-hidden border border-gray-600 rounded mb-4 mx-auto">
                    <Document
                      file={contract.documenturl}
                      onLoadSuccess={() => console.log("PDF loaded")}
                      onLoadError={(error) => console.error("Failed to load PDF:", error)}
                    >
                      <Page pageNumber={1} width={350}  />
                    </Document>
                  </div>
                          <div className="flex justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-black mb-4"
                      onClick={() => setOpendocs(true)}
                    >
                      View Docs
                    </Button>
                  </div>
                  
                          <Dialog open={opendocs} onOpenChange={setOpendocs}>
                            <DialogContent className="max-w-5xl h-[80vh] p-0">
                              <div className="w-full h-full">
                                <iframe
                                
                                  src={contract.documenturl} // replace with contract.documentUrl if available
                                  title="Document"
                                  className="w-full h-full"
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
        
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
                    
                      <tr
                       
                        className="border-t border-gray-700 hover:bg-[#2a2a2a] transition-all"
                      >
                        <td className="py-3">{contract.contractid}</td>
                        <td className="py-3">{contract.signerid.companyname}</td>
                        <td className="py-3">{contract.signerid.verificationtype}</td>
                        <td className="py-3">{contract.signerid.verified?"verified":"not verified"}</td>
                       
                      </tr>
                  
                  </tbody>
                  <tbody>
                    
                      <tr
                       
                        className="border-t border-gray-700 hover:bg-[#2a2a2a] transition-all"
                      >
                        <td className="py-3">{contract.contractid}</td>
                        <td className="py-3">{contract.recipientid.companyname}</td>
                        <td className="py-3">{contract.recipientid.verificationtype}</td>
                        <td className="py-3">{contract.recipientid.verified?"verified":"not verified"}</td>
                       
                      </tr>
                  
                  </tbody>
                </table>

     
        
          <div className="block text-sm mb-1 text-gray-300">
            Expires In: {7 } Days
          </div>
          <div className="block text-sm mb-1 text-gray-300">
            Asset Type: USDC
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
          <div className="block text-sm mb-1 text-gray-300">
             Repayment by : lexigroups
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
                <h3 className="text-lg font-semibold mb-4">in progress...</h3>
                <p className="text-gray-400 text-sm">
                  Financing request in progress
                </p>
              </DialogContent>
            </Dialog>
      
            <Dialog open={open2} onOpenChange={setOpen2}>
        <DialogContent className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4"> successful</h3>
          <p className="text-green-100 text-sm">
            Successfully financed request
          </p>
        </DialogContent>
      </Dialog>
    </div>

    
  );
}
