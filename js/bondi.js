// let scene = new THREE.Scene();
// let camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
// let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("cubeCanvas"), antialias: true, alpha: true });

// renderer.setSize(window.innerWidth, window.innerHeight);

// let cubes = [];
// let size = 0.78;
// let colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xffa500, 0xffffff];

// function createCube(x, y, z) {
//     let geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
//     let materials = colors.map(color => new THREE.MeshBasicMaterial({ color }));
//     let cube = new THREE.Mesh(geometry, materials);
//     cube.position.set(x * size, y * size, z * size);
//     scene.add(cube);
//     cubes.push(cube);
// }

// for (let x = -1; x <= 1; x++) {
//     for (let y = -1; y <= 1; y++) {
//         for (let z = -1; z <= 1; z++) {
//             createCube(x, y, z);
//         }
//     }
// }

// camera.position.z = 4.5;

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();
// function rotateFace(face) {
//     let pivot = new THREE.Object3D();
//     scene.add(pivot);

//     let axis = new THREE.Vector3();
//     let angle = -Math.PI / 2;
//     let selectedCubes = [];

//     cubes.forEach(cube => {
//         if ((face === 'R' && cube.position.x > 0.5) ||
//             (face === 'L' && cube.position.x < -0.5) ||
//             (face === 'R\'' && cube.position.x > 0.5) ||
//             (face === 'U\'' && cube.position.y > 0.5) ||
//             (face === 'F\'' && cube.position.z > 0.5) ||
//             (face === 'D\'' && cube.position.y < -0.5) ||
//             (face === 'B\'' && cube.position.z < -0.5) ||
//             (face === 'L\'' && cube.position.x < -0.5) ||
//             (face === 'U' && cube.position.y > 0.5) ||
//             (face === 'D' && cube.position.y < -0.5) ||
//             (face === 'F' && cube.position.z > 0.5) ||
//             (face === 'B' && cube.position.z < -0.5)) {
//             pivot.attach(cube);
//             selectedCubes.push(cube);
//         }
//     });

//     switch (face) {
//         case 'R': axis.set(1, 0, 0); break;
//         case 'R\'': axis.set(-1, 0, 0); break;
//         case 'U\'': axis.set(0, -1, 0); break;
//         case 'B\'': axis.set(0, 0, 1); break;
//         case 'D\'': axis.set(0, -1, 0); break;
//         case 'F\'': axis.set(0, 0, -1); break;
//         case 'L\'': axis.set(1, 0, 0); break;
//         case 'L': axis.set(-1, 0, 0); break;
//         case 'U': axis.set(0, 1, 0); break;
//         case 'D': axis.set(0, -1, 0); break;
//         case 'F': axis.set(0, 0, 1); break;
//         case 'B': axis.set(0, 0, -1); break;
//     }

//     gsap.to(pivot.rotation, {
//         duration: 0.1,
//         x: axis.x * angle + pivot.rotation.x,
//         y: axis.y * angle + pivot.rotation.y,
//         z: axis.z * angle + pivot.rotation.z,
//         onComplete: () => {
//             selectedCubes.forEach(cube => {
//                 scene.attach(cube);
//             });
//             scene.remove(pivot);
//         }
//     });
// }
// scene.rotation.x = .4;  // Rotate around the Y-axis
// Get the root element
const root = document.documentElement;

// Get the computed style of the root element
const rootStyles = getComputedStyle(root);

