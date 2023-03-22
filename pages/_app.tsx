import React from "react";
import Head from "next/head";

import { QueryClient, QueryClientProvider } from "react-query";
import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";

import "../styles/globals.css";
import Layout from "../components/Layout";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Movie Trailer</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <main>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};
export default MyApp;
