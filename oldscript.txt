let tasks = [];
const currentPage = 1;
let showTasksType = 'all'; // active, completed, all

const addButton = document.querySelector('.container-input__button');
const inputField = document.querySelector('.container-input__input');
let tasksContainer = document.querySelector('.container-tasks');
const paginationContainer = document.querySelector('.container-pagination');
let paginationLists = document.querySelector('.container__pagination-list');
const container = document.querySelector('.container');
const countTask = document.getElementById('taskCounter');
const countActiveTask = document.getElementById('taskCounterActive');
const countComletedTask = document.getElementById('taskCounterCompleted');
const completeAllTasks = document.querySelector('.container__completed-all-tasks');
const deleteBtn = document.querySelector('.container-tasks-task-buttons__delete');
const deleteAllChecked = document.querySelector('.container__delete-all-completed-tasks');
const checkedTasks = document.querySelector('.container-tasks-task__checkbox');
const showAllTasksBtn = document.querySelector('.container__show-all');
const showActiveTasksBtn = document.querySelector('.container__show-active');
const showCompletedTasksBtn = document.querySelector('.container__show-completed');

function tasksPagination() {
  paginationLists.parentNode.removeChild(paginationLists);
  paginationContainer.insertAdjacentHTML('beforeend', '<div class="container__pagination-list"></div>');
  paginationLists = document.querySelector('.container__pagination-list');
  let pagesCount = Math.trunc(tasks.length / 5);

  if (pagesCount * 5 !== tasks.length || pagesCount === 0) {
    pagesCount += 1;
  }

  for (let i = 0; i < pagesCount; i += 1) {
    const button = `<button class = "container__paginations-list_lists" id="paginationButton${i + 1}">${i + 1}</button>`;
    paginationLists.insertAdjacentHTML('beforeend', button);
  }

  return pagesCount;
}

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
  console.log('a', activeCount);
  console.log('c', completedCount);
  countActiveTask.innerHTML = activeCount;
  countComletedTask.innerHTML = completedCount;
}

function tasksRender(pageRender) {
  let i = 1;
  tasksContainer = document.querySelector('.container-tasks');
  tasksContainer.parentNode.removeChild(tasksContainer);

  container.insertAdjacentHTML('beforeend', '<div class="container-tasks"></div>');

  tasks.forEach((task) => {
    const taskHtml = `
    <div class="container-tasks-task" id="task${task.id}">
        <input class="container-tasks-task__checkbox" id="taskCheckbox${task.id}" type="checkbox" ${task.tasksIsCompleted ? `checked=${task.tasksIsCompleted}` : ''}/>
        <p class="container-tasks-task__text" id="taskCheckbox${task.id}" type="checkbox" ${task.tasksIsCompleted ? `checked=${task.tasksIsCompleted}` : ''}>${task.tasksName}</p>
        <div class="container-tasks-task-buttons">
          <button class="container-tasks-task-buttons__delete" type="button" id="taskCheckbox${task.id}" type="checkbox" ${task.tasksIsCompleted ? `checked=${task.tasksIsCompleted}` : ''}>X</button>
        </div>
    </div>`;
    if (showTasksType === 'active' && !task.tasksIsCompleted) {
      tasksContainer.insertAdjacentHTML('beforeend', taskHtml);
    }
    if (showTasksType === 'completed' && task.tasksIsCompleted) {
      tasksContainer.insertAdjacentHTML('beforeend', taskHtml);
    }
    if ((i > (pageRender - 1) * 5 && i <= (pageRender * 5)) && showTasksType === 'all') {
      tasksContainer.insertAdjacentHTML('beforeend', taskHtml);
    }
    i += 1;
  });
  renderCountTasks();
  console.log('RABOTAET');
  if (showTasksType === 'all') {
    tasksPagination();
  } else {
    paginationLists.parentNode.removeChild(paginationLists);
    paginationContainer.insertAdjacentHTML('beforeend', '<div class="container__pagination-list"></div>');
    paginationLists = document.querySelector('.container__pagination-list');
  }
}

tasksRender(currentPage);

function addTask() {
  console.log(true);
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
  tasks.forEach((task) => {
    if (Number(taskId) == tasks[task].id) {
      tasks = [...tasks].splice(task, 1);
    }
  });
  tasksRender(currentPage);
}

function deleteAllCheckedTasks() {
  tasks = tasks.filter((todo) => !todo.tasksIsCompleted);
  tasksRender(currentPage);
}

function completeAllTask() {
  const checkedTask = true;
  tasks.forEach((obj) => {
    const objCopy = obj;
    objCopy.tasksIsCompleted = checkedTask;
  });
  tasksRender(currentPage);
}

// const editTaks = (task = [], inputField => {
//   inputField.innerHTML = task.forEach((task, i) => {
//     return
//     <input type="text" class="editing-text[${i}]" name="item[${i}]" required>
//     <input type="submit" class="complete-btn" value="complete">
//   })
// })

// function editTask(event) {
//   for (const task of tasks) {
//     if (Number(taskId) === tasks[obj].id) {

//     }
//   }
//   // const newImput = 0;
//   // tasks.forEach(obj => {
//   //   editButtons.style.display = "block";
//   //   if (Number(taskId) === tasks[obj].id) {
//   //     obj[task].tasksName = newImput;
//   //     console.log('eyyy');
//   //   }
//   // });
//   // tasksRender(currentPage);
// }

// const editButtons = document.querySelectorAll('.container-edit');
// const taskId = event.target.id.replace('taskCheckbox', '');
// const item = document.querySelector('.container-tasks-task__text');
// let newTask = item.textContent;
//  for (const task in tasks) {
//     editButtons[task].style.display = "block";
//      if (Number(taskId) == tasks[task].id) {

//             item.contentEditable = true;
//             tasks[task].tasksName = newTask;
//             item.focus(event);
//             console.log(tasks[task].tasksName);

//      }
//  }

// }

// function saveButton(event) {
//   editTask(event);
//   tasksRender(currentPage);
// }

function onChangeCheckbox(event) {
  const taskId = event.target.id.replace('taskCheckbox', '');
  tasks.forEach((task) => {
    if (Number(taskId) == tasks[task].id) {
      tasks[task].tasksIsCompleted = !tasks[task].tasksIsCompleted;
    }
  });
  tasksRender(currentPage);
  console.log(tasks);
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

// function handleClickContainerTasks(event) {
//   if (event.target.classList.contains('container-tasks-task-buttons__delete')) {
//     deleteTasks(event);
//   }
// }

addButton.addEventListener('click', addTask);

deleteAllChecked.addEventListener('click', deleteAllCheckedTasks);

// addButton.addEventListener('keypress', (event) => {
//   const key = event.which || event.keyCode;
//   if (key === 13) {
//     addTask().click;
//   }
// });

completeAllTasks.addEventListener('click', completeAllTask);

// tasksContainer.addEventListener('click', handleClickContainerTasks);

showAllTasksBtn.addEventListener('click', showAllTasks);

showActiveTasksBtn.addEventListener('click', showActiveTasks);

showCompletedTasksBtn.addEventListener('click', showCompletedTasks);

deleteBtn.addEventListener('click', deleteTasks);

checkedTasks.addEventListener('change', onChangeCheckbox);

