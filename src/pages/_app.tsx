import { AppProps } from 'next/app'
import Head from 'next/head'
import GlobalStyles from 'styles/global'
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Travel Wish List</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <meta
          name="description"
          content="Lista de lugares e desejos de viagem"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06092B" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default App
