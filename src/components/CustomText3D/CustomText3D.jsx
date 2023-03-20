import { Text3D, useMatcapTexture, Center } from '@react-three/drei';

/** Displaying 3D text */
export function CustomText3D({
  /** text to be displayed of type string */
  text = 'Enter text as param',
  /** props to override any arguments to Text3D component */
  ...props
}) {
  // matcapTexture from here: https://github.com/emmelleppi/matcaps
  const [matcapTexture] = useMatcapTexture('C47004_F9D00C_EDAF04_E09704', 256);

  return (
    <>
      <Text3D
        font='./fonts/Bebas Neue_Regular.json'
        size={4}
        height={1}
        curveSegments={20}
        bevelEnabled={true}
        bevelThickness={0.15}
        bevelSize={0.15}
        bevelOffset={0}
        bevelSegments={1}
        letterSpacing={0.2}
        S
        position={[-35, 20, 2]}
        {...props}
      >
        {text}
        <meshMatcapMaterial matcap={matcapTexture} wireframes={true} />
      </Text3D>
    </>
  );
}
