// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ProjetNFT is ERC721URIStorage {
    address payable owner;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    uint256 listPrice = 0.01 ether;
   constructor () ERC721("ProjetNFT", "PNFT") {
    owner = payable(msg.sender);
   }
   struct listedToken {
    uint256 tokenId;
    address payable owner;
    address payable seller;
    uint256 price;
    bool currentlyListed;
   }
   mapping(uint256 => listedToken) private idTolistedToken;
   function updateListPrice (uint256 _listPrice) public payable {
    require(owner == msg.sender, "Only the ownr can update the listing price");
    listPrice = _listPrice;
   }
   function getListPrice() public view returns(uint256) {
    return listPrice;
   }
   function getLatestIdToListedToken() public view returns(listedToken memory){
    uint256 currentTokenId = _tokenIds.current();
    return idTolistedToken[currentTokenId];
   }
   function getListedForTokenId(uint256 tokenId) public view returns(listedToken memory) {
    return idTolistedToken[tokenId];
   }
   function getCurrentTokenId() public view returns(uint256) {
    return _tokenIds.current();
   }
   function createToken(string memory tokenURI, uint256 price) public payable returns(uint) {
    require (msg.value == listPrice, "Send enough ether to list");
    require (price > 0, "Make sure the price isn't negative");
    _tokenIds.increment();
    uint256 currentTokenId = _tokenIds.current();
    _safeMint(msg.sender, currentTokenId);
    _setTokenURI(currentTokenId, tokenURI);
    createListedToken(currentTokenId, price);
    return currentTokenId ;
   }
   function createListedToken(uint256 tokenId, uint256 price) private {
    idTolistedToken[tokenId] = listedToken(
        tokenId,
        payable(address(this)),
        payable(msg.sender),
        price,
        true
    );
    _transfer(msg.sender, address(this), tokenId);
    
   }
   function getAllNFTs() public view returns(listedToken[] memory) {
    uint nftCount = _tokenIds.current();
    listedToken[] memory tokens = new listedToken[](nftCount);
    uint currentIndex = 0;
    for(uint i=0;i<nftCount;i++)
    {
        uint currentId = i+1;
        listedToken storage currentItem = idTolistedToken[currentId];
        tokens[currentIndex] = currentItem;
        currentIndex += 1;
    }
    return tokens;
   }
   function getMyNFTs() public view returns(listedToken[] memory){
    uint totalItemCount = _tokenIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;
    for(uint i=0; i<totalItemCount; i++){
        if(idTolistedToken[i+1].owner == msg.sender || idTolistedToken[i+1].seller == msg.sender){
            itemCount +=1;
        }
    }
    listedToken[] memory items = new listedToken[](itemCount);
    for(uint i=0;i<totalItemCount;i++){
        if(idTolistedToken[i+1].owner == msg.sender || idTolistedToken[i+1].seller == msg.sender){ 
        uint currentId = i+1;
        listedToken storage currentItem = idTolistedToken[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
        }
    }
    return items;
   }
   function excuteSale(uint256 tokenId) public payable {
    uint price = idTolistedToken[tokenId].price;
    require(msg.value == price, "Please submit the asking price for the NFY in order to purshase");
    address seller = idTolistedToken[tokenId].seller;
    idTolistedToken[tokenId].currentlyListed = true;
    idTolistedToken[tokenId].seller = payable(msg.sender);
   }
}
