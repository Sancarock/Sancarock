function baixarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.autoTable({
        html: '#tabela',
        theme: 'grid',
        styles: { fontSize: 8 }
    });

    doc.save('expedicao.pdf');
}


// --- BAIXAR EXCEL ---
function baixarExcel() {
    const tabela = document.getElementById("tabela");

    const planilha = XLSX.utils.table_to_sheet(tabela);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, planilha, "Expedição");

    XLSX.writeFile(wb, "expedicao.xlsx");
}