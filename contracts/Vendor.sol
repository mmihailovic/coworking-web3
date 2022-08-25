//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface BeoToken {
    function transfer(address dst, uint wad) external returns (bool);
    function transferFrom(address src, address dst, uint wad) external returns (bool);
    function balanceOf(address guy) external view returns (uint);
}


contract Vendor {
    BeoToken token;
    constructor(address tokenAddress) {
        token = BeoToken(tokenAddress);
    }
    mapping(address => uint256) public stakingBalance;
    function stakeTokens(uint256 _amount) external {
        require(_amount > 0, "Izaberi veci od 0");
        require(token.balanceOf(msg.sender) >= _amount, "Nemas toliko tokena!");
        token.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
    }
    function unstakeTokens(uint256 _amount) external {
        require(_amount > 0," Izaberi veci od 0");
        require(stakingBalance[msg.sender] >= _amount, "Nemas toliko stakeovanih tokena!");
        token.transfer(msg.sender, _amount);
        stakingBalance[msg.sender] -= _amount;
    }
}