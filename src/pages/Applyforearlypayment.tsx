import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Replace with your Button
import { UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input"; // You can create or import this
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from "react-router-dom";
import axios from "axios";



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

export default function Applyforearlypayment() {
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState("");
  // const [contractname, setContractName] = useState("");
  const [interest, setInterest] = useState("");
  const [Repaymentemail,setRepaymentemail] = useState("");
  // const [open, setOpen] = useState(false);
   const { contractid } = useParams<{ contractid: string }>();
    const [loading, setLoading] = useState(true);
    const [contract, setcontract] = useState<IContract>();
      const [opendocs,setOpendocs] =  useState(false);
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
     
         
      setOpen(true);
       
        try {
          // console.log(datas.contractid,
          //       writeData)
       const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/contract/applyforearlypayment`, 
               {
                contractid:contract.contractid,
                amount ,
                interest ,
                repaymentby:Repaymentemail
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
  const signers = [
    { id: 1, email: "uzorIfeanyi@gmail.com",name:"uzor Ifeanyi", status: "Signed" },
    { id: 2, email: "leasyB@gmail.com",name:"lexi uzor Ifeanyi" ,status: "Signed" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-gray-700 rounded-lg p-8 space-y-6">
        <h2 className="text-xl font-semibold mb-4">{contract.contractname}</h2>
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
                      <th className="py-3">Email</th>
                      <th className="py-3">Name</th>
                      <th className="py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {signers.map((signer) => ( */}
                      <tr
                        // key={signer.id}
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
                    {/* ))} */}
                  </tbody>

                   <tbody>
                    {/* {signers.map((signer) => ( */}
                      <tr
                        // key={signer.id}
                        className="border-t border-gray-700 hover:bg-[#2a2a2a] transition-all"
                      >
                        <td className="py-3">{contract.contractid}</td>
                        <td className="py-3">{contract.recipientid.email}</td>
                        <td className="py-3">{contract.recipientid.companyname}</td>
                        <td
                          className={`py-3 ${
                            contract.signerstatus === "signed" ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {contract.signerstatus}
                        </td>
                      </tr>
                    {/* ))} */}
                  </tbody>
                </table>

     
        
          <Label htmlFor="expiration" className="block text-sm mb-1 text-gray-300">
            Expires In: {7 } Days
          </Label>
         <div>
          <Label htmlFor="assett" className="block text-sm mb-1 text-gray-300">
            Asset Type:
          </Label>
          <Input
            id="asset"
            type="text"
            value="USDC"
            
            
            className="w-full bg-[#0f0f0f] border border-gray-700 text-white"
          />
        </div>
         
        <div>
          <Label htmlFor="amount" className="block text-sm mb-1 text-gray-300">
            Amount to be paid:
          </Label>
          <Input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-[#0f0f0f] border border-gray-700 text-white"
          />
        </div>

        

        {/* Expiration */}
        <div>
          <Label htmlFor="interest" className="block text-sm mb-1 text-gray-300">
            Interst in (%):
          </Label>
          <Input
            id="interest"
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="enter interest in %"
            className="w-full bg-[#0f0f0f] border border-gray-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="repayment" className="block text-sm mb-1 text-gray-300">
            Repayment by:
          </Label>
          <Input
            id="repayment"
            type="text"
            value={Repaymentemail}
            onChange={(e) => setRepaymentemail(e.target.value)}
            placeholder="enter  email of repayer"
            className="w-full bg-[#0f0f0f] border border-gray-700 text-white"
          />
        </div>

        {/* Sign Button */}
        <div className="text-right">
          
          <Button
            onClick={handleSign}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
          >
            Apply for advance payment
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#1a1a1a] text-white p-6">
          <h3 className="text-lg font-semibold mb-4"> in progress...</h3>
          <p className="text-gray-400 text-sm">
            Application for Advance payment in progress
          </p>
        </DialogContent>
      </Dialog>

       <Dialog open={open2} onOpenChange={setOpen2}>
                <DialogContent className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">successful</h3>
                  <p className="text-green-100 text-sm">
                    Applied for advance payment successful
                  </p>
                </DialogContent>
              </Dialog>
    </div>

    
  );
}
