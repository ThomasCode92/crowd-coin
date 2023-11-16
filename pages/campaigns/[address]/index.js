import { Fragment } from 'react';
import Link from 'next/link';
import { Button, Card, Grid } from 'semantic-ui-react';

import ContributeForm from '@/components/ContributeForm';

import {
  getCampaign,
  getCampaignDetails,
  getCampaignSummary,
} from '@/utils/campaign';

export default function showCampaign({ address, summary }) {
  const campaignDetails = getCampaignDetails(summary);

  return (
    <Fragment>
      <h1>Campaign details</h1>
      <Grid>
        <Grid.Column width={10}>
          <Card.Group items={campaignDetails} />
          <Link href={`/campaigns/${address}/requests`}>
            <Button primary>View Requests</Button>
          </Link>
        </Grid.Column>
        <Grid.Column width={6}>
          <ContributeForm address={address} />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const campaign = getCampaign(context.query.address);

  const summaryData = await campaign.methods.getSummary().call();
  const summary = getCampaignSummary(summaryData);

  return { props: { address: context.query.address, summary } };
}
