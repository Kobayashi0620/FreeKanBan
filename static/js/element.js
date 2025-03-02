const overlay = document.getElementById('OVERLAY');
const modal = document.getElementById('MODAL');
const header = document.getElementById('HEADER');
const body = document.getElementById('BODY');

// ▼header▼
// プロジェクトの要素生成
function makeHdrMenu(projectData){
    // <div class='projectMenu' id=`HEADER_${projectData.projectId}`></div>
    const project = document.createElement('div');
    project.setAttribute('id', `HEADER_${projectData.projectId}`);
    project.classList.add('projectMenu');
    header.appendChild(project);

    // <p>project</p>
    const projectName = document.createElement('p');
    projectName.textContent = projectData.project;
    project.appendChild(projectName);
};

// HeaderMenuの最後尾の追加ボタン生成
function makeHdrAdd(){
    // <div class='projectAdd' id='PROJECT_ADD'></div>
    const projectAdd = document.createElement('div');
    projectAdd.setAttribute('id', 'PROJECT_ADD');
    projectAdd.classList.add('projectAdd');
    header.appendChild(projectAdd);

    // <p id='PROJECT_ADD_NAME'>+</p>
    const projectAddName = document.createElement('p');
    projectAddName.setAttribute('id', 'PROJECT_ADD_NAME');
    projectAddName.classList.add('projectAddName');
    projectAddName.textContent = '+';
    projectAdd.appendChild(projectAddName);
};
// ▲header▲

// ▼body▼
// プロジェクトの要素生成
function makeProject(projectId){
    // <div class='project' id='projectId'></div>
    const project = document.createElement('div');
    project.setAttribute('id', projectId);
    project.classList.add('project');
    body.appendChild(project);
};

// テーブルの要素生成
function makeTable(projectId, tableData){
    const project = document.getElementById(projectId);

    // <div class='table' id='tableData.tableId'></div>
    const table = document.createElement('div');
    table.setAttribute('id', tableData.tableId);
    table.classList.add('table');
    project.appendChild(table);

    // <div class='tableHead'></div>
    const tableHead = document.createElement('div');
    tableHead.classList.add('tableHead');
    table.appendChild(tableHead);

    // <p class='tableTitle'>tableData.table</p>
    const tableTitle = document.createElement('p');
    tableTitle.classList.add('tableTitle');
    tableTitle.textContent = tableData.table || 'NewTable';
    tableHead.appendChild(tableTitle)

    // <p class='taskCount' id=`TASK_COUNT_${tableData.tableId}`></p>
    const taskCount = document.createElement('p');
    taskCount.setAttribute('id', `TASK_COUNT_${tableData.tableId}`);
    taskCount.classList.add('taskCount');
    tableHead.appendChild(taskCount);

    // <i class='fa-solid fa-bars hamburger' id=`HAMBURGER_${tableData.tableId}`></i>
    const hamburger = document.createElement('i');
    hamburger.setAttribute('id', `HAMBURGER_${tableData.tableId}`);
    hamburger.classList.add('fa-solid', 'fa-bars', 'hamburger');
    tableHead.appendChild(hamburger)

    // <div class='taskAdd' id=`TASK_ADD_${tableData.tableId}`></div>
    const taskAdd = document.createElement('div');
    taskAdd.setAttribute('id', `TASK_ADD_${tableData.tableId}`);
    taskAdd.classList.add('taskAdd');
    table.appendChild(taskAdd);

    // <p class='taskAddButton' id='TASK_ADD_BUTTON'>+ タスクの追加</p>
    const taskAddButton = document.createElement('p');
    taskAddButton.classList.add('taskAddButton');
    taskAddButton.textContent = '+ タスクの追加'
    taskAdd.appendChild(taskAddButton);

    // <div class='taskBody' id=`TASK_BODY_${tableData.tableId}`></div>
    const taskBody = document.createElement('div');
    taskBody.setAttribute('id', `TASK_BODY_${tableData.tableId}`);
    taskBody.classList.add('taskBody');
    table.appendChild(taskBody);

    // <div class='tableDel'></div>
    const tableDel = document.createElement('div');
    tableDel.classList.add('tableDel');
    table.appendChild(tableDel);

    // <i class='fa-solid fa-trash tableDel' id=`TABLE_DEL_${tableData.tableId}`></i>
    const tableDelButton = document.createElement('i');
    tableDelButton.setAttribute('id', `TABLE_DEL_${tableData.tableId}`);
    tableDelButton.classList.add('fa-solid', 'fa-trash', 'tableDel');
    tableDel.appendChild(tableDelButton);
};

// tableの最後尾の追加ボタン生成
function makeTableAdd(projectId){
    const project = document.getElementById(projectId);

    // <div class='tableAdd' id='TABLE_ADD'></div>
    const tableAdd = document.createElement('div');
    tableAdd.classList.add('tableAdd');
    project.appendChild(tableAdd);

    // <p>+ テーブルの追加</p>
    const tableAddButton = document.createElement('p');
    tableAddButton.textContent = '+ テーブルの追加';
    tableAdd.appendChild(tableAddButton);
};

