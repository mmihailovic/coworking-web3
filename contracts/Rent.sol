//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Token.sol";
contract Rent {
    address t;
    Token token = Token(t);
    
    struct RadnoMesto {
        address ownerOfSeat;
        address renter;
        uint256 expirationDate;
    }

    RadnoMesto[100] radnaMesta;
    
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