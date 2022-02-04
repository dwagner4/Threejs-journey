import * as THREE from 'three'
import CANNON from 'cannon'
import Experience from '../Experience.js'

export default class Ball
{
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.physWorld = this.experience.physWorld
    this.objectsToUpdate = this.experience.world.objectsToUpdate
    this.model = null
    this.body = null

    this.setModel()
    this.setAnimation()
    this.setBody()
    this.objectsToUpdate.push(this)
  }

  setModel()
  {
    this.model = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 20, 20),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
      })
    )
    this.model.castShadow = true
    this.model.position.set(1,2,0)
    this.scene.add(this.model)
  }

  setAnimation()
  {

  }

  setBody()
  {
    const shape = new CANNON.Sphere(0.2)
    this.body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(1, 3, 0),
        shape: shape,
        // material: this.physWorld.defaultContactMaterial 
    })
    this.physWorld.addBody(this.body)
  }

  update()
  {
    this.model.position.copy(this.body.position)
  }

}