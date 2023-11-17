import { Fragment } from 'react';
import Link from 'next/link';
import { Button } from 'semantic-ui-react';

import { getCampaign } from '@/utils/campaign';

export default function CampaignRequests({ address }) {
  return (
    <Fragment>
      <h1>Request List</h1>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Add Request</Button>
      </Link>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { address } = context.query;
  const campaign = getCampaign(address);

  const requestsCount = Number(
    await campaign.methods.getRequestsCount().call(),
  );

  let requests = await Promise.all(
    Array(requestsCount)
      .fill()
      .map((_, idx) => {
        return campaign.methods.requests(idx).call();
      }),
  );

  requests = requests.map(request => {
    let { description, value, recipient, complete, approvalCount } = request;

    value = Number(value);
    approvalCount = Number(approvalCount);

    return { description, value, recipient, complete, approvalCount };
  });

  return { props: { address, requests } };
}
