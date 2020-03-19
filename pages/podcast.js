import Link from "next/link";

const podcast = props => {
  const { clip } = props;
  return (
    <div>
      <div className="modal">
        <nav>
          <Link href={`/channel?id=${clip.channel.id}`}>
            <a>&lt; Volver</a>
          </Link>
        </nav>
        <picture>
          <div
            style={{
              backgroundImage: `url(${clip.urls.image ||
                clip.channel.urls.logo_image.original})`
            }}
          />
        </picture>

        <div className="player">
          <h3>{clip.title}</h3>
          <h6>{clip.channel.title}</h6>
          <audio controls autoPlay={true}>
            <source src={clip.urls.high_mp3} type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <style jsx>{`
        .modal {
          background: #4a148c;
          height: 100vh;
          display: flex;
          flex-direction: column;
          color: white;
        }

        nav a {
          display: block;
          color: white;
          padding: 15px;
          cursor: pointer;
          text-decoration: none;
        }

        picture {
          padding: 10%;
          display: flex;
          flex: 1;
        }
        picture div {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }
        .player {
          padding: 30px;
          background: rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        h3 {
          margin: 0;
        }
        h6 {
          margin: 1em 0;
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

podcast.getInitialProps = async ({ query }) => {
  let id = query.id;
  let fetchClip = await fetch(
    `https://api.audioboom.com/audio_clips/${id}.mp3`
  );
  let clip = (await fetchClip.json()).body.audio_clip;
  return { clip };
};

export default podcast;
