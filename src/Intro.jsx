import { Suspense, useEffect, useState, cloneElement } from "react";

// Icons
import { BsPlayCircleFill } from "react-icons/bs";

// Store
import { useStore } from "./store/store";

function Ready({ setReady }) {
  useEffect(() => () => void setReady(true), []);
  return null;
}

export default function Intro({ children }) {
  const updateCursorType = useStore((store) => store.updateCursorType);

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
            <button
              aria-label="continue"
              className="play-btn"
              onMouseEnter={() => updateCursorType("hover")}
              onMouseLeave={() => updateCursorType("pointer")}
            >
              <BsPlayCircleFill />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
