import React from "react";
import { Button } from "@/components/ui/button"; // Use your Button component or ShadCN
import { ArrowRight } from "lucide-react";
import { ChevronDown, LogOut } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
// // import pdf from "@/assets/ifeanyi.pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
// // import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
// // import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
// // pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function DocsViewmore() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
     const [open, setOpen] = useState(false);
    const allContracts = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Example: 9 total contracts
    const visibleContracts = showAll ? allContracts : allContracts.slice(0, 3);
  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-[#141414] p-6 border-r border-gray-800">
        <h1 className="text-2xl font-bold text-white mb-10">BaseSign</h1>
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
      
        <div className="flex justify-end mb-6">
       
        </div>
       

        {/* Agreements Section */}
        <div className="mb-12">
            <Link
        to="/dashboard/home"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] text-gray-300 border border-gray-700 hover:border-pink-500 hover:text-white transition-all hover:shadow-lg hover:scale-[1.02]"
      >
        <ArrowLeft size={18} />
        {/* Back to Dashboard */}
      </Link>
      {/* <br /> */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Agreements</h3>
            {/* <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
            >
              Create Contract
            </Button> */}
          </div>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleContracts.map((_, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 hover:border-pink-500/40 transition-all"
              >
                <h4 className="text-white text-md font-medium mb-2">NDA Contract</h4>
                <div className="h-56 overflow-hidden border border-gray-600 rounded mb-4">
        {/* <Document file="/ifeanyi.pdf">
          <Page pageNumber={1} width={300} />
        </Document> */}

        <Document
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
          {/* <Link to="/dashboard/wallet" className="block hover:text-pink-500">View more</Link> */}
          <Button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
          >
            {showAll ? "View Less" : "View More"}
          </Button>
        </div>
      )}
          </div>
        </div>

       
      </main>
    </div>
  );
}
