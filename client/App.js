appState = {};
const getTodos = async () => {
    const url = `http://localhost:3000/todo_list/`

    const response = await fetch(
        url,
        {
            method: 'GET',
        }
    )

    const todos = await response.json();
    return todos.data;
}



const createTodoItem = async (text) => {

    const url = `http://localhost:3000/todo_list/`
    console.log(text);
    const response = await fetch(
        url,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                title: text
            })
        }
    )
    
    if(!response.ok) {
        throw new Error(`HTTP error: status: ${response.status}`)
    }
    console.log(response);
    
}

const deleteTodo = async (id) => {
    const url = `http://localhost:3000/todo_list/?id=${id}`;


    const response = await fetch(
        url,
        {
            method: 'DELETE',
        }
    )
    if(!response.ok) {
        throw new Error(`HTTP error: status: ${response.status}`)
    }
}

const upsertTodo = async (id, title) => {
    const url = `http://localhost:3000/todo_list/`;

    const response = await fetch(
        url,
        {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                title: title,
                id: id,
            }) 
        }
    )
    if(!response.ok) {
        throw new Error(`HTTP error: status: ${response.status}`)
    }
}

const renderTodosUl = async () => {
    let list = document.getElementById('todoList');
    let todoList = appState.todos; 

    if(!todoList) {
        todoList = await getTodos();
        appState.todos = todoList;
    }

    const todoListHtml = todoList.map((todo) => {
        let li = document.createElement('li');

        let deleteButton = document.createElement('button');
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click", (e) => {
            deleteTodo(todo.id);
            li.remove();
        });

        let editButton = document.createElement('button');
        editButton.classList.add("editButton");
        editButton.innherHtml = "Update Todo";
        let popupForm = document.createElement('form');
        // popupForm.classList.add("popupContainer");
        popupForm.setAttribute("id", `popupForm${todo.id}`);
        popupForm.classList.add("popupContainer");
        let popup = document.createElement('div');
        popup.classList.add("popup");
        popup.classList.add("popupWrapper");
        let popupInput = document.createElement('input');
        popupInput.setAttribute('id', `popupInput${todo.id}`);
        popupInput.setAttribute('type', 'text');
        popupInput.setAttribute('class', `popupInput`);
        popupInput.style
        // popupInput.classList.add("popuptext");
        // popupInput.setAttribute('value', 'value');
        let popupSubmit = document.createElement('submit');

        popupForm.appendChild(popup);
        popup.appendChild(popupInput);
        popup.appendChild(popupSubmit);
        popup.style.visibility = "hidden";
        popupForm.style.visibility = "hidden";
        
        popupForm.addEventListener('submit', (e) => {
            const title = popupInput.value; //CHECK THIS!!!
            console.log(title);
            upsertTodo(todo.id, title);
        })

        editButton.addEventListener("click", (e) => {
            e.preventDefault();
            popupForm.style.visbility = popup.style.visbility;
            if(popup.style.visibility === "hidden"){
                popup.style.visibility = "visible";
                popupForm.style.visibility = "visible";
            } else {
                popup.style.visibility = "hidden";
                popupForm.style.visibility = "hidden";
            }
            // popupForm.classList.toggle("show");
            console.log(popupForm)
        })
        // <input id="createInput" type="text" name="createInput" value="value"/>
        let body = document.getElementById("body");
        li.innerHTML = todo.title;
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        body.appendChild(popupForm);
        li.appendChild(deleteButton);
        list.appendChild(li);
    })

    list.innerHTML.value = todoListHtml;
}



const populateState = async () => {
    appState.todo = await getTodos();
}

populateState();
renderTodosUl();


const form = document.getElementById("createForm");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById("createInput").value;
    console.log(title);
    createTodoItem(title);
});
