import { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

import { getCampaign } from '@/utils/campaign';
import web3 from '@/utils/web3';

export default function ContributeForm({ address }) {
  const [contribution, setContribution] = useState('');

  const submitHandler = async event => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();

      const campaign = getCampaign(address);
      const { contribute } = campaign.methods;

      await contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, 'ether'),
        data: contribute().encodeABI(),
      });
    } catch (error) {}
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={contribution}
          onChange={event => setContribution(event.target.value)}
        />
      </Form.Field>
      <Button primary>Contribute</Button>
    </Form>
  );
}
