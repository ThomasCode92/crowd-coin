import { Fragment } from 'react';
import Link from 'next/link';
import { Button, Table } from 'semantic-ui-react';

import RequestRow from '@/components/RequestRow';

import { getCampaign } from '@/utils/campaign';

export default function CampaignRequests({
  address,
  requests,
  approversCount,
}) {
  return (
    <Fragment>
      <h1>Request List</h1>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Add Request</Button>
      </Link>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Approval Count</Table.HeaderCell>
            <Table.HeaderCell>Approve</Table.HeaderCell>
            <Table.HeaderCell>Finalize</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {requests.map((request, idx) => (
            <RequestRow
              key={idx}
              request={{ idx, ...request }}
              approversCount={approversCount}
              address={address}
            />
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { address } = context.query;
  const campaign = getCampaign(address);

  const requestsCount = Number(
    await campaign.methods.getRequestsCount().call(),
  );

  const approversCount = Number(await campaign.methods.approversCount().call());

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

  return { props: { address, requests, approversCount } };
}
