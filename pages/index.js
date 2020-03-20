import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";
const page = ({ channels }) => {
  return (
    <Layout title="Podcast2">
      <ChannelGrid channels={channels} />
    </Layout>
  );
};

page.getInitialProps = async () => {
  let req = await fetch("https://api.audioboom.com/channels/recommended");
  let { body: channels } = await req.json();
  return { channels };
};

export default page;
