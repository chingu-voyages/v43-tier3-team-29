//https://codesandbox.io/s/sbf2i?file=/src/Sparks.js
//https://github.com/pmndrs/meshline
import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { MeshLineGeometry, MeshLineMaterial, raycast } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

const r = () => Math.max(0.2, Math.random())

function Fatline({ curve, width, color, speed }) {
  const material = useRef()
  useFrame(() => (material.current.uniforms.dashOffset.value -= speed))
  return (
/*     <mesh>      
      <meshLineGeometry attach="geometry" vertices={curve} />
      <meshLineMaterial ref={material} transparent depthTest={false} lineWidth={width} color={color} dashArray={0.1} dashRatio={0.95} />
    </mesh> */
    <mesh>
      <meshLineGeometry points={curve} />
      {/* <meshLineMaterial ref={material} transparent depthTest={false} lineWidth={width} color={color} dashArray={0.05} dashRatio={0.95} /> */}
      <meshLineMaterial ref={material} transparent depthTest={true} depthWrite={true} lineWidth={width} color={color} dashArray={0.05} dashRatio={0.90} />
    </mesh>
  )
}

export default function Sparks({ count, colors, radius = 0.25 }) {
  const lines = useMemo(
    () =>
      new Array(count).fill().map((_, index) => {
        const pos = new THREE.Vector3(Math.sin(0) * radius * r(), Math.cos(0) * radius * r(), 0)
        const initialY = THREE.MathUtils.randFloat(0, 0.2);
        const points = new Array(20).fill().map((_, index) => {
          const angle = (index) * Math.PI * 8 * r()
          return pos.add(new THREE.Vector3(Math.sin(angle) * radius + THREE.MathUtils.randFloatSpread(1.2)* radius , initialY + index / 100, Math.sin(angle) * radius + THREE.MathUtils.randFloatSpread(1.2)* radius)).clone()
          /* const angle = (index / 20) * Math.PI * 2
          return pos.add(new THREE.Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), Math.sin(angle) * radius * r())).clone() */
        })
        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000)
        return {
          color: colors[parseInt(colors.length * Math.random())],
          width: Math.max(0.009, (0.2 * index) / 200),
          speed: Math.max(0.003, 0.009 * Math.random()),
          curve
        }
      }),
    [count]
  )

  const ref = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0 / aspect / 200, 0.1)
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, 0 / aspect / 400, 0.1)
    }
  })

  return (
    <group ref={ref}>
      <group scale={[1, 1, 1]}>
        {lines.map((props, index) => (
          <Fatline key={index} {...props} />
        ))}
      </group>
    </group>
  )
}
