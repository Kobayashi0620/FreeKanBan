document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('MODAL');
    const header = document.getElementById('HEADER');
    const body = document.getElementById('BODY');
    let projects = getStoredData() || [];
    let selectProject = null;

    // データ保存（ローカルストレージ）
    function setSaveData(saveData){
        localStorage.setItem('KANBAN_DATA', JSON.stringify(saveData));
    };

    // データ取得（ローカルストレージ）
    function getStoredData(){
        const kanban = localStorage.getItem('KANBAN_DATA');
        return kanban ? JSON.parse(kanban) : null;
    };

    // header表示処理
    function projectList(){
        header.replaceChildren();

        projects.forEach(project => {
            window.elementMethod.makeHdrMenu(project);
            const projectName = document.getElementById(`HEADER_${project.projectId}`);

            projectName.addEventListener('click', () => {
                selectProject = project;
                renderProjects();
            });
        });
        window.elementMethod.makeHdrAdd();

        // プロジェクト追加イベント
        const projectAddName = document.getElementById('PROJECT_ADD_NAME');
        projectAddName.addEventListener('click', () => {
            addProject();
        });
    };

    // body表示処理
    function renderProjects() {
        body.replaceChildren();
        selectProject = selectProject || projects[0];

        if(!selectProject){
            location.reload();
        }

        window.elementMethod.makeProject(selectProject.projectId);
        selectProject.tables.forEach(table => {
            let count = 0;
            window.elementMethod.makeTable(selectProject.projectId, table);

            // 非表示一覧表示イベント
            const hamburger = document.getElementById(`HAMBURGER_${table.tableId}`);
            hamburger.addEventListener('click', () => {
                hideTaskLists(selectProject, table);
            });

            // プロジェクト追加イベント
            const taskAdd = document.getElementById(`TASK_ADD_${table.tableId}`);
            taskAdd.addEventListener('click', () => {
                addTask(table.tableId);
            });

            // テーブル削除処理
            const tableDel = document.getElementById(`TABLE_DEL_${table.tableId}`);
            tableDel.addEventListener('click', () => {
                delTable(table.tableId);
            });

            table.tasks.forEach(task => {
                if(task["show_hide"]){
                    const taskBody = document.getElementById(`TASK_BODY_${table.tableId}`);
                    window.elementMethod.makeTask(taskBody, task);

                    // タスク編集イベント
                    const editTask = document.getElementById(`TASK_EDIT_${task.taskId}`);
                    editTask.addEventListener('click', () => {
                        window.elementMethod.openModal();
                        window.elementMethod.makeTaskEdit(task);

                        const taskTitle = document.getElementById('EDIT_TASK_TITLE');
                        const taskContent = document.getElementById('EDIT_TASK_CONTENT');
                        const inputDeadline = document.getElementById('EDIT_INPUT_DEADLINE');

                        taskTitle.addEventListener('change', () => {
                            const editList = [taskTitle.value, taskContent.value, inputDeadline.value];
                            editTaskFunc(table.tableId, task.taskId, editList);
                        });

                        taskContent.addEventListener('change', () => {
                            const editList = [taskTitle.value, taskContent.value, inputDeadline.value];
                            editTaskFunc(table.tableId, task.taskId, editList);
                        });

                        inputDeadline.addEventListener('change', () => {
                            const editList = [taskTitle.value, taskContent.value, inputDeadline.value];
                            editTaskFunc(table.tableId, task.taskId, editList);
                        });
                    });

                    // タスク削除イベント
                    const deleteTask = document.getElementById(`TASK_DELETE_${task.taskId}`);
                    deleteTask.addEventListener('click', () => {
                        delTask(table.tableId, task.taskId);
                    });

                    // タスク非表示イベント
                    const hiddenTask = document.getElementById(`SHOW_HIDE_${task.taskId}`);
                    hiddenTask.addEventListener('click', () => {
                        hideTaskFunc(table.tableId, task.taskId);
                    });
                    count +=1;

                    // dadイベント
                    const taskElement = document.getElementById(task.taskId);
                    taskElement.setAttribute('draggable', true);
                    taskElement.addEventListener('dragstart', (event) => {
                        event.dataTransfer.setData('text/plain', JSON.stringify({
                            taskId: task.taskId,
                            fromTableId: table.tableId,
                            fromIndex: table.tasks.indexOf(task)
                        }));
                    });
                };
            });

            const taskCount = document.getElementById(`TASK_COUNT_${table.tableId}`);
            taskCount.textContent = count;

            // dadイベント
            const taskBody = document.getElementById(`TASK_BODY_${table.tableId}`);
            taskBody.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            taskBody.addEventListener('drop', (event) => {
                event.preventDefault();
                const data = JSON.parse(event.dataTransfer.getData('text/plain'));
                if (data.fromTableId !== table.tableId) {
                    moveTask(data.taskId, data.fromTableId, table.tableId);
                }
                else if (data.fromIndex !== undefined) { // テーブル内での並び替えの場合
                    const toIndex = Array.from(taskBody.children).indexOf(event.target.closest('.task'));
                    if (toIndex !== -1 && toIndex !== data.fromIndex) {
                        moveTaskInTable(data.taskId, table.tableId, data.fromIndex, toIndex);
                    };
                };
            });
        });
        window.elementMethod.makeTableAdd(selectProject.projectId);

        // テーブル追加処理
        const tableAdd = document.querySelector('.tableAdd p');
        tableAdd.addEventListener('click', () => {
            addTable(selectProject.projectId);
        });

        projectList();
    };

    // プロジェクト追加処理
    function addProject() {
        const  newProject = {
            projectId: `PROJECT_${Date.now()}`,
            project: 'NewProject',
            tables: [
                { tableId: `D0_${Date.now()}`, table: "Do", tasks: [] },
                { tableId: `DOING_${Date.now()}`, table: "Doing", tasks: [] },
                { tableId: `DONE_${Date.now()}`, table: "Done", tasks: [] }
            ]
        };

        projects.push(newProject);
        setSaveData(projects);
        projectList();
        renderProjects();
    };

    // テーブル追加処理
    function addTable(projectId){
        const newTable = {
            tableId: `TABLE_${Date.now()}`,
            table: '',
            tasks: []
        };
        const project = projects.find(p => p.projectId === projectId);
        project.tables.push(newTable);
        setSaveData(projects);
        renderProjects();
    };

    // テーブル削除処理
    function delTable(tableId){
        const project = projects.find(p => p.tables.some(t => t.tableId === tableId));
        project.tables = project.tables.filter(t => t.tableId !== tableId);

        if(project.tables.length === 0){
            projects = projects.filter(p => p.projectId !== project.projectId);
            selectProject = null;
        }

        setSaveData(projects);
        renderProjects();
    };

    // タスク追加処理
    function addTask(tableId) {
        const newTask = {
            taskId: `TASK_${Date.now()}`,
            title: "",
            content: "",
            deadline: new Date().toISOString().split('T')[0],
            status: [],
            show_hide: true
        };

        const project = projects.find(p => p.tables.some(t => t.tableId === tableId));
        const table = project.tables.find(t => t.tableId === tableId);

        table.tasks.push(newTask);
        setSaveData(projects);
        renderProjects();
    };

    // タスク編集処理
    function editTaskFunc(tableId, taskId, editList){
        const project = projects.find(p => p.tables.some(t => t.tableId === tableId));
        const table = project.tables.find(t => t.tableId === tableId);
        const task = table.tasks.find(task => task.taskId === taskId);

        task.title = editList[0];
        task.content = editList[1];
        task.deadline = editList[2];

        setSaveData(projects);
        renderProjects();
    };

    // タスク削除処理
    function delTask(tableId, taskId){
        const project = projects.find(p => p.tables.some(t => t.tableId === tableId));
        const table = project.tables.find(t => t.tableId === tableId);
        table.tasks = table.tasks.filter(task => task.taskId !== taskId);
        setSaveData(projects);
        renderProjects();

        const paramList = [project, table];
        return paramList;
    };

    // タスク非表示処理
    function hideTaskFunc(tableId, taskId){
        const project = projects.find(p => p.tables.some(t => t.tableId === tableId));
        const table = project.tables.find(t => t.tableId === tableId);
        const task = table.tasks.find(task => task.taskId === taskId);
        task["show_hide"] = task["show_hide"] ? false : true;
        setSaveData(projects);
        renderProjects();

        const paramList = [project, table];
        return paramList;
    };

    // タスク移動処理
    function moveTask(taskId, fromTableId, toTableId) {
        const project = projects.find(p => p.tables.some(t => t.tableId === fromTableId));
        const fromTable = project.tables.find(t => t.tableId === fromTableId);
        const toTable = project.tables.find(t => t.tableId === toTableId);
        const task = fromTable.tasks.find(task => task.taskId === taskId);

        fromTable.tasks = fromTable.tasks.filter(task => task.taskId !== taskId);
        toTable.tasks.push(task);
        setSaveData(projects);
        renderProjects();
    };

    // テーブル内タスク移動処理
    function moveTaskInTable(taskId, tableId, fromIndex, toIndex) {
        const project = projects.find(p => p.tables.some(t => t.tableId === tableId));
        const table = project.tables.find(t => t.tableId === tableId);
        const task = table.tasks.find(task => task.taskId === taskId);

        table.tasks.splice(fromIndex, 1);
        table.tasks.splice(toIndex, 0, task);
        setSaveData(projects);
        renderProjects();
    }

    // モーダルタスク削除処理
    function modalDelTask(tableId, taskId){
        const paramList = delTask(tableId, taskId);
        hideTaskLists(paramList[0], paramList[1]);
    };

    // モーダルタスク表示処理
    function showTaskFunc(tableId, taskId){
        const paramList = hideTaskFunc(tableId, taskId);
        hideTaskLists(paramList[0], paramList[1]);
    };

    // モーダルプロジェクト名変更処理
    function editProjectName(projectId, projectTitle){
        const project = projects.find(p => p.projectId === projectId);
        project.project = projectTitle;
        setSaveData(projects);
        renderProjects();
    };

    // モーダルテーブル名変更処理
    function editTableName(tableId, tableTitle){
        const project = projects.find(p => p.tables.some(t => t.tableId === tableId));
        const table = project.tables.find(t => t.tableId === tableId);
        table.table = tableTitle;
        setSaveData(projects);
        renderProjects();
        hideTaskLists(project, table);
    };

    // 非表示タスク一覧表示
    function hideTaskLists(project, table){
        modal.replaceChildren();
        count = 0;

        window.elementMethod.openModal();
        window.elementMethod.makeHideList(project, table);

        // プロジェクト名変更
        const projectName = document.getElementById('EDIT_PROJECT_NAME');
        projectName.addEventListener('change', () => {
            const projectTitle = projectName.value;
            editProjectName(project.projectId, projectTitle);
        });

        // テーブル名変更
        const tableName = document.getElementById('EDIT_TABLE_NAME');
        tableName.addEventListener('change', () => {
            const tableTitle = tableName.value;
            editTableName(table.tableId, tableTitle);
        });

        table.tasks.forEach(task => {
            if(!task["show_hide"]){
                const hideTaskLists = document.getElementById(`EDIT_HIDE_TASK_LISTS`);
                window.elementMethod.makeTask(hideTaskLists, task);

                const showHideButton = document.getElementById(`SHOW_HIDE_${task.taskId}`);
                showHideButton.textContent ='表示';

                // タスク編集イベント
                const editTask = document.getElementById(`TASK_EDIT_${task.taskId}`);
                editTask.addEventListener('click', () => {
                    window.elementMethod.openModal();
                    window.elementMethod.makeTaskEdit(task);

                    const editTaskTitle = document.getElementById('EDIT_TASK_TITLE');
                    const editTaskContent = document.getElementById('EDIT_TASK_CONTENT');
                    const editInputDeadline = document.getElementById('EDIT_INPUT_DEADLINE');

                    editTaskTitle.addEventListener('change', () => {
                        const editList = [editTaskTitle.value, editTaskContent.value, editInputDeadline.value];
                        editTaskFunc(table.tableId, task.taskId, editList);
                    });

                    editTaskContent.addEventListener('change', () => {
                        const editList = [editTaskTitle.value, editTaskContent.value, editInputDeadline.value];
                        editTaskFunc(table.tableId, task.taskId, editList);
                    });

                    editInputDeadline.addEventListener('change', () => {
                        const editList = [editTaskTitle.value, editTaskContent.value, editInputDeadline.value];
                        editTaskFunc(table.tableId, task.taskId, editList);
                    });
                });

                // タスク削除イベント
                const deleteTask = document.getElementById(`TASK_DELETE_${task.taskId}`);
                deleteTask.addEventListener('click', () => {
                    modalDelTask(table.tableId, task.taskId);
                });

                // タスク表示イベント
                const hiddenTask = document.getElementById(`SHOW_HIDE_${task.taskId}`);
                hiddenTask.addEventListener('click', () => {
                    showTaskFunc(table.tableId, task.taskId);
                });
                count +=1;
            };
        });

        const taskCount = document.getElementById('EDIT_HIDE_TASK_COUNT');
        taskCount.textContent = count;
    };

    // 初期処理
    if(projects.length > 0){
        projectList();
        renderProjects();
    }
    else{
        const newProject = {
            projectId: `PROJECT_${Date.now()}`,
            project: "Project",
            tables: [
                { tableId: "Do", table: "Do", tasks: [] },
                { tableId: "Doing", table: "Doing", tasks: [] },
                { tableId: "Done", table: "Done", tasks: [] }
            ]
        };

        projects.push(newProject);
        setSaveData(projects);
        projectList();
        renderProjects();
    };
});