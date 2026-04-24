# Component API Documentation

## DogStyle Component

The `DogStyle` component is the core 3D element of the Dog Studio application. It renders an animated 3D dog model with custom materials and scroll-triggered animations.

### Import

```javascript
import { DogStyle } from './components/dog-style'
```

### Usage

```jsx
<Canvas>
  <DogStyle />
</Canvas>
```

### Features

- **3D Model Rendering**: Loads and displays a GLTF/GLB 3D dog model
- **Animation Playback**: Automatically plays the default animation ("Take 001")
- **Material System**: Uses matcap materials for stylized rendering
- **Normal Mapping**: Applies normal maps for surface detail
- **Scroll Integration**: GSAP ScrollTrigger for scroll-based animation control

### Dependencies

- `@react-three/drei`: For GLTF loading, animations, and textures
- `@react-three/fiber`: For Three.js integration with React
- `gsap`: For animation and scroll triggering
- `three`: For 3D math and utilities

### Props

Currently, the component does not accept any props. All configuration is done internally.

### Internal State

- **Model**: GLTF scene with animations
- **Materials**: Matcap textures and normal maps
- **Animation Actions**: Three.js animation mixer actions

### Hooks Used

- `useGLTF`: Loads the 3D model
- `useAnimations`: Manages animation playback
- `useTexture`: Loads texture assets
- `useThree`: Accesses Three.js scene, camera, and renderer
- `useGSAP`: Integrates GSAP with React

### Asset Requirements

The component expects the following assets in the `public/` directory:

- `/models/dog.drc.glb`: The 3D dog model (Draco compressed)
- `/dog_normals.jpg`: Normal map for the dog
- `/matcap/mat-1.png` through `/matcap/mat-20.png`: Matcap textures
- `/branches_normals.jpeg` and `/branches_diffuse.jpeg`: Additional textures

### Performance Notes

- Models are loaded asynchronously
- Textures are optimized for web delivery
- Animations run at 60fps when possible
- Memory is managed automatically by React Three Fiber

### Future Enhancements

- Prop-based material customization
- Multiple animation states
- Interactive controls
- Performance monitoring hooks