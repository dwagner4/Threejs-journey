import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Fox
{
  constructor()
  {
    this.experience = new Experience()
    this.model = null
    this.body = null

    // Debug
    if(this.experience.debug.active) 
    {
      this.debugFolder = this.experience.debug.ui.addFolder('fox')
    }

    this.setModel()
    this.setAnimation()
    this.setBody()
    this.experience.world.objectsToUpdate.push(this)
  }

  setModel()
  {
    console.log(this.experience.resources.items.foxModel)
    this.model = this.experience.resources.items.foxModel.scene
    this.model.scale.set(0.02,0.02,0.02)
    this.model.position.set(3,0,1.5)
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
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.model)
    this.animation.actions = {}


    this.animation.actions.idle = this.animation.mixer.clipAction(this.experience.resources.items.foxModel.animations[0])
    this.animation.actions.walking = this.animation.mixer.clipAction(this.experience.resources.items.foxModel.animations[1])
    this.animation.actions.running = this.animation.mixer.clipAction(this.experience.resources.items.foxModel.animations[2])

    this.animation.actions.current = this.animation.actions.idle
    this.animation.actions.current.play()

    this.animation.play = (name) => 
    {
      const newAction = this.animation.actions[name]
      const oldAction = this.animation.actions.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 1)

      this.animation.actions.current = newAction
    }

    if(this.experience.debug.active)
    {
      const debugObject = {
        playIdle: () => {this.animation.play('idle')},
        playWalking: () => {this.animation.play('walking')},
        playRunning: () => {this.animation.play('running')},
      }
      this.debugFolder.add(debugObject, 'playIdle')
      this.debugFolder.add(debugObject, 'playWalking')
      this.debugFolder.add(debugObject, 'playRunning')
    }
  }

  setBody()
  {

  }

  update()
  {
    this.animation.mixer.update(this.experience.time.delta * 0.001)
  }
}