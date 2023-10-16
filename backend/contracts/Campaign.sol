// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Campaign {
    address public manager;
    uint256 public minimumContribution;

    constructor(uint256 minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }
}
