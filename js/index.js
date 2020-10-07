var words = ["hello", "bye"];

//*crear la tabla
var table= document.getElementById('table');
table.innerHTML= createTable();

function createTable(){
    let html=createTHead();
    html += createTBody();
    return html;
}

function createTHead(){
    let html ="";
    html += '<thead>'
    html += '<tr class="notranslate">'
    html += '<th>Inglés</th>'
    html += '<th>Español</th>'
    html += '</tr>'
    html += '</thead>'
    return html
}
function createTBody(){
    let html= "";
    html += '<tbody>'
    for(let i =0; i<words.length;i++){
        html += '<tr>'
        html += '<td class="notranslate">'
        html += words[i]
        html += '</td>'
        html += '<td>'
        html += words[i]
        html += '</td>'
        html+= '</tr>'
    }
    html += '</tbody>'
    return html;
}
//*agregar elementos a la tabla
//*le agrego click event al bottón
var input = document.getElementById("add");
var button =document.getElementById("add_button");

button.addEventListener("click", addWord);
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addWord();
    }
});
//*función que agrega una palabra al array words
function addWord(){
    if (input.value != null && input.value != "") {
        words.push(input.value);
        table.innerHTML= createTable();
        //falta resolver que se traduzca solo
    }
    input.value= input.defaultValue;
}

