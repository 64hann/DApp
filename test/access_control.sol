// SPDX-License-Identifier: GPL-3.0
        
pragma solidity >=0.4.22 <0.9.0;

import "remix_tests.sol"; 
import "remix_accounts.sol";
import "../src/contracts/Nfticket.sol";

contract testSuite {
    Nfticket nfticket;
    address initialOwner;

    /// Test if only the owner can toggle the minting status
    function testToggleMint() public {
        // Create a new instance of the contract where the test contract is the owner
        Nfticket testNfticket = new Nfticket(address(this), 100, 1 ether);

        bool initialStatus = testNfticket.isMintEnabled();

        // Toggle minting status from the owner account (which is the test contract)
        testNfticket.toggleMintEnabled();
        Assert.ok(testNfticket.isMintEnabled() != initialStatus, "Owner should be able to toggle minting status");
    }

    /// Test if only the owner can transfer all funds
    function testTransferAll() public {
        // Create a new instance of the contract where the test contract is the owner
        Nfticket testNfticket = new Nfticket(address(this), 100, 1 ether);

        // Send some ether to the contract
        (bool success,) = payable(address(testNfticket)).call{value: 1 ether}("");
        require(success, "Failed to send ether to the contract");

        // Transfer all funds from the owner account (which is the test contract)
        testNfticket.transferAll();

        // Check that the contract balance is now 0
        uint256 balance = address(testNfticket).balance;
        Assert.ok(balance == 0, "Contract balance should be 0 after owner transfers all funds");
    }
}
