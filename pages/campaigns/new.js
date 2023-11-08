import { Fragment, useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import campaignFactory from '@/utils/factory';
import web3 from '@/utils/web3';

export default function NewCampaign() {
  const [minimumContribution, setMinimumContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async event => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      const { createCampaign } = campaignFactory.methods;

      await createCampaign(minimumContribution).send({
        from: accounts[0],
        data: createCampaign(minimumContribution).encodeABI(),
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Fragment>
      <h1>Create a Campaign</h1>
      <Form error={Boolean(errorMessage)} onSubmit={submitHandler}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={event => setMinimumContribution(event.target.value)}
          />
        </Form.Field>
        <Message error header="Something went wrong!" content={errorMessage} />
        <Button primary content="Create" />
      </Form>
    </Fragment>
  );
}
