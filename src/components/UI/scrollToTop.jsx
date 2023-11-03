import { useEffect } from "react";

function ScrollToTop({ history, localionY = 0 }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo({
        top: localionY,
        left: 0,
        behavior: "smooth",
      });
    });
    return () => {
      unlisten();
    };
  }, [history, localionY]);
  return null;
}

export default ScrollToTop;
