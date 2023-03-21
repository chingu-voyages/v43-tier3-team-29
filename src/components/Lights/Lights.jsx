export default function Lights() {
  return (
    <>
      <pointLight
        distance={16}        
        position={[10, 3, 4]}
        color={0xfbb741}
        intensity={0.2}
      />
      <pointLight
        distance={16}        
        position={[-15, 3, 4]}
        color={0xfbb741}
        intensity={0.2}
      />      
      <pointLight
        distance={16}        
        position={[5, 3, 14]}
        color={0xfbb741}
        intensity={0.2}
      />
      <pointLight
        distance={16}        
        position={[-10, 3, 14]}
        color={0xfbb741}
        intensity={0.2}
      />   
    </>
  );
}