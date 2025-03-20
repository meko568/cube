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
let list = document.querySelector("datalist");
let search = document.querySelector("[list]");
const primaryColor = rootStyles.getPropertyValue("--back-color").trim();
let more = document.querySelector(".more");
let themore = document.querySelector(".themore");
if (themore) {
    themore.onclick = function () {
        more.classList.toggle("display");
    }
}
if (search) {
    search.oninput = function () {
        document.querySelectorAll(".cube .name").forEach(function (e) {
            if (e.innerHTML.includes(search.value)) {
                e.parentElement.parentElement.style.display = "block"

            } else {
                e.parentElement.parentElement.style.display = "none"
            }
        })
    }
}
const cubes = [
    {
        name: "GAN 12 MagLev",
        price: 59.99,
        imgUrl: "https://tse3.mm.bing.net/th?id=OIP.fm6oIkaQonJ-22J0pjV6CgHaHI&w=456&h=456&c=7",
        info: "A high-end 3x3 speed cube with MagLev technology for smoother turns."
    },
    {
        name: "MoYu RS3M 2020",
        price: 9.99,
        imgUrl: "https://tse2.mm.bing.net/th?id=OIP.7G3h_Edm1-wxfqcJbpMMSgHaHa&w=474&h=474&c=7",
        info: "One of the best budget magnetic speedcubes, great for beginners and advanced solvers."
    },
    {
        name: "DianSheng Solar S3M",
        price: 14.99,
        imgUrl: "https://tse1.mm.bing.net/th?id=OIP.YUOrqY_15AfsN4kDhF3RkQHaE8&w=316&h=316&c=7",
        info: "A great mid-range cube with strong magnets and smooth turning."
    },
    {
        name: "YJ MGC Elite 3x3",
        price: 24.99,
        imgUrl: "https://tse2.mm.bing.net/th?id=OIP.0OoruaWTNsSp2VAHYIPmKgHaHa&w=474&h=474&c=7",
        info: "A premium magnetic cube with adjustable tensions and a fast, controllable feel."
    },
    {
        name: "QiYi Valk 3 Elite M",
        price: 34.99,
        imgUrl: "https://tse4.mm.bing.net/th?id=OIP.2pxiKyurUGrsCIwJsJ5zngHaHa&w=474&h=474&c=7",
        info: "Designed in collaboration with Mats Valk, featuring adjustable magnets and smooth corner cutting."
    },
    {
        name: "GAN 11 M Pro",
        price: 49.99,
        imgUrl: "https://m.media-amazon.com/images/I/611-Zn-uj1L._AC_SL1000_.jpg",
        info: "A top-tier speedcube with adjustable magnets and a lightweight design."
    },
    {
        name: "MoYu Weilong WR M 2021",
        price: 29.99,
        imgUrl: "https://tse1.mm.bing.net/th?id=OIP.YXg12oFjK_Ky3tPfISlcrgHaIO&w=474&h=474&c=7",
        info: "A flagship cube with a soft, stable feel and great corner-cutting abilities."
    },
    {
        name: "Yuxin Little Magic M",
        price: 8.99,
        imgUrl: "https://tse2.mm.bing.net/th?id=OIP.IWlp0wP0AqDWV5_OG3HsRQHaHa&w=474&h=474&c=7",
        info: "A budget-friendly magnetic cube with smooth turning and good performance."
    },
    {
        name: "RS3M Super V2",
        price: 19.99,
        imgUrl: "https://tse3.mm.bing.net/th?id=OIP.dnv_K7aSB26b3mL7GQuV2gHaHa&w=474&h=474&c=7",
        info: "An upgraded version of the popular RS3M with better stability and performance."
    },
    {
        name: "Tornado V3 M",
        price: 39.99,
        imgUrl: "https://tse2.mm.bing.net/th?id=OIP.B5-DjXNCFl6gruce-ndl1AHaHt&w=474&h=474&c=7",
        info: "A highly customizable cube with smooth and fast turning, great for competitions."
    }
];

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
    if (location.pathname === "/cube/shop.html") {
        if (localStorage.inner1) {
            document.querySelector(".cart").innerHTML = localStorage.inner1
        }

        let row = document.querySelector(".row")
        for (let i = 0; i < cubes.length; i++) {
            let div = document.createElement("div");
            div.classList.add("cube", "col-lg-5", "col-md-7")
            div.setAttribute("cubes-num", i)
            div.innerHTML = `<img src="${cubes[i].imgUrl}" class="img-fluid"><div class="info"><h2 class="name">${cubes[i].name}</h2><p class="price">${cubes[i].price}</p>`;
            row.appendChild(div);
            let opt = document.createElement("option");
            opt.setAttribute("value", cubes[i].name)
            list.appendChild(opt)
        }
        function re() {
            document.querySelectorAll(".cube").forEach(e => {
                e.onclick = function () {
                    let value = 0;
                    if (document.querySelector(`.thisimg${e.getAttribute("cubes-num")}`)) {
                        value = document.querySelector(`.thisimg${e.getAttribute("cubes-num")}`).parentElement.children[2].children[1].innerHTML;
                    }
                    localStorage.inner = row.innerHTML;
                    let inner = localStorage.inner;
                    console.log(0)
                    let back = document.createElement("div");
                    back.className = "back";
                    back.innerHTML = "back"
                    row.before(back)
                    row.innerHTML = `<div class="box big">
            <div class="images">
                <img src="${e.children[0].src}" class="img-0" data-num="0">
            </div>
            <div class="info">
                <div class="the">${cubes[+document.querySelector(".cube").getAttribute("cubes-num")].info}
                </div>
                <div class="price">
                    <div class="price-after">${e.children[1].children[1].innerHTML}</div>
                </div>
                <div class="cart-add">
                    <div class="p-m">
                        <img src="images/icon-minus.svg" class="minus">
                        <span>${value}</span>
                        <img src="images/icon-plus.svg" class="plus">
                    </div>
                    <div class="add btn btn-primary">
                        <img src="images/icon-cart.svg" alt="">
                        <span>add to cart</span>
                    </div>
                </div>
            </div>
        </div>`;
                    document.querySelector(".search").style.display = "none";
                    let plus = document.querySelector(".plus");
                    let minus = document.querySelector(".minus");
                    let num = document.querySelector(".p-m span");
                    let add = document.querySelector(".add span")
                    let images = document.querySelectorAll(".images img")
                    let next = document.createElement("img");
                    let theback = document.createElement("img");
                    let remove = document.createElement("img");
                    remove.src = "images/icon-close.svg";
                    remove.className = "remove";
                    let check = document.querySelector(".theimg");
                    let cart = document.querySelector(".sel");
                    let the = document.querySelector(".sel")
                    add.parentElement.onclick = function () {
                        if (add.innerHTML === "add to cart") {
                            add.parentElement.classList.add("clicked")
                            num.innerHTML = 1;
                            add.innerHTML = "Added To cart";
                            let div = document.createElement("div");
                            div.innerHTML = `<img class="thisimg${e.getAttribute("cubes-num")}" src="${cubes[e.getAttribute("cubes-num")].imgUrl}"><div class="name">${cubes[e.getAttribute("cubes-num")].name}</div><div class="price"><span>${cubes[e.getAttribute("cubes-num")].price}</span>X <span>${num.innerHTML} </span><span> ${cubes[e.getAttribute("cubes-num")].price * +num.innerHTML}`;
                            the.appendChild(div);
                        }
                        localStorage.inner1 = document.querySelector(".cart").innerHTML;
                        if (!document.querySelector(".confirm")) {
                            console.log(true)
                            cart = document.querySelector(".sel")
                            if (cart.children.length > 0) {
                                console.log(cart.children.length)
                                let confirm = document.createElement("div");
                                confirm.innerHTML = "confirm";
                                confirm.className = "confirm";
                                cart.appendChild(confirm);
                                confirm.onclick = function () {
                                    let total = 0;
                                    document.querySelectorAll(".sel .price").forEach(function (e) {
                                        let the = +e.children[2].innerHTML;
                                        total += the;
                                    })
                                    let buy = document.createElement("div");
                                    buy.innerHTML = localStorage.inner1 + `<div class="total">total:${total}</div> <div class="buy">buy</div>`;
                                    buy.className = "main-buy"
                                    document.querySelector("body").appendChild(buy);
                                    document.querySelector(".confirm").remove();
                                    localStorage.removeItem("inner1");
                                    document.querySelector(".sel").innerHTML = "";
                                    document.querySelector(".shop").classList.add("none")
                                    document.querySelector(".buy").onclick = function () {
                                        buy.remove()
                                        document.querySelector(".shop").classList.remove("none")
                                    }
                                    document.querySelector(".confirm").onclick = function () {
                                        buy.remove()
                                        document.querySelector(".shop").classList.remove("none")
                                    }
                                }
                            }
                        }
                    }
                    plus.onclick = function () {
                        add.parentElement.classList.add("clicked")
                        num.innerHTML = +num.innerHTML + 1;
                        if (!document.querySelector(`.thisimg${e.getAttribute("cubes-num")}`)) {
                            let div = document.createElement("div");
                            div.innerHTML = `<img class="thisimg${e.getAttribute("cubes-num")}" src="${cubes[e.getAttribute("cubes-num")].imgUrl}"><div class="name">${cubes[e.getAttribute("cubes-num")].name}</div><div class="price"><span>${cubes[e.getAttribute("cubes-num")].price}</span>X <span>${num.innerHTML} </span><span> ${cubes[e.getAttribute("cubes-num")].price * +num.innerHTML}`;
                            the.appendChild(div);
                        } else {
                            document.querySelector(`.thisimg${e.getAttribute("cubes-num")}`).parentElement.children[2].innerHTML = `<span>${cubes[e.getAttribute("cubes-num")].price}</span>X <span>${num.innerHTML} </span><span>${cubes[e.getAttribute("cubes-num")].price * +num.innerHTML}`;
                        }
                        minus.classList.remove("min0");
                        add.innerHTML = "Added To cart";
                        add.parentElement.classList.add("added");
                        localStorage.inner1 = document.querySelector(".cart").innerHTML;
                        if (!document.querySelector(".confirm")) {
                            let cart = document.querySelector(".sel")
                            if (cart.children.length > 0) {
                                console.log(cart.children.length)
                                let confirm = document.createElement("div");
                                confirm.innerHTML = "confirm";
                                confirm.className = "confirm";
                                cart.appendChild(confirm);
                                confirm.onclick = function () {
                                    let total = 0;
                                    document.querySelectorAll(".sel .price").forEach(function (e) {
                                        let the = +e.children[2].innerHTML;
                                        total += the;
                                    })
                                    let buy = document.createElement("div");
                                    buy.innerHTML = localStorage.inner1 + `<div class="total">total:${total}</div> <div class="buy">buy</div>`;
                                    buy.className = "main-buy"
                                    document.querySelector("body").appendChild(buy);
                                    document.querySelector(".confirm").remove();
                                    localStorage.removeItem("inner1");
                                    document.querySelector(".sel").innerHTML = "";
                                    document.querySelector(".shop").classList.add("none")
                                    document.querySelector(".confirm").remove();
                                    document.querySelector(".buy").onclick = function () {
                                        buy.remove()
                                        document.querySelector(".shop").classList.remove("none")

                                    }
                                    document.querySelector(".confirm").onclick = function () {
                                        buy.remove()
                                        document.querySelector(".shop").classList.remove("none")

                                    }
                                }

                            }
                        }
                    }
                    minus.onclick = function () {
                        if (num.innerHTML === "1") {
                            add.innerHTML = "Add To cart"
                            add.parentElement.classList.remove("added")
                            minus.classList.add("min0")
                        } else {
                            add.parentElement.classList.add("added")
                        }
                        if (num.innerHTML > "0") {
                            add.parentElement.classList.add("clicked")
                            num.innerHTML = +num.innerHTML - 1;
                            if (!document.querySelector(`.thisimg${e.getAttribute("cubes-num")}`)) {
                                let div = document.createElement("div");
                                div.innerHTML = `<img class="thisimg${e.getAttribute("cubes-num")}" src="${cubes[e.getAttribute("cubes-num")].imgUrl}"><div class="name">${cubes[e.getAttribute("cubes-num")].name}</div><div class="price"><span>${cubes[e.getAttribute("cubes-num")].price}</span>X <span>${num.innerHTML} </span><span> ${cubes[e.getAttribute("cubes-num")].price * +num.innerHTML}`;
                                the.appendChild(div);
                            } else {
                                document.querySelector(`.thisimg${e.getAttribute("cubes-num")}`).parentElement.children[2].innerHTML = `<span>${cubes[e.getAttribute("cubes-num")].price}</span>X <span>${num.innerHTML} </span><span>${cubes[e.getAttribute("cubes-num")].price * +num.innerHTML}`;
                            }
                            if (num.innerHTML === "0") {
                                document.querySelector(`.thisimg${e.getAttribute("cubes-num")}`).parentElement.remove();
                                add.parentElement.classList.remove("clicked")

                            }
                            localStorage.inner1 = document.querySelector(".cart").innerHTML;
                            if (!document.querySelector(".confirm")) {
                                let cart = document.querySelector(".sel")
                                if (cart.children.length > 0) {
                                    console.log(cart.children.length)
                                    let confirm = document.createElement("div");
                                    confirm.innerHTML = "confirm";
                                    confirm.className = "confirm";
                                    cart.appendChild(confirm);
                                    confirm.onclick = function () {
                                        let total = 0;
                                        document.querySelectorAll(".sel .price").forEach(function (e) {
                                            let the = +e.children[2].innerHTML;
                                            total += the;
                                        })
                                        let buy = document.createElement("div");
                                        buy.innerHTML = localStorage.inner1 + `<div class="total">total:${total}</div> <div class="buy">buy</div>`;
                                        buy.className = "main-buy"
                                        document.querySelector(".confirm").remove();
                                        document.querySelector("body").appendChild(buy);
                                        document.querySelector(".confirm").remove();

                                        localStorage.removeItem("inner1");
                                        document.querySelector(".sel").innerHTML = "";
                                        document.querySelector(".shop").classList.add("none")
                                        document.querySelector(".buy").onclick = function () {
                                            buy.remove()
                                            document.querySelector(".shop").classList.remove("none")

                                        }
                                        document.querySelector(".confirm").onclick = function () {
                                            buy.remove()
                                            document.querySelector(".shop").classList.remove("none")

                                        }
                                    }

                                }
                            }
                        }
                    }
                    back.onclick = function () {
                        row.innerHTML = inner;
                        document.querySelector(".search").style.display = "block"
                        back.remove()
                        re()
                    }
                    if (num.innerHTML > "0") {
                        add.parentElement.classList.add("clicked")
                        add.innerHTML = "Added to cart";
                    }
                }
            });
        }
        re()
    }
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
            location.pathname = "/cube/main.html";
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
