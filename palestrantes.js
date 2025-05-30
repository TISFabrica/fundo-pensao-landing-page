function getTokenFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("token");
}
function validarRetorno(data) {
  // Verifica se o retorno é um array e não está vazio
  if (!Array.isArray(data) || data.length === 0) {
    return {
      isValid: false,
      erro: "Retorno inválido: deve ser um array não vazio",
    };
  }

  // Verifica cada objeto no array
  for (const item of data) {
    // Lista de campos esperados
    const campos = ["nome", "descricao", "autor", "foto", "link_download"];

    // Verifica se todos os campos existem e não são "undefined" (string)
    for (const campo of campos) {
      if (!item.hasOwnProperty(campo) || item[campo] === "undefined") {
        return {
          isValid: false,
          erro: `Campo '${campo}' está ausente ou contém valor inválido ("undefined")`,
        };
      }
    }
  }

  return { isValid: true, erro: null };
}

async function downloadFile(url, fileName) {
  try {
    // Faz a requisição com o token no cabeçalho
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: getTokenFromUrl(),
      },
    });

    if (!response.ok) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Falha ao baixar o arquivo, tente novamente ou verifique o seu acesso",
        showConfirmButton: false,
        timer: 2000,
      });
      throw new Error("Falha ao baixar o arquivo. Verifique o token ou a URL.");
    }

    // Converte a resposta em Blob
    const blob = await response.blob();

    // Cria um link temporário para o download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName || "arquivo"; // Nome do arquivo, ajuste conforme necessário
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href); // Libera o objeto URL
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Falha ao baixar o arquivo, tente novamente ou verifique o seu acesso",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

async function fetchPalestras() {
  const container = document.getElementById("palestras-container");
  const errorMessage = document.getElementById("errorMessage");

  try {
    const response = await axios(
      "https://willianjammes.app.n8n.cloud/webhook/d0110c08-9c3a-4fa0-a020-c6e0032784f5",
      {
        method: "post",
        data: {
          token: getTokenFromUrl(),
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "HGxTXF7Jaidfv41l0qO2U36J9IdCAYKMV3CUmRWrHeVKCbR7eithZZzJEPrZ94VhsKvrRS9yBZDHR4u9shRe0vwRmXzStixQsT9HaTkP8dbYUW6UdJmxcr9g2XmgL1yRBqXJahhhx8F8x2F7F4Gbllld3rBLlkQOgALf75a9I0DOjbACDJzkOQ2RPzSsf6hKcrYHI7Dv0w1EkUTY0Ht4omMhiYqMCFSDkHLs53bQCcyZGB5KvRd4w43xGETCU5yOZEtV2MyeavBwLC9M9iDTC6ysePjfCTsySeqbofKi0lpvqFOaQz6zshyVD533EPAlB9RjtlKED86EfOjVwsdoOV4qDFTa891YKFhrpfViJ2T6ZM4d576euIbSGUKw44U6PfwSaT1a8sqi4hCGKUwJLWgQRjPIXAIZ4Q1qbwfQUSi5sXUwX4B4wgYXpaYfOep3EKIMp7IV7Mlq2wPKLhbz5Xx0paoKqAXmkAIJY4jwdd8jr0L9PuyaC8cOfyV0pGF4",
        },
      }
    );

    let palestras = response.data;
    // Limpa o container
    container.innerHTML = "";
    if (!validarRetorno(palestras).isValid) {
      errorMessage.innerHTML =
        "Inscreva-se corretamente para baixar o conteúdo. <br> <a href='/'>Inscrever-se</a>";
      errorMessage.style.display = "block";
      return;
    }

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
          <div class="service-item wow fadeInUp" data-wow-delay="${
            index * 0.2
          }s">
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
              <a href="#" class="btn-default dl" onclick="downloadFile('${
                palestra.link_download
              }', '${palestra.nome}.pdf')">Baixar o Arquivo</a>
              </div>
            </div>
          </div>
        `;
      container.appendChild(card);
    });
  } catch (error) {
    errorMessage.innerHTML =
      "Inscreva-se corretamente para baixar o conteúdo. <br> <a href='/'>Inscrever-se</a>";
    errorMessage.style.display = "block";
  }
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", fetchPalestras);
