import { Button, Form, Input } from 'semantic-ui-react';

export default function ContributeForm() {
  return (
    <Form>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input label="ether" labelPosition="right" />
      </Form.Field>
      <Button primary>Contribute</Button>
    </Form>
  );
}
