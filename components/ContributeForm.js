import { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export default function ContributeForm() {
  const [contribution, setContribution] = useState('');

  const submitHandler = event => {
    event.preventDefault();
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
