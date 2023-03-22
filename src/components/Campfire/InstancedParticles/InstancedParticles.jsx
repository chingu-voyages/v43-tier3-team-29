// https://codesandbox.io/s/8fo01?file=/src/App.js:1696-1803
import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
//import { data } from './data'

const minHeight = 2.5;
const maxHeight = 8;
const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const tempColorRGBA = new THREE.Vector4()
const data = Array.from({ length: 1000 }, () => ({ color: 0Xcccccccc, scale: 1 }))

export default function InstancedParticles({range, ...props}) {
  return (
    <Boxes data={data} range={range} />
  )
}

function Boxes({data, range}) {
  const [hovered, set] = useState() 
  const colorArray = useMemo(() => Float32Array.from(new Array(1000).fill().flatMap((_, i) => tempColorRGBA.set(0.1, 0.1, 0.1, 1.0).toArray())), [])  
  const meshRef = useRef()
  const prevRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < range; i++) {
      const t = Math.random() * 100
      const factor = 2 + Math.random() * 100
      const speed = 0.05 + Math.random() / 200
      const xFactor = 0 + Math.random() * 100
      const yFactor = 0 + Math.random() * 100
      const zFactor = 0 + Math.random() * 100      
      const x = THREE.MathUtils.randFloatSpread(1.2)
      const y = Math.random() * maxHeight
      const z = THREE.MathUtils.randFloatSpread(1.2)
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, x, y, z })
    }
    return temp
  }, [range])
  
  useEffect(() => void (prevRef.current = hovered), [hovered])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    /* meshRef.current.rotation.x = Math.sin(time / 4)
    meshRef.current.rotation.y = Math.sin(time / 2) */
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      
      particle.mx += particle.mx * 0.01
      particle.my += particle.my * 0.01
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
        )
        
      particle.y += speed;

      if (particle.y >= maxHeight) {
        particle.y = 0;
        particle.x = THREE.MathUtils.randFloatSpread(1.2);  
        particle.z = THREE.MathUtils.randFloatSpread(1.2);  
      } else {
        particle.x += Math.sign(particle.x) * THREE.MathUtils.mapLinear(particle.y, minHeight, maxHeight, 0, 0.01)
        particle.z += Math.sign(particle.z) * THREE.MathUtils.mapLinear(particle.y, minHeight, maxHeight, 0, 0.01)
      }
      
      dummy.position.set(
        particle.x, 
        particle.y, 
        particle.z
        )
        
      const scale = THREE.MathUtils.mapLinear(maxHeight - particle.y, minHeight, maxHeight, 1, 0)
      dummy.scale.set(scale, scale, scale)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      // And apply the matrix to the instanced item
      meshRef.current.setMatrixAt(i, dummy.matrix)

      tempColorRGBA.x = colorArray[i*4 + 0]
      tempColorRGBA.y = colorArray[i*4 + 1]
      tempColorRGBA.z = colorArray[i*4 + 2]
      tempColorRGBA.w = THREE.MathUtils.mapLinear(maxHeight - particle.y, minHeight, maxHeight, 0.2, 1)
      tempColorRGBA.toArray(colorArray, i * 4)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
    meshRef.current.geometry.attributes.color.needsUpdate = true;
  })
  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, range]}
      onPointerMove={(e) => (e.stopPropagation(), set(e.instanceId))}
      onPointerOut={(e) => set(undefined)}
      /* castShadow */
      receiveShadow
    >
      <boxGeometry args={[0.6, 0.6, 0.6]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 4]} />
      </boxGeometry>
      <meshStandardMaterial depthTest={true} depthWrite={true} transparent toneMapped={true} vertexColors vertexAlphas/>
    </instancedMesh>
  )
}