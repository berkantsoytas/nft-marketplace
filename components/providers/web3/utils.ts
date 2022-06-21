import { setupHooks, Web3Hooks } from "@hooks/web3/setupHooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3Dependencies } from "@_types/hooks";
import { Contract, ethers, providers } from "ethers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type Web3State = {
  isLoading: boolean;
  hooks: Web3Hooks;
} & Nullable<Web3Dependencies>;

export const createDefaultState = (): Web3State => {
  return {
    isLoading: true,
    ethereum: null,
    provider: null,
    contract: null,
    hooks: setupHooks({} as any),
  };
};

export const createDefaultWeb3State = ({
  ethereum,
  provider,
  contract,
  isLoading,
}: Web3Dependencies & { isLoading: boolean }) => {
  return {
    isLoading,
    ethereum,
    provider,
    contract,
    hooks: setupHooks({ contract, ethereum, provider } as any),
  };
};

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (
  name: string, // NftMarket
  provider: providers.Web3Provider
): Promise<Contract> => {
  if (!NETWORK_ID) {
    return Promise.reject("Network ID is not defined!");
  }

  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();

  if (Artifact.networks[NETWORK_ID].address) {
    const contract = new ethers.Contract(
      Artifact.networks[NETWORK_ID].address,
      Artifact.abi,
      provider
    );

    return contract;
  } else {
    return Promise.reject(`Contract: [${name}] cannot be loaded!`);
  }
};