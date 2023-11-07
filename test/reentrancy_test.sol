contract reentrancyTest {

    Nfticket nfticket;
    Attacker attacker;
    
    // The address which will represent the contract owner
    address owner = address(this);

    // Deploy the contracts before each test
    function beforeEach() public {
        nfticket = new Nfticket();
        attacker = new Attacker(address(nfticket));
    }

    /// Test to ensure reentrancy attack does not succeed
    function testReentrancyAttack() public {
        // Preparing the test, sending ether to the Nfticket contract to simulate a balance
        payable(address(nfticket)).transfer(1 ether);
        
        // Sending ether to the Attacker contract to perform the attack
        payable(address(attacker)).transfer(1 ether);

        // Perform the attack
        try attacker.attack{value: 1 ether}() {
            // If the attack succeeds, this is bad and should not happen
            Assert.fail("Attack should not be successful");
        } catch Error(string memory reason) {
            // We expect this test to fail, meaning the attack was not successful
            // Check that the Nfticket contract still has the ether
            Assert.equal(address(nfticket).balance, 1 ether, "Nfticket contract should still have 1 ether");
            // Check that the attack did not happen more than once
            Assert.equal(attacker.attackCount(), 1, "Attacker should have only been able to call transferToken once");
        }
    }
}
