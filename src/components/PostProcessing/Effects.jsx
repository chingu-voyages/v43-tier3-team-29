import { useLoader } from '@react-three/fiber'
import { EffectComposer, DepthOfField, ChromaticAberration, Bloom, LUT, Vignette } from '@react-three/postprocessing'
import { LUTCubeLoader, BlendFunction, VignetteTechnique } from 'postprocessing'

export function Effects() {
  const texture = useLoader(LUTCubeLoader, '/F-6800-STD.cube')

  return (
    true && (
      <EffectComposer dithering stencilBuffer={true} >                  
        <DepthOfField focusDistance={0.0096} focalLength={0.024} bokehScale={3} height={600} />                
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0005, 0.0012]} />
        <Bloom luminanceThreshold={0.01} mipmapBlur luminanceSmoothing={0} intensity={0.2} />
        <LUT lut={texture} />            
        <Vignette offset={0.2} darkness={0.9} />          
      </EffectComposer>   
    )
  )
}
