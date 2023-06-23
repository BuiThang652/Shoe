const cartTable = document.querySelector(".cart__table");
const cartButton = document.querySelector(".cart--button");
const cartInfo = document.querySelector(".cart__info");
const cartTotal = document.querySelector(".cart--total");
const cartApi = "https://shoe-data-8yxw.onrender.com/orders";

const renderDetailOrder = () => {
  cartTable.innerHTML = `
<tr>
  <th>#</th>
  <th>Code orders</th>
  <th>Time Order</th>
  <th></th>
</tr>
`;

  APIManager.getApi(cartApi, (data) => {
    let id = 1;
    data.forEach((item) => {
      cartTable.innerHTML += `
  <tr>
    <td>${id++}</td>
    <td>${item.id}</td>
    <td>${item.dateTime}</td>
    <td><a href="#" onclick="detailOrder(${item.id})">Detail</a></td>
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

  APIManager.getApi(cartApi, (data) => {
    let $ = 1;
    let discount = 0;
    let totalprice = 0;
    data.forEach((item) => {
      if (item.id == id) {
        item.products.forEach((i) => {
          cartTable.innerHTML += `
        <tr>
          <td>${$++}</td>
          <td>${i.name}</td>
          <td>${i.price}</td>
          <td>${i.soLuong}</td>
        </tr>
        `;

          discount = discount + i.soLuong;
          totalprice = totalprice + i.price;
        });

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

        cartInfo.innerHTML = `
        <p>Code: <span>${item.id}</span>  </p>
        <p>Fullname: <span>${item.fullName}</span>  </p>
        <p>Phone: <span>${item.valuePhone}</span></p>
        <p>Email: <span>${item.valueEmail}</span></p>
        <p>Address: <span>${item.shipAddress}</span></p>
        <p>Date Time: <span>${item.dateTime}</span></p>
        `;

        cartButton.innerHTML = `
        <a href="#" onclick = "APIManager.deleteCart(${item.id})" class="open--dialog">Delete Order</a>
        <a href="./order.html" class="open--dialog">Order</a>
        `;
      }
    });
  });
};

(function start() {
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

  renderDetailOrder();
})();
