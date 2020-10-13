var words = new Set();
var languages = {};

//*crear la tabla
var table = document.getElementById('table');

function createTable(array) {
  if (array.length > 0) {
    let html = createTHead();
    html += createTBody(array);
    return html;
  } else {
    return "";
  }
}

function createTHead() {
  return `<thead>
    <tr class="notranslate">
        <th>#</th>
        <th>${languages.from}</th>
        <th>${languages.to}</th>
        <th class="noExl"></th>
    </tr>
</thead>    
`;
}
function createTBody(array) {
  let html = "";
  html += '<tbody>'
  for (let i = 0; i < array.length; i++) {
    html += `
        <tr>
            <th class="notranslate>${i+1}</th>
            <td class="from notranslate">${array[i]}</td>
            <td class="to">${array[i]}</td>
            <td class="noExl">
            <button  onclick="editWord('${array[i]}')">Edit</button>
            <button  onclick="deleteWord('${array[i]}')">Delete</button>
            </td>
        </tr>
        `;
  }
  html += '</tbody>'
  return html;
}
//*agregar elementos a la tabla
//*le agrego click event al bottón
var input = document.getElementById("add");
var button = document.getElementById("add_button");
//*focus en el input
input.focus();
button.addEventListener("click", addWord);
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addWord();
  }
});
//*función que agrega una palabra al array 
function addWord() {
  if (input.value != null && input.value != "") {
    //si la palabra ya está en el array no se agrega
    words.add(input.value);
    table.innerHTML = createTable(Array.from(words));
    $('.exports').show();
  }
  input.value = input.defaultValue;

}
//*buscar una palabra en la tabla
$('#search').on('keyup', function () {
  var value = $(this).val();
  table.innerHTML = createTable(searchWord(value, Array.from(words)));
});
function searchWord(value, array) {
  var filteredArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].toLowerCase().includes(value.toLowerCase())) {
      filteredArray.push(array[i]);
    }
  }
  (filteredArray.length===0)?$('.exports').hide():$('.exports').show();
  return filteredArray;
}
//*editar palabra
function editWord(oldWord) {
  var newWord = prompt("type the new word");
  if (newWord != null && newWord != "") {
    var array = Array.from(words);
    var index = array.indexOf(oldWord);
    if (index !== -1) {
      array[index] = newWord;
      words = new Set(array);
      table.innerHTML = createTable(Array.from(words));
    }
  }
  $('#add').focus();
}
//*eliminar palabra
function deleteWord(word) {
  var array = Array.from(words);
  var index = array.indexOf(word);
  if (index !== -1) {
    array.splice(index, index + 1);
    words = new Set(array);
    table.innerHTML = createTable(Array.from(words));
    (Array.from(words).length === 0) ? $('.exports').hide() : "";
    $('#add').focus();
  }
}
//*eliminar todas las palabras
function deleteAll() {
  words =new Set();
  table.innerHTML = createTable(Array.from(words));
  (Array.from(words).length === 0) ? $('.exports').hide() : "";
  $('#add').focus();
}

$('.inputs').hide();
$('.exports').hide();

//*Cuando elijo el idioma
$('#google_translate_element').change(function () {
  let selectedLanguage = $('.goog-te-combo')[0].value;
  (selectedLanguage === 'es') ? languages.from = 'English' : languages.from = 'Spanish';
  (selectedLanguage === 'es') ? languages.to = 'Spanish' : languages.to = 'English';
  $('.inputs').show();
  //$('#languageSelected').hide();
  table.innerHTML = createTable(Array.from(words));
  $('#title').text(`Write a word in ${languages.from} and it will be translated in ${languages.to}`)
  $('#from-p').text(languages.from + " - ");
  //alert("If you want to change the language refresh the page" +'\n'+"Si quieres cambiar el lenguaje refrescar la página");
  $('#add').focus();
});
