document.addEventListener("DOMContentLoaded", function() {
      carregarJSON();
    });

    function carregarJSON() {
      fetch("https://sheets.googleapis.com/v4/spreadsheets/1O2fT4u40Kc2l-RBCMFCqvZ9twrUNRHpypTzm6O-ET30/values/Parados!A1:I30?key=AIzaSyCHRqS0NtxXTBsdyoT72wAj6EGgGBwofS0")
        .then(response => response.json())
        .then(data => {
          console.log("Dados carregados:", data);
          exibirTabela(data.values);
        })
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
      const contadorElement = document.getElementById("contador");
      table.innerHTML = "";

      let mriCount = 0;
      let onfitCount = 0;

      const headers = data[0];
      const headerRow = document.createElement("tr");
      headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      for (let i = 1; i < data.length; i++) {
        const rowData = data[i];
        const tr = document.createElement("tr");

        rowData.forEach((cell, index) => {
          const td = document.createElement("td");
          td.textContent = cell || "";

          if (index === 4) {
            let val = cell.trim().toLowerCase();
            if (val.includes("mri")) mriCount++;
            if (val.includes("onfit")) onfitCount++;
          }

          if (index === 8) {
            let status = cell.trim().toLowerCase();
            if (status === "falta nf") td.classList.add("status-falta-nf");
            if (status === "ag. coleta") td.classList.add("status-ag-coleta");
          }

          tr.appendChild(td);
        });

        table.appendChild(tr);
      }

      contadorElement.innerHTML = `MRI: ${mriCount} | Onfit: ${onfitCount}`;
      table.style.display = "table";
    }