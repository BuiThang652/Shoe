(function start() {
  const cartApi = "https://shoe-data-8yxw.onrender.com/orders/";

  // Lấy thông tin trên LocalStorage
  const dataProducts = LocalStorageManager.getDataLocalStorage(
    keyLocalStorageListSP
  );

  const dataCart = LocalStorageManager.getDataLocalStorage(
    keyLocalStorageItemCart
  );

  // Hiển thị ra màn hình tổng cart
  const spanProducts = document.querySelectorAll(".nav--cart");
  LocalStorageManager.renderTotalCart(spanProducts, dataCart);

  //   Hiển thị table cart
  LocalStorageManager.renderTableCart(dataCart, dataProducts);

  //   Xóa 1 product trong cart
  deleteCart = document.querySelectorAll(".cart__table td a");

  LocalStorageManager.deleteProductCart(
    keyLocalStorageItemCart,
    deleteCart,
    dataCart
  );

  //   Thay đổi số lượng của sản phẩm trong cart
  editInput = document.querySelectorAll(".cart__table td input");

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
  let firstName = document.querySelector("#first-name");
  let lastName = document.querySelector("#last-name");
  let phone = document.querySelector("#phone");
  let email = document.querySelector("#email");
  let inputConscious = document.querySelector("#conscious");
  let inputDistricts = document.querySelector("#districts");
  let inputWards = document.querySelector("#wards");
  let street = document.querySelector("#street");

  const smCheckout = document.querySelector(".submit");
  smCheckout.addEventListener("click", function (e) {
    event.preventDefault();

    if (
      APIManager.checkValidateForm(
        firstName,
        lastName,
        phone,
        email,
        inputConscious,
        inputDistricts,
        inputWards,
        street
      )
    ) {
      APIManager.saveUserOrderInfo(
        cartApi,
        keyLocalStorageListSP,
        dataProducts,
        dataCart,
        firstName,
        lastName,
        phone,
        email,
        conscious,
        districts,
        wards,
        street
      );
    }
  });
})();
