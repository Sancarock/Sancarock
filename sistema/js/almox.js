let todosOsDados = [];

  document.addEventListener("DOMContentLoaded", carregarJSON);

  function carregarJSON() {
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1O2fT4u40Kc2l-RBCMFCqvZ9twrUNRHpypTzm6O-ET30/values/Estoque!A1:D1550?key=AIzaSyCHRqS0NtxXTBsdyoT72wAj6EGgGBwofS0")
      .then(response => response.json())
      .then(data => {
        todosOsDados = data.values;
        exibirTabela([todosOsDados[0]]);
	// registra o total geral (menos cabeçalho)
document.getElementById("contadorTotal").textContent =
  `Total Cadastrado: ${todosOsDados.length - 1}`;

exibirTabela([todosOsDados[0]]);
      })
      .catch(error => {
        console.error("Erro ao carregar JSON:", error);
        alert("Erro ao carregar os dados.");
      });
  }

  function filtrarTabela() {
    const entrada = document.getElementById("busca").value.toLowerCase();
    const termos = entrada.split(";").map(t => t.trim()).filter(t => t !== "");

    if (termos.length === 0) {
      exibirTabela([todosOsDados[0]]);
      return;
    }

    const resultados = todosOsDados.filter((linha, index) => {
      if (index === 0) return true; // cabeçalho
      return termos.some(termo =>
        linha.some(celula => celula.toLowerCase().includes(termo))
      );
    });

    exibirTabela(resultados.length > 1 ? resultados : [todosOsDados[0]]);
  }

  function exibirTabela(dados) {
    const tabela = document.getElementById("tabela");
    let html = "<tr>";
    dados[0].forEach(cabecalho => html += `<th>${cabecalho}</th>`);
    html += "</tr>";

    for (let i = 1; i < dados.length; i++) {
      html += "<tr>";
      dados[i].forEach(celula => html += `<td>${celula}</td>`);
      html += "</tr>";
    }

    tabela.innerHTML = html;
    tabela.style.display = "table";
    document.getElementById("contador").textContent =
      `Total de linhas: ${dados.length - 1}`;
  }

  // 🧾 Função para baixar PDF
  async function baixarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tabela = document.getElementById("tabela");
    const linhas = [...tabela.rows].map(r => [...r.cells].map(c => c.innerText));

    if (linhas.length < 2) {
      alert("Nenhum dado para exportar.");
      return;
    }

    doc.autoTable({
      head: [linhas[0]],
      body: linhas.slice(1),
      startY: 20
    });

    doc.save("estoque.pdf");
  }

  // 📊 Função para baixar Excel
  function baixarExcel() {
    const tabela = document.getElementById("tabela");
    const linhas = [...tabela.rows].map(r => [...r.cells].map(c => c.innerText));

    if (linhas.length < 2) {
      alert("Nenhum dado para exportar.");
      return;
    }

    const ws = XLSX.utils.aoa_to_sheet(linhas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Estoque");
    XLSX.writeFile(wb, "estoque.xlsx");
  }