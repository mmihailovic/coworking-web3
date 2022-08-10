const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy("Hello, World!");

  const ManageUsers = await hre.ethers.getContractFactory("ManageUsers");
  const manageUsers = await ManageUsers.deploy();

  const ManageTransactions = await hre.ethers.getContractFactory("ManageTransactions");
  const manageTransactions = await ManageTransactions.deploy();
  
  await token.deployed();
  await manageUsers.deployed();
  await manageTransactions.deployed();

  console.log("Token deployed to:", token.address);
  console.log("ManageUsers deployed to:", manageUsers.address);
  console.log("ManageTransactions deployed to:", manageTransactions.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });