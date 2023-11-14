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
