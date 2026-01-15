import * as THREE from 'three';

export const initIntro = () => {
  const container = document.getElementById('three-container')
  if (!container) return

  const scene = new THREE.Scene();

  // Params: FOV, aspect ratio, near clip, far clip
  const camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 3; // Recule

  // Créer le renderer (le projecteur WebGL)
  const renderer = new THREE.WebGLRenderer({antialias : true, alpha: true})
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Créer un objet
  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube)

  // Animate 
  function animate() {
    requestAnimationFrame(animate)

    // Rotation continue
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // Dessiner la frame
    renderer.render(scene, camera)
  }
  animate()

  // 7. Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}