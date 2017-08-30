pragma solidity ^0.4.6;

contract owned {
    address public owner;

    function owned() {
        owner = msg.sender;
    }

    modifier isOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) isOwner {
        owner = newOwner;
    }
}

contract Scoreboard is owned {
 /* Public variables of the token */
    address company;
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    bytes32 buys;
    bytes32 sells;
    uint public prizePool;
    
    
    mapping(address => uint256) public balanceOf;
    mapping(bytes32 => BuyOrder) Buys;
    mapping(bytes32 => SellOrder) Sells;
    
    //Constructor runs once at deployment
    function Scoreboard(
        uint256 initialSupply,
        string tokenName,
        uint8 decimalUnits,
        string tokenSymbol
        ) {
        /* Start with initial supply tokens allocated to company */
        company = owner;                        // Scoreboard Inc. is company
        balanceOf[company] = initialSupply;     // Give the creator all initial tokens
        totalSupply = initialSupply;            // Update total supply
        name = tokenName;                       // Set the name for display purposes
        symbol = tokenSymbol;                   // Set the symbol for display purposes
        decimals = decimalUnits;                // Amount of decimals for display purposes
        bytes32[] buys;                         // Array of structs each representing a buy order
        bytes32[] sells;                        // Array of structs each representing a sell order
        }
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event CoinBought(address sender, address rec1, address rec2, uint amount, string _msg);
    event AdPlaced();
    
    struct BuyOrder{
        address buyerAddress;
        uint limitPrice;
        uint quantity;
        uint balanceETH;
    }
    
    struct SellOrder {
        address sellerAddress;
        uint limitPrice;
        uint quantity;
        unit balanceSB;
    }
    

    /* Send coins */
    function transfer(address _to, uint256 _value) {
    /* Check if sender has balance and for overflows */
    require(balanceOf[msg.sender] >= _value && balanceOf[_to] + _value >= balanceOf[_to]);
    
    /* Add and subtract new balances */
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    /* Notify anyone listening that this transfer took place */
    Transfer(msg.sender, _to, _value);
    }
    
    function buyCoins (uint limit, uint quantity) 
        payable{
    //User places a limit buy order for SB coins
        buy = BuyOrder({
                buyerAddress: msg.sender,
                limitPrice: limit,
                quantity: quantity,
                balanceETH: msg.value,
                deadlineBlock: block.number + deadline});
        buys.push(buy).sort(/* sort by buys.limit descending */);
        
        //Require the highest bid buyer and highest bid seller have equal limit price
        require(!buys[0].limit == sells[0].limit);
        //Require the sell quantity to be larger than the buy quantity
        require(!sells[0].quantity > buys[0].quantity);
       
        //Require the buyer to have more than quantity times limit
        //Also require that the quantity times limit is positive
        require(balanceOf[buys[0].buyerAddress] >= (quantity * limit) && balanceOf[sells[0].sellerAddress] + (quantity * limit) >= balanceOf[sells[0].sellerAddress]);
       
        /* Add and subtract new balances */
        balanceOf[buys[0].buyerAddress] -= (quantity * limit);
        balanceOf[sells[0].buyerAddress] += (quantity * limit);
        /* Notify anyone listening that this transfer took place */
        Transfer(msg.sender, _to, _value);

    }
    
    function sellCoins(uint limit, uint quantity) 
        payable{
    //User places a limit sell order to sell SB coins
        sell = SellOrder({
                sellerAddress: msg.sender,
                limitPrice: limit,
                quantity: quantity,
                balanceSB: msg.value});
        sells.push(sell).sort(/* sort by buys.limit descending */)
        require(!buys[0].limit == sells[0].limit);
        //send buys[0].quantity
    }
    
    function buyAd(unit bid, uint quantity) {
    //User purchases a block of ad impressions
    }

    function placeAd() {
    //Executes when an ad loads to transfer value
    //Advertiser purchases coins
    //Send coins to prizePool
    }

    function sunday(){
        //How do we determine it is Sunday?
        //Distribute the prizePool to winners on Sunday
    }
        
    function coinSale (uint amount)
        isOwner(){
    //Company mints and sells limited number of coins    
    }
}   
