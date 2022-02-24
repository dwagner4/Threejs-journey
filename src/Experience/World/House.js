import * as THREE from 'three'
import Experience from '../Experience.js'

export default class House
{
  constructor()
  {
    this.experience = new Experience()
    this.model = null
    this.body = null

    this.setModel()
    // this.setAnimation()
    // this.setBody()
    // this.experience.world.objectsToUpdate.push(this)
  }

  setModel()
  {
    console.log(this.experience.resources.items.houseModel)
    this.model = this.experience.resources.items.houseModel.scene
    this.model.scale.set(2,2,2)
    this.model.position.set(0,6.9,-15)
    this.model.traverse((child) => 
    {
      if (child instanceof THREE.Mesh)
      {
        child.castShadow = true
      }
    })
    this.experience.scene.add(this.model)
  }

  setAnimation()
  {
    
  }

  setBody()
  {

  }

  update()
  {
    
  }
}