function abrir_radio_popup() {
    window.open(
        "playsr", 
        "", 
        "width=550,height=850,toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=no"
    );
}

// Quando a página carregar, associa o clique ao link
document.addEventListener("DOMContentLoaded", function() {
    const link = document.getElementById("abrir-popup");
    if (link) {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Impede que o link recarregue a página (#)
            abrir_radio_popup();
        });
    }
});