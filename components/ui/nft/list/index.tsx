/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from "react";
import NftItem from "../item";
import { useListedNfts } from "@hooks/web3";

const NftList: FunctionComponent = () => {
  const { nfts } = useListedNfts();

  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      {nfts &&
        nfts.data?.map((nft) => (
          <div
            key={nft.meta.image}
            className="flex flex-col rounded-lg shadow-lg overflow-hidden"
          >
            <NftItem buyNft={nfts.buyNft} item={nft} />
          </div>
        ))}
    </div>
  );
};

export default NftList;
