import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import { getCampaign } from '@/utils/campaign';
import web3 from '@/utils/web3';

export default function ContributeForm({ address }) {
  const [contribution, setContribution] = useState('');
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
      const { contribute } = campaign.methods;

      await contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contribution, 'ether'),
        data: contribute().encodeABI(),
      });

      router.reload();
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
    setContribution('');
  };

  return (
    <Form error={Boolean(errorMessage)} onSubmit={submitHandler}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={contribution}
          onChange={event => setContribution(event.target.value)}
        />
      </Form.Field>
      <Message
        error
        header="Something went wrong!"
        content={errorMessage}
        onDismiss={() => setErrorMessage('')}
      />
      <Button primary loading={isLoading} content="Contribute" />
    </Form>
  );
}
