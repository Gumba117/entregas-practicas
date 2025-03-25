const d = document;
const $form = d.querySelector("#register-form");
const $nameInput = d.querySelector("#name");
const $nameError = d.querySelector("#name-error");
const $emailInput = d.querySelector("#email");
const $emailError = d.querySelector("#email-error");
const $passwordInput = d.querySelector("#password");
const $passwordError = d.querySelector("#password-error");
const $confirmPasswordInput = d.querySelector("#confirm-password");
const $confirmPasswordError = d.querySelector("#confirm-password-error");
const $successMessage = d.querySelector("#success-message");
const $errorsMessages = d.querySelectorAll(".error");
const $loader = d.querySelector("#loader");

// Función de Validación del Formulario
function validateForm(e) {
  // Cancela el comportamiento por defecto del evento
  e.preventDefault();
  console.log(e);

  //Limpiamos los mensajes de error de los inputs
  $errorsMessages.forEach((el) => {
    el.textContent = "";
  });

  let isValid = true;

  //Validar campo Nombre
  const namePattern = /^[a-zA-Z\s]+$/;
  if ($nameInput.value.trim() === "") {
    $nameError.textContent = "El nombre es obligatorio";
    $nameInput.focus();
    isValid = false;
  } else if (!namePattern.test($nameInput.value.trim())) {
    $nameError.textContent = "El nombre sólo puede contener letras y espacios";
    $nameInput.focus();
    isValid = false;
  }

  //Validar campo Correo
  let emailPattern = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  if ($emailInput.value.trim() === "") {
    $emailError.textContent = "El correo es obligatorio";
    $emailInput.focus();
    isValid = false;
  } else if (!emailPattern.test($emailInput.value.trim())) {
    $emailError.textContent = "El formato del correo es inválido";
    $emailInput.focus();
    isValid = false;
  }

  //Validar campo Contraseña
  if ($passwordInput.value.trim() === "") {
    $passwordError.textContent = "La Contraseña es obligatoria";
    $passwordInput.focus();
    isValid = false;
  } else if ($passwordInput.value.trim().length < 8) {
    $passwordError.textContent = "La Contraseña al menos debe tener 8 caracteres";
    $passwordInput.focus();
    isValid = false;
  } else if (!/[A-Z]/.test($passwordInput.value.trim())) {
    $passwordError.textContent = "La Contraseña debe contener al menos una letra mayúscula";
    $passwordInput.focus();
    isValid = false;
  } else if (!/[a-z]/.test($passwordInput.value.trim())) {
    $passwordError.textContent = "La Contraseña debe contener al menos una letra minúscula";
    $passwordInput.focus();
    isValid = false;
  } else if (!/[0-9]/.test($passwordInput.value.trim())) {
    $passwordError.textContent = "La Contraseña debe contener al menos un número";
    $passwordInput.focus();
    isValid = false;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test($passwordInput.value.trim())) {
    $passwordError.textContent = "La Contraseña debe contener al menos un carácter especial";
    $passwordInput.focus();
    isValid = false;
  }

  //Validar campo Confirmar Contraseña
  if ($confirmPasswordInput.value.trim() === "") {
    $confirmPasswordError.textContent =
      "La confirmación de la Contraseña es obligatoria";
    $confirmPasswordInput.focus();
    isValid = false;
  } else if (
    $confirmPasswordInput.value.trim() !== $passwordInput.value.trim()
  ) {
    $confirmPasswordError.textContent =
      "La confirmación de la Contraseña no coincide con el valor de la contraseña";
    $confirmPasswordInput.focus();
    isValid = false;
  }

  //Enviando el formulario
  if (isValid) {
    $loader.style.display = "block";
    setTimeout(() => {
      $loader.style.display = "none";
      $successMessage.textContent = "Formulario enviado exitosamente";
      $form.reset();
      setTimeout(() => {
        $successMessage.textContent = "";
        $form.submit();
      }, 3000);
    }, 5000);
  }
}

$form.addEventListener("submit", validateForm);
