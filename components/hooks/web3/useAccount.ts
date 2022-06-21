import { CryptoHookFactory } from "@_types/hooks";
import useSWR from "swr";

type AccountFactory = CryptoHookFactory<string, string>;

export type UseAccountHook = ReturnType<AccountFactory>;

// deps -> provider, ethereum, contract (web3 state)
export const hookFactory: AccountFactory =
  ({ provider }) =>
  (params) => {
    // conditionally swr block
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const swrRes = useSWR(provider ? "web3/useAccount" : null, () => {
      return "Test user";
    });

    return swrRes;
  };
