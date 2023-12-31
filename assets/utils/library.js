const LocalStorageManager = (function () {
  // private
  let listData = [
    {
      id: 1,
      name: "Sản phẩm 1",
      price: 35000,
      soLuong: 100,
      thumb: "1.jpg",
      status: "block--list--sale",
    },
    {
      id: 2,
      name: "Sản phẩm 2",
      price: 10000,
      soLuong: 98,
      thumb: "2.jpg",
      status: "d--none",
    },
    {
      id: 3,
      name: "Sản phẩm 3",
      price: 30000,
      soLuong: 100,
      thumb: "3.jpg",
      status: "d--none",
    },
    {
      id: 4,
      name: "Sản phẩm 4",
      price: 35000,
      soLuong: 97,
      thumb: "4.jpg",
      status: "d--none",
    },
    {
      id: 5,
      name: "Sản phẩm 5",
      price: 10000,
      soLuong: 100,
      thumb: "5.jpg",
      status: "block--list--stock",
    },
    {
      id: 6,
      name: "Sản phẩm 6",
      price: 30000,
      soLuong: 95,
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
      const dataProducts =
        LocalStorageManager.getDataLocalStorage("DANHSACHSP");

      cart = {
        idSP: idSP,
        soLuong: 1,
      };

      if (!dataCart) {
        dataCart = [];
      }

      let addedToCart = false;

      const cartItem = dataCart.find((item) => item.idSP === idSP);

      dataProducts.forEach(function (itemProduct) {
        if (itemProduct.id == idSP && itemProduct.soLuong >= 1) {
          if (cartItem) {
            cartItem.soLuong += 1;
          } else {
            dataCart.push(cart);
          }

          const updateSoLuong = itemProduct.soLuong - 1;
          itemProduct.soLuong = updateSoLuong;

          addedToCart = true;
        }
      });

      if (addedToCart) {
        toast({
          title: "Thành công!",
          message: "Bạn đã thêm một sản phẩm vào giỏ hàng",
          type: "success",
          duration: 1000,
        });
      } else {
        toast({
          title: "Không thành công!",
          message: "Hết hàng.",
          type: "error",
          duration: 1000,
        });
      }

      localStorage.setItem(keyLocalStorageItemCart, JSON.stringify(dataCart));

      localStorage.setItem("DANHSACHSP", JSON.stringify(dataProducts));
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
      const showTotalPrice = document.querySelector(".cart__bot");
      const showTotal = document.querySelector(".main__block__top--right");

      showTotalPrice.innerHTML = `
            <div class="cart__bot--price">
                Total Carts: 
                <span>${LocalStorageManager.totalProducts(dataCart)}</span>
            </div>
            <div class="cart__bot--price">
                Total Price: 
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
        const message = document.querySelector(".cart__list");
        const buttonD = document.querySelector(".open--dialog");

        message.innerHTML = `<p class="cart--message">You have no products in your shopping cart. <a href="./products.html">Buy now!!!!</a></p>`;
        buttonD.remove();
      } else {
        dataCart.forEach((item) => {
          const product = LocalStorageManager.getbyidSP(
            item.idSP,
            dataProducts
          );

          const showCart = document.querySelector(".cart__list");

          showCart.innerHTML += `
          <li class="" style="margin-bottom: 15px;">
            <div class="">
              <div class="">
                  <a href="#">
                      <img src="./assets/img/${product.thumb}" alt="" width="200px" style="
                      border: 1px solid #ccc;
                      border-radius: 10px;
                  ">
                  </a>
              </div>
              <div class="des">
                  <div class="name"><a href="#">${product.name}</a></div>
                  <div class="price">Price: <span>$ ${product.price}</span></div>
                  <div>
                    <input type="number" class="quantity" min="1" max="99" step="1" value="${item.soLuong}" id="${product.id}">
                </div>
              </div>
            </div>
            <div class="" style="align-items: center; margin: 0px 40px; justify-content: center;">
                
                <div class="remove">
                    <a href="" id="${product.id}">&times;</a>
                </div>
            </div>
          </li>`;
        });

        LocalStorageManager.renderTotalPriceCart(dataCart, dataProducts);
      }
    },

    // Truyền vào thẻ tra, dataCart => xóa một sản phẩm trong cart
    deleteProductCart(key, parent, dataCart) {
      parent.forEach((item) => {
        item.addEventListener("click", function (i) {
          event.preventDefault();
          if (!dataCart) {
            dataCart = [];
          }

          let cartItem = dataCart.find((p) => p.idSP == item.id);

          const slProduct = cartItem.soLuong;

          const dataProducts =
            LocalStorageManager.getDataLocalStorage("DANHSACHSP");

          dataProducts.forEach(function (itemProduct) {
            if (itemProduct.id == item.id) {
              const updateSoLuong = itemProduct.soLuong + slProduct;
              itemProduct.soLuong = updateSoLuong;
            }
          });

          dataCart.splice(dataCart.indexOf(cartItem), 1);

          localStorage.setItem("DANHSACHSP", JSON.stringify(dataProducts));
          localStorage.setItem(key, JSON.stringify(dataCart));

          toast({
            title: "Thành công!",
            message: "Bạn đã xóa một sản phẩm trong giỏ hàng",
            type: "success",
            duration: 1000,
          });

          setTimeout(function () {
            window.location.href = "cart.html";
          }, 1000);
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

          dataCart.forEach(function (itemCart) {
            if (itemCart.idSP == idIP) {
              const soLuongCart = itemCart.soLuong;

              dataProducts.forEach(function (itemProduct) {
                if (itemProduct.id == idIP) {
                  const slProduct = itemProduct.soLuong + soLuongCart;

                  if (slProduct >= valueQ) {
                    const updateSoLuong = slProduct - valueQ;
                    itemProduct.soLuong = updateSoLuong;
                  }
                }
              });
            }
          });

          localStorage.setItem("DANHSACHSP", JSON.stringify(dataProducts));

          LocalStorageManager.editQuantity(key, dataCart, id, valueQ);

          LocalStorageManager.renderTotalCart(
            document.querySelectorAll(".nav--cart"),
            dataCart
          );

          LocalStorageManager.renderTotalPriceCart(dataCart, dataProducts);
        });
      });
    },

    getCart(dataProducts, dataCart) {
      const products = [];

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

    removeOrder(cartApiProduct, id) {
      const dataProducts =
        LocalStorageManager.getDataLocalStorage("DANHSACHSP");

      APIManager.getApi(cartApiProduct, (posts) => {
        posts.forEach((post) => {
          if (post.order_id == id) {
            dataProducts.map(function (itemSP) {
              if (itemSP.id == post.product_id) {
                const updateSoLuong = itemSP.soLuong + post.soLuong;
                itemSP.soLuong = updateSoLuong;
                localStorage.setItem(
                  "DANHSACHSP",
                  JSON.stringify(dataProducts)
                );
              }
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
    deleteCart(urlCart, urlProduct, id) {
      LocalStorageManager.removeOrder(urlProduct, id);

      toast({
        title: "Thành công!",
        message: "Bạn đã xóa đơn hàng.",
        type: "success",
        duration: 1000,
      });

      const option = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      APIManager.getApi(urlCart, (carts) => {
        carts.forEach((cart) => {
          if (cart.order_id == id) {
            const IDCart = cart.id;

            fetch(urlCart + IDCart, option)
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
          }
        });
      });

      APIManager.getApi(urlProduct, (products) => {
        products.forEach((product) => {
          if (product.order_id == id) {
            const IDProduct = product.id;

            fetch(urlProduct + IDProduct, option)
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
          }
        });
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

    // Save object
    saveUserOrderInfo(
      urlCart,
      urlProduct,
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

      const order_id = APIManager.getRandomInt();

      products = LocalStorageManager.getCart(dataProducts, dataCart);

      const order = {
        order_id,
        fullName,
        valuePhone,
        valueEmail,
        shipAddress,
        dateTime,
      };

      showDialog.style.display = "none";

      localStorage.removeItem(keyLocalStorageItemCart);

      APIManager.createCart(order, urlCart);

      products.forEach((p) => {
        const product = {
          product_id: p.id,
          order_id,
          name: p.name,
          price: p.price,
          soLuong: p.soLuong,
          thumb: p.thumb,
          status: p.status,
        };

        APIManager.createCart(product, urlProduct);
      });

      toast({
        title: "Thành công!",
        message: "Bạn đã đặt hàng thành công.",
        type: "success",
        duration: 1000,
      });

      setTimeout(function () {
        window.location.href = "cart.html";
      }, 2000);
    },
  };
})();
