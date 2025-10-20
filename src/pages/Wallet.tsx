import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Check, ArrowUpRight, ArrowDownLeft } from "lucide-react";

// Dummy wallet data
const wallet = {
  address: "0x12a4b8f9cde56123456abcd789ef...",
  balance: "2.543 ETH",
};

const transactions = [
  {
    hash: "0x92a4b8f9cde56abcd...123",
    type: "Send",
    amount: "-0.25 ETH",
    to: "0x8f9cde5612a4b8abcd...",
    date: "2025-10-15",
    status: "Completed",
  },
  {
    hash: "0x45f7b8f9cde56abcd...789",
    type: "Receive",
    amount: "+1.00 ETH",
    to: "0x12a4b8f9cde5612abcd...",
    date: "2025-10-10",
    status: "Pending",
  },
];

export default function WalletPage() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleOpenTx = (tx) => {
    setSelectedTx(tx);
    setOpen(true);
  };







    const [address, setAddress] = useState(null);
  const [balances, setBalances] = useState({ ETH: "0.00", USDT: "0.00" });
//   const [copied, setCopied] = useState(false);

  const [sendOpen, setSendOpen] = useState(false);
  const [tokenToSend, setTokenToSend] = useState("ETH");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // 🪙 Fetch wallet info from backend
  const fetchWalletInfo = async () => {
    try {
      const res = await fetch("/api/wallet/info");
      const data = await res.json();
      setAddress(data.address);
      setBalances(data.balances);
    } catch (err) {
      console.error("Failed to load wallet info:", err);
    }
  };

  useEffect(() => {
    fetchWalletInfo();
  }, []);

  // 📋 Copy address
//   const handleCopy = async () => {
//     if (!address) return;
//     await navigator.clipboard.writeText(address);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

  // ✉️ Send Token (calls backend API)
  const handleSend = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/wallet/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: tokenToSend,
          recipient,
          amount,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ ${tokenToSend} sent successfully!`);
        setSendOpen(false);
        setRecipient("");
        setAmount("");
        fetchWalletInfo();
      } else {
        alert(`❌ Failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Send failed:", err);
      alert("❌ Failed to send transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* WALLET HEADER */}
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-gray-400 text-sm">Wallet Address</p>
            <div className="flex items-center gap-2">
              <span className="truncate max-w-[240px] md:max-w-[300px]">
                {wallet.address}
              </span>
              <button onClick={() => handleCopy(wallet.address)} title="Copy">
                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          
        </div>

        {/* TOKEN BALANCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 flex flex-col">
            <span className="text-gray-400 text-sm">ETH Balance</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              {balances.ETH} ETH
            </span>
          </div>
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 flex flex-col">
            <span className="text-gray-400 text-sm">USDT Balance</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              {balances.USDT} USDT
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => setSendOpen(true)}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold hover:opacity-90"
          >
            Send Token
          </Button>
        </div>

        {/* SEND TOKEN MODAL */}
        <Dialog open={sendOpen} onOpenChange={setSendOpen}>
          <DialogContent className="max-w-md bg-[#0f0f0f] text-white">
            <DialogHeader>
              <DialogTitle>Send Token</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Select Token</label>
                <select
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none"
                  value={tokenToSend}
                  onChange={(e) => setTokenToSend(e.target.value)}
                >
                  <option value="ETH">ETH</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Recipient</label>
                <input
                  type="text"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Amount</label>
                <input
                  type="number"
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 focus:outline-none"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <Button
                onClick={handleSend}
                disabled={loading || !amount || !recipient}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold hover:opacity-90"
              >
                {loading ? "Sending..." : `Send ${tokenToSend}`}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

       

        {/* TRANSACTION HISTORY */}
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#232323] text-gray-300 text-left">
                  <th className="py-3 px-4 border-b border-gray-700">Hash</th>
                  <th className="py-3 px-4 border-b border-gray-700">Type</th>
                  <th className="py-3 px-4 border-b border-gray-700">Amount</th>
                  <th className="py-3 px-4 border-b border-gray-700">Date</th>
                  <th className="py-3 px-4 border-b border-gray-700">Status</th>
                  <th className="py-3 px-4 border-b border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No transactions yet.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => (
                    <tr
                      key={tx.hash}
                      className="hover:bg-[#2a2a2a] transition-all border-b border-gray-700"
                    >
                      <td className="py-3 px-4 text-pink-400 truncate max-w-[180px]">
                        {tx.hash}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        {tx.type === "Send" ? (
                          <ArrowUpRight className="text-red-400" size={16} />
                        ) : (
                          <ArrowDownLeft className="text-green-400" size={16} />
                        )}
                        {tx.type}
                      </td>
                      <td
                        className={`py-3 px-4 ${
                          tx.type === "Send" ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {tx.amount}
                      </td>
                      <td className="py-3 px-4 text-gray-400">{tx.date}</td>
                      <td
                        className={`py-3 px-4 ${
                          tx.status === "Completed" ? "text-green-400" : "text-yellow-400"
                        }`}
                      >
                        {tx.status}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
                          onClick={() => handleOpenTx(tx)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* TRANSACTION DETAILS MODAL */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg bg-[#0f0f0f] text-white">
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
            </DialogHeader>
            {selectedTx && (
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <span className="text-gray-500">Hash: </span> {selectedTx.hash}
                </p>
                <p>
                  <span className="text-gray-500">Type: </span> {selectedTx.type}
                </p>
                <p>
                  <span className="text-gray-500">Amount: </span> {selectedTx.amount}
                </p>
                <p>
                  <span className="text-gray-500">To: </span> {selectedTx.to}
                </p>
                <p>
                  <span className="text-gray-500">Date: </span> {selectedTx.date}
                </p>
                <p>
                  <span className="text-gray-500">Status: </span>{" "}
                  <span
                    className={
                      selectedTx.status === "Completed" ? "text-green-400" : "text-yellow-400"
                    }
                  >
                    {selectedTx.status}
                  </span>
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
