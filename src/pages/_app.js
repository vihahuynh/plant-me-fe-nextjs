import store from "@/store";
import { Provider } from "react-redux";
import "./../styles/global.scss";
import { Wrapper } from "@/components";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}
