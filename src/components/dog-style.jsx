import { useGSAP } from "@gsap/react"
import {  useAnimations, useGLTF, useProgress, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

export const DogStyle = () => {

  gsap.registerPlugin(useGSAP)
  gsap.registerPlugin(ScrollTrigger)

const model =useGLTF("/models/dog.drc.glb")
console.log(model);


useThree(({camera,scene,gl})=>{
 camera.position.z=0.42

 gl.toneMapping = THREE.ReinhardToneMapping
 gl.outputColorSpace = THREE.SRGBColorSpace
 
})

const {actions} = useAnimations(model.animations,model.scene)
 
useEffect(()=>{
actions["Take 001"].play()
},[actions])

const [normalMap]=(useTexture([ "/dog_normals.jpg"]))
.map((texture)=>{
  texture.flipY = false
//  texture.colorSpace = THREE.SRGBColorSpace
  return texture  
})

const [branchesNormalMap,branchesMap]=(useTexture(["branches_normals.jpeg","branches_diffuse.jpeg"]))

   const [
          mat1,
          mat2,
          mat3,
          mat4,
          mat5,
          mat6,
          mat7,
          mat8,
          mat9,
          mat10,
          mat11,
          mat12,
          mat13,
          mat14,
          mat15,
          mat16,
          mat17,
          mat18,
          mat19,
          mat20
      ] = (useTexture([
          "/matcap/mat-1.png",
          "/matcap/mat-2.png",
          "/matcap/mat-3.png",
          "/matcap/mat-4.png",
          "/matcap/mat-5.png",
          "/matcap/mat-6.png",
          "/matcap/mat-7.png",
          "/matcap/mat-8.png",
          "/matcap/mat-9.png",
          "/matcap/mat-10.png",
          "/matcap/mat-11.png",
          "/matcap/mat-12.png",
          "/matcap/mat-13.png",
          "/matcap/mat-14.png",
          "/matcap/mat-15.png",
          "/matcap/mat-16.png",
          "/matcap/mat-17.png",
          "/matcap/mat-18.png",
          "/matcap/mat-19.png",
          "/matcap/mat-20.png",
      ])).map((texture)=>{
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
      })


 const material = useRef({
        uMatcap1:{value:mat19},
        uMatcap2:{value:mat2},
        uProgress:{value:1.0},
         })

const dogMaterial = new THREE.MeshMatcapMaterial({
      normalMap:normalMap,
      matcap:mat2
    })

const branchesMaterial = new THREE.MeshMatcapMaterial({
  normalMap:branchesNormalMap,
  map:branchesMap,
  matcap:mat2,
})

function onBeforeCompile(shader){
        shader.uniforms.uMatcapTexture1 = material.current.uMatcap1
        shader.uniforms.uMatcapTexture2 = material.current.uMatcap2
        shader.uniforms.uProgress = material.current.uProgress

        // Store reference to shader uniforms for GSAP animation

        shader.fragmentShader = shader.fragmentShader.replace(
            "void main() {",
            `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `
        )

        shader.fragmentShader = shader.fragmentShader.replace(
            "vec4 matcapColor = texture2D( matcap, uv );",
            `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
          float transitionFactor  = 0.0;
          
          float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `
        )
}


 dogMaterial.onBeforeCompile = onBeforeCompile
 branchesMaterial.onBeforeCompile = onBeforeCompile

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
      endTrigger:"#section-4",
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
    x:`${Math.PI/10}`,  
    y:`+${Math.PI/6}`,  
  },)
  .to(modelRef.current.scene.rotation,{
    y:`-${Math.PI/1.3}`,  
    x:`+${Math.PI/8}`  
  },"third")
  .to(modelRef.current.scene.position,{
    x:"-0.3",
    z:"+=0.37",
    y:"+=0.05"
  },"third")

},[])

useEffect(()=>{

document.querySelector(`.title[img-title="tomorrowland"]`).addEventListener("mouseenter", () => {
            material.current.uMatcap1.value = mat19

            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onUpdate:()=>{
                  dogMaterial.needsUpdate = true
                  branchesMaterial.needsUpdate = true
                },
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })

document.querySelector(`.title[img-title="navy-pier"]`).addEventListener("mouseenter",()=>{
  material.current.uMatcap1.value = mat8

  gsap.to(material.current.uProgress,{
    value:0.0,
    duration:0.3,
    onComplete:()=>{
      material.current.uMatcap2.value = material.current.uMatcap1.value
      material.current.uProgress.value = 1.0
    }
  })
})

document.querySelector(`.title[img-title="msi-chicago"]`).addEventListener("mouseenter",()=>{
  material.current.uMatcap1.value = mat9
  
  gsap.to(material.current.uProgress,{
    value:0.0,
    duration:0.3,
    onComplete:()=>{
      material.current.uMatcap2.value = material.current.uMatcap1.value
      material.current.uProgress.value = 1.0

    }
  })
})

document.querySelector(`.title[img-title="louises-phone"]`).addEventListener("mouseenter",()=>{
  material.current.uMatcap1.value= mat12
  
 gsap.to(material.current.uProgress,{
  value:0.0,
  duration:0.3,
  onComplete:()=>{
    material.current.uMatcap2.value= material.current.uMatcap1.value
    material.current.uProgress.value= 1.0
  }
 })
})

document.querySelector(`.title[img-title="kikk-festical"]`).addEventListener("mouseenter",()=>{
  material.current.uMatcap1.value = mat10
  
  gsap.to(material.current.uProgress,{
    value:0.0,
    duration:0.3,
   onComplete:()=>{
     material.current.uMatcap2.value = material.current.uMatcap1.value
     material.current.uProgress.value = 1.0
    }
  })})

     document.querySelector(`.title[img-title="kennedy"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat8
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })

    document.querySelector(`.title[img-title="royal-opera"]`).addEventListener("mouseenter", () => {

            material.current.uMatcap1.value = mat13
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })
       
    document.querySelector(`.titles`).addEventListener("mouseleave", () => {

            material.current.uMatcap1.value = mat2
            
            gsap.to(material.current.uProgress, {
                value: 0.0,
                duration: 0.3,
                onComplete: () => {
                    material.current.uMatcap2.value = material.current.uMatcap1.value
                    material.current.uProgress.value = 1.0
                }
            })
        })


},[])

  return (
    <>
     <primitive object={model.scene} position={[0.17,-0.6,0]} rotation={[0,Math.PI/6,0]} />
     <directionalLight  position={[0,5,5]} color={0xFFFFFF} intensity={10}/>
    </>
  )
}

