document.addEventListener('DOMContentLoaded', () => {
    // const header = document.getElementById('HEADER');
    // const body = document.getElementById('BODY');

    let currentProjectId;
    let currentTableId;
    let currentTaskId;

    // データ保存（ローカルストレージ）
    function setSaveData(saveData){
        const projects = JSON.stringify(saveData);
        localStorage.setItem('KANBAN_DATA', projects);
    };

    // データ取得（ローカルストレージ）
    function getStoredData(){
        const kanban = localStorage.getItem('KANBAN_DATA');
        if(kanban){
            const projects = JSON.parse(kanban);
            return projects;
        }
        else{
            return null;
        }
    };

    // header, tableの生成／イベント処理
    function makeKanban(projects){
        projects.forEach(project => {
            window.elementMethod.makeHdrMenu(project.project);
            let headerProject = document.getElementsByClassName('project');
            currentProjectId = project.project;

            headerProject.addEventListener('click', () => {
                const currentProject = projects.find(project => project.project === currentProjectId);

                currentProject.tables.forEach(table => {
                    window.elementMethod.makeTable(table);
                    currentTableId = table.tableId;

                    const table = document.getElementById(table);
                    const hamburger = table.querySelector('.hamburger');
                    hamburger.addEventListener('click', () => {
                        //モーダル処理記述
                        alert('モーダル表示／非表示一覧画面処理');
                    });

                    const taskAdd = table.querySelector('.taskAdd');
                    taskAdd.addEventListener('click', () => {
                        // 追加処理記述
                        alert('タスクの追加処理');
                    });

                    // 下記内容をTaskが表示されるように改修
                    const currentTable = projects.find(project => project.project === currentProjectId);

                    currentTable.tasks.forEach(task => {
                        window.elementMethod.makeTable(table);
                        currentTaskId = task.taskId;

                        const task = document.getElementById(currentTaskId);
                        task.addEventListener('click', () => {
                            // モーダル処理記述
                            alert('モーダル表示／編集画面処理');
                        });

                        const task = document.getElementById(task);
                        const hideButton = table.querySelector('.hideButton');
                        hideButton.addEventListener('click', () => {
                            //タスクの非表示処理記述
                            alert('タスクの非表示処理');
                        });

                        const deleteButton = table.querySelector('.deleteButton');
                        deleteButton.addEventListener('click', () => {
                            // タスクの削除処理記述
                            alert('タスクの削除処理');
                        });
                    });
                });
            });
        });

        window.elementMethod.makeHdrAdd();
        const projectAdd = document.getElementById('PROJECT_ADD');

        projectAdd.addEventListener('click', () => {
            const newProject = {
                projectId: `project-${Date.now()}`,
                project: "project",
                tables: [
                    {
                        tableId: "Do",
                        tasks: [
                            {
                                taskId: "title",
                                title: "title",
                                content: "content",
                                deadline: `${Date.now()}`,
                                status: [],
                                show_hide: true
                            }
                        ]
                    },
                    {
                        tableId: "Doing",
                        tasks: [
                            {
                                taskId: "title",
                                title: "title",
                                content: "content",
                                deadline: `${Date.now()}`,
                                status: [],
                                show_hide: true
                            }
                        ]
                    },
                    {
                        tableId: "Done",
                        tasks: [
                            {
                                taskId: "title",
                                title: "title",
                                content: "content",
                                deadline: `${Date.now()}`,
                                status: [],
                                show_hide: true
                            }
                        ]
                    }
                ]
            }
            projects.push(newProject);
        });
    }

    const projects = getStoredData() ? getStoredData() : [];

    if(projects){
        makeKanban(projects);
    }
    else{
        const newProject = {
            projectId: `project-${Date.now()}`,
            project: "project",
            tables: [
                {
                    tableId: "Do",
                    tasks: [
                        {
                            taskId: "title",
                            title: "title",
                            content: "content",
                            deadline: `${Date.now()}`,
                            status: [],
                            show_hide: true
                        }
                    ]
                },
                {
                    tableId: "Doing",
                    tasks: [
                        {
                            taskId: "title",
                            title: "title",
                            content: "content",
                            deadline: `${Date.now()}`,
                            status: [],
                            show_hide: true
                        }
                    ]
                },
                {
                    tableId: "Done",
                    tasks: [
                        {
                            taskId: "title",
                            title: "title",
                            content: "content",
                            deadline: `${Date.now()}`,
                            status: [],
                            show_hide: true
                        }
                    ]
                }
            ]
        }
        projects.push(newProject);
        makeKanban(projects);
    }
    // ▲header▲
});