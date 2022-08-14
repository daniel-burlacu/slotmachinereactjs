// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PFPRacerNFT is ERC721, Ownable, ReentrancyGuard{
//used to increment how many NFT's have been minted
  using Counters for Counters.Counter;
  Counters.Counter private supply;

/*
* NFT IPFS configuration 
*/
  //ipfs://CDI/
  string public uriPrefix = "";
  //files extension from baseExtension location
  //string public uriSuffix = ".json";
  string public uriSuffix = "";

/*
*END IPFS Configuration
*/

/*
* NFT Costs and minting limits Configuration  
*/

  uint256 public cost = 1;
//Cost per withdrawal
 uint256 public withdrawalCost = 0;
//How many NFT's you can mint in total
  uint256 public maxSupply = 10000;
//Set NFT minting amount per transaction
  uint256 public maxMintAmountPerTx = 1000;
//Set limit per address to mint  
  uint256 public nftPerAddressLimit = 1000;
//Limit for maximum NFT's you can mint
  uint256 public limitSupply=6460;
/*
* END NFT Costs and minting limits Configuration  
*/
string private refCode = "";

//Setting up the contract state when deployed
  bool public paused = false;
  bool public withdrawalPaused = false;
  
/*
* Presale/WhiteList/AirDrop Configuration
*/
  mapping(address => uint256) public addressMintedBalance;

  bytes4 private constant _INTERFACE_ID_ERC2981 = 0x2a55205a;

/*
* EDND Presale/WhiteList/AirDrop Configuration
*/

  constructor(string memory _baseUri) ERC721("PFRacerNFT", "PFRNFT") {
        uriPrefix = _baseUri;
    }

/*
* Rules of the contract
*/
    modifier mintCompliance(uint256 _mintAmount) {
        require(!paused, "The contract is paused !");
        require(_mintAmount > 0 && _mintAmount <= maxMintAmountPerTx , "Invalid mint amount!");
        require(supply.current() + _mintAmount <= maxSupply - limitSupply, "Max NFT limit exceeded!");
        require(msg.value >= cost * _mintAmount, "Insufficient funds");
    _;
  }

  modifier withdrawalComplience(uint256 _amount, string memory _refCode){
      require(!withdrawalPaused, "Withdrawal has been paused !");
      require(_amount <= maxMintAmountPerTx, "You can't withdrawl more then you are allowed to !!");
      require(keccak256(bytes(refCode))==keccak256(bytes(_refCode)));
      require(msg.value >= withdrawalCost * _amount, "Insufficient funds");
      _;
  }
/*
* EMD Rules of the contract
*/

/*
* This is our minting function
*/
function mint(uint256 _mintAmount) public payable mintCompliance(_mintAmount) {

    if (msg.sender != owner()) {
            uint256 ownerMintedCount = addressMintedBalance[msg.sender];
            require(ownerMintedCount + _mintAmount <= nftPerAddressLimit, "max NFT per address exceeded");
    }

    _mintLoop(msg.sender, _mintAmount);
  }

/*
* This function is for withdrawl
*/  
function withdrawal(uint256 _mintAmount, string memory _refCode) public payable withdrawalComplience(_mintAmount, _refCode) {

    if (msg.sender != owner()) {
            uint256 ownerMintedCount = addressMintedBalance[msg.sender];
            require(ownerMintedCount + _mintAmount <= nftPerAddressLimit, "max NFT per address exceeded");
    }

    _mintLoop(msg.sender, _mintAmount);
  }

function _mintLoop(address _receiver, uint256 _mintAmount) internal {
  for (uint256 i = 0; i < _mintAmount; i++) {
    supply.increment();
    _safeMint(_receiver, supply.current());
  }
}
 
  function _baseURI() internal view virtual override returns (string memory) {
    return uriPrefix;
  }

 /*
    @_mintAmount -> amount you want to mint 
    @_receiver   -> wallet addres you want to send it to
    This function is used for bonuses, airdrops or prizes 
 */
 function mintForOneAddress(uint256 _mintAmount, address _receiver) public onlyOwner {
    _mintLoop(_receiver, _mintAmount);
  }

 /*
    @testFunction to be deleted
 */ 
 function mintTo( address _receiver) public onlyOwner {
    _mintLoop(_receiver, 1);
  }

