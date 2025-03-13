
if (location.pathname === "/cube/main1.html") {
    let nexts = document.querySelectorAll(".next");
    let buttons = document.querySelectorAll(".button")
    let email = document.querySelector(".email");
    let emailre = /\w+@\w+.(net|com)/;
    let namein = document.querySelector(".name")
    let phone = document.querySelector(".phone");
    let phonere = /\d{2}\s\d{8}/;
    let valid1 = false;
    let valid2 = false;
    let valid3 = false;
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
    phone.oninput = function () {
        if (phone.value === "") {
            phone.parentElement.classList.add("requer");
            phone.parentElement.classList.remove("unvalid");
            valid3 = false;
        } else {
            phone.parentElement.classList.remove("requer")
            if (!phonere.test(phone.value)) {
                phone.parentElement.classList.add("unvalid")
                valid3 = false;
            }
            if (phonere.test(phone.value)) {
                phone.parentElement.classList.remove("unvalid")
                valid3 = true;

            }
        }
    }
    nexts.forEach(function (e) {
        e.onclick = function () {
            if (location.pathname === "/cube/main1.html") {
                if (valid1 === true && valid2 === true && valid3 === true) {
                    location.pathname = `/cube/main${+e.dataset.num + 1}.html`
                } else {
                    document.querySelectorAll("input").forEach(function (e) {
                        e.parentElement.classList.add("com");
                        setTimeout(() => {
                            e.parentElement.classList.add("op")
                        }, 1000);
                        setTimeout(() => {
                            e.parentElement.classList.remove("op", "com")
                        }, 1500)
                    })
                }
            }
        }
    })
    buttons.forEach(function (e) {
        console.log(e)
        console.log(+e.dataset.num)
        e.onclick = function () {
            if (location.pathname === "/cube/main1.html") {
                if ((valid1 === true && valid2 === true && valid3 === true) || (emailre.test(email.value) && phonere.test(phone.value) && namein.value !== "")) {
                    location.pathname = `/cube/main${e.dataset.num}.html`
                } else {
                    document.querySelectorAll("input").forEach(function (e) {
                        e.parentElement.classList.add("com");
                        setTimeout(() => {
                            e.parentElement.classList.add("op")
                        }, 1000);
                        setTimeout(() => {
                            e.parentElement.classList.remove("op", "com")
                        }, 1500)
                    })
                }
            }
        }
    })
}
if (location.pathname === "/cube/main2.html") {
    let back = document.querySelector(".back");
    let nexts = document.querySelectorAll(".next");
    let buttons = document.querySelectorAll(".button");
    let plans = document.querySelectorAll(".card");
    let moyr = document.querySelector(".thebutton");
    let mo = document.querySelector(".mo")
    let yr = document.querySelector(".yr")
    let button = document.querySelector(".click")
    localStorage.plan = document.querySelector(".selected .kind").innerHTML;
    localStorage.chossen = document.querySelector(".moyr .active").innerHTML;
    localStorage.price = document.querySelector(".selected .price span").innerHTML
    plans.forEach(function (e) {
        e.onclick = function () {
            plans.forEach((n) => n.classList.remove("selected"));
            e.classList.add("selected");
            localStorage.plan = document.querySelector(".selected .kind").innerHTML;
            localStorage.chossen = document.querySelector(".moyr .active").innerHTML;
            localStorage.price = document.querySelector(".selected .price span").innerHTML
        }
    });
    button.onclick = function () {
        mo.classList.toggle("active");
        yr.classList.toggle("active");
        moyr.classList.toggle("clicked");
        if (yr.classList.contains("active")) {
            plans.forEach(function (e) {
                let div = document.createElement("div");
                div.innerHTML = "2 months free"
                e.children[2].children[0].innerHTML = +e.children[2].children[0].innerHTML * 10;
                e.children[2].children[1].innerHTML = "yr";
                e.children[2].after(div)
                if (e.classList.contains("selected")) {
                    localStorage.plan = document.querySelector(".selected .kind").innerHTML;
                    localStorage.chossen = document.querySelector(".moyr .active").innerHTML;
                    localStorage.price = document.querySelector(".selected .price span").innerHTML
                }
            })
        }
        if (mo.classList.contains("active")) {
            plans.forEach(function (e) {
                if (+e.children[2].children[0].innerHTML > 15) {
                    e.children[2].children[0].innerHTML = +e.children[2].children[0].innerHTML / 10;
                    e.children[2].children[1].innerHTML = "mo";
                    e.children[3].remove()
                    if (e.classList.contains("selected")) {
                        localStorage.plan = document.querySelector(".selected .kind").innerHTML;
                        localStorage.chossen = document.querySelector(".moyr .active").innerHTML;
                        localStorage.price = document.querySelector(".selected .price span").innerHTML
                    }
                }
            });
        }
    }
    nexts.forEach(function (e) {
        e.onclick = function () {
            if (location.pathname === "/cube/main2.html") {
                location.pathname = `/cube/main${+e.dataset.num + 1}.html`

            }
        }
    })
    buttons.forEach(function (e) {
        e.onclick = function () {
            if (location.pathname === "/cube/main2.html") {
                location.pathname = `/cube/main${e.dataset.num}.html`
            }

        }
    })
    back.onclick = function () {
        if (location.pathname === "/cube/main2.html") {
            location.pathname = `/cube/main${+back.dataset.num - 1}.html`
        }
    }
}
if (location.pathname === "/cube/main3.html") {
    let i = 1;
    let j = 1;
    let back = document.querySelector(".back");
    let nexts = document.querySelectorAll(".next");
    let buttons = document.querySelectorAll(".button");
    localStorage.setItem(`ons${i}`, document.querySelector(".selected .info").innerHTML);
    localStorage.setItem(`onsprice${j}`, document.querySelector(".selected .price").innerHTML)
    let ons = document.querySelectorAll(".card")
    let plan = localStorage.plan;
    let chossen = localStorage.chossen;
    let price = localStorage.price;
    if (chossen === "Yearly") {
        ons.forEach(function (e) {
            e.children[2].children[0].innerHTML = +e.children[2].children[0].innerHTML * 10;
            e.children[2].children[1].innerHTML = "Yr";
        })
    }
    i = 1;
    j = 1
    ons.forEach(function (e) {
        e.onclick = function () {
            e.classList.toggle("selected");
            for (let x = i; x > 0; x--) {
                localStorage.removeItem(`ons${x}`);
                localStorage.removeItem(`onsprice${x}`);
                i--
            }
            ons.forEach(e => {
                if (e.classList.contains("selected")) {
                    localStorage.setItem(`ons${i++}`, e.children[1].innerHTML);
                    localStorage.setItem(`onsprice${i}`, e.children[2].innerHTML);
                }
            });
        }
    })
    nexts.forEach(function (e) {
        e.onclick = function () {
            if (location.pathname === "/cube/main3.html") {
                location.pathname = `/cube/main${+e.dataset.num + 1}.html`

            }
        }
    })
    buttons.forEach(function (e) {
        e.onclick = function () {
            if (location.pathname === "/cube/main3.html") {
                location.pathname = `/cube/main${e.dataset.num}.html`
            }

        }
    })
    back.onclick = function () {
        if (location.pathname === "/cube/main3.html") {
            location.pathname = `/cube/main${+back.dataset.num - 1}.html`
        }
    }
}
if (location.pathname === "/cube/main4.html") {
    let confirm = document.querySelector(".confirm")
    let buttons = document.querySelectorAll(".button");
    let back = document.querySelector(".back");
    let total = document.querySelector(".total")
    let l = "";
    let p = ""
    let div = document.createElement("div");
    if (localStorage.chossen === "Yearly") {
        l = "Yr";
        p = "Year"
    } else {
        l = "Mo"
        p = "Month"

    }
    let t = 0
    div.innerHTML = `<span>${localStorage.plan}(${localStorage.chossen})</span><span>+$<span>${localStorage.price}</span>/<span>${l}</span>`;
    document.querySelector(".box").appendChild(div)
    for (let a = (localStorage.length - 5) / 2; a > 0; a--) {

        console.log("0")
        let div = document.createElement("div");
        div.innerHTML = localStorage.getItem(`ons${a - 1}`)
        let price = document.createElement("div");
        price.innerHTML = localStorage.getItem(`onsprice${a}`);
        console.log(price.children[0])
        console.log(price)
        console.log(price)
        t += +price.children[0].innerHTML;
        div.appendChild(price);
        document.querySelector(".box").appendChild(div)
        console.log(t)
    }
    total.innerHTML = `<span>total(per${p})</span><span>+$${+localStorage.price + +t}`;
    buttons.forEach(function (e) {
        e.onclick = function () {
            if (location.pathname === "/cube/main4.html") {
                location.pathname = `/cube/main${e.dataset.num}.html`
            }

        }
    })
    back.onclick = function () {
        if (location.pathname === "/cube/main4.html") {
            location.pathname = `/cube/main${+back.dataset.num - 1}.html`

        }
    }
    confirm.onclick = function () {
        location.pathname = "/cube/main.html";
        localStorage.clear();
    }
}