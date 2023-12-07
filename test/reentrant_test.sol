// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../src/contracts/Nfticket.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract MaliciousContract is IERC721Receiver {
    Nfticket public nfticket;
    bool public reentered = false;

    constructor(address payable _nfticketAddress) {
        nfticket = Nfticket(_nfticketAddress);
    }

    receive() external payable {
        if (!reentered) {
            reentered = true;
            nfticket.transferToken(payable(address(this)), 1);
        }
    }

    function attack() external payable {
        nfticket.safeMint{value: msg.value}(payable(address(this)), "someURI", 1);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}

contract ReentrancyTest {
    Nfticket public nfticket;
    MaliciousContract public attacker;

    constructor() {
        nfticket = new Nfticket(payable(address(this)), 100, 1 ether);
        attacker = new MaliciousContract(payable(address(nfticket)));
    }

    function testReentrancyAttack() public {
        nfticket.toggleMintEnabled();
        attacker.attack{value: 1 ether}();
        require(attacker.reentered() == false, "Reentrancy attack succeeded");
    }
}
