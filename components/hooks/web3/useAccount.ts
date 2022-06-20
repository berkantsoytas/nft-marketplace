import { CryptoHookFactory } from "@_types/hooks";
import useSWR from "swr";

type AccountFactory = CryptoHookFactory<string, string>;

export type UseAccountHook = ReturnType<AccountFactory>;

// deps -> provider, ethereum, contract (web3 state)
export const hookFactory: AccountFactory = (deps) => (params) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const swrRes = useSWR("web3/useAccount", () => {
    console.log(deps);
    console.log(params);
    return "Test user";
  });

  return swrRes;
};
