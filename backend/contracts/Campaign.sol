// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Campaign {
    address public manager;
    uint256 public minimumContribution;
    uint private currentRequestIndex = 0;
    mapping(address => bool) public approvers;
    mapping(uint => Request) public requests;

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

    function approveRequest(Request memory request) public {
        // Make sure person calling this function has donated
        bool isApprover = false;
        for (uint i = 0; i < approvers.length; i++) {
            if (approvers[i] == msg.sender) {
                isApprover = true;
            }
        }
        require(isApprover);

        // Make sure person calling this function hasn't voted before
        for (uint i = 0; i < request.approvers.length; i++) {
            require(approvers != msg.sender);
        }
    }

    function createRequest(
        string memory description,
        uint value,
        address payable recipient
    ) public payable restricted {
        Request storage request = requests[currentRequestIndex];

        request.description = description;
        request.value = value;
        request.recipient = recipient;
        request.complete = false;
        request.approvalCount = 0;

        currentRequestIndex++;
    }
}
