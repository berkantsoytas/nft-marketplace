import { MetaMaskInpageProvider } from "@metamask/providers";
import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { createDefaultState, Web3State } from "./utils";
import { ethers } from "ethers";

const Web3Context = createContext<Web3State>(createDefaultState());

// type props
interface Web3ProviderProps {
  children: React.ReactNode;
}

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    function initWeb3() {
      setWeb3({ isLoading: false, contract: null, ethereum: window.ethereum, provider });
    }

    initWeb3();
  }, []);

  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
