import Link from 'next/link';
import { Fragment } from 'react';
import { Button } from 'semantic-ui-react';

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
  return { props: { address: context.query.address } };
}
