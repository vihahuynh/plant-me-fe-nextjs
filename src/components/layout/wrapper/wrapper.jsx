import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

import { Footer, Navigation, Alert } from "../..";

export const Wrapper = (props) => {
  const alert = useSelector((state) => state.alert);

  return (
    <>
      <Navigation />
      {typeof window === "object" &&
        ReactDOM.createPortal(
          <Alert message={alert.message} type={alert.type} />,
          document.getElementById("alert-root")
        )}
      {props.children}
      <Footer />
    </>
  );
};
