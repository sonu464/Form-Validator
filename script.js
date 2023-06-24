const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// showError function
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// showSuccess function
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// checkRequired funtion
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${checkValidField(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// checkValidField funtion
function checkValidField(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// checkLength function
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${checkValidField(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${checkValidField(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// checkPasswordsMatch function
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passord does not match");
  }
}

// checkEmail function
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid`);
  }
}

// Adding Event Listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 6, 15);
  checkLength(password, 3, 10);
  checkPasswordsMatch(password, password2);
  checkEmail(email);
});
