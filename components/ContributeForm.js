import { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

import { getCampaign } from '@/utils/campaign';

export default function ContributeForm({ address }) {
  const [contribution, setContribution] = useState('');

  const submitHandler = event => {
    event.preventDefault();

    const campaign = getCampaign(address);
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
