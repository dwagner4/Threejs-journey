import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'

export default class World
{
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    
    
    this.resources.on('ready', () =>
    {
      //  setup
      this.fox = new Fox()
      this.floor = new Floor()
      this.environment = new Environment()
      
    })
  }

  update()
  {
    if(this.fox){this.fox.update()}
    
  }
}