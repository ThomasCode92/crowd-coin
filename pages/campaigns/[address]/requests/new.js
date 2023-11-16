import { getCampaign } from '@/utils/campaign';
import web3 from '@/utils/web3';
import { Fragment, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

export default function NewRequest({ address }) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');

  const submitHandler = async event => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();

      const campaign = getCampaign(address);
      const { createRequest } = campaign.methods;

      const valueInWei = web3.utils.toWei(value, 'ether');

      await createRequest(description, valueInWei, recipient).send({
        from: accounts[0],
        data: createRequest(description, valueInWei, recipient).encodeABI(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <h1>Create a Request</h1>
      <Form onSubmit={submitHandler}>
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
