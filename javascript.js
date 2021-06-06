//projects factory
const NewProject = (title) => {
    const ToDos = [];
    return { title, ToDos }
}
//ToDofactory
const ToDo = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority };
}
const ProjectsAndTasks = (() => {

    let projects = [];
    //toDo factory
    const saveProjects = () => {
        localStorage.setItem("projects", JSON.stringify(ProjectsAndTasks.projects))
    }
    const loadProjects = () => {
        let storedProjects = JSON.parse(localStorage.getItem("projects"))
        if (storedProjects === null) {
            ProjectsAndTasks.projects = [];
        } else {
            ProjectsAndTasks.projects = storedProjects

        }
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
                for (let j = 0; j < ProjectsAndTasks.projects.length; j++) {
                    if (proyectosAgregados[i].textContent === ProjectsAndTasks.projects[j].title) {
                        ProjectsAndTasks.projects[j].ToDos.push(newToDo);
                        proyectosAgregados[i].click();
                    }
                }

            }
        }

    }
    const createProject = () => {
        const newProjectTitleSpace = document.querySelector(".newProjectTitleSpace");
        const newProjectTitle = newProjectTitleSpace.value;
        //some() para que cada nombre sea unico
        if (ProjectsAndTasks.projects.some(project => project.title === newProjectTitle)) {
            alert("Elegi otro nombre kpo")
        } else if (newProjectTitle === "") {
            alert("nombres en blanco no kpo")
        } else if (newProjectTitle.length >= 15){
            alert("no mas de 15 caracteres")
        }
        else {
            const newProyecto = NewProject(newProjectTitle);
            ProjectsAndTasks.projects.push(newProyecto);
            Display.displayProjects()
            Display.displayToDos()
            const crearProyecto = document.querySelector("#crearProyecto")
            crearProyecto.addEventListener("click", Display.crearProyectoDisplay)
        }
    }



    return { projects, loadProjects, saveProjects, createTask, createProject }
})();



