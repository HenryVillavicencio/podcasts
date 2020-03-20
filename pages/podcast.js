import Link from "next/link";
import Layout from "../components/Layout";
import Error from "next/error";
import PodcastPlayer from "../components/PodcastPlayer";

const podcast = props => {
  const { clip, statusCode } = props;

  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return <PodcastPlayer clip={clip} />;
};

podcast.getInitialProps = async ({ query, res }) => {
  try {
    let id = query.id;
    let fetchClip = await fetch(
      `https://api.audioboom.com/audio_clips/${id}.mp3`
    );

    if (fetchClip.status >= 400) {
      res.statusCode = fetchClip.status;
      return { clip: null, statusCode: fetchClip.status };
    }

    let clip = (await fetchClip.json()).body.audio_clip;
    return { clip, statusCode: 200 };
  } catch (e) {
    res.statusCode = 503;
    return { clip: null, statusCode: 503 };
  }
};

export default podcast;
