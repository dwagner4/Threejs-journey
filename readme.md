# Three.js Template

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

add /#debug to the address to reveal the debug panel. the experience is available in the console at window.experience

# Summary

## index.js

- instantiates the Experience within a canvas element supplied by the html
- calls experience.start()
- calls experience.stop() and
- calls experience destroy()

## Experience

- sets the Camera, renderer and 'world'
- may also contain the physics world
- has the resize listener
- sets the update loop
  - should probably have an updateable Array instead of a list
