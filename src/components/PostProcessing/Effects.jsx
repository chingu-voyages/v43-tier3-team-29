import { useControls } from "leva";
import { useLoader, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  ChromaticAberration,
  LUT,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";

export function Effects() {
  // KTX2Loader
  const gl = useThree((state) => state.gl);

  const CustomKTX2Loader = (path) =>
    useLoader(KTX2Loader, path, (loader) => {
      loader
        .setTranscoderPath(
          `https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/basis/`
        )
        .detectSupport(gl);
    });

  // LUTs
  const lut1 = CustomKTX2Loader("/LUTs/F-6800-STD.ktx2");
  const lut2 = CustomKTX2Loader("/LUTs/Malitine.ktx2");
  const lut3 = CustomKTX2Loader("/LUTs/C-9020-STD.ktx2");
  const lut4 = CustomKTX2Loader("/LUTs/C-8120-STD.ktx2");
  const lut5 = CustomKTX2Loader("/LUTs/F-8700-STD.ktx2");
  const lut6 = CustomKTX2Loader("/LUTs/F-9070-STD.ktx2");
  const lut7 = CustomKTX2Loader("/LUTs/X-8850-STD.ktx2");
  const lut8 = CustomKTX2Loader("/LUTs/F-9550-STD.ktx2");
  const lut9 = CustomKTX2Loader("/LUTs/F-6770-STD.ktx2");
  const lut10 = CustomKTX2Loader("/LUTs/W-9530-STD.ktx2");
  const lut11 = CustomKTX2Loader("/LUTs/X-6370-STD.ktx2");
  const lut12 = CustomKTX2Loader("/LUTs/X-7080-STD.ktx2");
  const lut13 = CustomKTX2Loader("/LUTs/H-9890-STD.ktx2");
  const lut14 = CustomKTX2Loader("/LUTs/F-9870-STD.ktx2");
  const lut15 = CustomKTX2Loader("/LUTs/X-9810-STD.ktx2");
  const lut16 = CustomKTX2Loader("/LUTs/C-8080-STD.ktx2");
  const lut17 = CustomKTX2Loader("/LUTs/C-8920-STD.ktx2");
  const lut18 = CustomKTX2Loader("/LUTs/Dozoran.ktx2");
  const lut19 = CustomKTX2Loader("/LUTs/Fizati.ktx2");
  const lut20 = CustomKTX2Loader("/LUTs/Rubi.ktx2");

  /////////////
  // Leva

  // Depth Of Field control props
  const depthOfFieldProps = useControls("Depth of field", {
    isActive: { value: false },
    focusDistance: { value: 0.096, min: 0, max: 1, step: 0.01 },
    focalLength: { value: 0.024, min: 0, max: 1, step: 0.01 },
    bokehScale: { value: 3, min: 0, max: 10, step: 0.5 },
  });

  // Chromatic Aberration control props
  const chromaticAberrationProps = useControls("Chromatic Aberration", {
    isActive: { value: false },
    offset: { value: [0.0005, 0.0012] },
  });

  // Vignette control props
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

  // LUTs control props
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
