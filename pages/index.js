import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";
import Error from "next/error";

const page = ({ channels, statusCode }) => {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }
  return (
    <Layout title="Podcast2">
      <ChannelGrid channels={channels} />
    </Layout>
  );
};

page.getInitialProps = async ({ res }) => {
  try {
    let req = await fetch("https://api.audioboom.com/channels/recommended");

    if (req.status >= 400) {
      res.statusCode = req.status;
      return { channels: null, statusCode: req.status };
    }

    let { body: channels } = await req.json();
    return { channels, statusCode: 200 };
  } catch (e) {
    res.statusCode = 503;
    return { channels: null, statusCode: 503 };
  }
};

export default page;
