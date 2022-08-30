const hre = require("hardhat");

async function main() {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy();

    await token.deployed();
    console.log("Token deployed to:", token.address);

    const Rent = await hre.ethers.getContractFactory("Rent");
    const rent = await Rent.deploy();

    await rent.deployed();
    console.log("Rent deployed to:", rent.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });