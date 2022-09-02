//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./Token.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";


interface USDC {
    function transfer(address dst, uint amount) external returns (bool);
    function transferFrom(address src, address dst, uint amount) external returns(bool);
    function balanceOf(address guy) external view returns (uint);
    function approve(address spender, uint256 amount) external returns (bool);
}
contract Rent is VRFConsumerBaseV2{

    Token private token;
    USDC private usdc;
    uint private amount = 250;

    VRFCoordinatorV2Interface COORDINATOR;
    uint64 s_subscriptionId;

    address vrfCoordinator = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;
    bytes32 keyHash = 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;
    uint32 callbackGasLimit = 2500000;

    address s_owner;
    uint16 requestConfirmations = 3;

    event RentPlaceEvent();

    struct RadnoMesto {
        address ownerOfSeat;
        uint256 expirationDate;
        bytes32 hashUlaznice;
    }

    mapping(uint256 => RadnoMesto[]) public ulaznice;
    
    uint n = 100;
    RadnoMesto[] private radnaMesta;
    address private owner;
    mapping(address => uint256) private stakingBalance;
    
    constructor(address tokenAddress,uint64 subscriptionId) 
    VRFConsumerBaseV2(
        vrfCoordinator
    ){
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_owner = msg.sender;
        s_subscriptionId = subscriptionId;
        
        token = Token(tokenAddress);
        usdc = USDC(0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C);
        owner = msg.sender;
    }

    function fulfillRandomWords(uint256 requestId,uint256[] memory randomWords) internal override {
        RadnoMesto[] storage r = ulaznice[requestId];
        for(uint i = 0; i < r.length; i++) {
            r[i].hashUlaznice = hash(owner,i,r[i].expirationDate,randomWords[i]);
            radnaMesta.push(r[i]);
        }
        emit RentPlaceEvent();
    }

    function stakeTokens(uint256 _amount) external {
        require(_amount > 0, "Izaberi veci od 0");
        require(token.balanceOf(msg.sender) >= _amount, "Nemas toliko tokena!");
        token.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
    }

    function unstakeTokens(uint256 _amount) external {
        require(_amount > 0," Izaberi veci od 0");
        require(stakingBalance[msg.sender] >= _amount, "Nemas toliko stakeovanih tokena!");
        uint rentedPlaces = numberOfRentedPlacesForAddress(msg.sender);
        uint numberOfRentedTokens = rentedPlaces * token.totalSupply() / n;
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
    //function rentSeat(address payable _to, uint number_of_places, uint numberOfDays) payable public {
    function rentSeat(uint32 number_of_places, uint numberOfDays, uint fee) payable public {
        require(numberOfDays > 0, "Izaberi vise od 0 dana");
        require(number_of_places > 0, "Izaberi vise od 0 mesta");
        require(numberOfFreePlacesForAddress(msg.sender) >= number_of_places , "Nije moguce rentirati toliko mesta"); //provera da li je broj mesta za rezervaciju veci od 0
        require(usdc.balanceOf(msg.sender) >= fee , "you dont have enough funds"); //provera da li korisnik ima dovoljno para
        bool sent = usdc.transferFrom(msg.sender, owner, fee);  //transakcija izmedju korisnika
        require(sent, "Failed to send USDC");
        // Registrovati korisnika da je iznajmio
        uint time = block.timestamp + numberOfDays * 1 days;
        uint s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            number_of_places
        );
        for(uint i = 0;i < number_of_places;i++){
            ulaznice[s_requestId].push(RadnoMesto(msg.sender, time,0));
        }
    }

    //Hash vraca niz hash-va
    function hash(address ownerOfSeat, uint counter , uint256 expirationDate,uint256 randomWord) private view returns(bytes32)
    {
        // Hash na osnovu adrese vlasnika, adrese zakupca, rednog broja mesta koji se rezervise, trenutnog vremena, vremena isteka
        return keccak256(abi.encode(ownerOfSeat, counter, msg.sender, block.timestamp, expirationDate,randomWord));
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