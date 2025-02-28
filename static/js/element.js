// const overlay = document.getElementById('OVERLAY');
// const modal = document.getElementById('MODAL');
const header = document.getElementById('HEADER');
const body = document.getElementById('BODY');

// ▼header▼
// プロジェクトの要素生成
function makeHdrMenu(projectNameData){
    // <div class='projectMenu'></div>
    const project = document.createElement('div');
    project.classList.add('projectMenu');
    header.appendChild(project);

    // <p>project</p>
    const projectName = document.createElement('p');
    projectName.textContent = projectNameData;
    project.appendChild(projectName);
}

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
}
// ▲header▲

// ▼body▼
// プロジェクトの要素生成
function makeProject(projectId){
    // <div class='project' id='projectId'></div>
    const project = document.createElement('div');
    project.setAttribute('id', projectId);
    project.classList.add('project');
    body.appendChild(project);
}

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

    // <p class='tableTitle'>tableData.tableId</p>
    const tableTitle = document.createElement('p');
    tableTitle.classList.add('tableTitle');
    tableTitle.textContent = tableData.tableId;
    tableHead.appendChild(tableTitle)

    // <p class='taskCount'>   -----------   </p>
    const taskCount = document.createElement('p');
    taskCount.classList.add('taskCount');
    taskCount.textContent = 0;
    tableHead.appendChild(taskCount);

    // <i class='fa-solid fa-bars hamburger'></i>
    const hamburger = document.createElement('i');
    hamburger.classList.add('fa-solid', 'fa-bars', 'hamburger');
    tableHead.appendChild(hamburger)

    // <div class='taskAdd'></div>
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

    // <div class="tableDel"></div>
    const tableDel = document.createElement('div');
    tableDel.classList.add('tableDel');
    table.appendChild(tableDel);

    // <i class="fa-solid fa-trash tableDel" id=`TABLE_DEL_${tableData.tableId}`></i>
    const tableDelButton = document.createElement('i');
    tableDelButton.setAttribute('id', `TABLE_DEL_${tableData.tableId}`);
    tableDelButton.classList.add('fa-solid', 'fa-trash', 'tableDel');
    tableDel.appendChild(tableDelButton);
}

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
}

// タスクの要素生成
function makeTask(tableId, taskData){
    const taskBody = document.getElementById(`TASK_BODY_${tableId}`);

    // <div class='task'></div>
    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('id', taskData.taskId);
    taskBody.appendChild(task);

    // <div class='taskHead'></div>
    const taskHead = document.createElement('div');
    taskHead.classList.add('taskHead');
    task.appendChild(taskHead);

    // <p class='taskTitle' id='TASK_TITLE'></p>
    const taskTitle = document.createElement('p');
    taskTitle.classList.add('taskTitle');
    taskTitle.textContent = taskData.title || 'NewTitle';
    taskHead.appendChild(taskTitle);

    // <i class="fa-solid fa-pen-to-square taskEdit" id=`TASK_EDIT_${taskData.taskId}`></i>
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

    // <div class='taskFotter' id='TASK_FOOTER'></div>
    const taskFooter = document.createElement('div');
    taskFooter.classList.add('taskFooter');
    task.appendChild(taskFooter);

    // <p class='hideButton' id='HIDE_BUTTON'>非表示</p>
    const hideButton = document.createElement('p');
    hideButton.classList.add('hideButton');
    hideButton.textContent = '非表示'
    taskFooter.appendChild(hideButton);

    // <i class="fa-solid fa-trash deleteButton" id='DELETE_ BUTTON'></i>
    const deleteButton = document.createElement('i');
    deleteButton.classList.add('fa-solid', 'fa-trash', 'deleteButton');
    taskFooter.appendChild(deleteButton);
}
// ▲body▲

// グローバルスコープ(関数)
window.elementMethod = {
    makeHdrMenu : makeHdrMenu,
    makeHdrAdd : makeHdrAdd,
    makeProject : makeProject,
    makeTable : makeTable,
    makeTableAdd : makeTableAdd,
    makeTask : makeTask
}