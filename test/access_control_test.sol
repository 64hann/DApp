pragma solidity ^0.8.20;

import "remix_tests.sol"; 
import "remix_accounts.sol";
import "../src/contracts/Nfticket.sol";

contract AccessControlTest {
    Nfticket public nfticket;

    constructor(address payable _nfticketAddress) {
        nfticket = Nfticket(_nfticketAddress);
    }

    function testAccessControl() public {
        // Test that non-owner cannot call owner-only functions
        (bool success,) = address(nfticket).call(abi.encodeWithSignature("setmintPrice(uint256)", 1 ether));
        assert(!success);

        (success,) = address(nfticket).call(abi.encodeWithSignature("setMaxSupply(uint256)", 100));
        assert(!success);

        (success,) = address(nfticket).call(abi.encodeWithSignature("toggleMintEnabled()"));
        assert(!success);

        // Test that owner can call owner-only functions
        nfticket.setmintPrice(1 ether);
        assert(nfticket.mintPrice() == 1 ether);

        nfticket.setMaxSupply(100);
        assert(nfticket.MAX_SUPPLY() == 100);

        nfticket.toggleMintEnabled();
        assert(nfticket.isMintEnabled() == true);
    }
}
