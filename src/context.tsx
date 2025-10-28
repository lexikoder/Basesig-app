import React, { createContext, useState, useContext, ReactNode } from "react";
import { DataTypedocs } from "./types/types";
// import DataTypedocs from "./pages/Dashboard";
// interface Contract {
//   _id: string;
//   contractname: string;
//   documenturl: string;
// }


interface ContractContextType {
  selectedContract: DataTypedocs[]; // <-- now it's an array
  setSelectedContract: React.Dispatch<React.SetStateAction<DataTypedocs[]>>;
}

// ✅ Create the context with a default value
const ContractContext = createContext<ContractContextType | undefined>(undefined);

// ✅ Create the provider
export const ContractProvider = ({ children }: { children: ReactNode }) => {
  const [selectedContract, setSelectedContract] = useState<DataTypedocs[]>([]);

  return (
    <ContractContext.Provider value={{ selectedContract, setSelectedContract }}>
      {children}
    </ContractContext.Provider>
  );
};

// ✅ Custom hook for using the context
export const useContract = (): ContractContextType => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};

