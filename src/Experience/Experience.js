import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import sources from './Utils/sources.js'
import Debug from './Utils/Debug.js'
import PhysWorld from './Utils/PhysWorld'

import Camera from './Camera.js'
import Renderer from './Renderer.js'
import PostProcess from './PostProcess.js'
import World from './World/World.js'


let instance = null

export default class Experience 
{
  constructor(canvas) 
  {
    if(instance) 
    {
      return instance
    }
    instance = this

    // Options
    this.canvas = canvas
    this.scene = new THREE.Scene()

    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    
    this.resources = new Resources(sources)
    this.physWorld = new PhysWorld()
    
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.postProcessor = new PostProcess()
    this.world = new World()
    

    //  Sizes resize event
    this.sizes.on('resize', () => 
    {
      this.resize()
    })

    /** initially setting animation loop to null, later call start() in script.js */
    this.renderer.instance.setAnimationLoop( null )
  }

  resize()
  {
    this.renderer.resize()
    this.postProcessor.resize()
    this.camera.resize()
  }

  update()
  {
    this.time.tick()
    this.camera.update()
    this.physWorld.step(
      1/60,
      this.time.delta,
      3
    )
    this.world.update()
    // this.renderer.update()  // not needed with post processing
    this.postProcessor.update()
  }

  start()
  {
    this.renderer.instance.setAnimationLoop( () => 
    {
      this.update()
    })
  }

  stop()
  {
    this.renderer.instance.setAnimationLoop( null )
  }

  destroy()
  {
    this.sizes.off('resize')

    //traverse the scene
    this.scene.traverse((child) =>
    {
      if(child instanceof THREE.Mesh)
      {
        child.geometry.dispose()
      }

      for (const key in child.material)
      {
        const value = child.material[key]
        if(value && typeof value.dispose === 'function')
        {
          value.dispose()
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()
    if(this.debug.active)
    {
      this.debug.ui.destroy()
    }
  }
}