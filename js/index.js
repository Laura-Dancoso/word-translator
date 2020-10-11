var words = new Set();
var languages=[{lang:'en',name:'English'},{lang:'es',name:'Spanish'}];
var selectedLanguage;

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
        <th>${languages[0].name}</th>
        <th>${languages[1].name}</th>
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
//*focus en el input
input.focus();
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
$('.inputs').hide();
$('.english').hide();
$('.spanish').hide();
$('#google_translate_element').change(function(){
  
  selectedLanguage=$('.goog-te-combo')[0].value
  alert(selectedLanguage)
})