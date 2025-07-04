// Header Scroll
let nav = document.querySelector(".navbar");
let navCollapse = document.querySelector(".navbar-collapse.collapse");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("header_scrolled");
    } else {
        nav.classList.remove("header_scrolled");
    }

    // Hide the collapsed menu on scroll
    if (navCollapse.classList.contains("show")) {
        navCollapse.classList.remove("show");
    }
}

// Nav Hide
let navBar = document.querySelectorAll(".nav-link");
navBar.forEach(function (a) {
    a.addEventListener("click", function () {
        navCollapse.classList.remove("show")
    })
})
