import campaignFactory from '@/utils/factory';

export default function Home({ campaigns }) {
  console.log(campaigns);

  return <h1>Welcome to Crowd Coin</h1>;
}

export async function getStaticProps() {
  const campaigns = await campaignFactory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
}
