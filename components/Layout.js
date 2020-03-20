import Link from "next/link";
import Head from "next/head";
export default ({ title, children, header = true }) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <title>{title}</title>
      </Head>
      {header && (
        <header>
          <Link href="/">
            <a>Podcast</a>
          </Link>
        </header>
      )}
      {children}
      <style jsx>{`
        header {
          color: #fff;
          padding: 15px;
          background: #8756ca;
          text-align: center;
        }
        header a {
          color: #fff;
          text-decoration: none;
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
