# Dog Studio

A modern, immersive 3D portfolio website showcasing creative projects with an interactive animated dog model. Built with React, Three.js, and GSAP for smooth animations and scroll-triggered effects.

## 🚀 Features

- **3D Interactive Dog Model**: Animated 3D dog using React Three Fiber with custom matcap materials
- **Scroll-Triggered Animations**: GSAP-powered animations that respond to user scroll
- **Portfolio Showcase**: Display of creative projects with images and descriptions
- **Responsive Design**: Optimized for various screen sizes
- **Modern Tech Stack**: Built with Vite, React 19, and latest Three.js
- **Performance Optimized**: Efficient rendering with tone mapping and optimized textures

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: GSAP with ScrollTrigger
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **Linting**: ESLint

## 📦 Installation

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dog-studio.git
   cd dog-studio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚀 Usage

### Development

```bash
pnpm dev
```

Starts the Vite development server with hot module replacement.

### Building for Production

```bash
pnpm build
```

Builds the app for production to the `dist` folder.

### Preview Production Build

```bash
pnpm preview
```

Locally preview the production build.

### Linting

```bash
pnpm lint
```

Runs ESLint to check for code quality issues.

## � Documentation

For detailed documentation, see the [docs/](docs/) directory:

- [Architecture Overview](docs/architecture.md)
- [Component API](docs/api.md)
- [Deployment Guide](docs/deployment.md)

## 🎨 Components

### DogStyle Component

The core 3D component featuring:
- Animated dog model with GLTF loader
- Custom matcap materials for realistic rendering
- GSAP animations triggered by scroll
- Normal mapping for surface detail

## 🔧 Configuration

### Vite Configuration

The project uses Vite for fast development and optimized builds. Configuration can be found in `vite.config.js`.

### ESLint Configuration

Code quality is maintained with ESLint. Configuration is in `eslint.config.js`.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run linting: `pnpm lint`
5. Test your changes
6. Commit your changes: `git commit -m 'Add some feature'`
7. Push to the branch: `git push origin feature/your-feature`
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [Your GitHub](https://github.com/your-username)

## 🙏 Acknowledgments

- Inspired by modern web design trends
- 3D model assets from various sources
- Matcap textures for material rendering
- React Three Fiber community

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

Built with ❤️ using React and Three.js
