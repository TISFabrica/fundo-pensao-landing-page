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

  //   const button = event.target.querySelector("button");
  //   button.classList.add("loading");
  // Verificar reCAPTCHA
  //   let token;
  //   try {
  //     token = await grecaptcha.execute(
  //       "6LfQVj0rAAAAAL341h0gLiaXtnb-6EHhNCqZ2XhL",
  //       { action: "submit" }
  //     );
  //   } catch (error) {
  //     alert("Erro ao verificar reCAPTCHA. Tente novamente.");
  //     return;
  //   }

  //   const captchaErro = document.getElementById("captcha-erro");
  //   if (!token) {
  //     captchaErro.style.display = "block";
  //     return;
  //   } else {
  //     captchaErro.style.display = "none";
  //   }

  //   const formData = new FormData(event.target);
  //   formData.append("g-recaptcha-response", token); // Append the reCAPTCHA token
  //   formData.append("telefone_completo", iti.getNumber());
  //      const data = Object.fromEntries(formData);
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

    alert(
      "Obrigado por se inscrever! Em breve você receberá os materiais por email."
    );
    event.target.reset();
  } catch (error) {
    alert("Erro ao processar sua inscrição: " + error.message);
  }
  //   finally {
  //     // Remover loading independentemente do resultado
  //     button.classList.remove("loading");
  //   }
  alert(
    "Obrigado por se inscrever! Em breve você receberá os materiais por email."
  );
  fecharModal();
  event.target.reset();
}
