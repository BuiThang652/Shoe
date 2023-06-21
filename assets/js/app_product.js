function start() {
  // Lấy ra các element
  const productshow = document.querySelector(".products .main__block__bot");

  // Lưu dữ liệu lên LocalStorage
  app.saveDataLocalStorage(keyLocalStorageListSP, listData);

  // Lấy thông tin trên LocalStorage
  const dataProducts = app.getDataLocalStorage(keyLocalStorageListSP);
  const dataCart = app.getDataLocalStorage(keyLocalStorageItemCart);

  //   Hiển thị ra màn hình sản phẩm
  app.renderProductUI(dataProducts, productshow);

  // Hiển thị ra màn hình tổng cart
  const spanProducts = document.querySelectorAll(".nav--cart");
  app.renderTotalCart(spanProducts, dataCart);

  //   Thêm sản phẩm vào cart
  const addToCartButtons = document.querySelectorAll("a[id]");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const idSP = button.getAttribute("id");
      app.addSP(dataCart, idSP);
    });
  });
}

start();
