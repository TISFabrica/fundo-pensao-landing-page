const telefoneInput = document.getElementById("telefone");
const telefoneErro = document.getElementById("telefone-erro");
const websiteInput = document.getElementById("website");
const websiteErro = document.getElementById("website-erro");

const telefoneRegex = /^[\d\s()+-]*$/;
const websiteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

telefoneInput.addEventListener("input", () => {
  if (!telefoneRegex.test(telefoneInput.value)) {
    telefoneErro.style.display = "block";
  } else {
    telefoneErro.style.display = "none";
  }
});

websiteInput.addEventListener("input", () => {
  const valor = websiteInput.value.trim();
  if (valor !== "" && !websiteRegex.test(valor)) {
    websiteErro.style.display = "block";
  } else {
    websiteErro.style.display = "none";
  }
});

// function submitForm(event) {
//   event.preventDefault();

//   let isValid = true;

//   // Validar telefone
//   if (!telefoneRegex.test(telefoneInput.value)) {
//     telefoneErro.style.display = "block";
//     isValid = false;
//   }

//   // Validar website se estiver preenchido
//   const websiteValor = websiteInput.value.trim();
//   if (websiteValor !== "" && !websiteRegex.test(websiteValor)) {
//     websiteErro.style.display = "block";
//     isValid = false;
//   }

//   // Se tudo for válido, envia o formulário
//   if (isValid) {
//     // Exemplo: submit via AJAX ou prosseguir com o envio normal
//     console.log("Formulário válido. Enviar dados...");
//     document.getElementById("inscricaoForm").submit();
//   }
// }
