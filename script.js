const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function createTaskLi(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.className = "text";
  span.textContent = text;

  const delBtn = document.createElement("button");
  delBtn.className = "del";
  delBtn.textContent = "✕";

  // toggle done on text click
  span.addEventListener("click", () => {
    li.classList.toggle("done");
    saveToLocalStorage();
  });

  // delete on X click
  delBtn.addEventListener("click", () => {
    li.remove();
    saveToLocalStorage();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  return li;
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  taskList.appendChild(createTaskLi(text));
  taskInput.value = "";
  saveToLocalStorage();
}

function saveToLocalStorage() {
  const items = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    items.push({
      text: li.querySelector(".text").textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("todos", JSON.stringify(items));
}

function loadFromLocalStorage() {
  const raw = localStorage.getItem("todos");
  if (!raw) return;

  const items = JSON.parse(raw);
  items.forEach(item => {
    const li = createTaskLi(item.text);
    if (item.done) li.classList.add("done");
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

loadFromLocalStorage();
