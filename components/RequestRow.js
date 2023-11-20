import { Button, Table } from 'semantic-ui-react';

import web3 from '@/utils/web3';
import { getCampaign } from '@/utils/campaign';

export default function RequestRow({ request, approversCount, address }) {
  const handleApprove = async () => {
    const accounts = await web3.eth.getAccounts();

    const campaign = getCampaign(address);
    const { approveRequest } = campaign.methods;

    await approveRequest(request.idx).send({
      from: accounts[0],
      data: approveRequest(request.idx).encodeABI(),
    });
  };

  return (
    <Table.Row>
      <Table.Cell>{request.idx}</Table.Cell>
      <Table.Cell>{request.description}</Table.Cell>
      <Table.Cell>{web3.utils.fromWei(request.value, 'ether')}</Table.Cell>
      <Table.Cell>{request.recipient}</Table.Cell>
      <Table.Cell>
        {request.approvalCount}/{approversCount}
      </Table.Cell>
      <Table.Cell>
        <Button basic color="green" onClick={handleApprove}>
          Approve
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
