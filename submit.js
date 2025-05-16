let captchaValue = generateCaptcha();

function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  document.getElementById("captchaText").textContent = `${num1} + ${num2} = `;
  return num1 + num2;
}

function refreshCaptcha() {
  captchaValue = generateCaptcha();
}

async function submitForm(event) {
  event.preventDefault();

  // Verificar reCAPTCHA
  let token;
  try {
    token = await grecaptcha.execute(
      "6LfQVj0rAAAAAL341h0gLiaXtnb-6EHhNCqZ2XhL",
      { action: "submit" }
    );
  } catch (error) {
    alert("Erro ao verificar reCAPTCHA. Tente novamente.");
    return;
  }

  const captchaErro = document.getElementById("captcha-erro");
  if (!token) {
    captchaErro.style.display = "block";
    return;
  } else {
    captchaErro.style.display = "none";
  }

  const formData = new FormData(event.target);
  formData.append("g-recaptcha-response", token); // Append the reCAPTCHA token
  formData.append("telefone_completo", iti.getNumber());
  const data = Object.fromEntries(formData);

  // Simulate sending data to the server (replace with actual API call)

  alert(
    "Obrigado por se inscrever! Em breve você receberá os materiais por email."
  );
  fecharModal();
  event.target.reset();
}
