import { Table } from 'semantic-ui-react';

import web3 from '@/utils/web3';

export default function RequestRow({ request }) {
  return (
    <Table.Row>
      <Table.Cell>{request.idx}</Table.Cell>
      <Table.Cell>{request.description}</Table.Cell>
      <Table.Cell>{web3.utils.fromWei(request.value, 'ether')}</Table.Cell>
      <Table.Cell>{request.recipient}</Table.Cell>
    </Table.Row>
  );
}
