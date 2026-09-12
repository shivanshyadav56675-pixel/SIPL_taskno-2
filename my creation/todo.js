let todos = [];

const todoButton = document.getElementById("add-todo-btn");
const todoInput = document.getElementById("todo-input");


todoButton.addEventListener("click", createTodo);

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") createTodo();
});


function createTodo() {
  const taskText = todoInput.value.trim();
  
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  
  const newTodo = {
    id: Date.now().toString(), 
    title: taskText,
    completed: false
  };

  todos.push(newTodo);
  todoInput.value = ""; 
  renderTodos(todos);   
}


function renderTodos(allTodos) {
  const todolist = document.getElementById("todo-list");
  todolist.innerHTML = "";
  
  allTodos?.forEach((todo) => {
    const html = `
    <div class="todo-item ${todo.completed ? 'completed' : ''}">
      <div class="todo-left">
        <input onchange="updateTodoStatus('${todo.id}')" type="checkbox" ${todo.completed ? "checked" : ""}/>
        <span class="todo-title">${todo.title}</span>
      </div>
      
      <div class="todo-right">
        <button onclick="editTodoText('${todo.id}')" class="edit-btn">Edit</button>
        <button onclick="deleteTodo('${todo.id}')" class="delete-btn">Delete</button>
      </div>
    </div>`;
    
    todolist.innerHTML += html;
  });
}


function updateTodoStatus(todoId) {
  todos = todos.map(todo => {
    if (todo.id === todoId) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  renderTodos(todos);
}


function editTodoText(todoId) {
  const targetTodo = todos.find(todo => todo.id === todoId);
  if (!targetTodo) return;

  const newTitle = prompt("Edit your task:", targetTodo.title);
  
  if (newTitle !== null && newTitle.trim() !== "") {
    todos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, title: newTitle.trim() };
      }
      return todo;
    });
    renderTodos(todos);
  }
}


function deleteTodo(todoId) {
  todos = todos.filter(todo => todo.id !== todoId);
  renderTodos(todos);
}