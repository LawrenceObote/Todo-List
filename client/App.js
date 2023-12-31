appState = {};
const getTodos = async () => {
  const url = `http://localhost:3000/todo_list/`;

  const response = await fetch(url, {
    method: "GET",
  });

  const todos = await response.json();
  appState = todos.data;
  return todos.data;
};

const createTodoItem = async (text) => {
  const url = `http://localhost:3000/todo_list/`;
  console.log(text);
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: text,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: status: ${response.status}`);
  }
  console.log(response);
};

const deleteTodo = async (id) => {
  const url = `http://localhost:3000/todo_list/?id=${id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error: status: ${response.status}`);
  }
};

const upsertTodo = async (id, title) => {
  const url = `http://localhost:3000/todo_list/`;
  console.log("here is the title", title);
  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      id: id,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error: status: ${response.status}`);
  }
};

const setCompleted = async (todo) => {
  const url = `http://localhost:3000/todo_list/`;

  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: todo.id,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error: status: ${response.status}`);
  }
};

const editTodos = async (id, title) => {
  const url = `http://localhost:3000/todo_list/`;
  let headers;

  if (title) {
    headers = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: title,
      }),
    };
  } else {
    headers = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    };
  }

  const response = await fetch(url, headers);
  if (!response.ok) {
    throw new Error(`HTTP error: status: ${response.status}`);
  }
};

const createDeleteButton = (todo) => {
  let deleteButtonDiv = document.createElement("div");
  deleteButtonDiv.classList.add("deleteButtonDiv");
  let deleteButton = document.createElement("button");
  deleteButton.innerText = decodeHTMLEntities("&#10008;");
  deleteButton.classList.add("deleteButton");
  deleteButtonDiv.appendChild(deleteButton);
  deleteButton.addEventListener("click", (e) => {
    deleteTodo(todo.id);
  });

  return deleteButtonDiv;
};

const createPopupForm = (todo, editButtonDiv) => {
  let popupForm = document.createElement("form");
  popupForm.setAttribute("id", `popupForm${todo.id}`);
  popupForm.classList.add("popupContainer");
  let popup = document.createElement("div");
  popup.classList.add("popup");
  popup.classList.add("popupWrapper");
  let popupInput = document.createElement("input");
  popupInput.setAttribute("id", `popupInput${todo.id}`);
  popupInput.setAttribute("type", "text");
  popupInput.setAttribute("class", `popupInput`);
  popupInput.setAttribute("placeholder", "Enter updated todo text here");
  popupInput.classList.add("popupInput");
  popupInput.style;
  let popupSubmit = document.createElement("submit");
  popupForm.appendChild(popup);
  popup.appendChild(popupInput);
  popup.appendChild(popupSubmit);
  popup.style.visibility = "hidden";
  popupForm.style.visibility = "hidden";
  popupForm.addEventListener("submit", (e) => {
    const title = popupInput.value; //CHECK THIS!!!
    editTodos(todo.id, title);
  });

  editButtonDiv.firstChild.addEventListener("click", (e) => {
    e.preventDefault();

    if (popupForm.style.visibility === "hidden") {
      popupForm.style.visibility = "visible";
    } else {
      popupForm.style.visibility = "hidden";
    }

    document.addEventListener("click", (e) => {
      console.log(e.composedPath().includes(editButtonDiv));
      if (e.composedPath().includes(editButtonDiv)) return;
      const isClickedInsideDiv = e.composedPath().includes(popupForm);
      console.log("clicked", isClickedInsideDiv);
      if (!isClickedInsideDiv && popupForm.style.visibility == "visible") {
        popupForm.style.visibility = "hidden";
      }
    });
    console.log(popupForm);
  });

  return popupForm;
};

