import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import web3 from '@/utils/web3';
import { getCampaign } from '@/utils/campaign';
import Link from 'next/link';

export default function NewRequest({ address }) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const submitHandler = async event => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();

      const campaign = getCampaign(address);
      const { createRequest } = campaign.methods;

      const valueInWei = web3.utils.toWei(value, 'ether');

      await createRequest(description, valueInWei, recipient).send({
        from: accounts[0],
        data: createRequest(description, valueInWei, recipient).encodeABI(),
      });

      router.push(`/campaigns/${address}/requests`);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
    setDescription('');
    setValue('');
    setRecipient('');
  };

  return (
    <Fragment>
      <h1>Create a Request</h1>
      <Form error={Boolean(errorMessage)} onSubmit={submitHandler}>
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
        <Message
          error
          header="Something went wrong!"
          content={errorMessage}
          onDismiss={() => setErrorMessage('')}
        />
        <Button primary loading={isLoading} content="Create" />
        <Link href={`/campaigns/${address}/requests`}>
          <Button secondary>Back</Button>
        </Link>
      </Form>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  return { props: { address: context.query.address } };
}
