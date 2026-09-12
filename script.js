let tasks = [];
// { id: 1726000000000, text: "Buy milk", completed: false, time: "10:30 AM" }

const addBtn = document.querySelector(".add");
addBtn.addEventListener("click", (ev) => {
  ev.preventDefault();

  // time for newTask
  let now = new Date();
  let time = now.toLocaleTimeString();

  // id for newTask
  let id = now.getTime();

  // user text for newTask
  const task = document.querySelector(".task");
  const userInput = task.value;

  // upload data formate of newTask
  let newTask = {
    id: id,
    text: userInput,
    completed: false,
    time: time,
  };

  tasks.push(newTask);
  addTaskToDOM(newTask);
  saveTasks();
});

function saveTasks() {
  let stringifiedData = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringifiedData);
}

window.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

function loadTasks() {
  let data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
    tasks.forEach((task) => {
      addTaskToDOM(task);
    });
  }
}

function addTaskToDOM(task) {
  const createLi = document.createElement("li");
  createLi.textContent = task.text; // disp text
  createLi.id = task.id;

  // time span
  const curentTime = document.createElement("span");
  curentTime.textContent = task.time;

  // compelete Btn
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.className = "complete-btn";
  completeBtn.style.backgroundColor = "blue";
  completeBtn.style.color = "white";

  completeBtn.addEventListener("click", function () {
    let taskId = task.id;
    const task = tasks.find((t) => t.id === taskId);
    // task.classList.toggle("completed");
    task.completed = !task.completed;
    createLi.classList.toggle("completed");
    saveTasks();
  });

  // Delete Btn
  const taskDelBtn = document.createElement("button");
  taskDelBtn.textContent = "Delete";
  taskDelBtn.className = "deleteBtn";
  taskDelBtn.style.backgroundColor = "red";
  taskDelBtn.style.color = "white";

  taskDelBtn.addEventListener("click", function () {
    let taskId = task.id;
    tasks = tasks.filter((t) => t.id !== taskId);
    createLi.remove();
    saveTasks();
  });

  createLi.appendChild(curentTime);
  createLi.appendChild(completeBtn);
  createLi.appendChild(taskDelBtn);

  document.querySelector(".userAllTask").appendChild(createLi);

}
