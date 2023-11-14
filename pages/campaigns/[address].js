import { getCampaign } from '@/utils/campaign';

export default function showCampaign() {
  return <div>Show Campaign</div>;
}

export async function getServerSideProps(context) {
  const campaign = getCampaign(context.query.address);

  const summary = await campaign.methods.getSummary().call();

  return { props: { summary } };
}
