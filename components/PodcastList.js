import Link from "next/link";
import moment from "moment";

export default ({ audioClips }) => {
  return (
    <>
      {audioClips.map((clip, key) => (
        <Link href={`/podcast?id=${clip.id}`} key={key}>
          <a className="podcast">
            <h3>{clip.title}</h3>
            <span>{moment(clip.uploaded_at).fromNow()}</span>
          </a>
        </Link>
      ))}

      <style jsx>{`
        .podcast {
          text-decoration: none;
          display: block;
          color: #333;
          padding: 15px;
          cursor: pointer;
          margin: 15px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          text-align: left;
        }
        h3 {
          margin: 0;
          font-size: 0.9em;
        }
        span {
          font-size: 0.7em;
        }
      `}</style>
    </>
  );
};
