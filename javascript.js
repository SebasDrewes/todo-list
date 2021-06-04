const ProjectsAndTasks = (() => {

    let projects = [];
    //toDo factory
    const saveProjects = () => {
        localStorage.setItem("projects", JSON.stringify(projects))
    }
    const loadProjects = () => {
        let storedProjects = localStorage.getItem("projects")
        if (storedProjects === null ) {
            projects = [];
        }else {
            projects = JSON.parse(storedProjects);

      }
    }
    const ToDo = (title, description, dueDate, priority) => {
        return { title, description, dueDate, priority };
    }

    //projects factory
    const NewProject = (title) => {
        const ToDos = [];
        return { title, ToDos }
    }

    const defaultProject = NewProject("Default Project");
    let pepe = ToDo("pepe", "pepedescripcion", "pepefecha", "pepeprioridad");
    let pepa = ToDo("pepa", "pepadescripcion", "pepafecha", "pepaprioridad");
    let pupu = ToDo("pupu", "pupudescripcion", "pupufecha", "pupuprioridad");
    const newProject = NewProject("Otro projecto");

    projects.push(newProject);
    projects.push(defaultProject);
    newProject.ToDos.push(pupu);
    defaultProject.ToDos.push(pepe);
    defaultProject.ToDos.push(pepa);
    saveProjects();

    const createTask = () => {
        const ToDoTitle = prompt("titulo?")
        const ToDoDescription = prompt("description?")
        const ToDoFecha = prompt("duedate?")
        const ToDoPriority = prompt("prioidad?")
        const newToDo = ToDo(ToDoTitle, ToDoDescription, ToDoFecha, ToDoPriority)
        const proyectosAgregados = document.querySelectorAll(".proyectosAgregados")
        for (let i = 0; i < proyectosAgregados.length; i++) {
            if (proyectosAgregados[i] === Display.currentProject.currentProject) {
                for (let j = 0; j < projects.length; j++) {
                    if (proyectosAgregados[i].textContent === projects[j].title) {
                        projects[j].ToDos.push(newToDo);
                        proyectosAgregados[i].click();
                    }
                }

            }
        }
        saveProjects();
    }
    const createProject = () => {
        const newProjectTitle = prompt("titulo?");
        const newProyecto = NewProject(newProjectTitle);
        loadProjects();
        projects.push(newProyecto);
        Display.displayProjects()
        Display.displayToDos()
        saveProjects();
    }
    return {projects, loadProjects, saveProjects, createTask, createProject}
})();



const Display = (() => {
    let currentProject = {currentProject:0};
    const createTarea = document.querySelector("#agregarTareas")
    createTarea.addEventListener("click", () => {
        ProjectsAndTasks.createTask()
    })
    const crearProyecto = document.querySelector("#crearProyecto")
    crearProyecto.addEventListener("click", () => {
        ProjectsAndTasks.createProject()
    })


    const displayProjects = () => {
        const proyectos = document.querySelector("#projects");
        while (proyectos.firstChild) {
            proyectos.removeChild(proyectos.firstChild);
        }
        ProjectsAndTasks.loadProjects();
        for (let i = 0; i < ProjectsAndTasks.projects.length; i++) {
            const proyectoAgregado = document.createElement('div');
            proyectoAgregado.textContent = ProjectsAndTasks.projects[i].title;
            proyectoAgregado.classList.add("proyectosAgregados");
            proyectos.appendChild(proyectoAgregado);
        }
    }

    const displayToDos = () => {
        const proyectosAgregados = document.querySelectorAll(".proyectosAgregados")
        const tareas = document.querySelector("#tareas");
        for (let i = 0; i < proyectosAgregados.length; i++) {
            proyectosAgregados[i].addEventListener("click", () => {
                while (tareas.firstChild) {
                    tareas.removeChild(tareas.firstChild);
                }
                ProjectsAndTasks.loadProjects();
                for (let j = 0; j < ProjectsAndTasks.projects.length; j++) {
                    if (proyectosAgregados[i].textContent === ProjectsAndTasks.projects[j].title) {
                        currentProject.currentProject = proyectosAgregados[i];
                        for (let l = 0; l < ProjectsAndTasks.projects[j].ToDos.length; l++) {
                            const ToDoTitle = document.createElement("p");
                            ToDoTitle.textContent = ProjectsAndTasks.projects[j].ToDos[l].title;
                            const ToDoDescripcion = document.createElement("p");
                            ToDoDescripcion.textContent = ProjectsAndTasks.projects[j].ToDos[l].description;
                            const ToDoDueDate = document.createElement("p");
                            ToDoDueDate.textContent = ProjectsAndTasks.projects[j].ToDos[l].dueDate;
                            const ToDoPriority = document.createElement("p");
                            ToDoPriority.textContent = ProjectsAndTasks.projects[j].ToDos[l].priority;
                            tareas.appendChild(ToDoTitle);
                            tareas.appendChild(ToDoDescripcion);
                            tareas.appendChild(ToDoDueDate);
                            tareas.appendChild(ToDoPriority);
                        }
                    }
                }
            })
        }
    }
    return { displayProjects, displayToDos, currentProject };
})();
Display.displayProjects();
Display.displayToDos();
