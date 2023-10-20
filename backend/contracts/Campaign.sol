// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Campaign {
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
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
        uint256 value,
        address recipient
    ) public restricted {
        require(approvers[msg.sender]);

        Request memory request = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false
        });

        requests.push(request);
    }
}
