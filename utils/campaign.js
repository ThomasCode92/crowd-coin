import web3 from './web3';

import campaignAbi from '@/ethereum/dist/Campaign.json';

export const getCampaign = address =>
  new web3.eth.Contract(campaignAbi, address);

export const getCampaignSummary = data => {
  return {
    minimumContribution: Number(data[0]),
    balance: Number(data[1]),
    requestsCount: Number(data[2]),
    approversCount: Number(data[3]),
    manager: data[4],
  };
};

export const getCampaignDetails = summary => {
  const {
    balance,
    manager,
    minimumContribution,
    requestsCount,
    approversCount,
  } = summary;

  return [
    {
      header: manager,
      meta: 'Address of Manager',
      description:
        'The manager created this campaign and can create requests to withdraw money',
      style: { overflowWrap: 'break-word' },
    },
    {
      header: minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description:
        'You must contribute at least this much wei to become an approver',
    },
    {
      header: requestsCount,
      meta: 'Number of Requests',
      description:
        'A request tries to withdraw money from the contract. Requests must be approved by approvers',
    },
    {
      header: approversCount,
      meta: 'Number of Approvers',
      description: 'Number of people who have already donated to this campaign',
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      meta: 'Campaign Balance (ether)',
      description:
        'The balance is how much money this campaign has left to spend.',
    },
  ];
};
