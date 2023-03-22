export default function Lights() {
  const intensity = 0.6
  const distance = 20

  return (
    <>
      <pointLight
        distance={distance}        
        position={[10, 3, 4]}
        color={0x217dc4}
        intensity={intensity}
      />
      <pointLight
        distance={distance}        
        position={[-15, 3, 4]}
        color={0x217dc4}
        intensity={intensity}
      />      
      <pointLight
        distance={distance}        
        position={[5, 3, 14]}
        color={0x217dc4}
        intensity={intensity}
      />
      <pointLight
        distance={distance}        
        position={[-10, 3, 14]}
        color={0x217dc4}
        intensity={intensity}
      />   
    </>
  );
}