// Get the value of the CSS variable
const primaryColor = rootStyles.getPropertyValue("--back-color").trim();
let more = document.querySelector(".more");
let themore = document.querySelector(".themore");
if (themore) {
    themore.onclick = function () {
        more.classList.toggle("display");
    }
}
let team = document.querySelector(".team .container");
let futures = document.querySelector(".futures .container");
let services = document.querySelector(".services .container");
let pricing = document.querySelector(".pricing .container");
let stats = document.querySelector(".stats .container");
let number = document.querySelectorAll(".number");
let i = true;
let all = document.querySelectorAll("body *");
let theme = true;
let sizebtn1 = document.querySelector(".size span:nth-child(1)")
let sizebtn2 = document.querySelector(".size span:nth-child(2)")
let sizebtn3 = document.querySelector(".size span:nth-child(3)")
if (!localStorage.theme) {
    localStorage.theme = theme
}
let btn = document.querySelector(".button")
window.onscroll = function () {
    if (services) {
        if (window.scrollY >= services.offsetTop - 500) {
            services.style.opacity = "1"
            services.style.transform = "translateY(0)"
        }
        if (window.scrollY >= stats.offsetTop - 500) {
            stats.style.opacity = "1"
            stats.style.transform = "translateY(0)";
            if (i === true) {
                i = false;
                number.forEach(function (e) {
                    let num = e.innerHTML;
                    e.innerHTML = 0;
                    let the = setInterval(function () {
                        e.innerHTML = +e.innerHTML + 1;
                        if (e.innerHTML === num) {
                            clearInterval(the)
                        }
                    }, 1500 / num)
                })
            }
        }
        if (window.scrollY >= team.offsetTop - 500) {
            team.style.opacity = "1"
            team.style.transform = "translateY(0)"

        }
        if (window.scrollY >= pricing.offsetTop - 500) {
            pricing.style.opacity = "1"
            pricing.style.transform = "translateY(0)"

        }
        if (window.scrollY >= futures.offsetTop + 100) {
            futures.style.opacity = "1"
            futures.style.transform = "translateY(0)"

        }
    }
}
if (btn !== null) {
    btn.onclick = function () {
        theme = !theme;
        localStorage.theme = theme;
        if (localStorage.theme === "true") {
            document.querySelector(".button i").className = "";
            document.querySelector(".button i").classList.add(`fa-solid`, "fa-moon", `thelogo`)
            document.documentElement.style.setProperty('--back-color', '#121212');
            document.documentElement.style.setProperty('--t-color', 'white');
            document.documentElement.style.setProperty('--dark-color', '#19283f');
            all.forEach(function (e) {
                if (e.classList.contains("text-black-50") || e.classList.contains("text-white-50")) {
                    e.classList.remove("text-black-50");
                    e.classList.add("text-white-50")
                }
            })
        } else {
            document.querySelector(".button i").className = "";
            document.querySelector(".button i").classList.add("clicked", "fa-solid", "fa-sun");
            document.documentElement.style.setProperty('--back-color', 'white');
            document.documentElement.style.setProperty('--t-color', '#121212');
            document.documentElement.style.setProperty('--dark-color', 'white');


            all.forEach(function (e) {
                if (e.classList.contains("text-black-50") || e.classList.contains("text-white-50")) {
                    e.classList.add("text-black-50");
                    e.classList.remove("text-white-50")
                }
            })
        }
    }
};
let btn1 = true;
let btn2 = true;
let btn3 = true;
if (!localStorage.size) {
    localStorage.size = 10;
}
if (sizebtn1) {
    sizebtn1.onclick = function () {
        if (btn1 === true) {
            all.forEach(function (e) {
                if (e.classList.contains("large")) {
                    e.style.setProperty("font-size", `${(parseFloat(window.getComputedStyle(e).fontSize) * (5 / 6))}px`, "important");

                }
            })
            all.forEach(function (e) {
                if (e.children.length === 0) {
                    e.classList.add("smaller");
                    e.classList.remove("normal")
                    e.classList.remove("large")
                }
            })
            all.forEach(function (e) {
                if (e.classList.contains("smaller")) {
                    e.style.setProperty("font-size", `${parseFloat(window.getComputedStyle(e).fontSize) - (parseFloat(window.getComputedStyle(e).fontSize) / 5)}px`, "important");
                }
            })
            btn1 = false;
            btn2 = true;
            btn3 = true;
            localStorage.size = 8;
        }
    }
    sizebtn2.onclick = function () {
        if (btn2 === true) {
            all.forEach(function (e) {
                if (e.classList.contains("smaller")) {
                    e.style.setProperty("font-size", `${(parseFloat(window.getComputedStyle(e).fontSize) * (5 / 4))}px`, "important");

                } else if (e.classList.contains("large")) {
                    e.style.setProperty("font-size", `${(parseFloat(window.getComputedStyle(e).fontSize) * (5 / 6))}px`, "important");
                }
            })
            all.forEach(function (e) {
                if (e.children.length === 0) {
                    e.classList.remove("smaller")
                    e.classList.remove("large")
                }
            })
            btn1 = true;
            btn2 = false;
            btn3 = true;
        }
        localStorage.size = 10;
    }
    sizebtn3.onclick = function () {
        if (btn3 === true) {
            all.forEach(function (e) {
                if (e.classList.contains("smaller")) {
                    e.style.setProperty("font-size", `${(parseFloat(window.getComputedStyle(e).fontSize) * (5 / 4))}px`, "important");

                }
            })
            all.forEach(function (e) {
                if (e.children.length === 0) {
                    e.classList.add("large");
                    e.classList.remove("normal")
                    e.classList.remove("smaller")
                }
            })
            all.forEach(function (e) {
                if (e.classList.contains("large")) {
                    e.style.setProperty("font-size", `${parseFloat(window.getComputedStyle(e).fontSize) + (parseFloat(window.getComputedStyle(e).fontSize) / 5)}px`, "important");
                }
            })
        }
        btn1 = true;
        btn2 = true;
        btn3 = false;
        localStorage.size = 12;
    }
}

