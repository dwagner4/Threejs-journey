import Experience from './Experience.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
  constructor()
  {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.setInstance()
    this.setOrbitControls()
  }

  setInstance()
  {
    this.instance = new THREE.PerspectiveCamera(
      35, 
      this.sizes.width / this.sizes.height,
      0.1,
      500
    )
    this.instance.position.set(-60,5,60)
    this.instance.target = new THREE.Vector3(3,0,1.5)
    this.scene.add(this.instance)
    
  }

  setOrbitControls()
  {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize()
  {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
    // console.log('resize on the camera')
  }

  update()
  {
    this.controls.update()
  }
}