import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Otp from "./pages/Otp";
import LoginPage from "./pages/Login";
// import BioDataPage from "./pages/Onboard";
import Onboard from "./pages/Onboard";
import OnboardingPage from "./pages/Onboard";
import CreatePasswordPage from "./pages/CreatePassword";
import WelcomePage from "./pages/WelcomePage";
// import Landing from "./pages/landingpage";
import UseCasesPage from "./pages/Usecase";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./pages/DashboardLayout";
import Wallet from "./pages/Contracts";
import DocsViewmore from "./pages/Docsviewmore";
import SignContractPage from "./pages/Signonchain";
import ContractsPage from "./pages/Contracts";
import SignOnchainsecond from "./pages/SignonchainSecond";
import WalletPage from "./pages/Wallet";
import ContractFinancingPage from "./pages/Contractfinacing";
import Applyforearlypayment from "./pages/Applyforearlypayment";
import FinanacepaymentRequest from "./pages/FinanacepaymentRequest";
import FinancedpaymentPage from "./pages/FInancedcontracts";
import MakepaymentPage from "./pages/makepayment";
import Makepayment from "./pages/Makepaymentpage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Providers } from "./providers";


// import { OnchainKitProvider } from "@coinbase/onchainkit";
// import { WagmiProvider } from "wagmi";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { config } from "./wagmiConfig";
// import { baseSepolia } from "viem/chains";

const App = () => {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }));


return (
  // <WagmiProvider config={config}>
  <Providers>
  <QueryClientProvider client={queryClient}>
    {/* <OnchainKitProvider chain={baseSepolia}  > */}
    
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={ 
            <ProtectedRoute>
            <DashboardLayout />
            </ProtectedRoute>
            }>
          <Route index element={<Dashboard />} />
          <Route path="contracts" element={<ContractsPage />} />
          <Route path="viewmoredocs" element={<DocsViewmore/>} />
          <Route path="Signcontractonchain" element={<SignContractPage/>} />
          <Route path="contracts/signonchain/:contractid" element={<SignOnchainsecond />} />
           <Route path="wallet" element={<WalletPage />} />
           <Route path="contract-financing" element={<ContractFinancingPage/>} />
           <Route path="contract-financing/finance-request/:contractid" element={<FinanacepaymentRequest/>} />
           <Route path="financed-contract" element={<FinancedpaymentPage/>} />
           <Route path="contract-financing/apply/:contractid" element={<Applyforearlypayment/>} />
           <Route path="make-payment" element={<MakepaymentPage/>} />
           <Route path="make-payment/pay" element={<Makepayment/>} />
           
           <Route path="*" element={<NotFound />} />
        </Route>

         <Route path="/" element={<Index />}/>
          <Route path="/otp" element={<Otp />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/onboard" element={<OnboardingPage/>}/>
          <Route path="/createpassword" element={<CreatePasswordPage/>}/>
          <Route path="/welcome" element={<WelcomePage/>}/>
          {/* <Route path="/landing" element={<Landing/>}/> */}
           <Route path="/usecase" element={<UseCasesPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
      </Routes>
          {/* <Route path="/" element={<Index />}/>
          <Route path="/otp" element={<Otp />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/onboard" element={<OnboardingPage/>}/>
          <Route path="/createpassword" element={<CreatePasswordPage/>}/>
          <Route path="/welcome" element={<WelcomePage/>}/>
          <Route path="/landing" element={<Landing/>}/>
           <Route path="/usecase" element={<UseCasesPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* <Route path="*" element={<NotFound />} /> */}
        {/* </Routes> */}
      </BrowserRouter>
    </TooltipProvider>
    {/* </OnchainKitProvider> */}
  </QueryClientProvider>
  </Providers>
  
  );
};

export default App;

// // import { OnchainProvider } from "@coinbase/onchainkit";
// // import { WagmiProvider } from "wagmi";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { config } from "./wagmiConfig";

// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <OnchainProvider>
//           <MyApp />
//         </OnchainProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }
