// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract TestFallbackFunctions {

    address payable contractAddress;

    constructor(address payable _addr) {
        contractAddress = _addr;
    }
    // msg.data is empty
    function callReceiveFunction() public payable {
        contractAddress.transfer(msg.value);
    }
    // msg.data is invalid or wrong
    function callFallbackFunction() public payable {
        (bool sent,) = contractAddress.call{value: msg.value}("abcd");
        require(sent, "Fallback function call failed");
    }
}