(function start() {
  // Lấy ra các element
  const devNew = document.querySelector(".main__show1 .main__block__bot");
  const devSell = document.querySelector(".main__show2 .main__block__bot");

  // Lưu dữ liệu lên LocalStorage
  if (!localStorage.hasOwnProperty(keyLocalStorageListSP)) {
    LocalStorageManager.saveDataLocalStorage(keyLocalStorageListSP);
  }

  if (!localStorage.hasOwnProperty(keyLocalStorageItemCart)) {
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
  }

  // Lấy thông tin trên LocalStorage
  const dataProducts = LocalStorageManager.getDataLocalStorage(
    keyLocalStorageListSP
  );
  const dataCart = LocalStorageManager.getDataLocalStorage(
    keyLocalStorageItemCart
  );
  const dataProducts1 = dataProducts.slice(-3);
  const dataProducts2 = dataProducts.slice(0, 3);

  //   Hiển thị ra màn hình sản phẩm
  LocalStorageManager.renderProductUI(dataProducts2, devNew);
  LocalStorageManager.renderProductUI(dataProducts1, devSell);

  // Hiển thị ra màn hình tổng cart

  const spanProducts = document.querySelectorAll(".nav--cart");
  LocalStorageManager.renderTotalCart(spanProducts, dataCart);

  //   Thêm sản phẩm vào cart
  const addToCartButtons = document.querySelectorAll("a[id]");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      event.preventDefault();
      const idSP = button.getAttribute("id");
      LocalStorageManager.addSP(dataCart, idSP);

      LocalStorageManager.renderTotalCart(spanProducts, dataCart);
    });
  });
})();

// Main home
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
  var x = document.getElementsByClassName("section__wp");
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
