import { CryptoHookFactory } from "@_types/hooks";
import useSWR from "swr";

// deps -> provider, ethereum, contract (web3 state)
export const hookFactory: CryptoHookFactory = (deps) => (params) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const swrRes = useSWR("web3/useAccount", () => {
    console.log(deps);
    console.log(params);
    return "Test user";
  });

  return swrRes;
};

export const useAccount = hookFactory({
  ethereum: undefined,
  provider: undefined,
});