const Display = (() => {
    const proyectos = document.querySelector("#projects");
    let currentProject = { currentProject: 0 };
    const createTarea = document.querySelector("#agregarTareas")
    createTarea.addEventListener("click", () => {
        ProjectsAndTasks.createTask()
        ProjectsAndTasks.saveProjects();
    })
    const crearProyectoDisplay = () => {
        crearProyecto.removeEventListener("click", crearProyectoDisplay)
        const newProject = document.createElement("div");
        newProject.classList.add("newProject")
        const newProjectTitle= document.createElement("p");
        newProjectTitle.textContent = "Titulo:"
        newProjectTitle.classList.add("newProjectTitle")
        const newProjectTitleSpace = document.createElement("input");
        newProjectTitleSpace.setAttribute("type", "text");
        newProjectTitleSpace.setAttribute("placeholder", "Nueva lista");
        newProjectTitleSpace.classList.add("newProjectTitleSpace")
        const newProjectSave = document.createElement("p");
        newProjectSave.textContent = "Guardar";
        newProjectSave.classList.add("newProjectSave")
        const newProjectCancel = document.createElement("p");
        newProjectCancel.textContent = "Cancelar";
        newProjectCancel.classList.add("newProjectCancel")
        newProjectSave.addEventListener("click", () => {
            ProjectsAndTasks.createProject();
            ProjectsAndTasks.saveProjects();
        })
        newProjectCancel.addEventListener("click", () => {
            crearProyecto.addEventListener("click", crearProyectoDisplay)
            Display.displayProjects();
            Display.displayToDos();
        })
        proyectos.appendChild(newProject);
        newProject.appendChild(newProjectTitle);
        newProject.appendChild(newProjectTitleSpace);
        newProject.appendChild(newProjectSave);
        newProject.appendChild(newProjectCancel);
    }
    const crearProyecto = document.querySelector("#crearProyecto")
    crearProyecto.addEventListener("click", crearProyectoDisplay)
    
       // ProjectsAndTasks.createProject();
      // ProjectsAndTasks.saveProjects();


    const displayProjects = () => {
        while (proyectos.firstChild) {
            proyectos.removeChild(proyectos.firstChild);
        }
        for (let i = 0; i < ProjectsAndTasks.projects.length; i++) {
            const proyectoAgregado = document.createElement('div');
            proyectoAgregado.textContent = ProjectsAndTasks.projects[i].title;
            proyectoAgregado.classList.add("proyectosAgregados");
            const proyectoAgregadoDelete = document.createElement('div');
            proyectoAgregadoDelete.classList.add("proyectoAgregadoDelete")
            proyectoAgregadoDelete.textContent = "X";
            proyectoAgregadoDelete.addEventListener("click", () => {
                delete ProjectsAndTasks.projects[i];
                ProjectsAndTasks.projects = ProjectsAndTasks.projects.filter(e => String(e).trim());
                ProjectsAndTasks.saveProjects();
                displayProjects();
                displayToDos();
            })
            proyectos.appendChild(proyectoAgregado);
            proyectoAgregado.appendChild(proyectoAgregadoDelete)
        }
    }

    const displayToDos = () => {
        const proyectosAgregados = document.querySelectorAll(".proyectosAgregados")
        const tareas = document.querySelector("#tareas");
        for (let i = 0; i < proyectosAgregados.length; i++) {
            proyectosAgregados[i].addEventListener("click", () => {
                //loop para volver al color original proyectos no seleccionados
                document.querySelector("#agregarTareas").style.cssText = "visibility: visible";
                for (let u = 0; u < proyectosAgregados.length; u++) {
                    proyectosAgregados[u].classList.remove("proyectosAgregadosClick")
                    proyectosAgregados[u].classList.add("proyectosAgregados")
                }
                //al proyecto seleccionado, cambia background-color
                proyectosAgregados[i].classList.remove("proyectosAgregados")
                proyectosAgregados[i].classList.add("proyectosAgregadosClick")
                while (tareas.firstChild) {
                    tareas.removeChild(tareas.firstChild);
                }
                for (let j = 0; j < ProjectsAndTasks.projects.length; j++) {
                    if (proyectosAgregados[i].textContent === (ProjectsAndTasks.projects[j].title + "X")) {
                        currentProject.currentProject = proyectosAgregados[i];
                        for (let l = 0; l < ProjectsAndTasks.projects[j].ToDos.length; l++) {
                            const ToDo = document.createElement("div");
                            ToDo.classList.add("ToDo");
                            const ToDoTitle = document.createElement("p");
                            ToDoTitle.classList.add("ToDoTitle");
                            ToDoTitle.textContent = ProjectsAndTasks.projects[j].ToDos[l].title;
                            const ToDoDescripcion = document.createElement("p");
                            ToDoDescripcion.classList.add("ToDoInfo");
                            ToDoDescripcion.textContent = ProjectsAndTasks.projects[j].ToDos[l].description;
                            const ToDoDueDate = document.createElement("p");
                            ToDoDueDate.classList.add("ToDoInfo");
                            ToDoDueDate.textContent = ProjectsAndTasks.projects[j].ToDos[l].dueDate;
                            const ToDoPriority = document.createElement("p");
                            ToDoPriority.classList.add("ToDoInfo");
                            ToDoPriority.textContent = ProjectsAndTasks.projects[j].ToDos[l].priority;
                            const ToDoDelete = document.createElement("div");
                            ToDoDelete.textContent = "X";
                            ToDoDelete.classList.add("ToDoDelete");
                            ToDoDelete.addEventListener("click", () => {
                                delete ProjectsAndTasks.projects[j].ToDos[l];
                                ProjectsAndTasks.projects[j].ToDos = ProjectsAndTasks.projects[j].ToDos.filter(x => x !== null);
                                ProjectsAndTasks.saveProjects();
                                proyectosAgregados[i].click();
                            })
                            tareas.appendChild(ToDo);
                            ToDo.appendChild(ToDoTitle);
                            ToDo.appendChild(ToDoDescripcion);
                            ToDo.appendChild(ToDoDueDate);
                            ToDo.appendChild(ToDoPriority);
                            ToDo.appendChild(ToDoDelete);
                        }
                    }
                }
            })
        }
    }
    return { displayProjects, displayToDos, currentProject ,crearProyectoDisplay};
})();
ProjectsAndTasks.loadProjects();
Display.displayProjects();
Display.displayToDos();