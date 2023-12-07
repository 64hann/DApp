// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../src/contracts/Nfticket.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract TestNfticket {
    Nfticket nfticket;
    address initialOwner;

    // Runs before each test case
    function beforeEach() public {
        initialOwner = address(this);
        nfticket = new Nfticket(initialOwner, 100, 1 wei); // Set a max supply and mint price for the tests
    }

    function testMintingWhenMintingIsDisabled() public {
        nfticket.toggleMintEnabled(); // Disable minting
        string memory uri = "http://testuri";

        // Attempt to mint when minting is disabled
        (bool success,) = address(nfticket).call{value: 1 wei}(abi.encodeWithSignature("safeMint(address,string,uint256)", address(this), uri, 1));
        Assert.ok(!success, "Minting should fail when minting is disabled.");
    }

    /// Test minting above the max supply
    function testMintAboveMaxSupply() public {
        nfticket = new Nfticket(initialOwner, 0, 1 wei); // Create a new instance with a max supply of 0
        nfticket.toggleMintEnabled(); // Enable minting

        string memory uri = "http://testuri";

        // Attempt to mint when max supply is reached
        (bool success,) = address(nfticket).call{value: 1 wei}(abi.encodeWithSignature("safeMint(address,string,uint256)", address(this), uri, 1));
        Assert.ok(!success, "Minting should fail when max supply is reached.");
    }

    function testSellingNonOwnedToken() public {
        // Attempt to sell a token that the user does not own
        (bool success,) = address(nfticket).call(abi.encodeWithSignature("transferToken(address,uint256)", address(this), 1));
        Assert.ok(!success, "Selling a non-owned token should fail");
    }

    
    function testMintingWithIncorrectValue() public {
        nfticket.toggleMintEnabled(); // Enable minting
        string memory uri = "http://testuri";

        // Attempt to mint with less ether than required
        (bool success,) = address(nfticket).call{value: 500000000000000 wei}(abi.encodeWithSignature("safeMint(address,string,uint256)", address(this), uri, 1));
        Assert.ok(!success, "Minting should fail when incorrect value is sent.");
    }
}
