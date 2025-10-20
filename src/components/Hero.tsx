import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileCheck, Shield, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import image from "@/assets/image.png";
import {  FileText, Coins, CheckCircle, TrendingUp, } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter } from "lucide-react";
export default function Hero() {
  const features = [
    {
      icon: FileCheck,
      title: "Easy to Use",
      description: "Send and sign documents in just a few clicks. No training required.",
    },
    {
      icon: Shield,
      title: "Legally Binding",
      description: "Bank-level security with legally enforceable electronic signatures.",
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Close deals 80% faster with automated workflows and reminders.",
    },
    {
      icon: Users,
      title: "Collaborate Seamlessly",
      description: "Multiple signers, custom fields, and real-time tracking for teams.",
    },
  ];

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
    }
  ]

  interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Uzor Ifeanyi",
    role: "Founder & CEO",
    image: "https://i.pravatar.cc/150?img=10",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Jane Doe",
    role: "CTO",
    image: "https://i.pravatar.cc/150?img=11",
    linkedin: "#",
    twitter: "#",
  }
];

  return (
    <>
    
       <header className="fixed top-0 left-0 w-full z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg"></div>
            <h1 className="text-xl font-semibold text-white">Basesign</h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-6">
            <button
              // onClick={() => scrollToSection("use-cases")}
              className="text-white hover:text-pink-500 transition-colors text-sm font-medium"
            >
              Use Cases
            </button>
            <Button
              variant="ghost"
              className="text-white hover:text-pink-500 transition-colors text-sm"
            >
              Login
            </Button>
            <Button
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90 text-sm"
              size="sm"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0f0f] text-white">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#ff7ae5]/10" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse" />

        {/* CONTENT */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          {/* Header Tag */}
          <br />
          <br />
          <br />
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gray-700 mb-8">
            <Sparkles className="h-4 w-4 text-pink-500" />
            
            <span className="text-sm font-medium text-gray-300">
              Trusted by businesses globally
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
              eSignatures
            </span>{" "}
            made simple
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Sign, send, and manage your documents securely from anywhere.
            Experience effortless collaboration and trusted verification.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-black "
            >
              Book Demo
            </Button>

             
          </div>
          <br />
          <br />
          <div className="flex flex-col items-center gap-6">
          <img
    src={image}
    alt="Blockradar Dashboard"
    className="rounded-lg shadow-lg max-w-full md:max-w-4xl"
  />
  </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-[#141414] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why businesses choose{" "}
              <span className="bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
                Basesign
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powering fast, secure, and legally compliant digital signatures for every industry.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-[#1a1a1a] border border-gray-700 hover:shadow-lg hover:border-pink-500/40 transition-all duration-300"
              >
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

             <section className="py-24 bg-[#0f0f0f] text-white relative overflow-hidden">
      {/* gradient background accents */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet the{" "}
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
              Basesign Team
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Passionate innovators building secure, seamless, and powerful digital signing solutions for the modern world.
          </p>
        </div>

        {/* Team grid */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="bg-[#1a1a1a]/80 border border-gray-700 rounded-2xl shadow-md hover:shadow-lg hover:border-pink-500/40 transition-all duration-300 text-center"
            >
              <CardContent className="pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full border-2 border-pink-500/50 object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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

      
    </>
  );
}
