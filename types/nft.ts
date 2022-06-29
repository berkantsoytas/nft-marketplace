export type Trait = "attack" | "health" | "speed";

export type NftAttribute = {
  trait_type: Trait;
  value: string;
};

export type NftMetadata = {
  description: string;
  image: string;
  name: string;
  attributes: NftAttribute[];
};

export type NftCore = {
  tokenId: number;
  price: string;
  creator: string;
  isListed: boolean;
};

export type Nft = {
  meta: NftMetadata;
} & NftCore;
