import { OrbitControls, useAnimations, useGLTF, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from "three"
import { texture } from "three/tsl"




const DogStyle = () => {

const model =   useGLTF("/models/dog.drc.glb")
console.log(model);


useThree(({camera,scene,gl})=>{
 camera.position.z=0.4

 gl.toneMapping = THREE.ReinhardToneMapping
 gl.outputColorSpace = THREE.SRGBColorSpace
 
})

const {actions} = useAnimations(model.animations,model.scene)
 
useEffect(()=>{
actions["Take 001"].play()
},[actions])

const [
  normalMap,
  sampleMatCap,
]=(useTexture([
  "/dog_normals.jpg",
  "/matcap/mat-10.png"
]
)).map((texture)=>{
  texture.flipY = false
  texture.ColorSpace = THREE.SRGBColorSpace
  return texture  
})

const [branchesNormalMap,branchesMap]=(useTexture(["branches_normals.jpeg",
  "branches_diffuse.jpeg"])).map((texture)=>{
    texture.ColorSpace = THREE.SRGBColorSpace
    return texture
  })


const dogMaterial = new THREE.MeshMatcapMaterial({
      normalMap:normalMap,
      matcap:sampleMatCap
    })

const branchesMaterial = new THREE.MeshMatcapMaterial({
  normalMap:branchesNormalMap,
  map:branchesMap
})

model.scene.traverse((child)=>{
  if(child.name.includes("DOG")){
    child.material = dogMaterial
  }else{
    child.material = branchesMaterial
  }
})

  return (
    <>
     <primitive object={model.scene} position={[0.19,-0.6,0]} rotation={[0,Math.PI/6,0]} />
     <directionalLight  position={[0,5,5]} color={0xFFFFFF} intensity={10}/>
     <OrbitControls/>
    </>
  )
}

export default DogStyle