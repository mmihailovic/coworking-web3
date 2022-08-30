//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public owner;

    constructor() ERC20("BEO Token","BEO") {
        owner = msg.sender;
        _mint(msg.sender, 100 * (10 ** 18));
    }
}
