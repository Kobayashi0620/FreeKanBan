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

                    // タスク削除イベント
                    const deleteTask = document.getElementById(`TASK_DELETE_${task.taskId}`);
                    deleteTask.addEventListener('click', () => {
                        delTask(table.tableId, task.taskId);
                    });

                    // タスク非表示イベント
                    const hiddenTask = document.getElementById(`SHOW_HIDE_${task.taskId}`);
                    hiddenTask.addEventListener('click', () => {
                        showHideFunc(table.tableId, task.taskId);
                    });
                    count +=1;

                    // dadイベント
                    const taskElement = document.getElementById(task.taskId);
                    taskElement.setAttribute('draggable', true);
                    taskElement.addEventListener('dragstart', (event) => {
                        event.dataTransfer.setData('text/plain', JSON.stringify({
                            taskId: task.taskId,
                            fromTableId: table.tableId
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
            });
        });
        window.elementMethod.makeTableAdd(selectProject.projectId);

        // テーブル追加処理
        const tableAdd = document.querySelector('.tableAdd p');
        tableAdd.addEventListener('click', () => {
            addTable(selectProject.projectId);
        });

        projectList()
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
    }

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
    }

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

    // タスク削除処理
    function delTask(tableId, taskId){
        const project = projects.find(p => p.tables.some(t => t.tableId === tableId));
        const table = project.tables.find(t => t.tableId === tableId);
        table.tasks = table.tasks.filter(task => task.taskId !== taskId);
        setSaveData(projects);
        renderProjects();
    }

    // タスク非表示処理
    function showHideFunc(tableId, taskId){
        const project = projects.find(p => p.tables.some(t => t.tableId === tableId));
        const table = project.tables.find(t => t.tableId === tableId);
        const task = table.tasks.find(task => task.taskId === taskId);
        task["show_hide"] = task["show_hide"] ? false : true;
        setSaveData(projects);
        renderProjects();
    }

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
    }

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

    // プロジェクト追加イベント
    const projectAddName = document.getElementById('PROJECT_ADD_NAME');
    projectAddName.addEventListener('click', () => {
            addProject();
    });
});