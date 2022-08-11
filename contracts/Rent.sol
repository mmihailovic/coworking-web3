//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Token.sol";
interface USDC {
    function transfer(address dst, uint amount) external returns (bool);
    function transferFrom(address src, address dst, uint amount) external returns(bool);
    function balanceOf(address guy) external view returns (uint);
}

// balanceOf(account) / totalSupply * ukupanBrMesta


contract Rent {
    address t;
    Token token = Token(t);
    USDC public usdc;
    uint public amount = 250 ;

    struct RadnoMesto {
        address ownerOfSeat;
        address renter;
        uint256 expirationDate;
    }

    RadnoMesto[100] radnaMesta;


    constructor(){
        usdc = USDC(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    }

    function transfer(address payable _to, uint number_of_places) payable public {
        require(number_of_places > 0 , "amount should be > 0"); //provera da li je broj mesta za rezervaciju veci od 0
        
        require(msg.value >= amount * number_of_places , "you dont have enough funds"); //provera da li korisnik ima dovoljno para
        
        bool sent = usdc.transferFrom(msg.sender, _to, amount * number_of_places);  //transakcija izmedju korisnika
        
        require(sent, "Failed to send USDC"); //provera da li je transakcija uspela
    }

    function numberOfPlacesForAddress(address _address) external view returns (uint){
        // Koliko neko moze da iznajmi mesta
        return token.balanceOf(_address) / token.totalSupply() * 100;
    }

    function numberOfRentedPlacesForAddress(address _address) external view returns (uint) {
        // Koliko je mesta iznajmio
        uint cnt = 0;
        for(uint i = 0;i < 100; i++) {
            if(radnaMesta[i].ownerOfSeat == _address)
                cnt++;
        }
        return cnt;
    }
}

