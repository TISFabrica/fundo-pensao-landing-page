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

  const form = event.target;
  const button = form.querySelector("button");
  const buttonText = button.querySelector(".button-text");
  const spinner = button.querySelector(".spinner-grow");

  disabledButton(button, buttonText, spinner);

  // Verificar reCAPTCHA
  const captchaResponse = grecaptcha.getResponse();
  const captchaErro = document.getElementById("captcha-erro");
  if (!captchaResponse) {
    captchaErro.style.display = "block";
    enableButton(button, buttonText, spinner);
    return;
  } else {
    captchaErro.style.display = "none";
    disabledButton(button, buttonText, spinner);
  }

  const formData = {
    nome: document.getElementById("nome").value,
    cargo: document.getElementById("cargo").value,
    empresa: document.getElementById("empresa").value,
    tamanho: document.getElementById("tamanho").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    website: document.getElementById("website").value || "",
    informacoes_adicionais: document.getElementById("informacao").value || "",
    autorizo: document.querySelector('input[name="autorizo"]').checked,
    campanha: document.querySelector('input[name="campanha"]').value,
  };
  // Simulate sending data to the server (replace with actual API call)
  try {
    const response = await fetch(
      "https://willianjammes.app.n8n.cloud/webhook/f192153d-da5f-4410-a9c9-f33b5abed567",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "HGxTXF7Jaidfv41l0qO2U36J9IdCAYKMV3CUmRWrHeVKCbR7eithZZzJEPrZ94VhsKvrRS9yBZDHR4u9shRe0vwRmXzStixQsT9HaTkP8dbYUW6UdJmxcr9g2XmgL1yRBqXJahhhx8F8x2F7F4Gbllld3rBLlkQOgALf75a9I0DOjbACDJzkOQ2RPzSsf6hKcrYHI7Dv0w1EkUTY0Ht4omMhiYqMCFSDkHLs53bQCcyZGB5KvRd4w43xGETCU5yOZEtV2MyeavBwLC9M9iDTC6ysePjfCTsySeqbofKi0lpvqFOaQz6zshyVD533EPAlB9RjtlKED86EfOjVwsdoOV4qDFTa891YKFhrpfViJ2T6ZM4d576euIbSGUKw44U6PfwSaT1a8sqi4hCGKUwJLWgQRjPIXAIZ4Q1qbwfQUSi5sXUwX4B4wgYXpaYfOep3EKIMp7IV7Mlq2wPKLhbz5Xx0paoKqAXmkAIJY4jwdd8jr0L9PuyaC8cOfyV0pGF4",
        },
        body: JSON.stringify(formData),
      }
    );
    enableButton(button, buttonText, spinner);
    Swal.fire({
      position: "center",
      icon: "success",
      text: "Obrigado por se inscrever! Em breve você receberá os materiais por email.",
      showConfirmButton: false,
      timer: 2000,
    });
    fecharModal();
    event.target.reset();
    // event.target.reset();
  } catch (error) {
    enableButton(button, buttonText, spinner);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Erro ao processar sua inscrição: " + error.message,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

function disabledButton(button, buttonText, spinner) {
  button.disabled = true;
  buttonText.classList.add("d-none");
  spinner.classList.remove("d-none");
}

function enableButton(button, buttonText, spinner) {
  button.disabled = false;
  buttonText.classList.remove("d-none");
  spinner.classList.add("d-none");
}
