const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  // const Test = await hre.ethers.getContractFactory("Test");
  // const test = await Test.deploy();

  // await test.deployed();

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();

  await token.deployed();
  console.log("Token deployed to:", token.address);

  const TokenVendor = await hre.ethers.getContractFactory("Vendor");
  const tokenVendor = await TokenVendor.deploy(token.address);

  await tokenVendor.deployed();

  console.log("Test deployed to:", tokenVendor.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });