import { Link } from "../routes";
import Layout from "../components/Layout";
import slug from "../helpers/slug";
const PodcastPlayer = props => {
  const { clip, onClose } = props;

  return (
    <Layout title={clip.title} header={false}>
      <div className="clip">
        <nav>
          <Link
            route="channel"
            params={{
              slug: slug(clip.channel.title),
              id: clip.channel.id
            }}
          >
            <a onClick={onClose}>&lt; Volver</a>
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
        .clip {
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
    </Layout>
  );
};

export default PodcastPlayer;
