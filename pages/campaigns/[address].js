import { Fragment } from 'react';
import { Card } from 'semantic-ui-react';

import web3 from '@/utils/web3';
import { getCampaign, getCampaignSummary } from '@/utils/campaign';

export default function showCampaign(props) {
  const {
    balance,
    manager,
    minimumContribution,
    requestsCount,
    approversCount,
  } = props.summary;

  const items = [
    {
      header: manager,
      meta: 'Address of Manager',
      description:
        'The manager created this campaign and can create requests to withdraw money',
      style: { overflowWrap: 'break-word' },
    },
    {
      header: minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description:
        'You must contribute at least this much wei to become an approver',
    },
    {
      header: requestsCount,
      meta: 'Number of Requests',
      description:
        'A request tries to withdraw money from the contract. Requests must be approved by approvers',
    },
    {
      header: approversCount,
      meta: 'Number of Approvers',
      description: 'Number of people who have already donated to this campaign',
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      meta: 'Campaign Balance (ether)',
      description:
        'The balance is how much money this campaign has left to spend.',
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
