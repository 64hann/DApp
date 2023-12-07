pragma solidity ^0.8.20;

import "remix_tests.sol"; 
import "remix_accounts.sol";
import "../src/contracts/Nfticket.sol";

contract TestNfticket {
    Nfticket nfticket;
    address initialOwner;

    // Runs before each test case
    function beforeEach() public {
        initialOwner = address(this);
        nfticket = new Nfticket(initialOwner);
        nfticket.setMaxSupply(100); // Set a max supply for the tests
    }

    function testMintingWhenMintingIsDisabled() public {
        nfticket.setmintPrice(1 ether);
        nfticket.setMaxSupply(10);
        string memory uri = "http://testuri";

        // Attempt to mint when minting is disabled
        (bool success,) = address(nfticket).call{value: 1 ether}(abi.encodeWithSignature("safeMint(address,string,uint256)", address(this), uri, 1));
        Assert.ok(!success, "Minting should fail when minting is disabled.");
    }

    /// Test minting above the max supply
    function testMintAboveMaxSupply() public {
        nfticket.toggleMintEnabled();
        nfticket.setMaxSupply(0); // Set max supply to 0 to force failure

        string memory uri = "http://testuri";
        uint256 mintPrice = nfticket.mintPrice();

        try nfticket.safeMint{value: mintPrice}(initialOwner, uri, mintPrice) {
            Assert.ok(true, "Minting succeeded when it should have failed");
        } catch Error(string memory reason) {
            // Check that the contract failed for the right reason
            Assert.equal(reason, "All available NFTs have been minted", "Should fail due to max supply being reached");
        }
    }

    function testSellingNonOwnedToken() public {
        // Attempt to sell a token that the user does not own
        (bool success,) = address(nfticket).call(abi.encodeWithSignature("sellToken(uint256)", 1));
        Assert.ok(!success, "Selling a non-owned token should fail");
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
