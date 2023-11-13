import { Fragment } from 'react';
import { Button, Card } from 'semantic-ui-react';

import campaignFactory from '@/utils/factory';
import Link from 'next/link';

export default function Home({ campaigns }) {
  const campaignItems = campaigns.map(address => ({
    header: address,
    description: <Link href={'campaigns/' + address}>View Campaign</Link>,
    fluid: true,
  }));

  return (
    <Fragment>
      <h1>Open Campaigns</h1>
      <Link href="/campaigns/new">
        <Button
          content="Create Campaign"
          icon="add circle"
          primary
          floated="right"
        />
      </Link>
      <Card.Group items={campaignItems} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const campaigns = await campaignFactory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
}
