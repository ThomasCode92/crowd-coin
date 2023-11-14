import web3 from './web3';

import campaignAbi from '@/ethereum/dist/Campaign.json';

export const getCampaign = address =>
  new web3.eth.Contract(campaignAbi, address);
