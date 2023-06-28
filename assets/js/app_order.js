const cartTable = document.querySelector(".cart__table");
const cartButton = document.querySelector(".cart--button");
const cartInfo = document.querySelector(".cart__info");
const cartTotal = document.querySelector(".cart--total");

// Lấy thông tin trên LocalStorage
const dataProducts = LocalStorageManager.getDataLocalStorage(
  keyLocalStorageListSP
);
const dataCart = LocalStorageManager.getDataLocalStorage(
  keyLocalStorageItemCart
);

const renderDetailOrder = () => {
  cartTable.innerHTML = `
    <tr>
      <th>#</th>
      <th>Code orders</th>
      <th>Time Order</th>
      <th></th>
    </tr>
    `;

  APIManager.getApi(cartApiOrder, (data) => {
    let id = 1;
    data.forEach((item) => {
      cartTable.innerHTML += `
      <tr>
        <td>${id++}</td>
        <td>${item.order_id}</td>
        <td>${item.dateTime}</td>
        <td><a href="#" onclick="detailOrder(${item.order_id})">Detail</a></td>
      </tr>
      `;
    });
  });

  cartButton.innerHTML = `<a href="./cart.html" class="open--dialog">Back</a>`;
};

const detailOrder = (id) => {
  const showTotal = document.querySelector(".cart__bot");

  cartTable.innerHTML = `
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Price</th>
      <th>Quantity</th>
    </tr>
  `;

  APIManager.getApi(cartApiOrder, (dataOrder) => {
    APIManager.getApi(cartApiProduct, (dataProduct) => {
      let $ = 1;
      let discount = 0;
      let totalprice = 0;
      dataOrder.forEach((order) => {
        if (order.order_id == id) {
          cartInfo.innerHTML = `
          <p>Code: <span>${order.order_id}</span> </p>
          <p>Fullname: <span>${order.fullName}</span> </p>
          <p>Phone: <span>${order.valuePhone}</span></p>
          <p>Email: <span>${order.valueEmail}</span></p>
          <p>Address: <span>${order.shipAddress}</span></p>
          <p>Date Time: <span>${order.dateTime}</span></p>
          `;

          cartButton.innerHTML = `
          <a href="#" onclick="APIManager.deleteCart('${cartApiOrder}','${cartApiProduct}',${order.order_id})"
          class="open--dialog">Delete Order</a>
          <a href="./order.html" class="open--dialog">Order</a>
          `;
        }
      });

      dataProduct.forEach((product) => {
        if (product.order_id == id) {
          cartTable.innerHTML += `
        <tr>
          <td>${$++}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.soLuong}</td>
        </tr>
        `;

          discount += product.soLuong;
          totalprice += product.price * product.soLuong;

          cartTotal.innerHTML = `
        <div class="cart__bot--discount">
          <p>Discount</p> 
          <span>${discount}</span>
        </div>
        <div class="cart__bot--price">
            <p>Total Price</p>
            <span>$${totalprice}</span>
        </div>
        `;
        }
      });
    });
  });
};

(function start() {
  // Hiển thị ra màn hình tổng cart
  const spanProducts = document.querySelectorAll(".nav--cart");
  LocalStorageManager.renderTotalCart(spanProducts, dataCart);

  renderDetailOrder();
})();
