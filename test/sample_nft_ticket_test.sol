// SPDX-License-Identifier: GPL-3.0
        
pragma solidity >=0.4.22 <0.9.0;

import "remix_tests.sol"; 
import "remix_accounts.sol";
import "../nft-contract-github/sample_nft_ticket.sol";

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

    /// Test minting a token
    function testSafeMint() public {
        nfticket.toggleMintEnabled();
        string memory uri = "http://testuri";
        uint256 mintPrice = nfticket.mintPrice();

        try nfticket.safeMint{value: mintPrice}(initialOwner, uri) {
            // If minting succeeds, we want to check the resulting state
            uint256 tokenId = 0; // Assuming first minted token will have ID 0
            Assert.equal(nfticket.ownerOf(tokenId), initialOwner, "Owner should be set correctly after mint");
            Assert.equal(nfticket.tokenURI(tokenId), uri, "URI should be set correctly after mint");
        } catch {
            // If the transaction reverts, the test should fail
            Assert.ok(false, "Minting failed when it should have succeeded");
        }
    }

    /// Test minting above the max supply
    function testMintAboveMaxSupply() public {
        nfticket.toggleMintEnabled();
        nfticket.setMaxSupply(0); // Set max supply to 0 to force failure

        string memory uri = "http://testuri";
        uint256 mintPrice = nfticket.mintPrice();

        try nfticket.safeMint{value: mintPrice}(initialOwner, uri) {
            Assert.ok(false, "Minting succeeded when it should have failed");
        } catch Error(string memory reason) {
            // Check that the contract failed for the right reason
            Assert.equal(reason, "All available NFTs have been minted", "Should fail due to max supply being reached");
        }
    }

    /// Test if minting fails when incorrect ether value is sent
    function testMintingWithIncorrectValue() public {
        nfticket.toggleMintEnabled(); // Ensure minting is enabled for this test
        uint256 mintPrice = nfticket.mintPrice();
        string memory uri = "http://testuri";

        // Attempt to mint with less ether than required
        try nfticket.safeMint{value: 0.5 ether}(initialOwner, uri) {
            Assert.ok(false, "safeMint should fail when incorrect value is sent.");
        } catch Error(string memory reason) {
            Assert.equal(reason, "Ether sent is not correct", "Failed with unexpected reason.");
        }
    }
}
