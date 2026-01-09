const jsonURL = "https://sheets.googleapis.com/v4/spreadsheets/1O2fT4u40Kc2l-RBCMFCqvZ9twrUNRHpypTzm6O-ET30/values/histo_mri!A1:I1700?key=AIzaSyCHRqS0NtxXTBsdyoT72wAj6EGgGBwofS0";

let dadosOriginais = [];
let dadosAtuais = [];

function carregarJSON() {
    fetch(jsonURL)
        .then(response => response.json())
        .then(jsonData => {
            dadosOriginais = jsonData.values;
            dadosAtuais = [...dadosOriginais];
            // 👉 já aplica o filtro Pendências ao carregar
            filtrarStatus(['falta nf', 'ag. coleta'], [8]);
        })
        .catch(error => console.error("Erro ao carregar JSON:", error));
}

function exibirTabela(rows, ocultarColunas = []) {
    const table = document.getElementById("tabela");
    const contador = document.getElementById("contador");
    table.innerHTML = "";

    if (!rows || rows.length === 0) {
        contador.textContent = "Nenhum resultado encontrado.";
        return;
    }

    const headerRow = document.createElement("tr");
    rows[0].forEach((header, index) => {
        if (!ocultarColunas.includes(index)) {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        }
    });
    table.appendChild(headerRow);

    let count = 0;

   const linhas = rows.slice(1).reverse();
linhas.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach((cell, index) => {
        if (!ocultarColunas.includes(index)) {
            const td = document.createElement("td");
            td.textContent = cell || "";

            if (index === 7) {
                const statusValue = (cell || "").toLowerCase();
                if (statusValue === "retirado") td.classList.add("status-retirado");
                else if (statusValue === "ag. coleta") td.classList.add("status-ag-coleta");
                else if (statusValue === "falta nf") td.classList.add("status-falta-nf");
            }

            tr.appendChild(td);
        }
    });
    table.appendChild(tr);
    count++;
});

    table.style.display = 'table';
    contador.textContent = `Total de registros: ${count}`;
}

function filtrarTabela() {
    const searchInput = document.getElementById("busca").value.toLowerCase().trim();
    const searchTerms = searchInput.split(";").map(term => term.trim()).filter(term => term);

    let base = dadosAtuais.length ? dadosAtuais : dadosOriginais;

    if (searchTerms.length === 0) {
        exibirTabela(base);
        return;
    }

    const dadosFiltrados = base.filter((row, index) => {
        if (index === 0) return true;
        // usa "every" pra exigir todos os termos
        return searchTerms.every(term => row.some(cell => (cell || "").toLowerCase().includes(term)));
    });

    exibirTabela(dadosFiltrados);
}

function filtrarStatus(statuses, ocultarColunas = []) {
    if (!dadosOriginais.length) return;
    dadosAtuais = dadosOriginais.filter((row, index) => {
        if (index === 0) return true;
        const statusCol = (row[7] || "").toLowerCase();
        if (statuses === "todos") return true;
        return Array.isArray(statuses)
            ? statuses.includes(statusCol)
            : statusCol === statuses;
    });
    exibirTabela(dadosAtuais, ocultarColunas);
}

function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Relatório de Notas Fiscais", 14, 10);
    doc.autoTable({
        html: '#tabela',
        startY: 20,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [76, 175, 80] }
    });

    doc.save("relatorio_nfs.pdf");
}

function baixarExcel() {
    const table = document.getElementById("tabela");
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(wb, ws, "Notas Fiscais");
    XLSX.writeFile(wb, "relatorio_nfs.xlsx");
}

window.onload = carregarJSON;