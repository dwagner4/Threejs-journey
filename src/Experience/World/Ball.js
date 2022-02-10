import * as THREE from 'three'
import CANNON from 'cannon'
import Experience from '../Experience.js'

export default class Ball
{
  constructor()
  {
    this.experience = new Experience()
    this.model = null
    this.body = null
    this.debug = this.experience.debug

    // Debug
    if(this.experience.debug.active) 
    {
      this.debugFolder = this.experience.debug.ui.addFolder('the ball')
    }

    this.setModel()
    this.setAnimation()
    this.setBody()
    this.experience.world.objectsToUpdate.push(this)
  }

  setModel()
  {
    const material = new THREE.MeshStandardMaterial({
      color: '#777777',
      metalness: 0.3,
      roughness: 0.4,
    })
    this.model = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 20, 20),
      material
    )
    this.model.castShadow = true
    this.model.position.set(1,2,0)
    this.experience.scene.add(this.model)

    // Debug
    if(this.debug.active)
    {
      const colorObject = { color: '#777777' }
      this.debugFolder.add(material, 'metalness').min(0).max(1).step(0.01)
      this.debugFolder.add(material, 'roughness').min(0).max(1).step(0.01)
      this.debugFolder.addColor(colorObject, 'color')
          .onChange( () => {
          material.color.set(colorObject.color)
      }) 
    }

  }

  setAnimation()
  {

  }

  setBody()
  {
    const shape = new CANNON.Sphere(0.2)
    this.body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(1, 5, 0),
        shape: shape,
        // material: this.physWorld.defaultContactMaterial 
    })
    this.experience.physWorld.addBody(this.body)

    // Debug
    if(this.debug.active)
    {
      const debugObject = {
        dropBall: () => {
          console.log('ball drop')
          this.body.position.set(1,5,0)
        }
      }
      this.debugFolder.add(debugObject, 'dropBall')
    }

  }

  update()
  {
    this.model.position.copy(this.body.position)
  }

}