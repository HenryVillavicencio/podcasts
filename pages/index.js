import fetch from "isomorphic-unfetch";

const page = ({ channels }) => {
  return (
    <div>
      <header>Podcasts</header>
      <div className="channels">
        {channels.map((channel, key) => (
          <div key={key} className="channel">
            <img src={channel.urls.logo_image.original} />
            <h2>{channel.title}</h2>
          </div>
        ))}
      </div>

      <style jsx>{`
        header {
          color: #fff;
          padding: 15px;
          background: #8756ca;
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
        }
        .channel img {
          width: 100%;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
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

page.getInitialProps = async () => {
  let req = await fetch("https://api.audioboom.com/channels/recommended");
  let { body: channels } = await req.json();
  return { channels };
};

export default page;
