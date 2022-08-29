const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function() {
    beforeEach(async function() {
        [owner,wallet1,wallet2] = await ethers.getSigners();
        Token = await ethers.getContractFactory("Token",owner);
        // TokenVendor = await ethers.getContractFactory("TokenVendor",owner);
        Rent = await ethers.getContractFactory("Rent",owner);
        token = await Token.deploy();
        // tokenVendor = await TokenVendor.deploy(token.address);
        // rent = await Rent.deploy(token.address, tokenVendor.address);
        rent = await Rent.deploy(token.address);
        await token.connect(owner).transfer(wallet1.address, ethers.BigNumber.from('2000000000000000000')); // 2 tokens
        await token.connect(owner).transfer(wallet2.address, ethers.BigNumber.from('3000000000000000000')); // 3 tokens

        await token.connect(wallet1).approve(rent.address, await token.balanceOf(wallet1.address));
        await token.connect(wallet2).approve(rent.address, await token.balanceOf(wallet2.address));
    })
    describe('deployment', function() {
        it('should mint tokens to owner', async function() {
            expect(await token.balanceOf(owner.address)).to.equal(ethers.BigNumber.from('95000000000000000000')); // 95 tokens
        })
        it('should transfer to wallet1', async function() {
            expect(await token.balanceOf(wallet1.address)).to.equal(ethers.BigNumber.from('2000000000000000000'));
        })
        it('should transfer to wallet2', async function() {
            expect(await token.balanceOf(wallet2.address)).to.equal(ethers.BigNumber.from('3000000000000000000'));
        })
    })
    describe('stake tokens', function() {
        it('should stake token', async function() {
            await rent.connect(wallet1).stakeTokens(ethers.BigNumber.from('2000000000000000000'));
            await rent.connect(wallet2).stakeTokens(ethers.BigNumber.from('2000000000000000000'));

            expect(await token.balanceOf(wallet1.address)).to.equal(0);
            expect(await token.balanceOf(wallet2.address)).to.equal(ethers.BigNumber.from('1000000000000000000'));
            
            expect(await rent.getStakingBalance(wallet1.address)).to.equal(ethers.BigNumber.from('2000000000000000000'));
            expect(await rent.getStakingBalance(wallet2.address)).to.equal(ethers.BigNumber.from('2000000000000000000'));
        })
        it('cannot stake more tokens than have', async function() {
            await expect(rent.connect(wallet1).stakeTokens(ethers.BigNumber.from('3000000000000000000'))).to.be.revertedWith("Nemas toliko tokena!");
        })
    })
    describe('unstake tokens', function() {
        it('should unstake token', async function() {
            await rent.connect(wallet1).stakeTokens(ethers.BigNumber.from('2000000000000000000'));
            await rent.connect(wallet1).unstakeTokens(ethers.BigNumber.from('1000000000000000000'),0);
            expect(await token.balanceOf(wallet1.address)).to.equal(ethers.BigNumber.from('1000000000000000000'));
            expect(await rent.getStakingBalance(wallet1.address)).to.equal(ethers.BigNumber.from('1000000000000000000'));
        })
        it('cannot unstake tokens more than has been staked', async function() {
            await rent.connect(wallet1).stakeTokens(ethers.BigNumber.from('1000000000000000000'));
            await expect(rent.connect(wallet1).unstakeTokens(ethers.BigNumber.from('2000000000000000000'),0)).to.be.revertedWith("Nemas toliko stakeovanih tokena!");
        })
    })
    describe('rent place', function() {
        it('should rent place', async function() {
            await rent.connect(wallet1).stakeTokens(ethers.BigNumber.from('2000000000000000000'));
            expect(await rent.numberOfRentedPlacesForAddress(wallet1.address)).to.equal(0);
            await rent.connect(wallet1).rentSeat(1,1,0);
            expect(await rent.numberOfRentedPlacesForAddress(wallet1.address)).to.equal(1);
            await rent.connect(wallet1).rentSeat(1,1,0);
            expect(await rent.numberOfRentedPlacesForAddress(wallet1.address)).to.equal(2);
            await expect(rent.connect(wallet1).rentSeat(1,1,0)).to.be.revertedWith("Nije moguce rentirati toliko mesta");
        })
        it('cannot unstake tokens which used for rent', async function() {
            await rent.connect(wallet1).stakeTokens(ethers.BigNumber.from('2000000000000000000'));
            await rent.connect(wallet1).rentSeat(1,1,0);
            let rentedTokens = (await rent.numberOfRentedPlacesForAddress(wallet1.address)) * (await token.totalSupply()) / (await rent.getNumberOfSeats());
            await rent.connect(wallet1).unstakeTokens(ethers.BigNumber.from('1000000000000000000'),ethers.BigNumber.from(rentedTokens.toString()));
            expect(await rent.getStakingBalance(wallet1.address)).to.equal(ethers.BigNumber.from('1000000000000000000'));
            await token.connect(wallet1).approve(rent.address, ethers.BigNumber.from('1000000000000000000'));
            await rent.connect(wallet1).stakeTokens(ethers.BigNumber.from('1000000000000000000'));
            await rent.connect(wallet1).rentSeat(1,1,0);
            rentedTokens = (await rent.numberOfRentedPlacesForAddress(wallet1.address)) * (await token.totalSupply()) / (await rent.getNumberOfSeats());
            await expect(rent.connect(wallet1).unstakeTokens(ethers.BigNumber.from('1000000000000000000'),ethers.BigNumber.from(rentedTokens.toString()))).to.be.revertedWith("Ne mozes toliko da unstakeujes tokena");
        })
    })
});

