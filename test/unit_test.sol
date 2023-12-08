// SPDX-License-Identifier: GPL-3.0
        
pragma solidity >=0.4.22 <0.9.0;

import "remix_tests.sol"; 
import "remix_accounts.sol";
import "../src/contracts/Nfticket.sol";

contract testSuite {
    Nfticket nfticket;
    address initialOwner;

    // Runs before each test case
    function beforeEach() public {
        initialOwner = address(this);
        nfticket = new Nfticket(initialOwner, 100, 1 ether); // Set a max supply and mint price for the tests
    }

    /// Test if the contract is initially not enabled for minting
    function testInitialMintNotEnabled() public {
        Assert.ok(!nfticket.isMintEnabled(), "Minting should initially be disabled");
    }

    /// Test if the contract can toggle the minting status
    function testToggleMint() public {
        bool initialStatus = nfticket.isMintEnabled();
        nfticket.toggleMintEnabled();
        Assert.ok(nfticket.isMintEnabled() != initialStatus, "Minting status should have toggled");
    }

    /// Test minting a token with the correct ether value
    function testMintingWithCorrectValue() public {
        // Create a new instance of the contract where the test contract is the owner
        Nfticket testNfticket = new Nfticket(address(this), 100, 1 ether);

        testNfticket.toggleMintEnabled();
        string memory uri = "http://testuri";

        // Attempt to mint with correct ether
        testNfticket.safeMint{value: 1 ether}(address(this), uri, 1);
        uint256 balance = testNfticket.balanceOf(address(this));
        Assert.ok(balance == 1, "Balance should be 1 after successful mint");
    }

}