window.onload = function () {
    if (localStorage.log === "loged") {
        if (document.querySelector(".navbar .btn")) {
            document.querySelector(".navbar .btn").remove();
        }
        if (document.querySelector(".settings")) {
            document.querySelector(".user-data").innerHTML = `<div class="user-name text-uppercase">
                Name: <span>${localStorage.name}</span>
            </div>
            <div class="eser-email">
                Email: <span>${localStorage.email}</span>
            </div><div class="logout btn btn-primary text-uppercase">logout</div>`
            document.querySelector(".logout").onclick = function () {
                localStorage.removeItem("log", "name", "email");
                document.querySelector(".user-data").innerHTML = "";
                let log = document.createElement("div");
                log.innerHTML = `                   <div class=" btn btn-primary p-2 rounded text-white text-uppercase m"><a href="login.html"
                            class="nav-link text-uppercase p-0">log in</a>
                    </div>`;
                document.querySelector(".navbar-nav").appendChild(log)
            }
        }
    }
    all = document.querySelectorAll("body *");
    if (localStorage.size === "8") {
        all.forEach(function (e) {
            if (e.children.length === 0) {
                e.classList.add("smaller");
                e.classList.remove("normal")
                e.classList.remove("large");
            }

        })
    } else if (localStorage.size === "10") {
        all.forEach(function (e) {
            if (e.children.length === 0) {
                e.classList.add("normal")
                e.classList.remove("smaller")
                e.classList.remove("large")
            }
        })
    } else if (localStorage.size === "12") {
        all.forEach(function (e) {
            if (e.children.length === 0) {
                e.classList.add("large");
                e.classList.remove("normal")
                e.classList.remove("smaller")
            }
        })
    }
    all.forEach(function (e) {
        if (e.classList.contains("smaller")) {
            e.style.setProperty("font-size", `${parseFloat(window.getComputedStyle(e).fontSize) - (parseFloat(window.getComputedStyle(e).fontSize) / 5)}px`, "important");
        }
    })
    all.forEach(function (e) {
        if (e.classList.contains("large")) {
            e.style.setProperty("font-size", `${parseFloat(window.getComputedStyle(e).fontSize) + (parseFloat(window.getComputedStyle(e).fontSize) / 5)}px`, "important");
        }
    })
    if (localStorage.theme === "true") {
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-moon thelogo"></i>`
        }
        document.documentElement.style.setProperty('--back-color', '#121212');
        document.documentElement.style.setProperty('--dark-color', '#19285f');
        document.documentElement.style.setProperty('--t-color', 'white');

        all.forEach(function (e) {
            if (e.classList.contains("text-black-50") || e.classList.contains("text-white-50")) {
                e.classList.remove("text-black-50");
                e.classList.add("text-white-50")
            }
        })
    } else {
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-sun"></i>`
            document.querySelector(".button i").classList.add("clicked")
        }
        document.documentElement.style.setProperty('--back-color', 'white');
        document.documentElement.style.setProperty('--t-color', '#121212');
        document.documentElement.style.setProperty('--dark-color', 'white');

        all.forEach(function (e) {
            if (e.classList.contains("text-black-50") || e.classList.contains("text-white-50")) {
                e.classList.add("text-black-50");
                e.classList.remove("text-white-50")
            }
        })
    }
}





