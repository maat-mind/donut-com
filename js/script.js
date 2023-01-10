// BASE
const canvas = document.querySelector('canvas.webgl')

// SCENE
const scene = new THREE.Scene()

// GLTF Loader

let donut = null

const gltfLoader = new THREE.GLTFLoader()

gltfLoader.load('./assets/donut/scene.gltf', (gltf) => {
	donut = gltf.scene

	donut.rotation.y = 1.5
	donut.position.x = Math.PI * 0.2
	donut.rotation.z = Math.PI * 0.15

	const radius = 8.5

	donut.scale.set(radius, radius, radius)
	scene.add(donut)
})

// SIZES
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}

// CAMERA
const camera = new THREE.PerspectiveCamera(
	35,
	sizes.width / sizes.height,
	0.1,
	1000
)

camera.position.z = 5
scene.add(camera)

// LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(1, 2, 0)
scene.add(directionalLight)

// RENDERER
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
	alpha: true,
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.render(scene, camera)

// ANIMATE
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () => {
	const elapsedTime = clock.getElapsedTime()
	const deltaTime = elapsedTime - lastElapsedTime
	lastElapsedTime = elapsedTime

	if (!!donut) {
		donut.position.y = Math.sin(elapsedTime * 0.5) * 0.1 - 0.1
	}

	renderer.render(scene, camera)

	window.requestAnimationFrame(tick)
}

tick()
