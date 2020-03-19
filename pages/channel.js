import moment from "moment";
import Link from "next/link";
const channel = props => {
  const { channel, audioClips, series } = props;
  return (
    <div>
      <header>Podcasts</header>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${channel.urls.banner_image.original})`
        }}
      />
      <h1>{channel.title}</h1>

      <div className="channels">
        {series.map((serie, key) => (
          <a key={key} className="channel">
            <img src={serie.urls.logo_image.original} />
            <h3>{serie.title}</h3>
          </a>
        ))}
      </div>

      <h2>Últimos Podcasts</h2>
      {audioClips.map((clip, key) => (
        <Link href={`/podcast?id=${clip.id}`} key={key}>
          <a className="podcast">
            <h3>{clip.title}</h3>
            <span>{moment(clip.uploaded_at).fromNow()}</span>
          </a>
        </Link>
      ))}

      <style jsx>{`
        header {
          color: #fff;
          padding: 15px;
          background: #8756ca;
          text-align: center;
        }
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
        h3 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }
        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
        .channel {
          display: block;
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          margin-bottom: 0.5em;
          text-decoration: none;
          color: black;
        }
        .channel img {
          width: 100%;
        }
        .podcast {
          text-decoration: none;
          display: block;
          color: #333;
          padding: 15px;
          cursor: pointer;
          margin: 15px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
        }
        .podcast h3 {
          text-align: left;
          padding: 0;
        }
        .podcast span {
          font-size: 0.7em;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          background: white;
          font-family: system-ui;
        }
      `}</style>
    </div>
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
