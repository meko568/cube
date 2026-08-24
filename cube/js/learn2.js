function secret() {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("cubeCanvas1"), antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    let miniKeyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    miniKeyLight.position.set(4, 6, 5);
    scene.add(miniKeyLight);

    let cubes = [];
    let size = 0.72;
    let colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffa500, 0xffffff];

    function createCube(x, y, z) {
        let geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
        let materials = colors.map(color => new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.05 }));
        let cube = new THREE.Mesh(geometry, materials);
        cube.position.set(x * size, y * size, z * size);
        let edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(geometry),
            new THREE.LineBasicMaterial({ color: 0x121316 })
        );
        cube.add(edges);
        scene.add(cube);
        cubes.push(cube);
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
    camera.position.z = 1
    document.querySelector(".X").onclick = function () {
        rotateCube("x", -Math.PI / 2)
    }
    document.querySelector(".X-").onclick = function () {
        rotateCube("x", Math.PI / 2)
    }
    document.querySelector(".Y").onclick = function () {
        rotateCube("y", -Math.PI / 2)
    }
    document.querySelector(".Y-").onclick = function () {
        rotateCube("y", Math.PI / 2)
    }
    document.querySelector(".Z").onclick = function () {
        rotateCube("z", -Math.PI / 2)
    }
    document.querySelector(".Z-").onclick = function () {
        rotateCube("z", Math.PI / 2)
    }

    camera.position.z = 4;
    scene.rotation.x = .5
}
secret()