let email = document.querySelector(".email");
let emailre = /\w+@\w+.(net|com)/;
let namein = document.querySelector(".name")
let pass = document.querySelector(".password");
let passre = /\d{2}\s\d{8}/;
let valid1 = false;
let valid2 = false;
let valid3 = false;
let finish = document.querySelector(".finish");
if (finish) {
    namein.oninput = function () {
        if (namein.value === "") {
            valid1 = false;
            namein.parentElement.classList.add("requer")
        } else {
            namein.parentElement.classList.remove("requer")
            valid1 = true;
        }
    }
    email.oninput = function () {
        if (email.value === "") {
            email.parentElement.classList.add("requer");
            email.parentElement.classList.remove("unvalid")
            valid2 = false;
        } else {
            email.parentElement.classList.remove("requer")
            if (!emailre.test(email.value)) {
                email.parentElement.classList.add("unvalid")
                valid2 = false;
            }
            if (emailre.test(email.value)) {
                email.parentElement.classList.remove("unvalid")
                valid2 = true;

            }
        }
    }
    pass.oninput = function () {
        const hasUpperCase = /[A-Z]/.test(pass.value);
        const hasLowerCase = /[a-z]/.test(pass.value);
        const hasNumber = /\d/.test(pass.value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass.value);
        console.log(hasUpperCase === true && hasLowerCase === true && hasNumber === true && hasSpecialChar === true)
        if (pass.value === "") {
            pass.parentElement.classList.add("requer");
            pass.parentElement.classList.remove("lower");
            pass.parentElement.classList.remove("upper");
            pass.parentElement.classList.remove("number");
            pass.parentElement.classList.remove("eight");
            pass.parentElement.classList.remove("specail");
            pass.parentElement.classList.remove("unvalid");
            valid3 = false;
        } else {
            pass.parentElement.classList.remove("requer")
            if (hasUpperCase === true && hasLowerCase === true && hasNumber === true && hasSpecialChar === true && pass.value.length > 8) {
                valid3 = true;
                pass.parentElement.classList.remove("requer");
                pass.parentElement.classList.remove("lower");
                pass.parentElement.classList.remove("upper");
                pass.parentElement.classList.remove("number");
                pass.parentElement.classList.remove("eight");
                pass.parentElement.classList.remove("specail");
                pass.parentElement.classList.remove("unvalid");

            } else {
                valid3 = false;
                if (hasLowerCase === false) {
                    pass.parentElement.classList.remove("requer");
                    pass.parentElement.classList.add("lower");
                    pass.parentElement.classList.remove("upper");
                    pass.parentElement.classList.remove("number");
                    pass.parentElement.classList.remove("eight");
                    pass.parentElement.classList.remove("specail");
                    pass.parentElement.classList.add("unvalid");

                } else if (hasUpperCase === false) {
                    pass.parentElement.classList.remove("requer");
                    pass.parentElement.classList.remove("lower");
                    pass.parentElement.classList.add("upper");
                    pass.parentElement.classList.remove("number");
                    pass.parentElement.classList.remove("eight");
                    pass.parentElement.classList.remove("specail");
                    pass.parentElement.classList.add("unvalid");


                } else if (hasNumber === false) {
                    pass.parentElement.classList.remove("requer");
                    pass.parentElement.classList.remove("lower");
                    pass.parentElement.classList.remove("upper");
                    pass.parentElement.classList.add("number");
                    pass.parentElement.classList.remove("eight");
                    pass.parentElement.classList.remove("specail");
                    pass.parentElement.classList.add("unvalid");


                } else if (hasSpecialChar === false) {
                    pass.parentElement.classList.remove("requer");
                    pass.parentElement.classList.remove("lower");
                    pass.parentElement.classList.remove("upper");
                    pass.parentElement.classList.remove("number");
                    pass.parentElement.classList.add("specail");
                    pass.parentElement.classList.remove("eight");
                    pass.parentElement.classList.add("unvalid");

                } else if (pass.value.length < 8) {
                    pass.parentElement.classList.add("unvalid");
                    pass.parentElement.classList.remove("requer");
                    pass.parentElement.classList.remove("lower");
                    pass.parentElement.classList.remove("upper");
                    pass.parentElement.classList.remove("number");
                    pass.parentElement.classList.remove("specail");
                    pass.parentElement.classList.add("eight");
                }
            }
        }
    }
    finish.onclick = function () {
        if (valid1 === true && valid2 == true && valid3 === true) {
            location.pathname = "/main.html";
            localStorage.log = "loged";
            localStorage.name = namein.value;
            localStorage.email = email.value;
            localStorage.pass = pass.value;
        } else {
            if (valid1 === false) {

                namein.parentElement.classList.add("requer")
            }
            if (valid2 === false) {

                pass.parentElement.classList.add("requer")
            }
            if (valid3 === false) {

                email.parentElement.classList.add("requer");
            }
        }
    }
}
if (document.querySelector(".logout")) {
    document.querySelector(".logout").onclick = function () {
        localStorage.removeItem("log", "name", "email");
        document.querySelector(".data-user").innerHTML = "";
    }
}