// タスクの要素生成
function makeTask(parent, taskData){
    // <div class='task'></div>
    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('id', taskData.taskId);
    parent.appendChild(task);

    // <div class='taskHead'></div>
    const taskHead = document.createElement('div');
    taskHead.classList.add('taskHead');
    task.appendChild(taskHead);

    // <p class='taskTitle' id='TASK_TITLE'></p>
    const taskTitle = document.createElement('p');
    taskTitle.classList.add('taskTitle');
    taskTitle.textContent = taskData.title || 'NewTitle';
    taskHead.appendChild(taskTitle);

    // <i class='fa-solid fa-pen-to-square taskEdit' id=`TASK_EDIT_${taskData.taskId}`></i>
    const taskEdit = document.createElement('i');
    taskEdit.setAttribute('id', `TASK_EDIT_${taskData.taskId}`);
    taskEdit.classList.add('fa-solid', 'fa-pen-to-square', 'taskEdit');
    taskHead.appendChild(taskEdit);

    // <p class='taskContent' id='TASK_CONTENT'></p>
    const taskContent = document.createElement('p');
    taskContent.classList.add('taskContent');
    taskContent.textContent = taskData.content || 'NewContent';
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
    const taskDeadLine = document.createElement('p');
    taskDeadLine.classList.add('taskDeadLine');
    taskDeadLine.textContent = taskData.deadline;
    deadLineArea.appendChild(taskDeadLine);

    // <div class='taskFooter' id='TASK_FOOTER'></div>
    const taskFooter = document.createElement('div');
    taskFooter.classList.add('taskFooter');
    task.appendChild(taskFooter);

    // <p class='showHideButton' id=`SHOW_HIDE_${taskData.taskId}`>非表示</p>
    const showHideButton = document.createElement('p');
    showHideButton.setAttribute('id', `SHOW_HIDE_${taskData.taskId}`);
    showHideButton.classList.add('showHideButton');
    showHideButton.textContent = '非表示';
    taskFooter.appendChild(showHideButton);

    // <i class='fa-solid fa-trash deleteButton' id=`TASK_DELETE_${taskData.taskId}`></i>
    const deleteButton = document.createElement('i');
    deleteButton.setAttribute('id', `TASK_DELETE_${taskData.taskId}`);
    deleteButton.classList.add('fa-solid', 'fa-trash', 'deleteButton');
    taskFooter.appendChild(deleteButton);
};
// ▲body▲

// ▼modal▼
// モーダル開閉処理
function openModal(){
    overlay.style.display = 'block';
    modal.style.display = 'block';

    modal.replaceChildren();

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    });
};

function makeHideList(tableData){
    // <div class='modalHead'></div>
    const modalHead = document.createElement('div');
    modalHead.classList.add('modalHead');
    modal.appendChild(modalHead);

    // <p>非表示</p>
    const modalHeadTitle = document.createElement('p');
    modalHeadTitle.textContent = '非表示'
    modalHead.appendChild(modalHeadTitle);

    // <div class='modalBody' id='MODAL_BODY'></div>
    const modalBody = document.createElement('div');
    modalBody.setAttribute('id', `MODAL_BODY`);
    modalBody.classList.add('modalBody');
    modal.appendChild(modalBody);

    // <div></div>
    const nameCount = document.createElement('div');
    nameCount.classList.add('nameCount');
    modalBody.appendChild(nameCount);

    // <input type='text' class='tableName' id='TABLE_NAME'></input>
    const tableName = document.createElement('input');
    tableName.setAttribute('id', 'TABLE_NAME');
    tableName.classList.add('tableName');
    tableName.type = 'text';
    tableName.value = tableData.table
    nameCount.appendChild(tableName);

    // <p class='hideTaskCount' id='HIDE_TASK_COUNT'></p>
    const hideTaskCount = document.createElement('p');
    hideTaskCount.setAttribute('id', 'HIDE_TASK_COUNT');
    hideTaskCount.classList.add('hideTaskCount');
    nameCount.appendChild(hideTaskCount);

    // <div class='hideTaskLists'></div>
    const hideTaskLists = document.createElement('div');
    hideTaskLists.setAttribute('id', 'HIDE_TASK_LISTS');
    hideTaskLists.classList.add('hideTaskLists');
    modalBody.appendChild(hideTaskLists);

};
// ▲modal▲

// グローバルスコープ(関数)
window.elementMethod = {
    makeHdrMenu : makeHdrMenu,
    makeHdrAdd : makeHdrAdd,
    makeProject : makeProject,
    makeTable : makeTable,
    makeTableAdd : makeTableAdd,
    makeTask : makeTask,
    openModal : openModal,
    makeHideList : makeHideList
};