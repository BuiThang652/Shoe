(function start() {
  // Lưu dữ liệu lên LocalStorage
  app.saveDataLocalStorage(keyLocalStorageListSP, listData);

  // Lấy thông tin trên LocalStorage
  const dataProducts = app.getDataLocalStorage(keyLocalStorageListSP);
  const dataCart = app.getDataLocalStorage(keyLocalStorageItemCart);

  // Hiển thị ra màn hình tổng cart
  const spanProducts = document.querySelectorAll(".nav--cart");
  app.renderTotalCart(spanProducts, dataCart);

  //   Hiển thị table cart
  app.renderTableCart(dataCart, dataProducts);

  //   Xóa 1 product trong cart
  deleteCart = document.querySelectorAll(".cart__table td a");

  app.deleteProductCart(keyLocalStorageItemCart, deleteCart, dataCart);

  //   Thay đổi số lượng của sản phẩm trong cart
  editInput = document.querySelectorAll(".cart__table td input");

  app.changeProductQuantityCart(
    keyLocalStorageItemCart,
    dataCart,
    dataProducts,
    editInput
  );
})();
