// Hero 3D cube — decorative, draggable Rubik's Cube for the home page.
// Separate from js/learn.js (the interactive solving engine on lear.html).
// Uses the same three.js r128 + gsap 3.12.2 already loaded on this site.

(function () {
    let canvas = document.getElementById("heroCubeCanvas");
    if (!canvas) return;

    let wrap = canvas.parentElement;
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
    camera.position.set(2.6, 2.2, 3.4);
    camera.lookAt(0, 0, 0);

    let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);

    // Lighting — soft key + fill so cube colors read clearly without looking flat.
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    let key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(5, 6, 4);
    scene.add(key);
    let fill = new THREE.DirectionalLight(0xe8ab2e, 0.25);
    fill.position.set(-4, -2, -3);
    scene.add(fill);

    // Brand-accented face colors (not the six raw sticker colors — tuned to
    // the site palette so the cube feels designed, not stock).
    let faceColors = [
        0xf2545b, // +X coral (primary accent)
        0xc23e44, // -X deeper coral
        0xf5f6f8, // +Y near-white
        0x2a2d35, // -Y charcoal
        0xe8ab2e, // +Z amber-gold (secondary accent)
        0xb9860f  // -Z deeper gold
    ];

    let cubeGroup = new THREE.Group();
    let gap = 1.02;
    let cubelets = [];

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                let geometry = new THREE.BoxGeometry(0.94, 0.94, 0.94);
                let materials = faceColors.map(function (c) {
                    return new THREE.MeshStandardMaterial({ color: c, roughness: 0.35, metalness: 0.08 });
                });
                let cubelet = new THREE.Mesh(geometry, materials);
                cubelet.position.set(x * gap, y * gap, z * gap);
                cubeGroup.add(cubelet);
                cubelets.push(cubelet);
            }
        }
    }
    scene.add(cubeGroup);
    cubeGroup.rotation.set(0.5, 0.7, 0);

    // Idle auto-rotation, paused while the user drags.
    let autoRotate = true;
    let idleSpeed = 0.0035;

    // Drag-to-rotate (pointer events cover mouse + touch).
    let dragging = false;
    let lastX = 0, lastY = 0;

    function onPointerDown(e) {
        dragging = true;
        autoRotate = false;
        lastX = e.clientX;
        lastY = e.clientY;
        canvas.setPointerCapture && e.pointerId != null && canvas.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e) {
        if (!dragging) return;
        let dx = e.clientX - lastX;
        let dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        cubeGroup.rotation.y += dx * 0.008;
        cubeGroup.rotation.x += dy * 0.008;
    }
    function onPointerUp() {
        dragging = false;
        // Resume idle rotation after a short pause, eased back in with gsap.
        gsap.delayedCall(1.2, function () { autoRotate = true; });
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Gentle load-in animation: cube scales/settles into place.
    cubeGroup.scale.set(0.4, 0.4, 0.4);
    gsap.to(cubeGroup.scale, { x: 1, y: 1, z: 1, duration: 1.1, ease: "back.out(1.6)" });

    function onResize() {
        let w = wrap.clientWidth, h = wrap.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    function animate() {
        requestAnimationFrame(animate);
        if (autoRotate) {
            cubeGroup.rotation.y += idleSpeed;
            cubeGroup.rotation.x += idleSpeed * 0.35;
        }
        renderer.render(scene, camera);
    }
    animate();
})();
