// const overlay = document.getElementById('OVERLAY');
// const modal = document.getElementById('MODAL');
const header = document.getElementById('HEADER');
const body = document.getElementById('BODY');

// ▼header▼
let projectName;

// HeaderMenuのひな形
function makeHdrTmp(){
    // <div class='project'></div>
    const project = document.createElement('div');
    project.classList.add('project');
    header.appendChild(project);

    // <p></p>
    projectName = document.createElement('p');
    project.appendChild(projectName);
}

// HeaderMenuの最後尾の追加ボタン生成
function makeHdrAdd(){
    // <div class='projectAdd'></div>
    const projectAdd = document.createElement('div');
    projectAdd.setAttribute('id', 'PROJECT_ADD');
    projectAdd.classList.add('projectAdd');
    header.appendChild(projectAdd);

    // <p>+</p>
    const projectAddName = document.createElement('p');
    projectAddName.textContent = '+';
    projectAdd.appendChild(projectAddName);
}

// プロジェクトの要素生成
function makeHdrMenu(project){
    let i = 0;
    makeHdrTmp();
    projectName.textContent = project;
}
// ▲header▲

// ▼body▼
let table;
let tableTitle;
let taskCount;

// tableのひな形
function makeTableTmp(){
    // <div class='table'></div>
    table = document.createElement('div');
    table.classList.add('table');
    body.appendChild(table);

    // <div class='tableHead'></div>
    const tableHead = document.createElement('div');
    tableHead.classList.add('tableHead');
    table.appendChild(tableHead);

    // <p class='tableTitle'></p>
    tableTitle = document.createElement('p');
    tableTitle.classList.add('tableTitle');
    tableHead.appendChild(tableTitle)

    // <p class='taskCount'></p>
    taskCount = document.createElement('p');
    taskCount.classList.add('taskCount');
    tableHead.appendChild(taskCount);

    // <i class='fa-solid fa-bars hamburger'></i>
    const hamburger = document.createElement('i');
    hamburger.classList.add('fa-solid', 'fa-bars', 'hamburger');
    tableHead.appendChild(hamburger)

    // <div class='taskAdd'></div>
    const taskAdd = document.createElement('div');
    taskAdd.classList.add('taskAdd');
    table.appendChild(taskAdd);

    // <p class='taskAddButton' id='TASK_ADD_BUTTON'>+ タスクの追加</p>
    const taskAddButton = document.createElement('p');
    taskAddButton.classList.add('taskAddButton');
    taskAddButton.textContent = '+ タスクの追加'
    taskAdd.appendChild(taskAddButton);

    // <div class='tableBody'></div>
    const tableBody = document.createElement('div');
    tableBody.classList.add('tableBody');
    table.appendChild(tableBody);
}

// tableの最後尾の追加ボタン生成
function makeTableAdd(){
    // <div class='tableAdd' id='TABLE_ADD'></div>
    const tableAdd = document.createElement('div');
    tableAdd.classList.add('tableAdd');
    body.appendChild(tableAdd);

    // <p>+ テーブルの追加</p>
    const tableAddButton = document.createElement('p');
    tableAddButton.textContent = '+ テーブルの追加';
    tableAdd.appendChild(tableAddButton);
}

// テーブルの要素生成
function makeTable(table){
    makeTableTmp();
    table.setAttribute('id', table);
    tableTitle.textContent = table;
    taskCount.textContent = 0; //カウント関数に変更
}

let task;
let taskTitle;
let taskContent;
let taskDeadLine;

// taskのひな形
function makeTaskTmp(){
    const tableBody = document.getElementById('TABLE_BODY');

    // <div class='task'></div>
    task = document.createElement('div');
    task.classList.add('task');
    tableBody.appendChild(task);

    // <p class='taskTitle' id='TASK_TITLE'></p>
    taskTitle = document.createElement('p');
    taskTitle.classList.add('taskTitle');
    task.appendChild(taskTitle);

    // <p class='taskContent' id='TASK_CONTENT'></p>
    taskContent = document.createElement('p');
    taskContent.classList.add('taskContent');
    task.appendChild(taskContent);

    // <div class='deadLineArea'></div>
    const deadLineArea = document.createElement('div');
    deadLineArea.classList.add('deadLineArea');
    task.appendChild(deadLineArea);

    // <div class='deadLineContent'></div>
    const deadLineContent = document.createElement('div');
    deadLineContent.classList.add('deadLineContent');
    deadLineArea.appendChild(deadLineContent);

    // <i class='fa-regular fa-calendar'></i>
    const deadLineIcon = document.createElement('i');
    deadLineIcon.classList.add('fa-regular', 'fa-calendar');
    deadLineContent.appendChild(deadLineIcon);

    // <p>締切</p>
    const deadLine = document.createElement('p');
    deadLine.textContent = '締切';
    deadLineContent.appendChild(deadLine);

    // <p class='taskDeadLine' id='TASK_DEAD_LINE'></p>
    taskDeadLine = document.createElement('p');
    taskDeadLine.classList.add('taskDeadLine');
    deadLineArea.appendChild(taskDeadLine);

    // <div class='taskFotter' id='TASK_FOOTER'></div>
    const taskFooter = document.createElement('div');
    taskFooter.classList.add('taskFooter');
    task.appendChild(taskFooter);

    // <button class='hideButton' id='HIDE_BUTTON'>非表示</button>
    const hideButton = document.createElement('button');
    hideButton.classList.add('hideButton');
    hideButton.textContent = '非表示'
    taskFooter.appendChild(hideButton);

    // <i class="fa-solid fa-trash" id='DELETE_ BUTTON'></i>
    const deleteButton = document.createElement('i');
    deleteButton.classList.add('fa-solid', 'fa-trash', 'deleteButton');
    taskFooter.appendChild(deleteButton);
}

// タスクの要素生成
function makeTask(task){
    makeTaskTmp();
    task.setAttribute('id', task.taskId);
    taskTitle.textContent = task.title;
    taskContent.textContent = task.content;
    taskDeadLine = task.deadline;
}
// ▲body▲

// グローバルスコープ(関数)
window.elementMethod = {
    makeHdrAdd : makeHdrAdd,
    makeHdrMenu : makeHdrMenu,
    makeTableAdd : makeTableAdd,
    makeTable : makeTable,
    makeTask : makeTask
}