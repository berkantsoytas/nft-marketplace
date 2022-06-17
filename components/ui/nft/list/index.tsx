/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from "react";
import { NftMetadata } from "../../../types/nft";
import NftItem from "../item";

type NftListsProps = {
  nfts: NftMetadata[];
};

const NftList: FunctionComponent<NftListsProps> = ({ nfts }) => {
  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      {nfts &&
        nfts.map((nft) => (
          <div
            key={nft.image}
            className="flex flex-col rounded-lg shadow-lg overflow-hidden"
          >
            <NftItem item={nft} />
          </div>
        ))}
    </div>
  );
};

export default NftList;
