const cartApiOrder = "https://64887ae40e2469c038fdd981.mockapi.io/orders/";
const cartApiProduct = "https://64887ae40e2469c038fdd981.mockapi.io/products/";

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

let keyLocalStorageListSP = "DANHSACHSP";

let keyLocalStorageItemCart = "DANHSACHITEMCART";

// Toast
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
          <div class="toast__icon">
              <i class="${icon}"></i>
          </div>
          <div class="toast__body">
              <h3 class="toast__title">${title}</h3>
              <p class="toast__msg">${message}</p>
          </div>
          <div class="toast__close">
              <i class="fas fa-times"></i>
          </div>
      `;
    main.appendChild(toast);
  }
}
