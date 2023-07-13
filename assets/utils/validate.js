// Lấy thông tin trên LocalStorage
const dataProducts = LocalStorageManager.getDataLocalStorage(
  keyLocalStorageListSP
);

const dataCart = LocalStorageManager.getDataLocalStorage(
  keyLocalStorageItemCart
);

function validator(options) {
  const formElement = document.querySelector(options.form);
  const smCheckout = document.querySelector(".submit");

  function validate(inputElement, rule) {
    const errorMessage = rule.test(inputElement.value);
    const errorElement =
      inputElement.parentElement.querySelector(".cart-status");

    if (errorMessage) {
      errorElement.innerText = errorMessage;
    } else {
      errorElement.innerText = "";
    }

    return !errorMessage;
  }

  if (formElement) {
    // Submit
    smCheckout.addEventListener("click", function () {
      event.preventDefault();

      let isFormValid = true;

      options.rules.forEach((rule) => {
        const inputElement = document.querySelector(rule.selector);

        const isValid = validate(inputElement, rule);

        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        let firstName = document.querySelector("#first-name");
        let lastName = document.querySelector("#last-name");
        let phone = document.querySelector("#phone");
        let email = document.querySelector("#email");
        let inputConscious = document.querySelector("#conscious");
        let inputDistricts = document.querySelector("#districts");
        let inputWards = document.querySelector("#wards");
        let street = document.querySelector("#street");

        APIManager.saveUserOrderInfo(
          cartApiOrder,
          cartApiProduct,
          keyLocalStorageListSP,
          dataProducts,
          dataCart,
          firstName,
          lastName,
          phone,
          email,
          inputConscious,
          inputDistricts,
          inputWards,
          street
        );
      }
    });

    // Lặp qua mỗi rule
    options.rules.forEach((rule) => {
      const inputElement = document.querySelector(rule.selector);

      if (inputElement) {
        const errorElement =
          inputElement.parentElement.querySelector(".cart-status");

        // Xử lý blur
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        // Xử lý bắt đầu nhập
        inputElement.oninput = function () {
          errorElement.innerText = "";
        };
      }
    });
  }
}

validator.isFirstName = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "First name must be filled out";
    },
  };
};

validator.isLastName = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Last name must be filled out";
    },
  };
};

validator.isPhone = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
      return regex.test(value) ? undefined : "Phone number must be filled out";
    },
  };
};

validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Email must be filled out";
    },
  };
};

validator.isStreet = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Street address must be filled out";
    },
  };
};

validator.isWards = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : "Address must be filled out";
    },
  };
};

validator.isDistricts = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : "Address must be filled out";
    },
  };
};

validator.isConscious = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : "Address must be filled out";
    },
  };
};
