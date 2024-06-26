const ENTER_KEY = 'Enter';

let tasks = [];
let currentPage = 1;
let showTasksType = 'all'; // active, completed, all

const addButton = document.querySelector('.container-input__button');
const inputField = document.querySelector('.container-input__input');
let tasksContainer = document.querySelector('.container-tasks');
const paginationContainer = document.querySelector('.pagination-container');
const container = document.querySelector('.container');
const countTask = document.getElementById('taskCounter');
const countActiveTask = document.getElementById('taskCounterActive');
const countComletedTask = document.getElementById('taskCounterCompleted');
const completeAllTasksBtn = document.querySelector('.container__completed-all-tasks');
//   const editingTasks = document.querySelector('.container-tasks-task__text');
const deleteBtn = document.querySelector('.container-tasks-task-buttons__delete');
const changeCheck = document.querySelectorAll('.container-tasks-task__checkbox');
const showAll = document.querySelector('.container__show-all');
const showActive = document.querySelector('.container__show-active');
const showCompleted = document.querySelector('.container__show-completed');
const deleteAllCheckedTasksBtn = document.querySelector('.container__delete-all-completed-tasks');

function renderCountTasks() {
  countTask.innerHTML = tasks.length;
  let activeCount = 0;
  let completedCount = 0;
  tasks.forEach((task) => {
    if (!task.tasksIsCompleted) {
      activeCount += 1;
    } else {
      completedCount += 1;
    }
  });
  countActiveTask.innerHTML = activeCount;
  countComletedTask.innerHTML = completedCount;
}

function tasksPagination() {
  let pagesCount = Math.trunc(tasks.length / 5);
  if (pagesCount * 5 !== tasks.length || pagesCount === 0) {
    pagesCount += 1;
  }

  let newPageButtons = '';
  for (let i = 0; i < pagesCount; i += 1) {
    newPageButtons += `
      <button class="pagination-container__page-button" data-page=${i + 1}>${i + 1}</button>
    `;
  }

  paginationContainer.innerHTML = newPageButtons;
}

function tasksRender(page) {
  let i = 1;
  tasksContainer.parentNode.removeChild(tasksContainer);

  container.insertAdjacentHTML('beforeend', '<div class="container-tasks"></div>');
  tasksContainer = document.querySelector('.container-tasks');
  tasks.forEach((task) => {
    const taskHtml = `
      <div class="container-tasks-task" id="task${task.id}">
        <input class="container-tasks-task__checkbox" id="taskCheckbox${task.id}" type="checkbox" ${task.tasksIsCompleted ? `checked=${task.tasksIsCompleted}` : ''}"/>
        <p class="container-tasks-task__text" id="taskCheckbox${task.id}" type="checkbox" ${task.tasksIsCompleted ? `checked=${task.tasksIsCompleted}` : ''}>${task.tasksName}</p>
        <div class="container-tasks-task-buttons">
            <button class="container-tasks-task-buttons__delete" type="button" id="taskCheckbox${task.id}" type="checkbox" ${task.tasksIsCompleted ? `checked=${task.tasksIsCompleted}` : ''}>X</button>
        </div>
      </div>
    `;
    if (showTasksType === 'active' && !task.tasksIsCompleted) {
      tasksContainer.insertAdjacentHTML('beforeend', taskHtml);
    }
    if (showTasksType === 'completed' && task.tasksIsCompleted) {
      tasksContainer.insertAdjacentHTML('beforeend', taskHtml);
    }
    if ((i > (page - 1) * 5 && i <= (page * 5)) && showTasksType === 'all') {
      tasksContainer.insertAdjacentHTML('beforeend', taskHtml);
    }
    i += 1;
  });
  document.querySelectorAll('.container-tasks-task__checkbox').forEach((event) => {
    event.addEventListener('change', onChangeCheckbox);
  });
  document.querySelectorAll('.container-tasks-task-buttons__delete').forEach(event => {
    event.addEventListener('click', deleteTasks);
  });
  renderCountTasks();
  tasksPagination(showTasksType);
}

tasksRender(currentPage);

function pushButton(event) {
  currentPage = Number(event.target.dataset.page);
  tasksRender(currentPage);
}

function addTask() {
  const taskText = inputField.value;
  if (taskText.trim() !== '') {
    tasks.push({
      tasksName: taskText,
      tasksIsCompleted: false,
      id: Math.floor(Math.random() * (100000 - 1) + 1),
    });
    tasksRender(currentPage);
  }
}

function deleteTasks(event) {
  const taskId = event.target.id.replace('taskCheckbox', '');
  tasks.map((task) => {
    if (Number(taskId) === task.id) {
      task.splice(task, 1);
    }
  });
  tasksRender(currentPage);
}

function deleteAllCheckedTasks() {
  tasks = tasks.filter((todo) => !todo.tasksIsCompleted);
  tasksRender(currentPage);
}

function completeAllTask() {
  completeAllTasksBtn.checked = true;
  tasks.forEach((task) => {
    const taskCopy = task;
    taskCopy.tasksIsCompleted = completeAllTasksBtn.checked;
  });
  tasksRender(currentPage);
}

function onChangeCheckbox(event) {
  const taskId = event.target.id.replace('taskCheckbox', '');
  tasks.forEach((task) => {
    if (Number(taskId) === task.id) {
      task.tasksIsCompleted = !task.tasksIsCompleted;
    }
  });
  tasksRender(currentPage);
}

function showAllTasks() {
  showTasksType = 'all';
  tasksRender(currentPage);
}
function showActiveTasks() {
  showTasksType = 'active';
  tasksRender(currentPage);
}
function showCompletedTasks() {
  showTasksType = 'completed';
  tasksRender(currentPage);
}

// function editTask(){

// }

function addTaskByEnter(event) {
  if (event.key === ENTER_KEY) addTask();
}

// function changeCheck(event) {
//   onChangeCheckbox();
// }
// function removeTask(event) {
//   deleteTasks();
// }

// changeCheck.addEventListener('', changeCheck);

addButton.addEventListener('click', addTask);
inputField.addEventListener('keypress', addTaskByEnter); // X
completeAllTasksBtn.addEventListener('click', completeAllTask);

// deleteBtn.addEventListener('click', removeTask);

showAll.addEventListener('click', showAllTasks);
showActive.addEventListener('click', showActiveTasks);
showCompleted.addEventListener('click', showCompletedTasks);
deleteAllCheckedTasksBtn.addEventListener('click', deleteAllCheckedTasks);

paginationContainer.addEventListener('click', pushButton); // X
