import { Fragment, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export default function NewCampaign() {
  const [minimumContribution, setMinimumContribution] = useState('');

  return (
    <Fragment>
      <h1>Create a Campaign</h1>
      <Form>
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
