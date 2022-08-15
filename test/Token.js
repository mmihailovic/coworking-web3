const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
describe("Token contract", function() {
    beforeEach(async function() {
        [owner,wallet1,wallet2] = await ethers.getSigners();
        Token = await ethers.getContractFactory("Token",wallet1);
        TokenVendor = await ethers.getContractFactory("TokenVendor",owner);
        Rent = await ethers.getContractFactory("Rent",wallet1);
        token = await Token.deploy();
        tokenVendor = await TokenVendor.deploy(token.address);
        rent = await Rent.deploy(token.address, tokenVendor.address);

        await token.connect(wallet1).transfer(wallet2.address, 1000);

        await token.connect(wallet1).approve(tokenVendor.address, 4000);
        await token.connect(wallet2).approve(tokenVendor.address, 1000);

        
    })
    describe('deployment', function() {
        it('should mint tokens to wallet1', async function() {
            expect(await token.balanceOf(wallet1.address)).to.equal(4000);
        })
        it('should transfer to wallet2', async function() {
            expect(await token.balanceOf(wallet2.address)).to.equal(1000);
        })
    })
    describe('stake tokens', function() {
        it('should stake token', async function() {
            await tokenVendor.connect(wallet1).stakeTokens(100);
            await tokenVendor.connect(wallet2).stakeTokens(50);

            expect(await token.balanceOf(wallet1.address)).to.equal(3900);
            expect(await token.balanceOf(wallet2.address)).to.equal(950);
            
            expect(await tokenVendor.stakingBalance(wallet1.address)).to.equal(100);
            expect(await tokenVendor.stakingBalance(wallet2.address)).to.equal(50);
        })
        it('cannot stake more tokens than have', async function() {
            await expect(tokenVendor.connect(wallet1).stakeTokens(5000)).to.be.revertedWith("Nemas toliko tokena!");
        })
    })
    describe('unstake tokens', function() {
        it('should unstake token', async function() {
            await tokenVendor.connect(wallet1).stakeTokens(1000);
            await tokenVendor.connect(wallet1).unstakeTokens(500);
            expect(await token.balanceOf(wallet1.address)).to.equal(3500);
            expect(await tokenVendor.stakingBalance(wallet1.address)).to.equal(500);
        })
        it('cannot unstake tokens more than has been staked', async function() {
            await tokenVendor.connect(wallet1).stakeTokens(1000);
            await expect(tokenVendor.connect(wallet1).unstakeTokens(1100)).to.be.revertedWith("Nemas toliko stakeovanih tokena!");
        })
    })
    describe('rent place', function() {
        it('should rent place', async function() {
            await tokenVendor.connect(wallet1).stakeTokens(100);
            expect(await rent.numberOfPlacesForAddress(wallet1.address)).to.equal(2);
            expect(await rent.numberOfFreePlacesForAddress(wallet1.address)).to.equal(2);
            expect(await rent.numberOfRentedPlacesForAddress(wallet1.address)).to.equal(0);
            await rent.connect(wallet2).rentSeat(wallet1.address,1,1);
            expect(await rent.numberOfFreePlacesForAddress(wallet1.address)).to.equal(1);
            expect(await rent.numberOfRentedPlacesForAddress(wallet1.address)).to.equal(1);
            await rent.connect(wallet2).rentSeat(wallet1.address,1,1);
            expect(await rent.numberOfFreePlacesForAddress(wallet1.address)).to.equal(0);
            expect(await rent.numberOfRentedPlacesForAddress(wallet1.address)).to.equal(2);
            await expect(rent.connect(wallet2).rentSeat(wallet1.address,1,1)).to.be.revertedWith("Nije moguce rentirati toliko mesta");
        })
    })
});