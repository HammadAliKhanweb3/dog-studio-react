import { useGSAP } from "@gsap/react"
import {  useAnimations, useGLTF, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

const DogStyle = () => {

  gsap.registerPlugin(useGSAP)
  gsap.registerPlugin(ScrollTrigger)

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
  "/matcap/mat-1.png"
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

const modelRef = useRef(model)

useGSAP(()=>{

  const tl = gsap.timeline({
    scrollTrigger:{
      trigger:"#section-1",
      endTrigger:"#section-3",
      start:"top top",
      end:"bottom bottom",
      scrub:true,
    }
  })
  
  tl.to(modelRef.current.scene.position,{
    z:"-=0.7",
    y:"+=0.1",
  })
  .to(modelRef.current.scene.rotation,{
    x:`${Math.PI/12}`,  
    y:`+${Math.PI/4}`,  
  },)
  .to(modelRef.current.scene.rotation,{
    y:`-${Math.PI/1.2}`,  
    x:`+${Math.PI/8}`  
  },"third")
  .to(modelRef.current.scene.position,{
    x:"-0.35",
    z:"+=0.3",
    y:"+=0.09"
  },"third")

},[])


  return (
    <>
     <primitive object={model.scene} position={[0.19,-0.6,0]} rotation={[0,Math.PI/6,0]} />
     <directionalLight  position={[0,5,5]} color={0xFFFFFF} intensity={10}/>
    </>
  )
}

export default DogStyle