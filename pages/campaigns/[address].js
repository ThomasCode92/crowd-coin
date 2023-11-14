import { getCampaign, getCampaignSummary } from '@/utils/campaign';

export default function showCampaign() {
  return <div>Show Campaign</div>;
}

export async function getServerSideProps(context) {
  const campaign = getCampaign(context.query.address);

  const summaryData = await campaign.methods.getSummary().call();
  const summary = getCampaignSummary(summaryData);

  return { props: { summary } };
}
