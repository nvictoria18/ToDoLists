const addButton = document.querySelector('.container-input__button');
const inputField = document.querySelector('.container-input__input');
let tasksContainer = document.querySelector('.container-tasks');
const paginationContainer = document.querySelector('.pagination-container');
const container = document.querySelector('.container');
const countTask = document.getElementById('taskCounter');
const countActiveTask = document.getElementById('taskCounterActive');
const countComletedTask = document.getElementById('taskCounterCompleted');
const completeAllTasksBtn = document.querySelector('.container__completed-all-tasks');
const showAll = document.querySelector('.container__show-all');
const showActive = document.querySelector('.container__show-active');
const showCompleted = document.querySelector('.container__show-completed');
const deleteAllCheckedTasksBtn = document.querySelector('.container__delete-all-completed-tasks');

const ENTER_KEY = 'Enter';
const ESCAPE = 'Escape';

let tasks = [];
let currentPage = 1;
let showTasksType = 'all';

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

function tasksRender(currentPage) {
  let i = 1;
  tasksContainer.parentNode.removeChild(tasksContainer);

  container.insertAdjacentHTML('beforeend', '<div class="container-tasks"></div>');
  tasksContainer = document.querySelector('.container-tasks');
  tasks.forEach((task) => {
    const taskHtml = `
      <div class="container-tasks-task" id="task${task.id}">
        <input class="container-tasks-task__checkbox" id="taskCheckbox${task.id}" type="checkbox" ${task.tasksIsCompleted ? `checked=${task.tasksIsCompleted}` : ''}"/>
        <span class="container-tasks-task__text" id="taskCheckbox${task.id}" type="checkbox" ${task.tasksIsCompleted ? `checked=${task.tasksIsCompleted}` : ''}>${task.tasksName}</span>
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
    if ((i > (currentPage - 1) * 5 && i <= (currentPage * 5)) && showTasksType === 'all') {
      tasksContainer.insertAdjacentHTML('beforeend', taskHtml);
    }
    i += 1;
  });
  document.querySelectorAll('.container-tasks-task__checkbox').forEach((event) => {
    event.addEventListener('change', onChangeCheckbox);
  });
  document.querySelectorAll('.container-tasks-task-buttons__delete').forEach((event) => {
    event.addEventListener('click', deleteTasks);
  });
  document.querySelectorAll('.container-tasks-task__text').forEach((event) => {
    event.addEventListener('dblclick', editTask);
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
  const taskText = _.escape(inputField.value);
  if (taskText.trim() !== '') { 
    tasks.push({ 
      tasksName: taskText, 
      tasksIsCompleted: false, 
      id: Date.now(), 
    }); 
    tasksRender(currentPage); 
  } 
} 

function deleteTasks(event) {
  const taskId = event.target.id.replace('taskCheckbox', '');
  tasks = tasks.filter((task) => task.id !== Number(taskId));
  tasksRender(currentPage);
}

function editTask(event) {
  let taskText = document.querySelectorAll('.container-tasks-task__text');
  console.log(taskText);
  const taskId = event.target.id.replace('taskCheckbox', '');
  console.log('edit');
  tasks.forEach((task) => {
    if (Number(taskId) === task.id) {
      console.log(taskId + task.id);
    }
  })
  tasksRender(currentPage);
}

function deleteAllCheckedTasks() {
  tasks = tasks.filter((todo) => !todo.tasksIsCompleted);
  tasksRender(currentPage);
}

function completeAllTask() {
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

function showTasks(type) {
  switch(type) {
    case 'all': 
      showTasksType = 'all';
      break;
    case 'active':
      showTasksType = 'active';
      break;
    case 'completed':
      showTasksType = 'completed';
      break;
    default:
      showTasksType = 'all';
  }
}

function handleAllTasks() {
  showTasks('all');
  tasksRender(currentPage);
}

function handleActiveTasks() {
  showTasks('active');
  tasksRender(currentPage);
}

function handleCompletedTasks() {
  showTasks('completed');
  tasksRender(currentPage);
}
// function showActiveTasks() {
//   showTasksType = 'active';
//   tasksRender(currentPage);
// }
// function showCompletedTasks() {
//   showTasksType = 'completed';
//   tasksRender(currentPage);
// }

function addTaskByEnter(event) {
  if (event.key === ENTER_KEY) addTask();
}

addButton.addEventListener('click', addTask);
inputField.addEventListener('keypress', addTaskByEnter); 
completeAllTasksBtn.addEventListener('click', completeAllTask);

showAll.addEventListener('click', handleAllTasks);
showActive.addEventListener('click', handleActiveTasks);
showCompleted.addEventListener('click', handleCompletedTasks);
deleteAllCheckedTasksBtn.addEventListener('click', deleteAllCheckedTasks);

paginationContainer.addEventListener('click', pushButton); 