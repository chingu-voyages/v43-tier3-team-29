import { Text3D, useMatcapTexture, Center } from "@react-three/drei";

/** Displaying 3D text */
export function CustomText3D({
  /** text to be displayed of type string */
  text = "Enter text as param",
  /** props to override any arguments to Text3D component */
  ...props
}) {
  // matcapTexture from here: https://github.com/emmelleppi/matcaps
  const [matcapTexture] = useMatcapTexture("C47004_F9D00C_EDAF04_E09704", 256);

  return (
    <>
      {/* <Text3D
        font="./fonts/Bebas Neue_Regular.json"
        size={2}
        height={0.5}
        curveSegments={20}
        bevelEnabled={true}
        bevelThickness={0.15}
        bevelSize={0.15}
        bevelOffset={0}
        bevelSegments={1}
        letterSpacing={0.2}
        position={[1, -1, -9]}
        rotation={[0, -Math.PI + 0.12, 0]}
        {...props}
      >
        {text}
        <meshMatcapMaterial matcap={matcapTexture} wireframes={true} />
      </Text3D> */}
      {/* <Text3D
        font="./fonts/Bebas Neue_Regular.json"
        size={2}
        height={0.5}
        curveSegments={20}
        bevelEnabled={true}
        bevelThickness={0.15}
        bevelSize={0.15}
        bevelOffset={0}
        bevelSegments={1}
        letterSpacing={0.2}
        position={[30, 4, 3]}
        rotation={[0, -Math.PI + 0.9, 0.35]}
        {...props}
      >
        {text}
        <meshMatcapMaterial matcap={matcapTexture} wireframes={true} />
      </Text3D> */}
      <Text3D
        font="./fonts/Bebas Neue_Regular.json"
        size={3.5}
        height={0.5}
        curveSegments={20}
        bevelEnabled={true}
        bevelThickness={0.15}
        bevelSize={0.15}
        bevelOffset={0}
        bevelSegments={1}
        letterSpacing={0.2}
        position={[5, 5, -20]}
        rotation={[0, -Math.PI + 0.12, 0]}
        {...props}
      >
        {text}
        <meshMatcapMaterial matcap={matcapTexture} wireframes={true} />
      </Text3D>
    </>
  );
}
