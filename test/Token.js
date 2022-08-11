const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
describe("Token contract", function() {
    it("Deployment should assign the total supply of tokens to the ownering coins and unstaking coins", async function() {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken =await  Token.deploy();
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

    });
    it("Should transfer tokens between accounts", async function(){
        const [owner,addr1,addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");

        const hardhatToken = await Token.deploy();
        await hardhatToken.transfer(addr1.address,20);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(20);
    });
    it("Staking/Unstaking tokens", async function() {
        const [owner,addr1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();
        
        expect(await
            hardhatToken.transfer(addr1.address, 50)
          ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);
        await hardhatToken.stakeTokens(addr1.address, 10);
        expect(await hardhatToken.getStakingBalance(addr1.address)).to.equal(10);
        expect(await hardhatToken.balanceOf(addr1.address)).to.changeTokenBalances(hardhatToken,[addr1],[-10]);
        await hardhatToken.unstakeTokens(addr1.address,7);
        expect(await hardhatToken.getStakingBalance(addr1.address)).to.equal(3);
        expect(await hardhatToken.balanceOf(addr1.address)).to.changeTokenBalances(hardhatToken,[addr1],[7]);
    });
});