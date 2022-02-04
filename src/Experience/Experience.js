import * as THREE from 'three'

import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import sources from './Utils/sources.js'
import Debug from './Utils/Debug.js'

import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import CANNON from 'cannon'


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
    
    /** Phsical World */
    this.physWorld = new CANNON.World()
    this.physWorld.gravity.set(0, -9.82, 0)
    const defaultMaterial = new CANNON.Material('default')
    const defaultContactMaterial = new CANNON.ContactMaterial(
        defaultMaterial,
        defaultMaterial,
        {
            friction: 0.1,
            restitution: 0.7
        }
    )
    this.physWorld.addContactMaterial(defaultContactMaterial)
    this.physWorld.defaultContactMaterial = defaultContactMaterial
    

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
    this.renderer.update()
    // console.log(this.physWorld)
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