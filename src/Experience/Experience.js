import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import * as THREE from 'three'
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

    // Options
    this.canvas = canvas

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()
    // console.log(renderer)

    //  Sizes resize event
    this.sizes.on('resize', () => 
    {
      this.resize()
    })

    //  Time Trigger event
    this.time.on('tick', () => 
    {
      this.update()
    })

  }

  resize()
  {
    this.renderer.resize()
    this.camera.resize()
  }

  update()
  {
    this.camera.update()
    this.renderer.update()
    // console.log('update the experience')
  }
}