//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./Token.sol";
interface USDC {
    function transfer(address dst, uint amount) external returns (bool);
    function transferFrom(address src, address dst, uint amount) external returns(bool);
    function balanceOf(address guy) external view returns (uint);
    function approve(address spender, uint256 amount) external returns (bool);
}
contract Rent {
    Token private token;
    USDC private usdc;
    uint private amount = 250;
    struct RadnoMesto {
        address ownerOfSeat;
        uint256 expirationDate;
        bytes32 hashUlaznice;
    }
    uint n = 100;
    RadnoMesto[] private radnaMesta;
    address private owner;
    mapping(address => uint256) private stakingBalance;
    constructor(address tokenAddress) {
        token = Token(tokenAddress);
        usdc = USDC(0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C);
        owner = msg.sender;
    }
    function stakeTokens(uint256 _amount) external {
        require(_amount > 0, "Izaberi veci od 0");
        require(token.balanceOf(msg.sender) >= _amount, "Nemas toliko tokena!");
        token.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
    }
    function unstakeTokens(uint256 _amount,uint256 numberOfRentedTokens) external {
        require(_amount > 0," Izaberi veci od 0");
        require(stakingBalance[msg.sender] >= _amount, "Nemas toliko stakeovanih tokena!");
        //uint8 rentedPlaces = numberOfRentedPlacesForAddress(msg.sender);
        //uint8 numberOfRentedTokens = rentedPlaces * token.totalSupply() / n;
        require(_amount <= stakingBalance[msg.sender] - numberOfRentedTokens, "Ne mozes toliko da unstakeujes tokena");
        token.transfer(msg.sender, _amount);
        stakingBalance[msg.sender] -= _amount;
    }
    function getStakingBalance(address _address) public view returns(uint) {
        return stakingBalance[_address];
    }
    function numberOfPlacesForAddress(address _address) public view returns (uint){
        // Koliko neko moze da iznajmi mesta
        return stakingBalance[_address] * n / token.totalSupply();
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
    function numberOfFreePlacesForAddress(address _address) public view returns (uint){
        return numberOfPlacesForAddress(_address) - numberOfRentedPlacesForAddress(_address);
    }
    function rentSeat(uint number_of_places, uint numberOfDays, uint fee) payable public {
        require(numberOfDays > 0, "Izaberi vise od 0 dana");
        require(number_of_places > 0, "Izaberi vise od 0 mesta");
        require(numberOfFreePlacesForAddress(msg.sender) >= number_of_places , "Nije moguce rentirati toliko mesta"); //provera da li je broj mesta za rezervaciju veci od 0
        require(usdc.balanceOf(msg.sender) >= fee , "you dont have enough funds"); //provera da li korisnik ima dovoljno para
        bool sent = usdc.transferFrom(msg.sender, owner, fee);  //transakcija izmedju korisnika
        require(sent, "Failed to send USDC"); //provera da li je transakcija uspela
        // Registrovati korisnika da je iznajmio
        uint time = block.timestamp + numberOfDays * 1 days;
        for(uint i = 0;i < number_of_places;i++){
            radnaMesta.push(RadnoMesto(msg.sender, time,hash(owner,i,time)));
        }
    }
    function hash(address ownerOfSeat, uint counter , uint256 expirationDate) private view returns(bytes32)
    {
        // Hash na osnovu adrese vlasnika, adrese zakupca, rednog broja mesta koji se rezervise, trenutnog vremena, vremena isteka
        return keccak256(abi.encode(ownerOfSeat, counter, msg.sender, block.timestamp, expirationDate));
    }
    function getUserHash() public view returns(bytes32[] memory)
    {
        bytes32 [] memory h = new bytes32[](numberOfRentedPlacesForAddress(msg.sender));
        uint256 cnt=0;
        for(uint i =0 ; i< radnaMesta.length ;i++)
        {
             if(radnaMesta[i].ownerOfSeat== msg.sender && radnaMesta[i].expirationDate >= block.timestamp){
                h[cnt] = radnaMesta[i].hashUlaznice;
                cnt = cnt + 1;
             }
        }
        return h;
    }
    function getExpireDate(uint cnt) public view returns(uint){
        for(uint i = 0;i < radnaMesta.length;i++) {
            if(radnaMesta[i].ownerOfSeat == msg.sender && radnaMesta[i].expirationDate >= block.timestamp) {
                if(cnt == 0)
                    return radnaMesta[i].expirationDate;
                cnt--;
            }
        }
    }

    function getAmount() public view returns(uint) {
        return amount;
    }

    function getNumberOfSeats() public view returns(uint) {
        return n;
    }
}

