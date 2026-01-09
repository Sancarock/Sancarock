document.addEventListener("DOMContentLoaded", function () {
            carregarJSON();
        });

        function carregarJSON() {
            fetch("https://sheets.googleapis.com/v4/spreadsheets/1O2fT4u40Kc2l-RBCMFCqvZ9twrUNRHpypTzm6O-ET30/values/Estoque!M1:M25?key=AIzaSyCHRqS0NtxXTBsdyoT72wAj6EGgGBwofS0")
                .then(response => response.json())
                .then(data => exibirTabela(data.values))
                .catch(error => {
                    console.error("Erro ao carregar JSON:", error);
                    alert("Erro ao carregar os dados.");
                });
        }

        function exibirTabela(data) {
            if (!data || data.length < 2) {
                alert("Nenhum dado encontrado.");
                return;
            }

            const table = document.getElementById("tabela");
            table.innerHTML = "";

            const headerRow = document.createElement("tr");
            data[0].forEach(header => {
                const th = document.createElement("th");
                th.textContent = header;
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);

            for (let i = 1; i < data.length; i++) {
                const tr = document.createElement("tr");
                data[i].forEach(cell => {
                    const td = document.createElement("td");
                    td.textContent = cell || "";
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            }

            table.style.display = 'table';
            document.getElementById("contador").textContent = `Total de linhas: ${data.length - 1}`;
        }