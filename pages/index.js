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
      <h1>Open Campaigns</h1>
      <Button
        content="Create Campaign"
        icon="add circle"
        primary
        floated="right"
      />
      <Card.Group items={campaignItems} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const campaigns = await campaignFactory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
}
