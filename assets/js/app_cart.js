(function start() {
  // Lấy thông tin trên LocalStorage
  const dataProducts = LocalStorageManager.getDataLocalStorage(
    keyLocalStorageListSP
  );

  const dataCart = LocalStorageManager.getDataLocalStorage(
    keyLocalStorageItemCart
  );

  // Lưu dữ liệu lên LocalStorage
  if (!localStorage.hasOwnProperty(keyLocalStorageListSP)) {
    LocalStorageManager.saveDataLocalStorage(keyLocalStorageListSP);
  }

  if (!localStorage.hasOwnProperty(keyLocalStorageItemCart)) {
    localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));
  }

  // Hiển thị ra màn hình tổng cart
  const spanProducts = document.querySelectorAll(".nav--cart");
  LocalStorageManager.renderTotalCart(spanProducts, dataCart);

  //   Hiển thị table cart
  LocalStorageManager.renderTableCart(dataCart, dataProducts);

  //   Xóa 1 product trong cart
  deleteCart = document.querySelectorAll(".remove a");

  LocalStorageManager.deleteProductCart(
    keyLocalStorageItemCart,
    deleteCart,
    dataCart
  );

  //   Thay đổi số lượng của sản phẩm trong cart
  editInput = document.querySelectorAll(".quantity");

  LocalStorageManager.changeProductQuantityCart(
    keyLocalStorageItemCart,
    dataCart,
    dataProducts,
    editInput
  );

  // API
  // Hiển thị địa chỉ vào form
  const conscious = document.querySelector("#conscious");
  const districts = document.querySelector("#districts");
  const wards = document.querySelector("#wards");

  const consciousAPI = "https://provinces.open-api.vn/api/";
  const districtsAPI = "https://provinces.open-api.vn/api/d/";
  const wardsAPI = "https://provinces.open-api.vn/api/w/";

  APIManager.getApi(consciousAPI, function (posts) {
    posts.forEach((post) => {
      conscious.innerHTML += `<option value="${post.code}">${post.name}</option>`;
    });
  });

  conscious.addEventListener("change", function (event) {
    if (event.target.value) {
      let ProvinceID = event.target.value;

      APIManager.getApi(districtsAPI, function (posts) {
        posts.forEach((post) => {
          if (post.province_code == ProvinceID) {
            districts.innerHTML += `<option value="${post.code}">${post.name}</option>`;
          }
        });
      });
    }
  });

  districts.addEventListener("change", function (event) {
    if (event.target.value) {
      let DistrictsID = event.target.value;

      APIManager.getApi(wardsAPI, function (posts) {
        posts.forEach((post) => {
          if (post.district_code == DistrictsID) {
            wards.innerHTML += `<option value="${post.code}">${post.name}</option>`;
          }
        });
      });
    }
  });

  // Check validate
  validator({
    form: "#form-cart-dialog",
    rules: [
      validator.isFirstName("#first-name"),
      validator.isLastName("#last-name"),
      validator.isPhone("#phone"),
      validator.isEmail("#email"),
      validator.isStreet("#street"),
      validator.isWards("#wards"),
      validator.isDistricts("#districts"),
      validator.isConscious("#conscious"),
    ],
  });
})();

// Main cart

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

// checkout
const openDialog = document.querySelector(".open--dialog");
const closeDialog = document.querySelector(".close--dialog");
const showDialog = document.querySelector(".cart__dialog");

openDialog.addEventListener("click", function () {
  event.preventDefault();
  showDialog.style.display = "flex";
  document.body.classList.add("of-hid");
});

closeDialog.addEventListener("click", function () {
  event.preventDefault();
  showDialog.style.display = "none";
  document.body.classList.remove("of-hid");
});
