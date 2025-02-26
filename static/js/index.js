document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('HEADER');
    const body = document.getElementById('BODY');
    let projects = getStoredData() || [];

    // データ保存（ローカルストレージ）
    function setSaveData(saveData){
        localStorage.setItem('KANBAN_DATA', JSON.stringify(saveData));
    };

    // データ取得（ローカルストレージ）
    function getStoredData(){
        const kanban = localStorage.getItem('KANBAN_DATA');
        return kanban ? JSON.parse(kanban) : null;
    };

    if(projects.length > 0){
        renderProjects();
    }
    else{
        const  newProject = {
            projectId: `project-${Date.now()}`,
            project: "project",
            tables: [
                { tableId: "Do", tasks: [{ taskId: "title", title: "title", content: "content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] },
                { tableId: "Doing", tasks: [{ taskId: "title", title: "title", content: "content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] },
                { tableId: "Done", tasks: [{ taskId: "title", title: "title", content: "content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] }
            ]
        };

        projects.push(newProject);
        setSaveData(projects);
        renderProjects();
    };

    function renderProjects() {
        header.replaceChildren();
        body.replaceChildren();

        projects.forEach(project => {
            window.elementMethod.makeHdrMenu(project.project);
            window.elementMethod.makeProject(project.project);
            project.tables.forEach(table => {
                window.elementMethod.makeTable(project.project, table);

                // プロジェクト追加処理
                const taskAdd = document.getElementById(`TASK_ADD_${table.tableId}`);
                taskAdd.addEventListener('click', () => {
                    addTask(table.tableId);
                });

                table.tasks.forEach(task => {
                    window.elementMethod.makeTask(table.tableId, task);
                });
            });
            window.elementMethod.makeTableAdd(project.project);
        });

        window.elementMethod.makeHdrAdd();
    }

    function addProject() {
        const  newProject = {
            projectId: `project-${Date.now()}`,
            project: `project-${Date.now()}`,
            tables: [
                { tableId: `Do-${Date.now()}`, tasks: [{ taskId: "title", title: "title", content: "content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] },
                { tableId: `Doing-${Date.now()}`, tasks: [{ taskId: "title", title: "title", content: "content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] },
                { tableId: `Done-${Date.now()}`, tasks: [{ taskId: "title", title: "title", content: "content", deadline: `${new Date().toISOString().split('T')[0]}`, status: [], show_hide: true }] }
            ]
        };
        projects.push(newProject);
        setSaveData(projects);
        renderProjects();
    }

    // プロジェクト追加処理
    const projectAddName = document.getElementById('PROJECT_ADD_NAME');
    projectAddName.addEventListener('click', () => {
            addProject();
    });

    function addTask(tableId) {
        const newTask = {
            taskId: `task-${Date.now()}`,
            title: "New Task",
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
    }
});