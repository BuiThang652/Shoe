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
    dNone.classList.add("fade-in");
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

// Show slider
var slideIndex = 0;

(function carousel() {
  var i;
  var x = document.getElementsByClassName("products__wp");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    x[i].classList.remove("fade-in");
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  x[slideIndex - 1].classList.add("fade-in");

  setTimeout(carousel, 2000); // Change image every 2 seconds
})();

// Toast
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
          <div class="toast__icon">
              <i class="${icon}"></i>
          </div>
          <div class="toast__body">
              <h3 class="toast__title">${title}</h3>
              <p class="toast__msg">${message}</p>
          </div>
          <div class="toast__close">
              <i class="fas fa-times"></i>
          </div>
      `;
    main.appendChild(toast);
  }
}
