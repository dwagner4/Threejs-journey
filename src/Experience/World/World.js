import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import Ball from './Ball.js'

export default class World
{
  constructor()
  {
    this.experience = new Experience()
    // this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.objectsToUpdate = []

    this.resources.on('ready', () =>
    {
      //  setup
      this.fox = new Fox()
      this.floor = new Floor()
      this.environment = new Environment()
      this.ball = new Ball()
    })
  }

  update()
  {
    // console.log(this.objectsToUpdate)
    for(const object of this.objectsToUpdate)
    {
        if(object.update) {object.update()}
    }    
  }
}