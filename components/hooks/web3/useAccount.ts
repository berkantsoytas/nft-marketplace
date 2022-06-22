import { CryptoHookFactory } from "@_types/hooks";
import { useEffect } from "react";
import useSWR from "swr";

type UseAccountResponse = {
  connect: () => void;
};

type AccountFactory = CryptoHookFactory<string, UseAccountResponse>;

export type UseAccountHook = ReturnType<AccountFactory>;

// deps -> provider, ethereum, contract (web3 state)
export const hookFactory: AccountFactory =
  ({ provider, ethereum }) =>
  () => {
    // conditionally swr block
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const swrRes = useSWR(
      provider ? "web3/useAccount" : null,
      async () => {
        const accounts = await provider!.listAccounts();
        const account = accounts[0];

        if (!account) {
          throw "Cannot retrieve account! Please, connect to web3 wallet!";
        }

        return account;
      },
      {
        revalidateOnFocus: false,
      }
    );

    useEffect(() => {
      ethereum?.on("accountsChanged", handleAccountsChanged);
      return () => {
        ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      };
    });

    const handleAccountsChanged = (...args: any[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        console.error("Please, Connect to Web3 Wallet");
      } else if (accounts[0] !== swrRes.data) {
        swrRes.mutate(accounts[0]);
      }
    };

    const connect = async () => {
      try {
        ethereum?.request({ method: "eth_requestAccounts" });
      } catch (ex) {
        console.log(ex);
      }
    };

    return {
      ...swrRes,
      connect,
    };
  };
