import { Fragment } from 'react';
import { Button, Card } from 'semantic-ui-react';

import campaignFactory from '@/utils/factory';

export default function Home({ campaigns }) {
  const campaignItems = campaigns.map(address => ({
    header: address,
    description: <a>View Campaign</a>,
    fluid: true,
  }));

  return (
    <Fragment>
      <h1>Welcome to Crowd Coin</h1>
      <Card.Group items={campaignItems} />
      <Button content="Create Campaign" icon="add circle" primary />
    </Fragment>
  );
}

export async function getStaticProps() {
  const campaigns = await campaignFactory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
}
