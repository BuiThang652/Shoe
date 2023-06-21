function start() {
  // Lấy ra các element
  const devNew = document.querySelector(".main__show1 .main__block__bot");
  const devSell = document.querySelector(".main__show2 .main__block__bot");

  // Lưu dữ liệu lên LocalStorage
  app.saveDataLocalStorage(keyLocalStorageListSP, listData);

  // Lấy thông tin trên LocalStorage
  const dataProducts = app.getDataLocalStorage(keyLocalStorageListSP);
  const dataCart = app.getDataLocalStorage(keyLocalStorageItemCart);
  const dataProducts1 = dataProducts.slice(-3);
  const dataProducts2 = dataProducts.slice(0, 3);

  //   Hiển thị ra màn hình sản phẩm
  app.renderProductUI(dataProducts2, devNew);
  app.renderProductUI(dataProducts1, devSell);

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
