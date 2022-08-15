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
    uint public amount = 250;
    struct RadnoMesto {
        address ownerOfSeat;
        address renter;
        uint256 expirationDate;
        bytes32 hashUlaznice;
    }
    uint n = 100;
    RadnoMesto[] radnaMesta;
    constructor(){
        usdc = USDC(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    }
    function numberOfPlacesForAddress(address _address) public view returns (uint){
        // Koliko neko moze da iznajmi mesta
        return token.balanceOf(_address) / token.totalSupply() * n;
    }
    function numberOfRentedPlacesForAddress(address _address) public view returns (uint) {
        // Koliko je mesta iznajmio
        uint cnt = 0;
        for(uint i = 0;i < 100; i++) {
            if(radnaMesta[i].ownerOfSeat == _address && radnaMesta[i].expirationDate > block.timestamp)
                cnt++;
        }
        return cnt;
    }
    function transfer(address payable _to, uint number_of_places, uint numberOfDays) payable public {
        require(numberOfRentedPlacesForAddress(_to) + number_of_places <= numberOfPlacesForAddress(_to) && number_of_places > 0 , "amount should be > 0"); //provera da li je broj mesta za rezervaciju veci od 0
        require(msg.value >= amount * number_of_places , "you dont have enough funds"); //provera da li korisnik ima dovoljno para
        bool sent = usdc.transferFrom(msg.sender, _to, amount * number_of_places * numberOfDays / 30);  //transakcija izmedju korisnika
        require(sent, "Failed to send USDC"); //provera da li je transakcija uspela
        // Registrovati korisnika da je iznajmio
        uint time = block.timestamp + numberOfDays * 1 days;
        uint cnt = 0;
        for(uint i = 0;i < n;i++){
            if(radnaMesta[i].expirationDate < block.timestamp) {
                radnaMesta[i].ownerOfSeat = _to;
                radnaMesta[i].renter = msg.sender;
                radnaMesta[i].expirationDate = time; // dodati broj dana
                radnaMesta[i].hashUlaznice = hash(_to, cnt,time);
                cnt++;
            }
            if(cnt == number_of_places)
                break;
        }
    }
    function numberOfFreePlacesPerUser(address _address) external view returns (uint){
        return numberOfPlacesForAddress(_address) - numberOfRentedPlacesForAddress(_address);
    }

    function hash(address ownerOfSeat, uint counter , uint256 expirationDate) private view returns(bytes32)
    {
        // Hash na osnovu adrese vlasnika, adrese zakupca, rednog broja mesta koji se rezervise, trenutnog vremena, vremena isteka
        return keccak256(abi.encode(ownerOfSeat, counter, msg.sender, block.timestamp, expirationDate)); 
    }

    function getUserHash(address _to) public view returns(bytes32[] memory)
    {
        bytes32 [] memory h;
        uint256 cnt=0;
        for(uint i =0 ; i<n ;i++)
        {
             if(radnaMesta[i].renter==_to && radnaMesta[i].expirationDate > block.timestamp) cnt++;
                h[cnt++]=radnaMesta[i].hashUlaznice;
        }
        return h;
    } 

}