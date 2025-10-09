import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { HDRLoader } from "three/examples/jsm/Addons.js";

const loaderDiv = document.createElement("div");
loaderDiv.id = "loader";
loaderDiv.style.position = "fixed";
loaderDiv.style.top = "0";
loaderDiv.style.left = "0";
loaderDiv.style.width = "100%";
loaderDiv.style.height = "100%";
loaderDiv.style.background = "#000";
loaderDiv.style.display = "flex";
loaderDiv.style.alignItems = "center";
loaderDiv.style.justifyContent = "center";
loaderDiv.style.color = "#fff";
loaderDiv.style.fontSize = "2em";
loaderDiv.innerText = "Loading...";
document.body.appendChild(loaderDiv);

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

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 20, 20);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 50;
scene.add(dirLight);

const rgbeLoader = new HDRLoader();
let hdrLoaded = false;
rgbeLoader.load(
  "public/2.hdr",
  (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
    hdrLoaded = true;
    checkLoadingComplete();
  },
  undefined,
  (err) => console.error("HDR load error:", err)
);

const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load("public/Vol_3.png");
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;

const circleGeometry = new THREE.CircleGeometry(30, 128);
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

scene.fog = new THREE.Fog("#d1d1d1", 20, 30);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;
controls.minZoom = 4;
controls.maxZoom = 6;
controls.maxPolarAngle = Math.PI / 2.2;

const loader = new GLTFLoader();
let car: THREE.Group;
let modelLoaded = false;

loader.load(
  "public/car_04 gltf.gltf",
  (gltf) => {
    car = gltf.scene;
    scaleOnResize();
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
    controls.update();

    modelLoaded = true;
    checkLoadingComplete();
  },
  undefined,
  (error) => console.log("Model load error:", error)
);

function scaleOnResize() {
  console.log(window.innerWidth);

  if (window.innerWidth < 1000) {
    car.scale.set(0.7, 0.7, 0.7);
    circle.position.set(0, -1.15, 0);
    controls.minZoom = 3;
    controls.maxZoom = 5;
  } else {
    car.scale.set(2, 2, 2);
  }
}

window.addEventListener("resize", scaleOnResize);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.15,
  0.4,
  0.6
);
composer.addPass(bloomPass);

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

  if (car) {
    const offset = new THREE.Vector3(6 * aspect, 4, 15 * aspect);
    camera.position.copy(car.position).add(offset);
    controls.update();
  }
}
window.addEventListener("resize", onWindowResize, false);

function checkLoadingComplete() {
  if (hdrLoaded && modelLoaded) {
    loaderDiv.style.display = "none";
  }
}

function animate() {
  requestAnimationFrame(animate);
  controls.autoRotate = true;
  controls.autoRotateSpeed = -0.5;
  controls.update();
  composer.render();
}
animate();
