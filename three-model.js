// Three.js Building Model Script
let scene, camera, renderer, building;
let isInitialized = false;

// Initialize Three.js scene
function initThreeJS() {
  // Check if already initialized
  if (isInitialized) return;
  
  const modelContainer = document.getElementById('hero-model');
  if (!modelContainer) return;
  
  // Create scene
  scene = new THREE.Scene();
  
  // Camera setup
  const width = modelContainer.clientWidth;
  const height = modelContainer.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 8;
  camera.position.y = 2;
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  modelContainer.appendChild(renderer.domElement);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);
  
  const pointLight = new THREE.PointLight(0xe67e22, 0.5);
  pointLight.position.set(-3, 3, 2);
  scene.add(pointLight);
  
  // Create modern building model
  createModernBuilding();
  
  // Add responsive resize handling
  window.addEventListener('resize', () => onWindowResize(modelContainer));
  
  // Start animation loop
  animate();
  
  isInitialized = true;
}

// Create modern building model
function createModernBuilding() {
  building = new THREE.Group();
  
  // Main tower
  const mainTowerGeometry = new THREE.BoxGeometry(3, 8, 3);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.8,
    envMapIntensity: 1
  });
  
  const mainTower = new THREE.Mesh(mainTowerGeometry, glassMaterial);
  mainTower.position.y = 4;
  mainTower.castShadow = true;
  mainTower.receiveShadow = true;
  building.add(mainTower);
  
  // Glass panels
  const panelGeometry = new THREE.PlaneGeometry(2.8, 0.5);
  const panelMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0,
    transparent: true,
    opacity: 0.9
  });
  
  // Add glass panels to all sides
  for (let height = 0; height < 8; height += 0.7) {
    for (let side = 0; side < 4; side++) {
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      panel.position.y = height;
      panel.rotation.y = (Math.PI / 2) * side;
      
      if (side === 0) panel.position.z = 1.51;
      if (side === 1) panel.position.x = 1.51;
      if (side === 2) panel.position.z = -1.51;
      if (side === 3) panel.position.x = -1.51;
      
      building.add(panel);
    }
  }
  
  // Modern roof structure
  const roofGeometry = new THREE.CylinderGeometry(2, 1.5, 1, 6);
  const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 8.5;
  roof.castShadow = true;
  building.add(roof);
  
  // Add decorative elements
  const decorGeometry = new THREE.BoxGeometry(3.5, 0.2, 3.5);
  const decorMaterial = new THREE.MeshPhongMaterial({ color: 0xe67e22 });
  
  for (let i = 0; i < 3; i++) {
    const decor = new THREE.Mesh(decorGeometry, decorMaterial);
    decor.position.y = i * 3;
    decor.castShadow = true;
    building.add(decor);
  }
  
  // Ground plane with reflection
  const groundGeometry = new THREE.PlaneGeometry(20, 20);
  const groundMaterial = new THREE.MeshPhongMaterial({
    color: 0x999999,
    shininess: 100
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.1;
  ground.receiveShadow = true;
  building.add(ground);
  
  // Add surrounding environment
  addModernEnvironment();
  
  scene.add(building);
}

// Add modern environment elements
function addModernEnvironment() {
  // Add trees
  const treePositions = [
    { x: -4, z: -4 }, { x: 4, z: 4 },
    { x: -4, z: 4 }, { x: 4, z: -4 }
  ];
  
  treePositions.forEach(pos => {
    const tree = createTree();
    tree.position.set(pos.x, 0, pos.z);
    building.add(tree);
  });
  
  // Add smaller buildings
  const buildingPositions = [
    { x: -6, z: 0, height: 4 },
    { x: 6, z: 0, height: 5 },
    { x: 0, z: -6, height: 3 }
  ];
  
  buildingPositions.forEach(pos => {
    const smallBuilding = createSmallBuilding(pos.height);
    smallBuilding.position.set(pos.x, pos.height / 2, pos.z);
    building.add(smallBuilding);
  });
}

// Create a modern tree
function createTree() {
  const tree = new THREE.Group();
  
  // Tree trunk
  const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.2, 1, 8);
  const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x4d3319 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.castShadow = true;
  tree.add(trunk);
  
  // Tree foliage
  const foliageGeometry = new THREE.SphereGeometry(0.7, 8, 8);
  const foliageMaterial = new THREE.MeshPhongMaterial({ color: 0x2d5a27 });
  const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
  foliage.position.y = 1;
  foliage.castShadow = true;
  tree.add(foliage);
  
  return tree;
}

// Create a small modern building
function createSmallBuilding(height) {
  const building = new THREE.Group();
  
  const geometry = new THREE.BoxGeometry(2, height, 2);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.8
  });
  
  const mainStructure = new THREE.Mesh(geometry, material);
  mainStructure.castShadow = true;
  building.add(mainStructure);
  
  return building;
}

// Handle window resize
function onWindowResize(modelContainer) {
  if (!modelContainer) return;
  
  const width = modelContainer.clientWidth;
  const height = modelContainer.clientHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  
  renderer.setSize(width, height);
}

// Animation loop with smooth rotation and floating effect
function animate() {
  requestAnimationFrame(animate);
  
  if (building) {
    // Smooth rotation
    building.rotation.y += 0.002;
    
    // Floating effect
    const time = Date.now() * 0.001;
    building.position.y = Math.sin(time) * 0.1 - 2;
  }
  
  renderer.render(scene, camera);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initThreeJS, 100);
});

// Reinitialize on visibility change
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && !isInitialized) {
    initThreeJS();
  }
});