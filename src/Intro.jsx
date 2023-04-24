import { Suspense, useEffect, useState, cloneElement } from "react";
import { BsPlayCircleFill } from "react-icons/bs";

function Ready({ setReady }) {
  useEffect(() => () => void setReady(true), []);
  return null;
}

export default function Intro({ children }) {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <>
      <Suspense fallback={<Ready setReady={setReady} />}>
        {cloneElement(children, { ready: clicked && ready })}
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
