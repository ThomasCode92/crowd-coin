import { useEffect } from 'react';
import campaignFactory from '@/utils/factory';

export default function Home() {
  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaigns = await campaignFactory.methods
        .getDeployedCampaigns()
        .call();

      console.log(campaigns);
    };

    fetchCampaigns();
  }, []);

  return <h1>Welcome to Crowd Coin</h1>;
}
