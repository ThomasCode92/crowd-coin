import { Fragment } from 'react';
import { Card } from 'semantic-ui-react';

import {
  getCampaign,
  getCampaignDetails,
  getCampaignSummary,
} from '@/utils/campaign';

export default function showCampaign(props) {
  const campaignDetails = getCampaignDetails(props.summary);

  return (
    <Fragment>
      <h1>Campaign details</h1>
      <Card.Group items={campaignDetails} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const campaign = getCampaign(context.query.address);

  const summaryData = await campaign.methods.getSummary().call();
  const summary = getCampaignSummary(summaryData);

  return { props: { summary } };
}
