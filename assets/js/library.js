const app = (function () {
  // private

  // public
  return {
    // LocalStorage
    // Truyền vào key và value của mảng => lưu dữ liệu vào LocalStorage
    saveDataLocalStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },

    // Truyền vào key => Lấy ra dữ liệu được lấy trên LocalStorage
    getDataLocalStorage(key) {
      const data = localStorage.getItem(key);
      return JSON.parse(data);
    },

    // Truyền data và thẻ cha => Hiển thị sản phẩm lên giao diện website
    renderProductUI(data, parent) {
      let html = "";
      data.forEach((item) => {
        html += `
            <div class="block--list" id="${item.id}">
              <img src="./assets/img/${item.thumb}" alt="">
              <ul class="action--menu d--none">
                <li><a href="#"><span class="icon-eye"></span></a></li>
                <li><a href="#"><span class="icon-star-empty"></span></a></li>
                <li><a href="#"><span class="icon-share"></span></a></li>
                <li><a href="" id="${
                  item.id
                }"><span class="icon-cart-arrow-down"></span></a></li>
              </ul>
              <p>${item.name}</p>
              <div class="btn--price block--list--price">
                $${item.price}
              </div>
              ${
                item.status === "block--list--sale"
                  ? `<div class="btn--price block--list--sale">ON SALE</div>`
                  : ``
              }
              ${
                item.status === "block--list--stock"
                  ? `<div class="btn--price block--list--stock">OUT OF STOCK</div>`
                  : ``
              }
            </div>
          `;
      });
      parent.innerHTML = html;
    },

    // Truyền vào data và id sản phẩm => Thêm thông tin vào trong LocalStorage của giỏ hàng
    addSP(dataCart, idSP) {
      cart = {
        idSP: idSP,
        soLuong: 1,
      };

      if (!dataCart) {
        dataCart = [];
      }

      const cartItem = dataCart.find((item) => item.idSP === idSP);

      if (cartItem) {
        cartItem.soLuong += 1;
      } else {
        dataCart.push(cart);
      }

      localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(dataCart));
    },

    // Truyền vào datacart => Tính tổng sản phẩm trong đó
    totalProducts(dataCart) {
      if (dataCart && dataCart.length > 0) {
        const totalProducts = dataCart.reduce((accumulator, item) => {
          return accumulator + item.soLuong;
        }, 0);
        return totalProducts;
      }
      return 0;
    },

    // Truyền vào dataCart và dataProducts => Tính giá tiền của nó
    totalPrice(dataCart, dataProducts) {
      if (dataCart && dataProducts) {
        const totalPrice = dataCart.reduce((accumulator, item) => {
          const product = dataProducts.find((p) => p.id == item.idSP);

          if (product) {
            return accumulator + item.soLuong * product.price;
          }
        }, 0);
        return totalPrice;
      }
    },

    // Truyền vào thẻ cha và dataCart => Hiển thị ra tổng sản phẩm trên thanh menu
    renderTotalCart(parent, dataCart) {
      parent.forEach((item) => {
        item.innerHTML = `${app.totalProducts(dataCart)}`;
      });
    },

    // Truyền vào id và dataProducts => Lấy ra thông tin 1 sản phẩm bằng id
    getbyidSP(idSP, dataProducts) {
      const product = dataProducts.find((p) => p.id == idSP);

      return product;
    },

    // Truyền vào dataCart và dataProducts => Hiển thị ra số lượng và tổng giá tiền
    renderTotalPriceCart(dataCart, dataProducts) {
      const showTotal = document.querySelector(".cart__bot");

      showTotal.innerHTML = `
            <div class="cart__bot--discount">
                <p>Discount</p>
                <span>${app.totalProducts(dataCart)}</span>
            </div>
            <div class="cart__bot--price">
                <p>Total Price</p>
                <span>${app.totalPrice(dataCart, dataProducts)} VND</span>
            </div>
        `;
    },

    // Truyền vào dataCart và dataProducts => Hiển thị ra bảng
    renderTableCart(dataCart, dataProducts) {
      if (!Array.isArray(dataCart) || dataCart.length === 0) {
        const message = document.querySelector(
          ".cart .container > div > table"
        );
        const buttonD = document.querySelector(".open--dialog");

        message.innerHTML = `<p class="cart--message">You have no products in your shopping cart. <a href="./products.html">Buy now!!!!</a></p>`;
        buttonD.remove();
      } else {
        let num = 0;

        dataCart.forEach((item) => {
          const product = app.getbyidSP(item.idSP, dataProducts);

          const showCart = document.querySelector(".cart__table");

          showCart.innerHTML += `
            <tr>
                <td>${(num += 1)}</td>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td><input style="width: 50px;" type="number" id="${
                  product.id
                }" value="${item.soLuong}" min="1" max="999"></td>
                <td class="total-price-${product.id}">$${
            item.soLuong * product.price
          }</td>
                <td><a href="" id="${product.id}">x</a></td>
                </tr>
                `;
        });

        app.renderTotalPriceCart(dataCart, dataProducts);
      }
    },

    // Truyền vào thẻ tra, dataCart => xóa một sản phẩm trong cart
    deleteProductCart(key, parent, dataCart) {
      parent.forEach((item) => {
        item.addEventListener("click", function (i) {
          if (!dataCart) {
            dataCart = [];
          }

          let cartItem = dataCart.find((p) => p.idSP == item.id);

          dataCart.splice(dataCart.indexOf(cartItem), 1);

          localStorage.setItem(key, JSON.stringify(dataCart));
        });
      });
    },

    // Truyền vào => Thay đổi số lượng của một mặt hàng trong cart
    editQuantity(key, dataCart, id, quantity) {
      if (!dataCart) {
        dataCart = [];
      }

      let cartItem = (dataCart.find((p) => p.idSP == id).soLuong =
        Number(quantity));

      localStorage.setItem(key, JSON.stringify(dataCart));
    },

    oneProduct(parent, dataProducts) {
      parent.forEach((item) => {
        item.addEventListener("input", function (i) {
          const id = i.target.id;
          const valueQ = i.target.value;

          const product = dataProducts.find((p) => p.id == id);
          if (product) {
            const tt = `.total-price-${id}`; // Sử dụng giá trị id đã lấy được

            const totalProductPrice = document.querySelector(tt);
            totalProductPrice.innerHTML = `$${valueQ * product.price}`;
          }
        });
      });
    },

    changeProductQuantityCart(key, dataCart, dataProducts, parent) {
      parent.forEach((item) => {
        item.addEventListener("input", function (i) {
          const id = item.id;
          const valueQ = i.target.value;

          app.editQuantity(key, dataCart, id, valueQ);

          app.renderTotalCart(
            document.querySelectorAll(".nav--cart"),
            dataCart
          );

          app.renderTotalPriceCart(dataCart, dataProducts);
          app.oneProduct(parent, dataProducts);
        });
      });
    },
  };
})();
