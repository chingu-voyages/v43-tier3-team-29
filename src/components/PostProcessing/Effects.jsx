import { useControls } from "leva";
import { useLoader } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  ChromaticAberration,
  LUT,
  Vignette,
} from "@react-three/postprocessing";
import { LUTCubeLoader, BlendFunction } from "postprocessing";

export function Effects() {
  // LUTs
  const lut1 = useLoader(LUTCubeLoader, "/LUTs/F-6800-STD.cube");
  const lut2 = useLoader(LUTCubeLoader, "/LUTs/Malitine.cube");
  const lut3 = useLoader(LUTCubeLoader, "/LUTs/C-9020-STD.cube");
  const lut4 = useLoader(LUTCubeLoader, "/LUTs/C-8120-STD.cube");
  const lut5 = useLoader(LUTCubeLoader, "/LUTs/F-8700-STD.cube");
  const lut6 = useLoader(LUTCubeLoader, "/LUTs/F-9070-STD.cube");
  const lut7 = useLoader(LUTCubeLoader, "/LUTs/X-8850-STD.cube");
  const lut8 = useLoader(LUTCubeLoader, "/LUTs/F-9550-STD.cube");
  const lut9 = useLoader(LUTCubeLoader, "/LUTs/F-6770-STD.cube");
  const lut10 = useLoader(LUTCubeLoader, "/LUTs/W-9530-STD.cube");
  const lut11 = useLoader(LUTCubeLoader, "/LUTs/X-6370-STD.cube");
  const lut12 = useLoader(LUTCubeLoader, "/LUTs/X-7080-STD.cube");
  const lut13 = useLoader(LUTCubeLoader, "/LUTs/H-9890-STD.cube");
  const lut14 = useLoader(LUTCubeLoader, "/LUTs/F-9870-STD.cube");
  const lut15 = useLoader(LUTCubeLoader, "/LUTs/X-9810-STD.cube");
  const lut16 = useLoader(LUTCubeLoader, "/LUTs/C-8080-STD.cube");
  const lut17 = useLoader(LUTCubeLoader, "/LUTs/C-8920-STD.cube");
  const lut18 = useLoader(LUTCubeLoader, "/LUTs/Dozoran.cube");
  const lut19 = useLoader(LUTCubeLoader, "/LUTs/Fizati.cube");
  const lut20 = useLoader(LUTCubeLoader, "/LUTs/Rubi.cube");

  /////////////
  // Leva

  // DepthOfField
  const depthOfFieldProps = useControls("Depth of field", {
    isActive: { value: false },
    focusDistance: { value: 0.096, min: 0, max: 1, step: 0.01 },
    focalLength: { value: 0.024, min: 0, max: 1, step: 0.01 },
    bokehScale: { value: 3, min: 0, max: 10, step: 0.5 },
  });

  // ChromaticAberration
  const chromaticAberrationProps = useControls("ChromaticAberration", {
    isActive: { value: false },
    offset: { value: [0.0005, 0.0012] },
  });

  const vignetteProps = useControls("Vignette Effect", {
    isActive: { value: false },
    offset: { value: 0.2, min: 0, max: 1, step: 0.05 },
    darkness: { value: 0.9, min: 0, max: 1.5, step: 0.05 },
    blendFunction: {
      value: BlendFunction.NORMAL,
      options: [
        BlendFunction.DARKEN,
        BlendFunction.HARD_LIGHT,
        BlendFunction.LUMINOSITY,
        BlendFunction.NORMAL,
        BlendFunction.SOFT_LIGHT,
        BlendFunction.SATURATION,
        BlendFunction.SCREEN,
      ],
    },
  });

  const lutsProps = useControls("LUTs", {
    isActive: { value: false },
    lut: {
      value: lut1,
      options: {
        1: lut1,
        2: lut2,
        3: lut3,
        4: lut4,
        5: lut5,
        6: lut6,
        7: lut7,
        8: lut8,
        9: lut9,
        10: lut10,
        11: lut11,
        12: lut12,
        13: lut13,
        14: lut14,
        15: lut15,
        16: lut16,
        17: lut17,
        18: lut18,
        19: lut19,
        20: lut20,
      },
    },
  });

  return (
    true && (
      <>
        <EffectComposer dithering stencilBuffer={true}>
          {depthOfFieldProps.isActive && (
            <DepthOfField
              focusDistance={0.0096}
              focalLength={0.024}
              bokehScale={3}
              height={600}
            />
          )}
          {chromaticAberrationProps.isActive && (
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              {...chromaticAberrationProps}
            />
          )}
          {lutsProps.isActive && <LUT {...lutsProps} />}
          {vignetteProps.isActive && <Vignette {...vignetteProps} />}
        </EffectComposer>
      </>
    )
  );
}
