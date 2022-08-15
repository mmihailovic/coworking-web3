//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./Token.sol";
import "./Rent.sol";

contract TokenVendor {
    Token token;
    Rent rent;

    constructor(address tokenAddress, address rentAddress) {
        token = Token(tokenAddress);
        rent = Rent(rentAddress);
    }
    mapping(address => uint256) private stakingBalance;
    
    function stakeTokens(uint256 _amount) external {
        require(_amount > 0, "Izaberi veci od 0");
        require(token.balanceOf(msg.sender) >= _amount, "Nemas toliko tokena!");
        token.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
    }
    function unstakeTokens(uint256 _amount, uint256 numberOfStakedTokens) external {
        require(_amount > 0," Izaberi veci od 0");
        require(stakingBalance[msg.sender] >= _amount, "Nemas toliko stakeovanih tokena!");
        token.transfer(msg.sender, _amount);
        uint numberOfPlaces = _amount * rent.getNumberOfPlaces() / token.totalSupply();
        if(rent.numberOfFreePlacesForAddress(msg.sender, numberOfStakedTokens) < numberOfPlaces) {
            uint cnt = numberOfPlaces - rent.numberOfFreePlacesForAddress(msg.sender, numberOfStakedTokens); // broj mesta za uklanjanje
            rent.unrent(cnt);
        }
        stakingBalance[msg.sender] -= _amount;
    }

    function getStakingBalance() external view returns(uint256){
        return stakingBalance[msg.sender];
    }
}
