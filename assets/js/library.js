const LocalStorageManager = (function () {
  // private
  let listData = [
    {
      id: 1,
      name: "Sản phẩm 1",
      price: 35000,
      soLuong: 111,
      thumb: "1.jpg",
      status: "block--list--sale",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      price: 10000,
      soLuong: 211,
      thumb: "2.jpg",
      status: "d--none",
    },
    {
      id: 3,
      name: "Sản phẩm 3",
      price: 30000,
      soLuong: 211,
      thumb: "3.jpg",
      status: "d--none",
    },
    {
      id: 4,
      name: "Sản phẩm 4",
      price: 35000,
      soLuong: 111,
      thumb: "4.jpg",
      status: "d--none",
    },
    {
      id: 5,
      name: "Sản phẩm 5",
      price: 10000,
      soLuong: 211,
      thumb: "5.jpg",
      status: "block--list--stock",
    },
    {
      id: 6,
      name: "Sản phẩm 6",
      price: 30000,
      soLuong: 211,
      thumb: "6.jpg",
      status: "d--none",
    },
  ];

  // public
  return {
    // LocalStorage
    // Truyền vào key và value của mảng => lưu dữ liệu vào LocalStorage
    saveDataLocalStorage(key) {
      localStorage.setItem(key, JSON.stringify(listData));
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
        item.innerHTML = `${LocalStorageManager.totalProducts(dataCart)}`;
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
                <span>${LocalStorageManager.totalProducts(dataCart)}</span>
            </div>
            <div class="cart__bot--price">
                <p>Total Price</p>
                <span>${LocalStorageManager.totalPrice(
                  dataCart,
                  dataProducts
                )} VND</span>
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
          const product = LocalStorageManager.getbyidSP(
            item.idSP,
            dataProducts
          );

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

        LocalStorageManager.renderTotalPriceCart(dataCart, dataProducts);
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

    changeProductQuantityCart(key, dataCart, dataProducts, parent) {
      parent.forEach((item) => {
        item.addEventListener("input", function (i) {
          const id = item.id;
          const idIP = i.target.id;
          const valueQ = i.target.value;

          const product = dataProducts.find((p) => p.id == idIP);
          if (product) {
            const tt = `.total-price-${idIP}`; // Sử dụng giá trị id đã lấy được

            const totalProductPrice = document.querySelector(tt);
            totalProductPrice.innerHTML = `$${valueQ * product.price}`;
          }

          LocalStorageManager.editQuantity(key, dataCart, id, valueQ);

          LocalStorageManager.renderTotalCart(
            document.querySelectorAll(".nav--cart"),
            dataCart
          );

          LocalStorageManager.renderTotalPriceCart(dataCart, dataProducts);
        });
      });
    },

    editSoLuong(keySP, dataProducts, dataCart) {
      const products = [];
      dataCart.map(function (itemCart) {
        dataProducts.map(function (itemSP) {
          if (itemSP.id == itemCart.idSP && itemCart.soLuong < itemSP.soLuong) {
            const updateSoLuong = itemSP.soLuong - itemCart.soLuong;
            itemSP.soLuong = updateSoLuong;
            localStorage.setItem(keySP, JSON.stringify(dataProducts));
          }
        });
      });

      dataCart.map(function (itemCart) {
        dataProducts.map(function (itemSP) {
          if (itemSP.id == itemCart.idSP) {
            itemSP.soLuong = itemCart.soLuong;
            products.push(itemSP);
          }
        });
      });

      return products;
    },

    removeOrder(cartApi, id) {
      const dataProducts =
        LocalStorageManager.getDataLocalStorage("DANHSACHSP");

      APIManager.getApi(cartApi, function (posts) {
        posts.forEach((post) => {
          if (post.id == id) {
            const dataOrder = post.products;

            dataOrder.map(function (itemOrder) {
              dataProducts.map(function (itemSP) {
                if (itemSP.id == itemOrder.id) {
                  const updateSoLuong = itemSP.soLuong + itemOrder.soLuong;
                  itemSP.soLuong = updateSoLuong;
                  localStorage.setItem(
                    "DANHSACHSP",
                    JSON.stringify(dataProducts)
                  );
                }
              });
            });
          }
        });
      });
    },
  };
})();

const APIManager = (function () {
  // private
  const id = new Set([]);

  // public
  return {
    // Lấy ra api
    getApi(api, callback) {
      fetch(api)
        .then(function (response) {
          return response.json();
        })
        .then(callback)
        .catch(function (err) {
          console.log(err);
        });
    },

    // Thêm api
    createCart(data, url) {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      };

      fetch(url, option)
        .then(function (response) {
          return response.json();
        })
        .then(function (posts) {
          posts.forEach((post) => {
            console.log(post);
          });
        })
        .catch(function (err) {});
    },

    // Xóa Api
    // api: https://shoe-data-8yxw.onrender.com/orders/
    deleteCart(url, id) {
      LocalStorageManager.removeOrder(url, id);

      const option = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(url + id, option)
        .then(function (response) {
          return response.json();
        })
        .then(function () {
          setTimeout(function () {
            window.location.href = "order.html";
          }, 1000);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    // Tạo hàm random
    getRandomInt() {
      const min = 1000000000;
      const max = 9999999999;

      const random = Math.floor(Math.random() * (max - min)) + min;

      if (id.has(random)) {
        getRandomInt();
      } else {
        id.add(random);
        return random;
      }
    },

    // Check validate
    checkValidateForm(
      firstName,
      lastName,
      phone,
      email,
      conscious,
      districts,
      wards,
      street
    ) {
      // Chuyển tất cả status về giỗng
      document.querySelectorAll(".cart-status").forEach((e) => {
        e.innerHTML = ``;
      });

      // Check Validate first name
      if (firstName.value.trim() === "") {
        document.querySelector(
          ".first-name-status"
        ).innerHTML = `First name must be filled out`;
        return false;
      }

      // Check Validate last name
      if (lastName.value.trim() === "") {
        document.querySelector(
          ".last-name-status"
        ).innerHTML = `Last name must be filled out`;
        return false;
      }

      // Check Validate phone number
      if (phone.value.trim() === "") {
        document.querySelector(
          ".phone-status"
        ).innerHTML = `Phone number must be filled out`;
        return false;
      }

      // Check Validate email
      if (email.value.trim() === "") {
        document.querySelector(
          ".email-status"
        ).innerHTML = `Email must be filled out`;
        return false;
      }

      // Check Validate address
      if (
        conscious.value === "" &&
        districts.value === "" &&
        wards.value === ""
      ) {
        document.querySelector(
          ".address-status"
        ).innerHTML = `Address must be filled out`;
        return false;
      }

      // Check Validate street address
      if (street.value.trim() === "") {
        document.querySelector(
          ".street-status"
        ).innerHTML = `Street address must be filled out`;
        return false;
      }

      return true;
    },

    // Save object
    saveUserOrderInfo(
      url,
      keySP,
      dataProducts,
      dataCart,
      firstName,
      lastName,
      phone,
      email,
      inputProvince,
      inputDistricts,
      inputWards,
      street
    ) {
      const fullName = firstName.value + " " + lastName.value;
      const valuePhone = phone.value;
      const valueEmail = email.value;

      const shipAddress =
        street.value +
        ", " +
        inputWards.selectedOptions[0].text +
        ", " +
        inputProvince.selectedOptions[0].text +
        ", " +
        inputDistricts.selectedOptions[0].text;

      let today = new Date();
      let date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date + " " + time;

      products = LocalStorageManager.editSoLuong(keySP, dataProducts, dataCart);

      const order = {
        id: APIManager.getRandomInt(),
        fullName,
        valuePhone,
        valueEmail,
        shipAddress,
        dateTime,
        products,
      };

      showDialog.style.display = "none";

      localStorage.removeItem(keyLocalStorageItemCart);
      console.log(order);

      APIManager.createCart(order, url);

      setTimeout(function () {
        window.location.href = "cart.html";
      }, 2000);
    },
  };
})();
