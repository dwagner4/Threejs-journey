export default [
  {
    name: 'environmentMapTexture',
    type: 'cubeTexture',
    path: [
      'textures/skybox/px.jpg',
      'textures/skybox/nx.jpg',
      'textures/skybox/py.jpg',
      'textures/skybox/ny.jpg',
      'textures/skybox/pz.jpg',
      'textures/skybox/nz.jpg',
    ]
  },
  {
    name: 'grassColorTexture',
    type: 'texture',
    path: 'textures/dirt/color.jpg'
  },
  {
    name: 'grassNormalTexture',
    type: 'texture',
    path: 'textures/dirt/normal.jpg'
  },
  {
    name: 'foxModel',
    type: 'gltfModel',
    path: 'models/Fox/glTF/Fox.gltf'
  },
  {
    name: 'houseModel',
    type: 'gltfModel',
    path: 'models/House/RobertoHouse.glb'
  },
]