(function start() {
  // Lấy ra các element
  const productshow = document.querySelector(".products .main__block__bot");

  // Lưu dữ liệu lên LocalStorage
  LocalStorageManager.saveDataLocalStorage(keyLocalStorageListSP);
  localStorage.setItem(keyLocalStorageItemCart, JSON.stringify([]));

  // Lấy thông tin trên LocalStorage
  const dataProducts = LocalStorageManager.getDataLocalStorage(
    keyLocalStorageListSP
  );
  const dataCart = LocalStorageManager.getDataLocalStorage(
    keyLocalStorageItemCart
  );

  //   Hiển thị ra màn hình sản phẩm
  LocalStorageManager.renderProductUI(dataProducts, productshow);

  // Hiển thị ra màn hình tổng cart
  const spanProducts = document.querySelectorAll(".nav--cart");
  LocalStorageManager.renderTotalCart(spanProducts, dataCart);

  //   Thêm sản phẩm vào cart
  const addToCartButtons = document.querySelectorAll("a[id]");
  console.log(addToCartButtons);

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      event.preventDefault();
      const idSP = button.getAttribute("id");
      LocalStorageManager.addSP(dataCart, idSP);

      LocalStorageManager.renderTotalCart(spanProducts, dataCart);
    });
  });
})();
