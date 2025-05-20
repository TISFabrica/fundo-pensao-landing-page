async function fetchPalestras() {
  const container = document.getElementById("palestras-container");
  const errorMessage = document.getElementById("errorMessage");

  const response = await axios(
    "https://willianjammes.app.n8n.cloud/webhook/d0110c08-9c3a-4fa0-a020-c6e0032784f5",
    {
      method: "post",
      data: {
        token: "e502251d-8c44-4f60-bebd-8787daca40b1",
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "HGxTXF7Jaidfv41l0qO2U36J9IdCAYKMV3CUmRWrHeVKCbR7eithZZzJEPrZ94VhsKvrRS9yBZDHR4u9shRe0vwRmXzStixQsT9HaTkP8dbYUW6UdJmxcr9g2XmgL1yRBqXJahhhx8F8x2F7F4Gbllld3rBLlkQOgALf75a9I0DOjbACDJzkOQ2RPzSsf6hKcrYHI7Dv0w1EkUTY0Ht4omMhiYqMCFSDkHLs53bQCcyZGB5KvRd4w43xGETCU5yOZEtV2MyeavBwLC9M9iDTC6ysePjfCTsySeqbofKi0lpvqFOaQz6zshyVD533EPAlB9RjtlKED86EfOjVwsdoOV4qDFTa891YKFhrpfViJ2T6ZM4d576euIbSGUKw44U6PfwSaT1a8sqi4hCGKUwJLWgQRjPIXAIZ4Q1qbwfQUSi5sXUwX4B4wgYXpaYfOep3EKIMp7IV7Mlq2wPKLhbz5Xx0paoKqAXmkAIJY4jwdd8jr0L9PuyaC8cOfyV0pGF4",
      },
    }
  );
  console.log("response", response);

  let palestras = response.data;
  // Limpa o container
  container.innerHTML = "";

  // Verifica se há palestras
  if (!palestras.length) {
    errorMessage.textContent = "Nenhuma palestra encontrada.";
    errorMessage.style.display = "block";
    return;
  }

  // Gera um card para cada palestra
  palestras.forEach((palestra, index) => {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6";
    card.innerHTML = `
        <div class="service-item wow fadeInUp" data-wow-delay="${index * 0.2}s">
          <div class="">
              <div class="img">
                  <img src="${palestra.foto}" alt="">
              </div>
          </div>
          <div class="service-body">
            <h3>${palestra.nome}</h3>
            <p>${palestra.descricao}</p>
            <h3 class="Mt20">${palestra.autor}</h3>
          </div>
          <div class="col-lg-12">
            <div class="services-box-footer wow fadeInUp" data-wow-delay="1s">
              <a href="${
                palestra.link_download
              }" target="_blank" download class="btn-default dl">Baixar o Arquivo</a>
            </div>
          </div>
        </div>
      `;
    container.appendChild(card);
  });
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", fetchPalestras);
