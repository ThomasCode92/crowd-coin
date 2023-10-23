// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Campaign {
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
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
        approvers[msg.sender] = true;
    }

    function approveRequest(uint256 requestIndex) public {
        Request storage request = requests[requestIndex];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function createRequest(
        string memory description,
        uint value,
        address payable recipient
    ) public restricted {
        Request storage request = requests.push();

        request.description = description;
        request.value = value;
        request.recipient = recipient;
        request.complete = false;
        request.approvalCount = 0;
    }
}
