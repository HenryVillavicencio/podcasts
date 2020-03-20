import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";
import PodcastList from "../components/PodcastList";
const channel = props => {
  const { channel, audioClips, series } = props;

  // return(
  //   <Layout title='Postcast' >
  //     <Banner></Banner>
  //     <ChannelGrid></ChannelGrid>
  //     <PodcastList></ListPodcast>
  //   </Layout>
  // )

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
          background-color: #aaa;
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

channel.getInitialProps = async ({ query }) => {
  let idChannel = query.id;

  let [reqChannel, reqAudio, reqSeries] = await Promise.all([
    fetch(`https://api.audioboom.com/channels/${idChannel}`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
  ]);

  let dataChannel = await reqChannel.json();
  let channel = dataChannel.body.channel;

  let dataAudios = await reqAudio.json();
  let audioClips = dataAudios.body.audio_clips;

  let dataSeries = await reqSeries.json();
  let series = dataSeries.body.channels;

  return { channel, audioClips, series };
};
export default channel;
