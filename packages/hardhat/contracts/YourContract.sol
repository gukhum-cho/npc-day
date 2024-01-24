//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
// import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */

/*
	This is a smart contract for a mini game where users can attack a boss and reduce its health.
	The boss starts with a certain amount of health, and the contract owner can reset the boss's health.
	Users can attack the boss, reducing its health by a certain amount until it is defeated.
*/
contract YourContract {
	uint256 public bossHealth;
	address public owner;

	// Event that is emitted whenever the boss is attacked
	event BossAttacked(address attacker, uint256 damageDealt, uint256 newHealth);

	// Event that is emitted when the boss health is reset
	event BossHealthReset(uint256 newHealth);

	constructor() {
        // Set the boss's initial health and the contract deployer as the owner
        bossHealth = 100;
        owner = msg.sender;
    }
	// Below are skills that reduces boss health said by fixed amounts
	function strongSlash() external {
		attack("Strong Slash", 20);
	}
	
	function quickSlash() external {
        attack("Quick Slash", 10);
    }

    function normalSlash() external {
        attack("Normal Slash", 1);
    }

	// Function to attack the boss, reducing its HP
	function attack(string memory attackType, uint256 damage) internal {
        require(bossHealth > 0, "The boss is already defeated.");
        // require(bossHealth >= damage, "Attack damage exceeds boss health.");

        if (damage >= bossHealth) {
			bossHealth = 0;
		} else {
			bossHealth -= damage;
		}
		emit BossAttacked(msg.sender, damage, bossHealth);
    }
	
	// Function to check the boss's health
    function checkBossHealth() external view returns (uint256) {
        return bossHealth;
    }

	// Function to reset the boss's health, restricted to the contract owner
    function resetBossHealth() external {
        bossHealth = 100;
        emit BossHealthReset(100);
    }

	
    // Modifier to check if the caller is the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner.");
        _;
    }

	// Function to change the owner of the contract
    function changeOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }

}
	// // State Variables
	// address public immutable owner;
	// string public greeting = "Building Unstoppable Apps!!!";
	// bool public premium = false;
	// uint256 public totalCounter = 0;
	// mapping(address => uint) public userGreetingCounter;

	// // Events: a way to emit log statements from smart contract that can be listened to by external parties
	// event GreetingChange(
	// 	address indexed greetingSetter,
	// 	string newGreeting,
	// 	bool premium,
	// 	uint256 value
	// );

	// // Constructor: Called once on contract deployment
	// // Check packages/hardhat/deploy/00_deploy_your_contract.ts
	// constructor(address _owner) {
	// 	owner = _owner;
	// }

	// // Modifier: used to define a set of rules that must be met before or after a function is executed
	// // Check the withdraw() function
	// modifier isOwner() {
	// 	// msg.sender: predefined variable that represents address of the account that called the current function
	// 	require(msg.sender == owner, "Not the Owner");
	// 	_;
	// }

	// /**
	//  * Function that allows anyone to change the state variable "greeting" of the contract and increase the counters
	//  *
	//  * @param _newGreeting (string memory) - new greeting to save on the contract
	//  */
	// function setGreeting(string memory _newGreeting) public payable {
	// 	// Print data to the hardhat chain console. Remove when deploying to a live network.
	// 	// console.log(
	// 	// 	"Setting new greeting '%s' from %s",
	// 	// 	_newGreeting,
	// 	// 	msg.sender
	// 	// );

	// 	// Change state variables
	// 	greeting = _newGreeting;
	// 	totalCounter += 1;
	// 	userGreetingCounter[msg.sender] += 1;

	// 	// msg.value: built-in global variable that represents the amount of ether sent with the transaction
	// 	if (msg.value > 0) {
	// 		premium = true;
	// 	} else {
	// 		premium = false;
	// 	}

	// 	// emit: keyword used to trigger an event
	// 	emit GreetingChange(msg.sender, _newGreeting, msg.value > 0, 0);
	// }

	// /**
	//  * Function that allows the owner to withdraw all the Ether in the contract
	//  * The function can only be called by the owner of the contract as defined by the isOwner modifier
	//  */
	// function withdraw() public isOwner {
	// 	(bool success, ) = owner.call{ value: address(this).balance }("");
	// 	require(success, "Failed to send Ether");
	// }

	// /**
	//  * Function that allows the contract to receive ETH
	//  */
	// receive() external payable {}
