let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const todoForm = document.getElementById("todoForm");
const inputTask = document.getElementById("inputTask");
const inputLevel = document.getElementById("selectLevel");
const addButton = document.getElementById("addButton");
const todoList = document.querySelector(".todo-list");
const doneList = document.querySelector(".done-list");
const deleteAllButton = document.querySelector(".delete-all");

function toggleDeleteAllButton() {
  deleteAllButton.style.display =
    doneList.childElementCount > 0 ? "block" : "none";
}

function loadTasks() {
  tasks.forEach((task) => {
    if (task.isCompleted) {
      createTaskDone(task);
    } else {
      createTaskTodo(task);
    }
  });

  toggleDeleteAllButton();
}

loadTasks();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = inputTask.value;
  const levelValue = inputLevel.value;
  const date = new Date();
  const task = {
    id: Date.now(),
    name: inputValue,
    level: levelValue,
    date: date.toLocaleString(),
    isCompleted: false,
  };

  tasks.push(task);
  saveTasks();
  createTaskTodo(task);

  todoForm.reset();
  inputTask.focus();
});

todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    const taskId = e.target.closest("li").id;
    deleteTask(taskId);
  } else if (e.target.type === "checkbox") {
    const taskId = e.target.id;
    updateTask(taskId, e.target.checked);
  }
});

doneList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    const taskId = e.target.closest("li").id;
    deleteTask(taskId);
  } else if (e.target.classList.contains("delete-all-tasks")) {
    deleteAllData();
  }
});

deleteAllButton.addEventListener("click", () => {
  deleteAllData();
});

function createTaskTodo(task) {
  const taskElement = document.createElement("li");
  taskElement.setAttribute("id", task.id);

  const taskElementTodo = `
    <div class="todos">
      <input type="checkbox" name="tasks" id="${task.id}" ${
    task.isCompleted ? "checked" : ""
  }>
      <div class="task-container">
        <div class="task">
          <h6>TO-DO :</h6>
          <span>${task.name}</span>
        </div>
        <div class="level">
          <h6>Level Prioritas :</h6>
          <span>${task.level}</span>
        </div>
        <div class="date">
          <h6>Waktu :</h6>
          <span>${task.date}</span>
        </div>
      </div>
      <button type="button" title="Hapus ${
        task.name
      } Task?" class="delete-task">
        Hapus
      </button>
    </div>
  `;

  taskElement.innerHTML = taskElementTodo;
  todoList.appendChild(taskElement);
}

function createTaskDone(task) {
  const taskElement = document.createElement("li");
  taskElement.setAttribute("id", task.id);

  const taskElementDone = `
    <div class="dones">
      <div class="task-container">
        <div class="task">
          <h6>TO-DO :</h6>
          <span>${task.name}</span>
        </div>
        <div class="level">
          <h6>Level Prioritas :</h6>
          <span>${task.level}</span>
        </div>
        <div class="date">
          <h6>Waktu :</h6>
          <span>${task.date}</span>
        </div>
      </div>
      <button type="button" title="Hapus ${task.name} Task?" class="delete-task">
        Hapus
      </button>
    </div>
  `;

  taskElement.innerHTML = taskElementDone;
  doneList.appendChild(taskElement);
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  saveTasks();
  document.getElementById(taskId).remove();

  toggleDeleteAllButton();
}

function updateTask(taskId, isChecked) {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));

  if (taskIndex !== -1) {
    tasks[taskIndex].isCompleted = isChecked;

    if (isChecked) {
      const task = tasks[taskIndex];
      moveTaskToDone(task);

      const taskElement = document.getElementById(taskId);
      todoList.removeChild(taskElement);
    } else {
      const task = tasks[taskIndex];
      moveTaskToTodoList(task);

      const taskElement = document.getElementById(taskId);
      doneList.removeChild(taskElement);
    }

    saveTasks();
  }

  toggleDeleteAllButton();
}

function moveTaskToDone(task) {
  const taskElement = document.createElement("li");
  taskElement.setAttribute("id", task.id);

  const taskElementDone = `
    <div class="dones">
      <div class="task-container">
        <div class="task">
          <h6>TO-DO :</h6>
          <span>${task.name}</span>
        </div>
        <div class="level">
          <h6>Level Prioritas :</h6>
          <span>${task.level}</span>
        </div>
        <div class="date">
          <h6>Waktu :</h6>
          <span>${task.date}</span>
        </div>
      </div>
      <button type="button" title="Hapus ${task.name} Task?" class="delete-task">
        Hapus
      </button>
    </div>
  `;

  taskElement.innerHTML = taskElementDone;
  doneList.appendChild(taskElement);
}

function deleteAllData() {
  tasks = tasks.filter((task) => !task.isCompleted);

  doneList.innerHTML = "";

  toggleDeleteAllButton();
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
