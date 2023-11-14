export default function showCampaign() {
  return <div>Show Campaign</div>;
}

export async function getServerSideProps(context) {
  console.log(context.query.address);
  return { props: {} };
}
