// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Campaign {
    address public manager;
    uint256 public minimumContribution;
    uint256 public approversCount;
    mapping(address => bool) public approvers;
    Request[] public requests;

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
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

    function finalizeRequest(uint256 requestIndex) public restricted {
        Request storage request = requests[requestIndex];

        require(request.approvalCount > approversCount / 2);
        require(!request.complete);

        request.complete = true;
        request.recipient.transfer(request.value);
    }

    function getSummary()
        public
        view
        returns (uint256, uint256, uint256, uint256, address)
    {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    }
}
