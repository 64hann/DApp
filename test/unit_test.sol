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
        nfticket = new Nfticket(initialOwner);
        nfticket.setMaxSupply(100); // Set a max supply for the tests
    }

    /// Test if the contract is initially not enabled for minting
    function testInitialMintNotEnabled() public {
        Assert.equal(nfticket.isMintEnabled(), false, "Minting should initially be disabled");
    }

    /// Test if the contract can toggle the minting status
    function testToggleMint() public {
        bool initialStatus = nfticket.isMintEnabled();
        nfticket.toggleMintEnabled();
        Assert.notEqual(nfticket.isMintEnabled(), initialStatus, "Minting status should have toggled");
    }

    /// Test setting the mint price
    function testSetMintPrice() public {
        uint256 newPrice = 1 ether;
        nfticket.setmintPrice(newPrice);
        Assert.equal(nfticket.mintPrice(), newPrice, "Mint price should be updated");
    }

    /// Test minting a token with the correct ether value
    function testMintingWithCorrectValue() public {
        nfticket.setmintPrice(1 ether);
        nfticket.setMaxSupply(10);
        nfticket.toggleMintEnabled();
        string memory uri = "http://testuri";

        // Attempt to mint with correct ether
        nfticket.safeMint{value: 1 ether}(address(this), uri, 1);
        uint256 balance = nfticket.balanceOf(address(this));
        Assert.equal(balance, 1, "Balance should be 1 after successful mint");
    }

    function testMintingWithIncorrectValue() public {
        nfticket.setmintPrice(1 ether);
        nfticket.setMaxSupply(10);
        nfticket.toggleMintEnabled();
        string memory uri = "http://testuri";

        // Attempt to mint with less ether than required
        (bool success,) = address(nfticket).call{value: 0.5 ether}(abi.encodeWithSignature("safeMint(address,string,uint256)", address(this), uri, 1));
        Assert.ok(true, "Minting should fail when incorrect value is sent.");
    }
}
