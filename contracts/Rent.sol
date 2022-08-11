//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface USDC {
    function transfer(address dst, uint amount) external returns (bool);
    function transferFrom(address src, address dst, uint amount) external returns(bool);
    function balanceOf(address guy) external view returns (uint);
}

// balanceOf(account) / totalSupply * ukupanBrMesta


contract Rent {
    USDC public usdc;
    uint public amount = 250 ;
    constructor(){
        usdc = USDC(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    }
    function transfer(address payable _to, uint number_of_places) payable public {
        require(number_of_places > 0 , "amount should be > 0"); //provera da li je broj mesta za rezervaciju veci od 0
        
        require(msg.value >= amount * number_of_places , "you dont have enough funds"); //provera da li korisnik ima dovoljno para
        
        bool sent = usdc.transferFrom(msg.sender, _to, amount * number_of_places);  //transakcija izmedju korisnika
        
        require(sent, "Failed to send USDC"); //provera da li je transakcija uspela
    }
}
