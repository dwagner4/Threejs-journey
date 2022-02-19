import './style.css'
import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))
window.experience = experience
experience.start()

