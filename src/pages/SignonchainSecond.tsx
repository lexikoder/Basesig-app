import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {useAccount, useWriteContract,useWaitForTransactionReceipt,useSendTransaction } from 'wagmi'
import abi from "../Abi.json";
import { Abi } from "viem";
import { baseSepolia } from "viem/chains";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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


export default function SignOnchainsecond() {
  const { contractid } = useParams<{ contractid: string }>();
  const [loading, setLoading] = useState(true);
  const [contract, setcontract] = useState<IContract>();
    const {address} = useAccount();
    const { data: writeData, writeContractAsync } = useWriteContract();
    const { data: receipt } = useWaitForTransactionReceipt({
      hash: writeData,
    });
 const [open, setOpen] = useState(false);
   const [open2, setOpen2] = useState(false);

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
            address: '0xaa4FF9b3b0659Dd0d96D40026805BF54FF7B84Ff',
            functionName: 'signOnchain',
            args: [
              contract.recipientid.email,
              contract.contractid,
              contract.documenthash,
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
          // console.log(datas.contractid,
          //       writeData)
       const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/contract/signcontract`, 
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

  return (
    <div className=" bg-[#0f0f0f] text-white flex justify-center  p-6">
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-8 w-full max-w-3xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">{contract.contractname}</h2>

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
           
              <tr
              
                className="border-t border-gray-700 hover:bg-[#2a2a2a] transition-all"
              >
                <td className="py-3">{contract.contractid}</td>
                <td className="py-3">{contract.signerid.email}</td>
                <td className="py-3">{contract.signerid.companyname}</td>
                <td
                  className={`py-3 ${
                    contract.signerstatus === "signed" ? "text-green-400" : "text-red-400"
                  }`}
                >
                 {contract.signerstatus}
                </td>
              </tr>
          
          </tbody>
           <tbody>
           
              <tr
                
                className="border-t border-gray-700 hover:bg-[#2a2a2a] transition-all"
              >
                <td className="py-3">{contract.contractid}</td>
                <td className="py-3">{contract.recipientid.email}</td>
                <td className="py-3">{contract.recipientid.companyname}</td>
                <td
                  className={`py-3 ${
                    contract.recipientstatus === "signed" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {contract.recipientstatus}
                </td>
              </tr>
            
          </tbody>
        </table>

        {/* Onchain Section */}
        <div className="mt-6 flex justify-between items-center border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm">
            Sign Onchain: <span className="text-white font-semibold">0.02 ETH</span>
          </p>
          <Button onClick={handleSign} className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold hover:opacity-90">
            Sign Onchain
          </Button>
        </div>

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
    </div>
  );
}
