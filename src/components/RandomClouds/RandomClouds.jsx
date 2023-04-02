import { useMemo } from "react";
import { Cloud } from "@react-three/drei";

export default function RandomClouds({ amount }) {
  const clouds = useMemo(() => {
    const cloudArray = [];

    for (let i = 0; i < amount; i++) {
      const position = [
        Math.floor(Math.random() * 20) - 17,
        Math.floor(Math.random() * 20) + 30,
        Math.floor(Math.random() * 20) - 0,
      ];

      cloudArray.push(<Cloud key={i} position={position} />);
    }

    return cloudArray;
  }, []);

  return <>{clouds}</>;
}
