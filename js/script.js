document.addEventListener("DOMContentLoaded", () => {
  const inputNome = document.getElementById("nome-funcionario");
  const btnEntrada = document.getElementById("btnEntrada");
  const btnSaida = document.getElementById("btnSaida");
  const campoInvalido = document.getElementById("campo-invalido");

  //Pega as duas tabelas onde os registros de entrada e saída serão adicionados.
  const tabelaEntrada = document.getElementById("tabela-entrada-funcionario");
  const tabelaSaida = document.getElementById("tabela-saida-funcionario");

  //modal de confirmação e buttons de confirmar e cancelar
  const modal = document.querySelector(".modal-confirmar");
  const resultado = document.getElementById("Resultado");
  const btnConfirm = document.getElementById("btnConfirm");
  const btnCancel = document.getElementById("btnCancel");

  let acao = "";
  let nomeTemporario = "";

  function pegarDataHoraAtual() {
    const agora = new Date();

    const data = agora.toLocaleDateString("pt-BR"); // Ex: 16/07/2025
    const hora = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }); // Ex: 14:30

    return `${data} ${hora}`;
  }

  function abrirModal(nome, tipoAcao) {
    acao = tipoAcao;
    nomeTemporario = nome;
    const hora = pegarDataHoraAtual();
    resultado.textContent = `Confirmar ${acao.toUpperCase()} para ${nome} às ${hora}?`;
    modal.style.display = "block";
  }

  function fecharModal() {
    modal.style.display = "none";
    resultado.textContent = "";
    nomeTemporario = "";
    acao = "";
  }

  function registrarNaTabela(nome, hora, tabela) {
    const novaLinha = document.createElement("tr");

    const tdNome = document.createElement("td");
    tdNome.textContent = nome;

    const tdHora = document.createElement("td");
    tdHora.textContent = hora;

    if (tabela.id === "tabela-saida-funcionario") {
      novaLinha.style.backgroundColor = "#e4e4e4";
      tdHora.classList.add("hora-saida");
      tdHora.style.color = "red"; // Aplica estilo só à hora da saída
    }
    if (tabela.id === "tabela-entrada-funcionario") {
      novaLinha.style.backgroundColor = "#e4e4e4";
      tdHora.classList.add("hora-entrada");
      tdHora.style.color = "green"; // Aplica estilo só à hora da saída
    }

    novaLinha.appendChild(tdNome);
    novaLinha.appendChild(tdHora);

    tabela.appendChild(novaLinha);
  }

  btnEntrada.addEventListener("click", (e) => {
    e.preventDefault();
    const nome = inputNome.value.trim();
    if (nome === "") {
      campoInvalido.innerText = `Digite o nome do(a) funcionário(a).`;
      campoInvalido.style.display = "block";
      return;
    }
    abrirModal(nome, "entrada");
  });

  inputNome.addEventListener("input", () => {
    if (inputNome.value.trim() !== "") {
      campoInvalido.style.display = "none";
    }
  });

  btnSaida.addEventListener("click", (e) => {
    e.preventDefault();
    const nome = inputNome.value.trim();
    if (nome === "") {
      campoInvalido.innerText = `Digite o nome do(a) funcionário(a).`;
      campoInvalido.style.display = "block";
      return;
    }
    abrirModal(nome, "saida");
  });

  btnConfirm.addEventListener("click", (e) => {
    e.preventDefault();
    if (nomeTemporario && acao) {
      const hora = pegarDataHoraAtual();

      if (acao === "entrada") {
        registrarNaTabela(nomeTemporario, hora, tabelaEntrada);
      } else if (acao === "saida") {
        registrarNaTabela(nomeTemporario, hora, tabelaSaida);
      }

      inputNome.value = "";
      inputNome.focus();
    }
    fecharModal();
  });

  btnCancel.addEventListener("click", (e) => {
    e.preventDefault();
    fecharModal();
  });
});
