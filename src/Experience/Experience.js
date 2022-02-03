import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import sources from './Utils/sources.js'
import Debug from './Utils/Debug.js'

import Camera from './Camera.js'
import Renderer from './Renderer.js'
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
    window.experience = this

    // Options
    this.canvas = canvas

    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()
    // console.log(renderer)

    //  Sizes resize event
    this.sizes.on('resize', () => 
    {
      this.resize()
    })

    this.renderer.instance.setAnimationLoop( null )

  }

  resize()
  {
    this.renderer.resize()
    this.camera.resize()
  }

  update()
  {
    this.time.tick()
    this.camera.update()
    this.world.update()
    this.renderer.update()
    // console.log('update the experience')
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

    //traversethe scene
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