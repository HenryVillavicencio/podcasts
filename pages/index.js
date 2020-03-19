export default () => {
  return (
    <div>
      <img src="/static/initgrammers-logo.png" alt="initgrammers" />
      <h1>Initgrammers</h1>
      <p> Pequeñas ideas, gran impacto </p>
      <style jsx>{`
        h1 {
          color: white;
          text-align: center;
        }
        p {
          color: white;
          text-align: center;
        }
        img {
          display: block;
          max-width: 50%;
          margin: 0 auto;
        }
      `}</style>
      <style jsx global>{`
        body {
          background: #a2145b;
        }
      `}</style>
    </div>
  );
};
