const inputFeald = document.querySelector('input');
const unolderList = document.querySelector('ul');

// in the start of the program if there is a data in local bring it to the todos array
let todos;
if(JSON.parse(localStorage.getItem('todo'))){
    todos = [...JSON.parse(localStorage.getItem('todo'))];
    // renderTodos without a parameter to render all the sotred data in localStorage
    renderTodos();
}else{
    todos = []
}

// event listeners
inputFeald.addEventListener('keypress', (e) => {
    if(event.keyCode === 13 && e.target.value != '') { // key code of the Inter key
        addTodo(e.target.value);
        e.target.value = '';
    }
});

//functions 

function addTodo(todo) {
    // add the todo text to the array to save it to local storage
    if(todo.trim() != ''){
        let state = {
            todoTxt: todo,
            completed: false,
        }
        todos.push(state);
        // renderTodos with parameter means just render the given opject
        renderTodos(state);
    }

    saveLocalDoto()
}

function removeTodo(e) {
    if(JSON.parse(localStorage.getItem('todo'))){
        // index of the clicked todo       
        let index = todos.findIndex(item => item.todoTxt === e.target.innerText);
        if(!e.target.classList.contains('completed')){
            todos[index].completed = true;
            e.target.classList.toggle('completed');
            saveLocalDoto()
        }else{
            todos[index].completed = false;
            e.target.classList.remove('completed');
            saveLocalDoto()
        }
    }
}

function deleteTodo(e) {
    e.preventDefault();
    e.target.remove();
    let deleteIndx = todos.findIndex(item => item.todoTxt == e.target.innerText);
    todos.splice(deleteIndx, 1);
    saveLocalDoto()
}

function saveLocalDoto() {
    localStorage.setItem('todo', JSON.stringify(todos));
}

function createTodo(opject) {
    const newTodo = document.createElement('li');
        newTodo.innerText = opject.todoTxt;
        if(opject.completed){
            newTodo.classList.add('completed')
        }else{
            newTodo.classList.remove('completed')
        }
        unolderList.appendChild(newTodo);

        // add the listner to the list item to marke it as complete
        newTodo.addEventListener('dblclick', removeTodo);
        //add event listeners to remove the list item from the UL
        newTodo.addEventListener('contextmenu', deleteTodo);
}

function renderTodos(addTodo = undefined) {
    // so if we provide a opject that means we want to render that object's text if not we render all the todos
    if(addTodo) {
        createTodo(addTodo)
    }else{
        if(todos){
            todos.forEach((element) => {
                createTodo(element)
            });
        }
    }
}


