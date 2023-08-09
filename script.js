const button = document.querySelector(".button-add-task") //mapeia o click do botão
const input = document.querySelector(".input-task") //mapeia campo do input
const completeList = document.querySelector('.list-tasks') //mapeia a ul


let myItemsList = []  



// função que adiciona uma nova tarefa. É usado o método push no array myItemsList que começa vazio e adiciona o valor do input ao array e depois chama a função showTasks para mostrar o que foi adicionado na tela
function addNewTask() {
  myItemsList.push({
    task: input.value,
    checked: false
  })



  input.value = '' //limpar input

  showTasks()
}


//Na função  showTasks é feito um foreach no array myItemsList que estará alimentado com o que foi adicionado com a função addNewTasks. O foreach vai percorrer os itens do array e adicionando a variavel newlist que começa com o valor vazio um novo html
function showTasks() {

  let newlist = ''

  myItemsList.forEach((item, index) => {

    newlist =  newlist + ` <li class="task ${item.checked && 'done'}">
    <img src="./assets/checked.png" alt="checked image" onclick="checkedTask(${index})">
    <p>${item.task}</p>
    <img src="./assets/trash.png" alt="trash-image" onclick="deleteItem(${index})">
  </li>

    `
  })
 
  //a const completeList que tem mapeada a ul receberá o valor da variável newList
  completeList.innerHTML = newlist

  localStorage.setItem('list', JSON.stringify(myItemsList))
  
}

function checkedTask(index) {
  myItemsList[index].checked = !myItemsList[index].checked

  showTasks()
}



function deleteItem(index) {
  myItemsList.splice(index, 1)

  showTasks()
}


function reloadTasks() {
  const localStorageTasks = localStorage.getItem('list')

  if(localStorageTasks) {
  myItemsList = JSON.parse(localStorageTasks)
  }

  showTasks()
}

reloadTasks()
button.addEventListener('click', addNewTask)

