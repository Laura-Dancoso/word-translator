var words = new Set();

//*crear la tabla
var table= document.getElementById('table');

function createTable(array){
    if(array.length>0){
        let html=createTHead();
        html += createTBody(array);
        return html;
    }else{
        return "";
    }
}

function createTHead(){
    return `<thead>
    <tr class="notranslate">
        <th>Inglés</th>
        <th>Español</th>
    </tr>
</thead>    
`;
}
function createTBody(array){
    let html= "";
    html += '<tbody>'
    for(let i =0; i<array.length;i++){
        html += `
        <tr>
            <td class="notranslate">${array[i]}
            <button onclick="editWord('${array[i]}')">Edit</button>
            <button onclick="deleteWord('${array[i]}')">Delete</button>
            </td>
            <td>${array[i]}</td>
        </tr>
        `;
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
//*función que agrega una palabra al array array
function addWord(){
    if (input.value != null && input.value != "") {
        //si la palabra ya está en el array no se agrega
        // https://youtu.be/3NG8zy0ywIk mirar eso
        words.add(input.value);
        table.innerHTML= createTable(Array.from(words));
    }
    input.value= input.defaultValue;
}
//*buscar una palabra en la tabla
$('#search').on('keyup',function(){
    var value = $(this).val();
    table.innerHTML= createTable(searchWord(value,Array.from(words)));
});
function searchWord(value, array){
    var filteredArray = [];
    for(let i = 0; i<array.length;i++){
        if(array[i].toLowerCase().includes(value.toLowerCase())){
            filteredArray.push(array[i]);
        }
    }
    return filteredArray;
}
function editWord(oldWord){
    var newWord= prompt("type the new word");
    if (newWord != null && newWord != "") {
        var array = Array.from(words);
        var index = array.indexOf(oldWord);
        if (index !== -1) {
        array[index] = newWord;
        words=new Set(array);
        table.innerHTML= createTable(Array.from(words));
        }
    }
}
function deleteWord(word){
    var array = Array.from(words);
    var index = array.indexOf(word);
    if (index !== -1) {
    array.splice(index,index+1);
    words=new Set(array);
    table.innerHTML= createTable(Array.from(words));
    }
}
function setLanguage(){
  if(document.getElementsByClassName('goog-te-combo')[0] != undefined){
    document.getElementsByClassName('goog-te-combo')[0].value ='es'
  }
}
window.onload=setLanguage();