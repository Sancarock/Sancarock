document.addEventListener("DOMContentLoaded", function() {
    carregarJSON();
});

let dadosOriginais = [];

function carregarJSON() {
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1O2fT4u40Kc2l-RBCMFCqvZ9twrUNRHpypTzm6O-ET30/values/Transportadoras!A1:F40?key=AIzaSyCHRqS0NtxXTBsdyoT72wAj6EGgGBwofS0")
        .then(response => response.json())
        .then(data => {
            dadosOriginais = data.values;
            exibirTabela([dadosOriginais[0]]);
        })
        .catch(error => {
            console.error("Erro ao carregar JSON:", error);
            alert("Erro ao carregar os dados.");
        });
}

function exibirTabela(data) {
    const table = document.getElementById("tabela");
    table.innerHTML = "";

    if (!data || data.length === 0) {
        const msg = document.createElement("tr");
        const td = document.createElement("td");
        td.textContent = "Nenhum dado encontrado.";
        td.colSpan = 5;
        msg.appendChild(td);
        table.appendChild(msg);
        return;
    }

    const headerRow = document.createElement("tr");
    data[0].forEach((header, index) => {
        if (index !== 5) {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        }
    });
    table.appendChild(headerRow);

    for (let i = 1; i < data.length; i++) {
        const rowData = data[i];
        const tr = document.createElement("tr");

        rowData.forEach((cell, index) => {
            if (index !== 5) {
                const td = document.createElement("td");

                if (index === 2 && cell.toUpperCase() === "SITE" && rowData[5]) {
                    const link = document.createElement("a");
                    link.href = rowData[5];
                    link.textContent = "SITE";
                    link.className = "site-link";
                    link.target = "_blank";
                    td.appendChild(link);
                } else {
                    td.textContent = cell || "";
                }

                tr.appendChild(td);
            }
        });

        table.appendChild(tr);
    }

    table.style.display = 'table';
}

function filtrarTabela() {
    const input = document.getElementById("busca").value.toLowerCase().trim();
    const termos = input.split(";").map(t => t.trim()).filter(t => t);

    if (termos.length === 0) {
        exibirTabela([dadosOriginais[0]]);
        return;
    }

    const filtrados = dadosOriginais.filter((row, index) => {
        if (index === 0) return true;
        return termos.some(term => row.some(cell => (cell || "").toLowerCase().includes(term)));
    });

    exibirTabela(filtrados.length > 1 ? filtrados : [dadosOriginais[0]]);
}