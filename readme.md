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

This is a Singleton

- sets the Camera, renderer and 'world'
- instantiates the THREE.scene
- may also contain instanitate and configure the physics world
- has the resize listener
- sets the update loop

```
  this.time.tick()
  this.camera.update()
  this.physWorld.step(
    1/60,
    this.time.delta,
    3
  )
  this.world.update()
  this.renderer.update()
```

## World

- loads resources
- on completion, instantiates objects
  - instances add themselves to the scene and the physWorld in their constructors
  - should we phase this somehow, progressively building scene?
- updates all objects within world.update()

## Utils/source

- returns a JSON object with one entry for every resource
- models, textures, materials, etc....

## Scene Objects

in constructor

```
this.experience = new Experience()
this.scene = this.experience.scene
this.physWorld = this.experience.physWorld
this.resources = this.experience.resources
this.objectsToUpdate = this.experience.world.objectsToUpdate
this.model = null
this.body = null

this.setGeometry()
this.setTextures()
this.setMaterial()
this.setMesh()
this.setBody()
```

also include an update() method

```
update()
{
  this.model.position.copy(this.body.position)
}

// or

update()
{
  this.animation.mixer.update(this.time.delta * 0.001)
}
```
