// BASE
const canvas = document.querySelector('canvas.webgl')

// SCENE
const scene = new THREE.Scene()

// GLTF Loader

let donut = null

const gltfLoader = new THREE.GLTFLoader()

gltfLoader.load('./assets/donut/scene.gltf', (gltf) => {
	donut = gltf.scene

	donut.rotation.y = 1.2
	donut.position.x = Math.PI * 0.4
	donut.rotation.z = Math.PI * 0.25

	const radius = 8.5

	donut.scale.set(radius, radius, radius)
	scene.add(donut)
})

// SCROLL
const transformDonut = [
	{
		rotationY: 1.2,
		positionX: 1.5,
	},
	{
		rotationY: 2.5,
		positionX: -1.5,
	},
	{
		rotationY: 1.5,
		positionX: 0,
	},
]

let scrollY = window.scrollY
let currentSection = 0
window.addEventListener('scroll', () => {
	scrollY = window.scrollY
	const newSection = Math.round(scrollY / sizes.height)

	if (newSection != currentSection) {
		currentSection = newSection

		if (!!donut) {
			gsap.to(donut.rotation, {
				duration: 1.25,
				ease: 'power2.inOut',
				y: transformDonut[currentSection].rotationY,
			})
			gsap.to(donut.position, {
				duration: 1.25,
				ease: 'power2.inOut',
				x: transformDonut[currentSection].positionX,
			})
		}
	}
})

// ON RELOAD
window.onbeforeunload = function () {
	window.scrollTo(0, 0)
}

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
