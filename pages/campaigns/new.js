import { Fragment, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

import campaignFactory from '@/utils/factory';
import web3 from '@/utils/web3';

export default function NewCampaign() {
  const [minimumContribution, setMinimumContribution] = useState('');

  const submitHandler = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    const { createCampaign } = campaignFactory.methods;

    await createCampaign(minimumContribution).send({
      from: accounts[0],
      data: createCampaign(minimumContribution).encodeABI(),
    });
  };

  return (
    <Fragment>
      <h1>Create a Campaign</h1>
      <Form onSubmit={submitHandler}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={event => setMinimumContribution(event.target.value)}
          />
        </Form.Field>
        <Button primary content="Create" />
      </Form>
    </Fragment>
  );
}
