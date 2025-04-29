
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("cubeCanvas"), antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

let cubes1 = [];
let size = 0.72;
let colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffa500, 0xffffff];

function createCube(x, y, z) {
    let geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    let materials = colors.map(color => new THREE.MeshBasicMaterial({ color }));
    let cube = new THREE.Mesh(geometry, materials);
    cube.position.set(x * size, y * size, z * size);
    scene.add(cube);
    cubes1.push(cube);
}

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            createCube(x, y, z);
        }
    }
}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
function rotateFace(face) {
    let pivot = new THREE.Object3D();
    scene.add(pivot);

    let axis = new THREE.Vector3();
    let angle = -Math.PI / 2;
    let selectedCubes = [];

    cubes1.forEach(cube => {
        if ((face === 'R' && cube.position.x > 0.5) ||
            (face === 'r' && cube.position.x > -0.5) ||
            (face === 'r\'' && cube.position.x > -0.5) ||
            (face === 'l\'' && cube.position.x > 0.5) ||
            (face === 'l' && cube.position.x > 0.5) ||
            (face === 'L' && cube.position.x < -0.5) ||
            (face === 'R\'' && cube.position.x > 0.5) ||
            (face === 'U\'' && cube.position.y > 0.5) ||
            (face === 'F\'' && cube.position.z > 0.5) ||
            (face === 'D\'' && cube.position.y < -0.5) ||
            (face === 'B\'' && cube.position.z < -0.5) ||
            (face === 'L\'' && cube.position.x < -0.5) ||
            (face === 'U' && cube.position.y > 0.5) ||
            (face === 'M' && cube.position.x > 0.5) ||
            (face === 'D' && cube.position.y < -0.5) ||
            (face === 'F' && cube.position.z > 0.5) ||
            (face === 'M' && Math.abs(cube.position.x) > .5) ||
            (face === 'M\'' && Math.abs(cube.position.x) > .5) ||
            (face === 'B' && cube.position.z < -0.5)) {
            pivot.attach(cube);
            selectedCubes.push(cube);
        }
    });

    switch (face) {
        case 'R': axis.set(1, 0, 0); break;
        case 'l': axis.set(1, 0, 0); break;
        case 'l\'': axis.set(-1, 0, 0); break;
        case 'R\'': axis.set(-1, 0, 0); break;
        case 'r\'': axis.set(-1, 0, 0); break;
        case 'r': axis.set(1, 0, 0); break;
        case 'U\'': axis.set(0, -1, 0); break;
        case 'B\'': axis.set(0, 0, 1); break;
        case 'D\'': axis.set(0, -1, 0); break;
        case 'F\'': axis.set(0, 0, -1); break;
        case 'L\'': axis.set(1, 0, 0); break;
        case 'M': axis.set(1, 0, 0); break;
        case 'L': axis.set(-1, 0, 0); break;
        case 'U': axis.set(0, 1, 0); break;
        case 'D': axis.set(0, -1, 0); break;
        case 'F': axis.set(0, 0, 1); break;
        case 'B': axis.set(0, 0, -1); break;
        case 'M': axis.set(1, 0, 0); break
        case 'M\'': axis.set(-1, 0, 0); break
    }

    gsap.to(pivot.rotation, {
        duration: 0.1,
        x: axis.x * angle + pivot.rotation.x,
        y: axis.y * angle + pivot.rotation.y,
        z: axis.z * angle + pivot.rotation.z,
        onComplete: () => {
            selectedCubes.forEach(cube => {
                scene.attach(cube);
            });
            scene.remove(pivot);
        }
    });
}
function rotateCube(axis, angle) {
    gsap.to(scene.rotation, {
        duration: .1, // Adjust duration for smoothness
        [axis]: scene.rotation[axis] + angle,
        ease: "power2.inOut"
    });
}

camera.position.z = 4;
scene.rotation.x = .5
