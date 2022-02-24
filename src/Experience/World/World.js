import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import House from './House.js'
import Ball from './Ball.js'

export default class World
{
  constructor()
  {
    this.experience = new Experience()
    this.objectsToUpdate = []

    this.experience.resources.on('ready', () =>
    {
      //  setup
      this.fox = new Fox()
      this.house = new House()
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