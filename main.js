import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Scene
const scene = new THREE.Scene();

// Create object
// const geometry = new THREE.SphereGeometry(3, 64, 64);
// const material = new THREE.MeshStandardMaterial({
//   color: "#00ff83",
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// Create object obj assets
// const loader = new OBJLoader();
// loader.load("./assets/segitiga.obj", function (object) {
//   scene.add(object);
// });

// Create object gltf assets
const loader = new GLTFLoader();
loader.load("/assets/GLOBE.glb", function (gltf) {
  const model = gltf.scene;
  scene.add(model);
});

// Sizes
const sizes = {
  width: window.innerWidth,
  heigth: window.innerHeight,
};

// light
const light = new THREE.PointLight(0xffffff, 5, 100);
light.position.set(10, 10, 10);
scene.add(light);

// camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.heigth,
  0.1,
  50
);
camera.position.z = 20;
scene.add(camera);

// Render
const canvas = document.querySelector(".webgl");
const render = new THREE.WebGLRenderer({ canvas });

render.setSize(sizes.width, sizes.heigth);
render.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.enableZoom = false;
// controls.enablePan = false;

// Resize
window.addEventListener("resize", () => {
  //   update size
  sizes.width = window.width;
  sizes.heigth = window.heigth;

  // update camera
  camera.aspect = sizes.width / sizes.heigth;
  camera.updateProjectionMatrix();
  render.setSize(sizes.width, sizes.heigth);
});

const loop = () => {
  controls.update();
  render.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
