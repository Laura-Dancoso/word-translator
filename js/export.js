//*Export to Excel

$('#to-excel').click(function () {
    $("#table").table2excel({
        exclude: ".noExl",
        name: "Worksheet Name",
        filename: "SomeFile",
        fileext: ".xls",
        preserveColors: true
    });
});
//*Export to PDF

$("#to-pdf").on("click", function () {
    var title = prompt("Título de la tabla (opcional)");
    if (title === null || title === "") title = "My words";
    $('.noExl').hide();
    const doc = new jsPDF();
    doc.autoTable({
        head: headRows(),
        body: bodyRows(),
        didDrawPage: function (data) {
            // Header
            doc.setFontSize(20)
            doc.setTextColor(40)
            doc.text(title, data.settings.margin.left + 15, 22)
        },
        margin: { top: 30 },
    })
    doc.save('table.pdf')
    $('.noExl').show();
})
function headRows() {
    return [
        { id: 'ID', from: languages.from, to: languages.to },
    ]
}
function bodyRows() {
    var body = []
    for (var j = 0; j < Array.from(words).length; j++) {
        body.push({
            id: j + 1,
            from: document.querySelectorAll('.from')[j].innerText,
            to: document.querySelectorAll('.to')[j].innerText
        })
    }
    return body
}