const viewAs = document.querySelector(".main__block__top--right1 > p");
const clickViewAs = document.querySelector(".main__block__top--right1 .right");

clickViewAs.classList.add("d--none");

viewAs.addEventListener("click", function () {
  if (clickViewAs.classList.contains("d--block")) {
    clickViewAs.classList.remove("d--block");
    console.log(clickViewAs);
  } else {
    console.log(clickViewAs);
    clickViewAs.classList.add("d--block");
  }
});

// Search
const search = document.querySelector(".header__right__search label");
const dNone = document.querySelector(".header__right__search input");
const divSearch = document.querySelector(".header__right__search");

search.addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn reload trang
  if (dNone.classList.contains("d--none")) {
    dNone.classList.remove("d--none");
  }
});

document.addEventListener("click", function (event) {
  if (!divSearch.contains(event.target)) {
    if (!dNone.classList.contains("d--none")) {
      dNone.classList.add("d--none");
    }
  }
});

// menu
const Menu = document.querySelector(".header__menu--logo");
const navMenu = document.querySelector(".header__menu--nav");
const divMenu = document.querySelector(".header__menu");

Menu.addEventListener("click", function () {
  if (navMenu.classList.contains("nav--toggle")) {
    navMenu.classList.remove("nav--toggle");
  } else {
    navMenu.classList.add("nav--toggle");
  }
});

document.addEventListener("click", function (event) {
  if (!divMenu.contains(event.target)) {
    if (!navMenu.classList.contains("nav--toggle")) {
      navMenu.classList.add("nav--toggle");
    }
  }
});
