import { Fragment } from 'react';
import { Card } from 'semantic-ui-react';

import { getCampaign, getCampaignSummary } from '@/utils/campaign';

export default function showCampaign(props) {
  const { manager } = props.summary;

  const items = [
    {
      header: manager,
      meta: 'Address of Manager',
      description:
        'The manager created this campaign and can create requests to withdraw money',
      style: { overflowWrap: 'break-word' },
    },
  ];

  return (
    <Fragment>
      <h1>Campaign details</h1>
      <Card.Group items={items} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const campaign = getCampaign(context.query.address);

  const summaryData = await campaign.methods.getSummary().call();
  const summary = getCampaignSummary(summaryData);

  return { props: { summary } };
}
