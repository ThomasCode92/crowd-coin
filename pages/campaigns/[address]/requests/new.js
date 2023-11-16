import { Fragment, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export default function NewRequest({ address }) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');

  return (
    <Fragment>
      <h1>Create a Request</h1>
      <Form>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={event => setRecipient(event.target.value)}
          />
        </Form.Field>
        <Button primary content="Create" />
      </Form>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  return { props: { address: context.query.address } };
}
