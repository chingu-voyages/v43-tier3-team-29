import { Suspense, useEffect, useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";

// function Ready({ setReady }) {
//   useEffect(() => () => void setReady(true), []);
//   return null;
// }

export default function Intro({ children }) {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // this shouldn't be necessary but for some reason the suspense never resolves - setReady is never called
    setTimeout(() => setReady(true), 2000);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        {clicked ? children : <></>}
      </Suspense>
      <div
        className={`fullscreen bg ${ready ? "ready" : "notready"} ${
          clicked && "clicked"
        }`}
      >
        <div className="loader-container" onClick={() => setClicked(true)}>
          {!ready ? (
            <img className="fox-loader" src="./image/loading.gif" />
          ) : (
            <BsPlayCircleFill className="play-icon" />
          )}
        </div>
      </div>
    </>
  );
}
