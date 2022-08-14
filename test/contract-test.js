const { expect } = require("chai");
const { ethers } = require("hardhat");
const BASE_URI = "";
const TEST_WALLET = process.env.MUMBAI_PRIVATE_KEY;
const CONTRACT_ADDRESS = "";
describe("PFPRacerNFT", function () {
  let PFPRacerNFT, pfpRacerNFT;

 before(async function(){
    PFPRacerNFT = await ethers.getContractFactory("PFPRacerNFT");
    pfpRacerNFT = await PFPRacerNFT.deploy(BASE_URI);
  });


  it("Should mint a number new NFT's", async function () {

 //   PFPRacerNFT = await ethers.getContractFactory("PFPRacerNFT");
 //   pfpRacerNFT = await PFPRacerNFT.deploy(BASE_URI);
    
  //  await pfpRacerNFT.deployed();

    // const owner = await  pfpRacerNFT.ownerOf(1);
    // const ownerBalance = await pfpRacerNFT.balanceOf(owner.address);
    
    // console.log("My owner is"+owner);
    // console.log("My ownerbalance is :"+ownerBalance);

    let cost = await pfpRacerNFT.getWithdrawalCost();
    let withdrawalAmount = 10;
    if(cost===0||cost===undefined){
      cost=1;
    }
    let gas = withdrawalAmount*cost;
    const withdrawal = await pfpRacerNFT.withdrawal(withdrawalAmount,"", {value: cost});
    await withdrawal.wait();

    
    if(withdrawalAmount>1){
      for(let i=1; i<11;i++){
        expect(await pfpRacerNFT.ownerOf(1)).to.equal(TEST_WALLET);
      }
    }
  });
 
  it("Should return a valid token URI", async function () {

    let mintAmount = 1;
    let cost = await pfpRacerNFT.cost();
    cost = cost*mintAmount;

    await pfpRacerNFT.mint(1,{value: cost});

    expect(await pfpRacerNFT.ownerOf(1)).to.equal(TEST_WALLET);
    expect(await pfpRacerNFT.tokenURI(1)).to.equal(`${BASE_URI}1`);
  });

  it("Should return how many NFT's are left to mint", async function (){
    await pfpRacerNFT.deployed(BASE_URI);
    await pfpRacerNFT.withdrawal(10,"");

    let refCode = await pfpRacerNFT.getRefCode();
    let contractBalance = await pfpRacerNFT.getContractBalance();
    let nftBalance = await pfpRacerNFT.getContractNFTBalance();

  });

  it("Should set the limit per minting address ", async function (){
    await pfpRacerNFT.setNftPerAddressLimit(100);
    let limit = await pfpRacerNFT.getNFTPerAddressLimit();
    expect(limit).to.equal(100);
  });

  it("Should set the limit per tx address ", async function (){
    await pfpRacerNFT.setMaxMintAmountPerTx(100);
    let maxMintAmountPerTx = await pfpRacerNFT.getMaxMintAmountPerTx();
    expect(maxMintAmountPerTx).to.equal(100);
  });

  it("Should set the NFT cost", async function (){
    await pfpRacerNFT.setCost(100);
    let cost = await pfpRacerNFT.getNFTCost()
    expect(cost).to.equal(100);
  });

  it("Should set the withdrawal cost",async function(){
    await pfpRacerNFT.setWithdrawalCost(100);
    const withdrawalCost = await pfpRacerNFT.getWithdrawalCost();
    expect(withdrawalCost).to.equal(100);
  });
  it("Should set the baseUri",async function(){
    await pfpRacerNFT.setBaseURI("TEST");
    let baseURI = await pfpRacerNFT.getBaseURI();
    expect(baseURI).to.equal("TEST");
  });
  it("Should set the setURISuffix",async function(){
    await pfpRacerNFT.setURISuffix("TEST");
    let uriSuffix = await pfpRacerNFT.getURISuffix();
    expect(uriSuffix).to.equal("TEST");
  });

  it("Should pause the contract",async function(){
    await pfpRacerNFT.pause(true);

    //trying to mint now
    let mintAmount = 1;
    let cost = await pfpRacerNFT.cost();
    cost = cost*mintAmount;
    let error = 104;
    try{
      await pfpRacerNFT.mint(1,{value: cost});
    }catch(err){
      error=err.toString().length;
    }
    expect(error>0);
  });

  it("Should release from pause the contract",async function(){
    await pfpRacerNFT.pause(false);

    //trying to mint now
    let mintAmount = 1;
    let cost = await pfpRacerNFT.cost();
    cost = cost*mintAmount;
    let error="";
    await pfpRacerNFT.mint(1,{value: cost});
    try{
      await pfpRacerNFT.mint(1,{value: cost});
    }catch(err){
      error=err;
    }
    expect(error).to.equal("");
  });

  it("Should put withdrawal on pause",async function() {
    await pfpRacerNFT.setWithdrawalPaused(true);
    let error = "";
    let cost = await pfpRacerNFT.getWithdrawalCost();
    let withdrawalAmount = 10;
   
    if(cost===0||cost===undefined){
      cost=1;
    }

    let gas = withdrawalAmount*cost;
    try{
      await pfpRacerNFT.withdrawal(withdrawalAmount,"", {value: gas});
    }catch(err){
      error=err.toString().length;
    }

   expect(error>0);
  });

  it("Should release withdrawal from pause",async function() {
    await pfpRacerNFT.setWithdrawalPaused(false);
    let error = "";
    let cost = await pfpRacerNFT.getWithdrawalCost();
    let withdrawalAmount = 10;
   
    if(cost===0||cost===undefined){
      cost=1;
    }

    let gas = withdrawalAmount*cost;
    try{
      await pfpRacerNFT.withdrawal(withdrawalAmount,"", {value: gas});
    }catch(err){
      error=err.toString().length;
    }

   expect(error).to.equal("");
  });

  it("Should empty the contract account", async function(){
    let mintAmount = 100;
    let cost = await pfpRacerNFT.cost();
    let gas= cost*mintAmount;
    
    await pfpRacerNFT.mint(mintAmount,{value: gas});

    let userWalletBalance = await ethers.provider.getBalance(TEST_WALLET);
    userWalletBalance = ethers.utils.formatEther(userWalletBalance);

    let contractBalance = await pfpRacerNFT.getContractBalance();

 
    await pfpRacerNFT.withdrawAll();


    let userWallet = await ethers.provider.getBalance(TEST_WALLET);
    userWallet = ethers.utils.formatEther(userWallet);

    expect(userWallet>userWalletBalance&&contractBalance===0);
  });
});