/*
    @_mintAmount -> amount you want to mint
    @_receivers[] -> wallet address you want to send the minted NFT's: for each address/amount
*/
 function mintForMultipleAddresses(uint256 _mintAmount, address[] memory _receivers) public  onlyOwner {
      for (uint256 i=0;i< _receivers.length;i++)
        _mintLoop(_receivers[i], _mintAmount);
  }

/*
  This is my wallet ! :) 
*/
function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
    uint256 currentTokenId = 1;
    uint256 ownedTokenIndex = 0;

    while (ownedTokenIndex < ownerTokenCount && currentTokenId <= maxSupply) {
      address currentTokenOwner = ownerOf(currentTokenId);

      if (currentTokenOwner == _owner) {
        ownedTokenIds[ownedTokenIndex] = currentTokenId;

        ownedTokenIndex++;
      }

      currentTokenId++;
    }

    return ownedTokenIds;
  }

   function tokenURI(uint256 _tokenId)
    override 
    view 
    virtual 
    public 
    returns (string memory) {

       require(
         _exists(_tokenId),
        "ERC721Metadata: URI query for nonexistent token"
      );

      string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, Strings.toString(_tokenId), uriSuffix))
        : "";
  }

  /*
   @_limit Set's the minting limit per address
  */
  function setNftPerAddressLimit(uint256 _limit) public onlyOwner {
    nftPerAddressLimit = _limit;
  }

  function setMaxMintAmountPerTx(uint256 _limit) public onlyOwner {
      maxMintAmountPerTx = _limit;
  }

  /*
    @_newCost Set's the cost's per 1 NFT
  */
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }
  /*
  @_setWithdrawalCost
  */

  function setWithdrawalCost(uint256 _newWithdrawalCost) public onlyOwner {
    withdrawalCost = _newWithdrawalCost;
  }

  /*
    @_newMaxMintAmount Set's the minting limit from 1000 NFT's only newMaxMintAmount are mintable
  */
  function setMaxMintAmount(uint256 _newMaxMintAmount) public onlyOwner {
    limitSupply = _newMaxMintAmount;
  }
/*
  @_newBaseURI Set's the address for uriPrefix -> //ipfs://CDI/
*/
  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    uriPrefix = _newBaseURI;
  }
/*
  @_newBaaseExtension Set's the base extension which should be .json
*/
  function setURISuffix(string memory _newUriSuffix) public onlyOwner {
    uriSuffix = _newUriSuffix;
  }

  function pause(bool _state) public onlyOwner {
    paused = _state;
  }

  function setWithdrawalPaused(bool _withdrawal) public onlyOwner {
    withdrawalPaused = _withdrawal;
  }
 
  function setRefCode(string memory _refCode) public onlyOwner{
      refCode=_refCode;
  }

 //withdraw contract income into the owners wallet
  function withdrawAll() public payable onlyOwner {

    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }

/*
  @_to -> address where you want to send contract tokens
  @_amount -> amount you would like to send

  Function used to send amounts to community wallet, charity, developers and treasury 
*/
    function withdrawTo(address payable _to, uint256 _amount) public onlyOwner{
        _to.transfer(_amount);
    }

    function getRefCode() public view onlyOwner returns(string memory){
      return refCode;
    }

    function getContractBalance() public view returns(uint256) {
      return address(this).balance; 
    }

    function getWithdrawalCost() public view returns(uint256){
      return withdrawalCost;
    }
    
    function getMaxSupply() public view returns(uint256){
      return  maxSupply;
    }

    function getMaxMintAmountPerTx() public view onlyOwner returns(uint256){
      return   maxMintAmountPerTx;
    }

    function getNFTPerAddressLimit() public view onlyOwner returns(uint256){
      return   nftPerAddressLimit;
    }

    function getlimitSupply() public view onlyOwner returns(uint256){
      return   limitSupply;
    }

    function getWithdrawalPaused() public view onlyOwner returns(bool){
      return withdrawalPaused;
    }

    function getContractNFTBalance() public view onlyOwner returns (uint256) {
      return supply.current();
  }

    /*
    @_getNFTCost returns the price per 1 NFT
  */
  function getNFTCost() public view onlyOwner returns (uint256) {
    return cost;
  }
 
 /*
  @_getBaseURI returns uriPrefix -> //ipfs://CDI/
*/
  function getBaseURI() public view onlyOwner returns(string memory) {
    return uriPrefix ;
  }

  /*
  @_getURISuffix Returns uriSuffix -> .json
*/
  function getURISuffix() public view onlyOwner returns(string memory){
    return uriSuffix;
  }
    fallback() external payable {}

    receive() external payable {}
}
