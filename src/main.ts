/////
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
// import { TextureLoader } from "three";

// const app = document.getElementById("app") as HTMLElement;

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 100);
// const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// renderer.setClearColor(0xffffff, 0.2);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 2.0;

// app.appendChild(renderer.domElement);

// const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// directionalLight.shadow.mapSize.width = 2048;
// directionalLight.shadow.mapSize.height = 2048;
// directionalLight.shadow.camera.near = 1;
// directionalLight.shadow.camera.far = 50;
// directionalLight.shadow.camera.left = -15;
// directionalLight.shadow.camera.right = 15;
// directionalLight.shadow.camera.top = 15;
// directionalLight.shadow.camera.bottom = -15;
// scene.add(directionalLight);

// const leftLight = new THREE.DirectionalLight(0xffffff, 1);
// leftLight.position.set(-10, 5, 0);
// leftLight.shadow.mapSize.width = 1024;
// leftLight.shadow.mapSize.height = 1024;
// scene.add(leftLight);

// const rightLight = new THREE.DirectionalLight(0xffffff, 1);
// rightLight.position.set(10, 5, 0);
// rightLight.shadow.mapSize.width = 1024;
// rightLight.shadow.mapSize.height = 1024;
// scene.add(rightLight);

// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.2);
// hemiLight.position.set(0, 20, 0);
// scene.add(hemiLight);

// const keyLight = new THREE.DirectionalLight(0xffffff, 1);
// keyLight.position.set(10, 10, 10);
// keyLight.castShadow = true;
// keyLight.shadow.mapSize.width = 2048;
// keyLight.shadow.mapSize.height = 2048;
// keyLight.shadow.bias = -0.0005;
// scene.add(keyLight);

// const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
// rimLight.position.set(0, 5, -10);
// scene.add(rimLight);

// const ambientLigh2t = new THREE.AmbientLight(0xffffff, 0.3);
// scene.add(ambientLigh2t);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;
// controls.enableZoom = true;
// controls.enablePan = false;
// controls.minPolarAngle = 0;
// controls.maxPolarAngle = Math.PI / 2.5;
// controls.minDistance = 6;
// controls.maxDistance = 10;

// camera.position.set(3, 3, 8);
// controls.update();

// // function resizeRenderer() {
// //   const width = Math.min(Math.max(window.innerWidth, 400), 800);
// //   const height = Math.min(Math.max(window.innerHeight, 400), 800);
//   renderer.setSize(800,800);
//   // composer.setSize(width, height);
//   // camera.aspect = width / height;
//   // camera.updateProjectionMatrix();
// // }
// // window.addEventListener("resize", resizeRenderer);

// const planeGeometry = new THREE.PlaneGeometry(30, 30);

// const textureLoader = new TextureLoader();
// const floorTexture = textureLoader.load("public/floor.jpg");
// floorTexture.wrapS = THREE.RepeatWrapping;
// floorTexture.wrapT = THREE.RepeatWrapping;
// floorTexture.repeat.set(5, 5);

// const planeMaterial = new THREE.MeshStandardMaterial({
//   map: floorTexture,
//   roughness: 1,
//   metalness: 1,
// });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = -Math.PI / 2;
// plane.position.y = 0;
// plane.receiveShadow = true;
// scene.add(plane);

// const loader = new GLTFLoader();
// loader.load(
//   "public/3D_Cars.gltf",
//   (gltf) => {
//     const model = gltf.scene;
//     model.scale.set(2, 2, 2);
//     model.position.y = 0;

//     model.traverse((child) => {
//       if ((child as THREE.Mesh).isMesh) {
//         const mesh = child as THREE.Mesh;
//         mesh.castShadow = true;
//         mesh.receiveShadow = true;
//       }
//     });
//     scene.add(model);
//   },
//   undefined,
//   (error) => {
//     console.log("error :", error);
//   }
// );

