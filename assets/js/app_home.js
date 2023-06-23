function start() {
  // Lấy ra các element
  const devNew = document.querySelector(".main__show1 .main__block__bot");
  const devSell = document.querySelector(".main__show2 .main__block__bot");

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
}

start();
