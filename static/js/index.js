document.addEventListener('DOMContentLoaded', () => {
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

            // プロジェクト追加処理
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
                    window.elementMethod.makeTask(table.tableId, task);

                    // タスク削除処理
                    const deleteTask = document.getElementById(`TASK_DELETE_${task.taskId}`);
                    deleteTask.addEventListener('click', () => {
                        delTask(table.tableId, task.taskId);
                    });

                    // タスク非表示処理
                    const hiddenTask = document.getElementById(`TASK_HIDE_${task.taskId}`);
                    hiddenTask.addEventListener('click', () => {
                        hiddenTaskFunc(table.tableId, task.taskId);
                    });
                    count +=1;
                }
            });

            const taskCount = document.getElementById(`TASK_COUNT_${table.tableId}`);
            taskCount.textContent = count;
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
                { tableId: `D0_${Date.now()}`, table: "Do", tasks: [{ taskId: "title", title: "Title", content: "Content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] },
                { tableId: `DOING_${Date.now()}`, table: "Doing", tasks: [{ taskId: "title", title: "Title", content: "Content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] },
                { tableId: `DONE_${Date.now()}`, table: "Done", tasks: [{ taskId: "title", title: "Title", content: "Content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] }
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
    function hiddenTaskFunc(tableId, taskId){
        const project = projects.find(p => p.tables.some(t => t.tableId === tableId));
        const table = project.tables.find(t => t.tableId === tableId);
        const task = table.tasks.find(task => task.taskId === taskId);
        task["show_hide"] = false;
        setSaveData(projects);
        renderProjects();
    }

    // タスク移動処理
    function dadTask(){
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
                { tableId: "Do", table: "Do", tasks: [{ taskId:`TASK_${Date.now()}`, title: "Title", content: "Content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] },
                { tableId: "Doing", table: "Doing", tasks: [{ taskId: `TASK_${Date.now()}`, title: "Title", content: "Content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] },
                { tableId: "Done", table: "Done", tasks: [{ taskId: `TASK_${Date.now()}`, title: "Title", content: "Content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] }
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