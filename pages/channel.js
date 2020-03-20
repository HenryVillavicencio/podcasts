import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";
import PodcastList from "../components/PodcastList";
import Error from "next/error";

const channel = props => {
  const { channel, audioClips, series, statusCode } = props;

  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }
  return (
    <Layout title={channel.title}>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${channel.urls.banner_image.original})`
        }}
      />

      <h1>{channel.title}</h1>
      <ChannelGrid channels={series} />
      <h2>Últimos Podcasts</h2>
      <PodcastList audioClips={audioClips} />
      <style jsx>{`
        .banner {
          padding-bottom: 25%;
          background-position: center;
          background-size: cover;
          background-color: black;
        }
        h1 {
          font-weight: 600;
          padding: 15px;
        }
        h2 {
          padding: 5px;
          font-size: 1.5em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

channel.getInitialProps = async ({ query, res }) => {
  let idChannel = query.id;

  try {
    let [reqChannel, reqAudio, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    ]);

    if (reqChannel.status >= 400) {
      res.statusCode = reqChannel.status;
      return {
        channel: null,
        audioClips: null,
        series: null,
        statusCode: reqChannel.status
      };
    }

    let dataChannel = await reqChannel.json();
    let channel = dataChannel.body.channel;

    let dataAudios = await reqAudio.json();
    let audioClips = dataAudios.body.audio_clips;

    let dataSeries = await reqSeries.json();
    let series = dataSeries.body.channels;

    return { channel, audioClips, series, statusCode: 200 };
  } catch (e) {
    res.statusCode = 503;
    return { channel: null, audioClips: null, series: null, statusCode: 503 };
  }
};
export default channel;
