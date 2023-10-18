// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Campaign {
    address public manager;
    uint256 public minimumContribution;
    address[] public approvers;
    Request[] public requests;

    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint256 minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers.push(msg.sender);
    }
}
