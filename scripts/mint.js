const hre = require("hardhat");

async function main() {

  const PFPRacerNFT = await hre.ethers.getContractFactory("PFPRacerNFT");
  const contract = PFPRacerNFT.attach("");
  const mintedNft = await contract.mintTo("");

  console.log("token minted", mintedNft);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
