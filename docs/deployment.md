# Deployment Guide

This guide covers how to deploy the Dog Studio application to various platforms.

## Prerequisites

- Node.js 18+
- pnpm or npm
- Git repository

## Build Process

### Local Build

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Build for production:
   ```bash
   pnpm build
   ```

3. Preview the build locally:
   ```bash
   pnpm preview
   ```

The built files will be in the `dist/` directory.

## Deployment Options

### Static Hosting

Dog Studio is a static React application that can be deployed to any static hosting service.

#### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `dist`
4. Deploy

#### Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Vite settings
3. Deploy

#### GitHub Pages

1. Install gh-pages:
   ```bash
   pnpm add -D gh-pages
   ```

2. Add deploy script to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. Build and deploy:
   ```bash
   pnpm build
   pnpm deploy
   ```

### Server Deployment

For server-based deployment, you can serve the static files using any web server.

#### Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dog-studio/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Apache

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/dog-studio/dist

    <Directory /path/to/dog-studio/dist>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorDocument 404 /index.html
</VirtualHost>
```

### Docker Deployment

Create a Dockerfile:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm && pnpm install

COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t dog-studio .
docker run -p 80:80 dog-studio
```

## Environment Variables

Currently, the application doesn't use environment variables. For future enhancements:

- Create `.env` files for different environments
- Use Vite's `import.meta.env` for access
- Set variables in deployment platform settings

## Performance Optimization

### Build Optimization

- Code splitting is handled by Vite
- Tree shaking removes unused code
- Minification and compression are automatic

### Asset Optimization

- Images are served from `public/` directory
- 3D models use Draco compression
- Textures are optimized for web

### CDN

Consider using a CDN for static assets:
- Upload `dist/` contents to CDN
- Update asset paths if necessary

## Monitoring

After deployment, monitor:
- Page load times
- 3D rendering performance
- User interactions
- Error rates

## Troubleshooting

### Common Issues

1. **404 on refresh**: Ensure server serves `index.html` for all routes
2. **3D not rendering**: Check WebGL support in browser
3. **Assets not loading**: Verify file paths and CDN configuration

### Performance Issues

- Check network tab for large asset downloads
- Use browser dev tools performance profiler
- Optimize 3D models if necessary

## Security Considerations

- All assets are static and served over HTTPS
- No user data is stored
- Consider CSP headers for additional security

## Updates

To update the deployed application:
1. Make changes to code
2. Test locally
3. Commit and push changes
4. CI/CD will rebuild and redeploy automatically (if configured)