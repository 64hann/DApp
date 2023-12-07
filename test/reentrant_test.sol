// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "Nfticket.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

// Malicious contract attempting reentrancy
contract MaliciousContract is IERC721Receiver {
    Nfticket public nfticket;
    event Log(string message);
    constructor(address payable _nfticketAddress) {
        nfticket = Nfticket(_nfticketAddress);
    }

    // Fallback function used to perform the reentrancy attack
    receive() external payable {
        // Attempt to re-enter the transferToken function
        // nfticket.transferToken(payable(address(this)), 1);
        emit Log("payment received");
    }

    function attack() external payable {
        // Initial call to transferToken to start the attack
        // for (uint256 i = 0; i < 1; i++) {
            nfticket.safeMint{value: msg.value}(
                payable(address(this)),
                "someURI");
        //     );
        // }

        // nfticket.safeMint{value: msg.value}(payable(address(this)), "someURI");
        // nfticket.transferToken{value: msg.value}(payable(address(this)), 1);
    }

    // What if contract tries to sell 1 nfticket to 2 poeple at the same time?
    function doubleSpend(address address1 , address address2) external payable {
        nfticket.transferToken(payable(address1), 1);
        nfticket.transferToken(payable(address2), 1);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
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
        attacker = new MaliciousContract(payable(nfticket));
    }

    function testReentrancyAttack() public {
        attacker.attack{value: 1 ether}();
    }
}
