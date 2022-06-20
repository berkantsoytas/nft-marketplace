import { MetaMaskInpageProvider } from "@metamask/providers";
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { createDefaultState, loadContract, Web3State } from "./utils";
import { ethers } from "ethers";
import { setupHooks } from "@hooks/web3/setupHooks";

const Web3Context = createContext<Web3State>(createDefaultState());

// type props
interface Web3ProviderProps {
  children: React.ReactNode;
}

const Web3Provider: FunctionComponent<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const contract = await loadContract("NftMarket", provider);
      setWeb3({
        isLoading: false,
        contract,
        ethereum: window.ethereum,
        provider,
        hooks: setupHooks({ ethereum: window.ethereum, contract, provider }),
      });
    }

    initWeb3();
  }, []);

  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
