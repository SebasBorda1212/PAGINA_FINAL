const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn?.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `${text}<button class="delete-btn">X</button>`;

    li.querySelector(".delete-btn").addEventListener("click", () => li.remove());

    taskList.appendChild(li);
    taskInput.value = "";
});
