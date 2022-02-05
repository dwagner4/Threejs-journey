import * as THREE from 'three'
import CANNON from 'cannon'
import Experience from '../Experience.js'

export default class Floor
{
  constructor()
  {
    this.experience = new Experience()
    this.model = null
    this.body = null

    this.setGeometry()
    this.setTextures()
    this.setMaterial()
    this.setModel()
    this.setBody()
  }

  setGeometry()
  {
    this.geometry = new THREE.CircleGeometry(5, 64)
  }

  setTextures()
  {
    this.textures = {}
    this.textures.color = this.experience.resources.items.grassColorTexture
    this.textures.color.encoding = THREE.sRGBEncoding
    this.textures.color.repeat.set(1.5, 1.5)
    this.textures.color.wrapS = THREE.RepeatWrapping
    this.textures.color.wrapT = THREE.RepeatWrapping

    this.textures.normal = this.experience.resources.items.grassNormalTexture
    this.textures.normal.repeat.set(1.5, 1.5)
    this.textures.normal.wrapS = THREE.RepeatWrapping
    this.textures.normal.wrapT = THREE.RepeatWrapping
  }

  setMaterial()
  {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal
    })
  }

  setModel()
  {
    this.model = new THREE.Mesh(this.geometry, this.material)
    this.model.rotation.x = - Math.PI * 0.5
    this.model.receiveShadow = true
    this.experience.scene.add(this.model)
  }

  setBody()
  {
    const floorShape = new CANNON.Plane()
    this.body = new CANNON.Body()
    this.body.mass = 0
    this.body.quaternion.setFromAxisAngle( 
        new CANNON.Vec3(-1,0,0),
        Math.PI * 0.5
    )
    this.body.addShape(floorShape)
    
    this.experience.physWorld.addBody(this.body)
  }
}