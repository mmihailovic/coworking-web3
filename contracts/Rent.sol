//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./Token.sol";

interface USDC {
    function transfer(address dst, uint amount) external returns (bool);
    function transferFrom(address src, address dst, uint amount) external returns(bool);
    function balanceOf(address guy) external view returns (uint);
}

contract Rent {
    Token token;
    USDC public usdc;
    uint public amount = 250;
    struct RadnoMesto {
        address ownerOfSeat;
        address renter;
        uint256 expirationDate;
        bytes32 hashUlaznice;
    }
    uint n = 100;
    RadnoMesto[] private radnaMesta;

    constructor(address tokenAddress){
        token = Token(tokenAddress);
        usdc = USDC(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    }
    function numberOfPlacesForAddress(uint numberOfStakedTokens) public view returns (uint){
        // Koliko neko moze da iznajmi mesta
        //return stakingBalance[_address] * n / token.totalSupply();
        return numberOfStakedTokens * n / token.totalSupply();
    }
    function numberOfRentedPlacesForAddress(address _address) public view returns (uint) {
        // Koliko je mesta iznajmio
        uint cnt = 0;
        for(uint i = 0;i < radnaMesta.length; i++) {
            if(radnaMesta[i].ownerOfSeat == _address && radnaMesta[i].expirationDate >= block.timestamp)
                cnt++;
        }
        return cnt;
    }
    function numberOfFreePlacesForAddress(address _address,uint numberOfStakedTokens) public view returns (uint){
        return numberOfPlacesForAddress(numberOfStakedTokens) - numberOfRentedPlacesForAddress(_address);
    }
    function rentSeat(address payable _to, uint number_of_places, uint numberOfDays,uint numberOfStakedTokens) payable public {
        require(numberOfDays > 0, "Izaberi vise od 0 dana");
        require(number_of_places > 0, "Izaberi vise od 0 mesta");
        require(numberOfFreePlacesForAddress(_to,numberOfStakedTokens) >= number_of_places , "Nije moguce rentirati toliko mesta"); //provera da li je broj mesta za rezervaciju veci od 0
        require(msg.value >= amount * number_of_places , "you dont have enough funds"); //provera da li korisnik ima dovoljno para
        bool sent = usdc.transferFrom(msg.sender, _to, amount * number_of_places * numberOfDays / 30);  //transakcija izmedju korisnika
        require(sent, "Failed to send USDC"); //provera da li je transakcija uspela
        // Registrovati korisnika da je iznajmio
        uint time = block.timestamp + numberOfDays * 1 days;
        for(uint i = 0;i < number_of_places;i++){
            radnaMesta.push(RadnoMesto(_to,msg.sender, time,hash(_to,i,time)));
        }
    }

    function hash(address ownerOfSeat, uint counter , uint256 expirationDate) private view returns(bytes32)
    {
        // Hash na osnovu adrese vlasnika, adrese zakupca, rednog broja mesta koji se rezervise, trenutnog vremena, vremena isteka
        return keccak256(abi.encode(ownerOfSeat, counter, msg.sender, block.timestamp, expirationDate)); 
    }

    function getUserHash(address _to) public view returns(bytes32[] memory)
    {
        require(msg.sender == _to);
        bytes32 [] memory h;
        uint256 cnt=0;

        for(uint i =0 ; i<n ;i++)
        {
             if(radnaMesta[i].renter==_to && radnaMesta[i].expirationDate > block.timestamp) cnt++;
                h[cnt++]=radnaMesta[i].hashUlaznice;
        }
        return h;
    } 

    function ulaz() external view returns(bool) {
        for(uint i = 0; i < radnaMesta.length;i++) {
            if(radnaMesta[i].renter == msg.sender && radnaMesta[i].expirationDate >= block.timestamp)
                return true;
        }
        return false;
    }

    function getNumberOfPlaces() public view returns(uint){
        return n;
    }

    function unrent(uint numberOfPlaces) public {
            for(uint i = 0;i < radnaMesta.length; i++) {
                if(radnaMesta[i].ownerOfSeat == msg.sender && block.timestamp <= radnaMesta[i].expirationDate) {
                    numberOfPlaces--;
                    radnaMesta[i].expirationDate = 0;
                }
                if(numberOfPlaces == 0) break;
            }

    }

}