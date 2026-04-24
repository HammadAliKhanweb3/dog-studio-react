# Architecture Overview

## Overview

Dog Studio is a modern React application that combines 3D graphics with web development to create an immersive portfolio experience. The application uses React Three Fiber to integrate Three.js with React, providing a declarative way to build 3D scenes.

## Technology Stack

### Frontend Framework
- **React 19**: Latest version of React with concurrent features and improved performance
- **Vite**: Fast build tool and development server with HMR (Hot Module Replacement)

### 3D Graphics
- **Three.js**: Core 3D library for WebGL rendering
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers and abstractions for React Three Fiber

### Animations
- **GSAP**: High-performance animation library
- **GSAP ScrollTrigger**: Plugin for scroll-based animations

### Development Tools
- **ESLint**: Code linting and quality assurance
- **Vite Plugins**: React plugin for Vite

## Application Structure

### Component Hierarchy

```
App
├── Canvas (React Three Fiber)
│   └── DogStyle (3D Scene)
└── Portfolio Content
    ├── Images
    └── Project Descriptions
```

### Key Components

#### App.jsx
- Main application component
- Renders the 3D canvas and portfolio content
- Manages overall layout

#### DogStyle.jsx
- Core 3D component
- Handles 3D model loading and rendering
- Manages animations and materials
- Integrates GSAP for scroll-triggered effects

### Asset Management

#### Models
- 3D models stored in `public/models/`
- Loaded using `useGLTF` from React Three Drei
- Supports GLTF/GLB format with Draco compression

#### Textures
- Matcap textures in `public/matcap/`
- Normal maps for surface detail
- Loaded using `useTexture` hook

#### Images
- Portfolio images in `public/`
- Static assets served directly

## Rendering Pipeline

1. **Scene Setup**: Camera positioning, tone mapping, color space configuration
2. **Model Loading**: GLTF model with animations loaded asynchronously
3. **Material Application**: Matcap materials applied to model geometry
4. **Animation Playback**: Skeletal animations played using Three.js animation system
5. **Scroll Integration**: GSAP ScrollTrigger updates animation progress based on scroll position

## Performance Considerations

- **Lazy Loading**: Models and textures loaded on demand
- **Optimization**: Draco compression for 3D models
- **Efficient Rendering**: React Three Fiber optimizes render calls
- **Memory Management**: Proper cleanup of Three.js resources

## Build and Deployment

- **Development**: Vite dev server with fast HMR
- **Production**: Optimized build with code splitting
- **Static Assets**: Served from CDN or static hosting

## Future Enhancements

- Progressive Web App (PWA) features
- Advanced shader materials
- Physics integration
- Multi-model scenes
- Performance monitoring