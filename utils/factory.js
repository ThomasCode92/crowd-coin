import web3 from './web3';

import campaignFactoryAbi from '@/ethereum/dist/CampaignFactory.json';

const campaignFactory = new web3.eth.Contract(
  campaignFactoryAbi,
  process.env.NEXT_PUBLIC_CAMPAIGN_FACTORY_CONTRACT,
);

export default campaignFactory;
