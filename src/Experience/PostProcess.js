import * as THREE from 'three'
import Experience from './Experience.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

export default class PostProcess
{
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.sizes = this.experience.sizes
    this.camera = this.experience.camera.instance
    this.renderer = this.experience.renderer.instance
    
    this.renderTarget = new THREE.WebGLMultisampleRenderTarget(
      800,
      600,
      {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat
      }
    )

    this.setInstance()
  }

  setInstance()
  {
    this.instance = new EffectComposer(this.renderer, this.renderTarget)

    const renderPass = new RenderPass(this.scene, this.camera)
    this.instance.addPass(renderPass)
  }

  resize()
  {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  update()
  {
    this.instance.render()
  }
}