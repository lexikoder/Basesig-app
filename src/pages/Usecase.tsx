import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, Coins, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";

export default function UseCasesPage() {
  const baseSignUseCases = [
    {
      icon: FileText,
      title: "Smart Contract Automation",
      description:
        "Hashfire uses blockchain-based smart contracts to automate receivables financing workflows, ensuring transparent and tamper-proof agreements between vendors and buyers.",
    },
    {
      icon: Shield,
      title: "Secure Document Verification",
      description:
        "Every document uploaded is cryptographically hashed and stored on-chain, allowing instant verification of authenticity and protection from tampering or forgery.",
    },
    {
      icon: Coins,
      title: "On-Chain Receivables Financing",
      description:
        "Vendors can tokenize invoices or approved contracts as collateral and receive early payment through decentralized liquidity providers or institutional investors.",
    },
    // {
    //   icon: TrendingUp,
    //   title: "Liquidity Optimization",
    //   description:
    //     "Businesses improve cash flow by unlocking funds tied in receivables while investors earn yield through short-term, blockchain-secured financing opportunities.",
    // },
    // {
    //   icon: CheckCircle,
    //   title: "End-to-End Transparency",
    //   description:
    //     "Hashfire ensures all participants have real-time visibility of contract status, financing approvals, and payment settlements, reducing disputes and delays.",
    // },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg"></div>
            <h1 className="text-xl font-semibold text-white">Basesign</h1>
          </div>

          <Button
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
            size="sm"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 text-center bg-gradient-to-b from-[#0f0f0f] to-[#141414]">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
              Basesign
            </span>{" "}
            Use Case
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            How Basesign’s digital signature infrastructure powers secure, transparent,
            and compliant blockchain-based receivables financing with Hashfire.
          </p>
        </div>
      </section>

      {/* USE CASE DETAILS */}
      <section className="py-24 bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real-World Impact of{" "}
              <span className="bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
                Basesign
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Basesign’s eSignature and document verification layer help Hashfire build
              trustless financial automation for businesses worldwide.
            </p>
          </div>

          {/* USE CASE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {baseSignUseCases.map((useCase, index) => (
              <Card
                key={index}
                className="bg-[#1a1a1a] border border-gray-700 hover:border-pink-500/40 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <useCase.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-[#0f0f0f] text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">
            Want to build your next{" "}
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
              blockchain use case
            </span>{" "}
            with Basesign?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Get started with secure eSignatures and document validation APIs designed for
            Web3 platforms, fintech apps, and digital businesses.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-gray-800 bg-[#0f0f0f] text-gray-400">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 Basesign. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-pink-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
