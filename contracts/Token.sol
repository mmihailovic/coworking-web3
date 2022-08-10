//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

contract Token {
    string public name = "BEO";
    uint public totalSupply = 100;
    address public owner;
    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function buy(address _address, uint amount) external {
        require(balances[owner] >= amount);

        balances[owner] -= amount;
        balances[_address] += amount;

    }
}