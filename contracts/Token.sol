//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public owner;

    constructor() ERC20("BEO Token","BEO"){
        owner = msg.sender;
        _mint(msg.sender, 100 * (10 ** 18));
    }

    mapping(address => uint256) stakingBalance;
    
    function stakeTokens(address _address, uint256 _amount) public {
        require(_amount > 0, "Izaberi veci od 0");
        require(balanceOf(msg.sender) >= _amount, "Nemas toliko tokena!");
        transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
    }

    function unstakeTokens(address _address, uint256 _amount) external {
        require(_amount > 0 && stakingBalance[_address] > _amount);

        stakingBalance[_address] -= _amount;

        approve(owner, _amount);
        transferFrom(owner, msg.sender ,_amount);
    }

    function getStakingBalance(address _address) external view returns(uint256){
        return stakingBalance[_address];
    }
}