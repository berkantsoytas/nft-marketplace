import { createContext, FunctionComponent, useContext, useState } from "react";

const Web3Context = createContext<any>(null);

// type props
interface Web3ProviderProps {
  children: React.ReactNode;
}

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState({ test: "Hello Provider!" });

  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
