import { Fragment } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default function NewCampaign() {
  return (
    <Fragment>
      <h1>Create a Campaign</h1>
      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
          <input />
        </Form.Field>
        <Button primary>Create</Button>
      </Form>
    </Fragment>
  );
}
