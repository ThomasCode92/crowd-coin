// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import './Campaign.sol';

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        Campaign campaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(address(campaign));
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
