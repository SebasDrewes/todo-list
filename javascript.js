const ProjectsAndTasks = (() => {

    const projects = [];
    //toDo factory
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
    }
    const createProject = () => {
        const newProjectTitle = prompt("titulo?");
        const newProyecto = NewProject(newProjectTitle);
        projects.push(newProyecto);
        Display.displayProjects()
        Display.displayToDos()
    }
    return {projects, createTask, createProject}
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
                for (let j = 0; j < ProjectsAndTasks.projects.length; j++) {
                    if (proyectosAgregados[i].textContent === ProjectsAndTasks.projects[j].title) {
                        currentProject.currentProject = proyectosAgregados[i];
                        console.log(currentProject)
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