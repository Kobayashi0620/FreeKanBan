document.addEventListener('DOMContentLoaded', () => {
    // const header = document.getElementById('HEADER');
    // const boby = document.getElementById('BODY');

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

    // ▼header▼
    let currentProjectId

    if(projects){
        projects.forEach(project => {
            window.elementMethod.makeHdrMenu(project.project);
            let headerProject = document.getElementsByClassName('project');
            currentProjectId = project.project;

            headerProject.addEventListener('click', () => {
                const currentProject = projects.find(project => project.project === currentProjectId);
                currentProject.tables.forEach(table => {
                    makeTable(table);

                    const table = document.getElementById(table);
                    const humberger = table.querySelector('.humberger');
                    humberger.addEventListener('click', () => {
                        //処理記述
                    });

                    const taskAdd = table.querySelector('.taskAdd');
                    taskAdd.addEventListener('click', () => {
                        // 処理記述
                    });

                })
            });
        })
    }
    else{
        window.elementMethod.makeHdrInit();
    }
    // ▲header▲

    // ▼body▼
    if(projects){
        const project = projects.find(item => item.project === projectLists[1]);// 選択されたプロジェクトを表示したい
    }
    else{
        window.elementMethod.makeTableInit();
    }
    // ▲body▲
});