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

    function testUnderflowAttack() public {
        // Assume that the initial balance is 0
        Assert.equal(nfticket.balanceOf(address(this)), 0, "Initial balance should be 0");

        // Attempt to transfer more tokens than the balance
        (bool success,) = address(nfticket).call(abi.encodeWithSignature("transfer(address,uint256)", address(0), 1));
        Assert.ok(!success, "Underflow attack should fail");
    }

    function testOverflowAttack() public {
        // Assume that the initial balance is 0
        Assert.equal(nfticket.balanceOf(address(this)), 0, "Initial balance should be 0");

        // Attempt to transfer a very large number of tokens
        (bool success,) = address(nfticket).call(abi.encodeWithSignature("transfer(address,uint256)", address(0), 2**256 - 1));
        Assert.ok(!success, "Overflow attack should fail");
    }
}
