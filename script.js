// Create variable
let tasks = JSON.parse(localStorage.getItem("tasks")) || []

const todoForm = document.getElementById("todoForm")
const inputTask = document.getElementById("inputTask")
const inputLevel = document.getElementById("selectLevel")
const addButton = document.getElementsByClassName("add-btn")
const todoList = document.querySelector(".todo-list")
const doneList = document.querySelector(".done-list")
const checkbox = todoList.querySelector("input")
const li = document.getElementsByTagName("li")
const ulDoneList = doneList.getElementsByTagName("ul")

const now = new Date()
const day = now.getDay()
const date = now.getDate()
const month = now.getMonth()
const year = now.getFullYear()
const addNumber = (number) => {
  if (number < 10) {
    return `0${number}`
  } else {
    return number
  }
}



const dayName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
const time = `${dayName[day]} ${addNumber(date)}-${addNumber(month + 1)}-${year}`

if (localStorage.getItem("tasks")) {
  tasks.map((task) => createTaskTodo(task))
}

if (localStorage.getItem("tasks")) {
  tasks.map((task) => task.isCompleted == true ? createTaskDone(task) : "")
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const inputValue = inputTask.value
  const levelValue = inputLevel.value
  const dateValue = time

  let number = Math.random() * 500
  let id = Math.round(number)

  if (inputValue == "") {
    return
  }

  const task = {
    id: id,
    name: inputValue,
    level: levelValue,
    date: dateValue,
    isCompleted: false
  }

  tasks.push(task)
  localStorage.setItem("tasks", JSON.stringify(tasks))

  createTaskTodo(task)

  todoForm.reset()
  inputTask.focus()
})

todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    const taskId = e.target.closest("li").id

    
    deleteTask(taskId)
  }
})

todoList.addEventListener("input", (e) => {
  const taskId = e.target.closest("li").id
  updateTask(taskId, e.target)
})


function createTaskTodo(task) {
  const taskElement = document.createElement("li")

  taskElement.setAttribute("id", task.id)

  if (task.isCompleted) {
    taskElement.classList.add("complete")
  }

  const taskElementTodo = `
    <div class="todos">
      <input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted ? "checked" : ""}>
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
  `

  taskElement.innerHTML = taskElementTodo

  todoList.appendChild(taskElement)
}

function createTaskDone(task) {

  const taskElement = document.createElement("li")

  taskElement.setAttribute("id", task.id)

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
    </div>
  `

  taskElement.innerHTML = taskElementDone

  doneList.appendChild(taskElement)
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId))

  localStorage.setItem("tasks", JSON.stringify(tasks))

  document.getElementById(taskId).remove()
}

function updateTask(taskId, el) {
  const task = tasks.find((task) => task.id === parseInt(taskId))
  const parent = el.closest("li")

  task.isCompleted = !task.isCompleted

    if (task.isCompleted) {
      parent.classList.add("complete")
      createTaskDone(task)
    } else {
      parent.classList.remove("complete")
    }

  localStorage.setItem("tasks", JSON.stringify(tasks))
}