const createEditFunctionality = (todo) => {
  let editButtonDiv = document.createElement("div");
  editButtonDiv.classList.add("editButtonDiv");
  let editPencil = document.createElement("p");
  let editPencilCode = "&#9998;";
  editPencil.innerText = decodeHTMLEntities(editPencilCode);
  editPencil.classList.add("editPencil");
  editButtonDiv.appendChild(editPencil);

  let popupForm = document.createElement("form");
  popupForm.setAttribute("id", `popupForm${todo.id}`);
  popupForm.classList.add("popupContainer");
  let popup = document.createElement("div");
  popup.classList.add("popup");
  popup.classList.add("popupWrapper");
  let popupInput = document.createElement("input");
  popupInput.setAttribute("id", `popupInput${todo.id}`);
  popupInput.setAttribute("type", "text");
  popupInput.setAttribute("class", `popupInput`);
  popupInput.setAttribute("placeholder", "Enter updated todo text here");
  popupInput.classList.add("popupInput");
  popupInput.style;
  let popupSubmit = document.createElement("submit");
  popupForm.appendChild(popup);
  popup.appendChild(popupInput);
  popup.appendChild(popupSubmit);
  popup.style.visibility = "hidden";
  popupForm.style.visibility = "hidden";
  popupForm.addEventListener("submit", (e) => {
    const title = popupInput.value; //CHECK THIS!!!
    editTodos(todo.id, title);
  });
  editPencil.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("functioning");
    popupForm.style.visbility = popup.style.visbility;
    if (popupForm.style.visibility === "hidden") {
      popup.style.visibility = "visible";
      popupForm.style.visibility = "visible";
    } else {
      popup.style.visibility = "hidden";
      popupForm.style.visibility = "hidden";
    }
    document.addEventListener("click", (e) => {
      console.log(e.composedPath().includes(editButtonDiv));
      if (e.composedPath().includes(editButtonDiv)) return;
      const isClickedInsideDiv = e.composedPath().includes(popupForm);
      console.log("clicked", isClickedInsideDiv);
      if (!isClickedInsideDiv && popupForm.style.visibility == "visible") {
        popupForm.style.visibility = "hidden";
      }
    });
    console.log(popupForm);
  });

  return [editButtonDiv, popupForm];
};

const createTodoTextDiv = (todo) => {
  const todoTextDiv = document.createElement("div");
  todoTextDiv.classList.add("todoTextDiv");
  const todoText = document.createElement("p");
  todoText.classList.add("todoText");
  todoText.textContent = todo.title;
  todoTextDiv.appendChild(todoText);

  return todoTextDiv;
};

const decodeHTMLEntities = (text) => {
  var textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

const renderTodosUl = async () => {
  let list = document.getElementById("todoList");
  let todoList = await getTodos();

  const todoListHtml = todoList.map((todo) => {
    let li = document.createElement("li");

    let body = document.getElementById("body");
    let completedDiv = document.createElement("div");
    completedDiv.classList.add("completedDiv");
    let completedCheck = document.createElement("p");
    let completedCheckCode = "&#10004;";
    completedCheck.innerText = decodeHTMLEntities(completedCheckCode);
    completedCheck.classList.add("completedCheck");
    completedDiv.appendChild(completedCheck);

    completedCheck.setAttribute("completed", `${todo.completed}`);
    completedCheck.classList.add("completedCheck");

    completedCheck.addEventListener("click", (e) => {
      e.preventDefault();
      editTodos(todo.id);
    });
    li.appendChild(completedDiv);
    li.appendChild(createTodoTextDiv(todo));
    const editArray = createEditFunctionality(todo);
    li.appendChild(editArray[0]);
    li.appendChild(createDeleteButton(todo), li).firstChild.addEventListener(
      "click",
      (e) => {
        deleteTodo(todo.id);
        li.remove();
      }
    );
    body.appendChild(editArray[1]);
    list.appendChild(li);

    li.style = {
      paddingLeft: "10px",
    };
  });

  list.innerHTML.value = todoListHtml;
};

const clearTodos = () => {
  while (document.getElementById("todoList").firstChild) {
    document.getElementById("todoList").firstChild.remove();
  }
};

const refreshTodoList = async () => {
  await clearTodos();
  renderTodosUl();
};

const form = document.getElementById("createForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("createInput").value;
  console.log(title);
  createTodoItem(title);
  refreshTodoList();
  console.log(appState);
});

renderTodosUl();