// const composer = new EffectComposer(renderer);
// composer.addPass(new RenderPass(scene, camera));

// const bloomPass = new UnrealBloomPass(
//   new THREE.Vector2(window.innerWidth, window.innerHeight),
//   0.4,
//   0.5,
//   0.9
// );
// composer.addPass(bloomPass);

// // resizeRenderer();

// function animate() {
//   requestAnimationFrame(animate);
//   controls.update();
//   composer.render();
// }
// animate();

//////////orthograph

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { HDRLoader, SAOPass } from "three/examples/jsm/Addons.js";

const app = document.getElementById("app") as HTMLElement;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.9;
renderer.setClearColor("#EDEDED");
app.appendChild(renderer.domElement);

// --- Camera ---
let aspect = window.innerWidth / window.innerHeight;
let d = 12;
const camera = new THREE.OrthographicCamera(
  -d * aspect,
  d * aspect,
  d,
  -d,
  0.1,
  100
);


// --- Lights ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 20, 20);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 50;
scene.add(dirLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
fillLight.position.set(-10, 5, -10);
scene.add(fillLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x202020, 0.5);
scene.add(hemiLight);

// --- HDR ---
const rgbeLoader = new HDRLoader();
rgbeLoader.load(
  "public/qwantani_moonrise_puresky_4k.hdr",
  (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  },
  undefined,
  (err) => console.error("HDR load error:", err)
);

// --- Floor ---
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load("public/floor.jpg");
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(3, 3);

let circleRadius = 30;
const circleGeometry = new THREE.CircleGeometry(circleRadius, 128);
const circleMaterial = new THREE.MeshStandardMaterial({
  map: floorTexture,
  roughness: 0.9,
  metalness: 0.3,
});
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.rotation.x = -Math.PI / 2;
circle.receiveShadow = true;
circle.position.set(0, -1, 0);
scene.add(circle);

// --- Fog ---
scene.fog = new THREE.Fog("#d1d1d1", 20, 30);

// --- Controls ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;
controls.minZoom = 4;
controls.maxZoom = 6;
// controls.minPolarAngle = Math.PI / 3;
controls.maxPolarAngle = Math.PI / 2.2;

// --- Load Model ---
const loader = new GLTFLoader();
let car: THREE.Group;
loader.load(
  "public/3D_Model_Car.gltf",
  (gltf) => {
    car = gltf.scene;
    car.scale.set(2, 2, 2);

    const box = new THREE.Box3().setFromObject(car);
    const center = new THREE.Vector3();
    box.getCenter(center);
    car.position.x -= center.x;
    car.position.y -= box.min.y + 1.2;
    car.position.z -= center.z;

    car.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat.isMeshStandardMaterial) {
          mat.envMapIntensity = 1;
          mat.metalness = 1;
          mat.roughness = 0.2;
          mat.needsUpdate = true;
        }
      }
    });

    scene.add(car);
    const offset = new THREE.Vector3(6, 4, 15);
    camera.position.copy(car.position).add(offset);
    // controls.target.copy(car.position);
    controls.update();
  },
  undefined,
  (error) => console.log("Model load error:", error)
);

// --- Postprocessing ---
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.15,
  0.4,
  0.6
);
composer.addPass(bloomPass);

// --- Responsive ---
function onWindowResize() {
  aspect = window.innerWidth / window.innerHeight;
  camera.left = -d * aspect;
  camera.right = d * aspect;
  camera.top = d;
  camera.bottom = -d;
  camera.updateProjectionMatrix();

  circle.scale.set(aspect, 1, aspect);

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);

  // Adjust camera offset if car exists
  if (car) {
    const offset = new THREE.Vector3(6 * aspect, 4, 15 * aspect);
    camera.position.copy(car.position).add(offset);
    controls.update();
  }
}

window.addEventListener("resize", onWindowResize, false);

// --- Animate ---
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  composer.render();
}
animate();
