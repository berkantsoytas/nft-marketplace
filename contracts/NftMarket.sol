// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftMarket is ERC721URIStorage{
  using Counters for Counters.Counter;

  uint256 public listingPrice = 0.025 ether;

  Counters.Counter private _listedItems;
  Counters.Counter private _tokenIds;

  uint256[] private _allNfts;

  mapping(string => bool) private _usedTokenURIs;
  mapping(uint256 => NftItem) private _idToNftItem;

  mapping(uint256 => uint256) private _idToNftIndex;

  struct NftItem {
    uint256 tokenId;
    uint256 price;
    address creator;
    bool isListed;
  }

  event NftItemCreated (
    uint256 tokenId,
    uint256 price,
    address creator,
    bool isListed
  );

  constructor() ERC721("CreaturesNFT", "CNFT") { }

  
  function getNftItem(uint256 tokenId) public view returns (NftItem memory) {
    return _idToNftItem[tokenId];
  }

  function listedItemsCount() public view returns (uint256) {
    return _listedItems.current();
  }

  function tokenURIExists(string memory tokenURI) public view returns (bool) {
    return _usedTokenURIs[tokenURI] == true;
  }

  function totalSupply() public view returns (uint) {
    return _allNfts.length;
  }

  function tokenByIndex(uint256 index) public view returns (uint) {
    require(index < totalSupply(), "NFT Market: Index out of bounds");
    return _allNfts[index];
  }

  function mintToken(string memory tokenURI, uint256 price) public payable returns (uint) {
    require(!tokenURIExists(tokenURI), "NFT Market: Token URI already exists.");
    require(msg.value == listingPrice, "NFT Market: Price must be equal to listing price");

    _tokenIds.increment();
    _listedItems.increment();

    uint newTokenId = _tokenIds.current();
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    createNftItem(newTokenId, price);
    _usedTokenURIs[tokenURI] = true;
    
    return newTokenId;
  }

  function buyNft (uint tokenId) public payable {
    uint256 price = _idToNftItem[tokenId].price;
    address owner = ERC721.ownerOf(tokenId);

    require(msg.sender != owner, "NFT Market: You already own this NFT");
    require(msg.value == price, "NFT Market: Please submit the asking price");

    _idToNftItem[tokenId].isListed = false;
    _listedItems.decrement();

    _transfer(owner, msg.sender, tokenId);
    payable(owner).transfer(msg.value);
  }

  function createNftItem(uint256 tokenId, uint256 price) private {
    require(price > 0, "NFT Market:  Price must be at least 1 wei");
  
    _idToNftItem[tokenId] = NftItem(
      tokenId,
      price,
      msg.sender,
      true
    );

    emit NftItemCreated(tokenId, price, msg.sender, true);
  }

  function _beforeTokenTransfer(
    address from, 
    address to, 
    uint256 tokenId 
  ) internal virtual override {
    super._beforeTokenTransfer(from, to, tokenId);

    // minting token
    if (from == address(0)) {
      _addTokenToAllTokensEnumaration(tokenId);
    }
  }

  function _addTokenToAllTokensEnumaration(uint256 tokenId) private {
    _idToNftIndex[tokenId] = _allNfts.length;
    _allNfts.push(tokenId);
  }
}