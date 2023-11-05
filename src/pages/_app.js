import store from "@/store";
import { Provider } from "react-redux";
import "./../styles/global.scss";
import { Wrapper } from "@/components";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Plantme</title>
      </Head>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}
