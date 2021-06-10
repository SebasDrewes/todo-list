//projects factory
const NewProject = (title) => {
    const ToDos = [];
    return { title, ToDos }
}
//ToDofactory
const ToDo = (title, Nota, dueDate, priority, complete) => {
    return { title, Nota, dueDate, priority, complete };
}

const ProjectsAndTasks = (() => {
    //array de proyectos
    let projects = [];
    //toDo factory

    //funciones localStorage
    const saveProjects = () => {
        localStorage.setItem("projects", JSON.stringify(ProjectsAndTasks.projects))
    }
    const loadProjects = () => {
        let storedProjects = JSON.parse(localStorage.getItem("projects"))
        if (storedProjects.length === 0) {
            const test = NewProject("Lista default")
            const testToDo = ToDo("Test", "Test nota", "Mañana", "Prioridad Media", false)
            test.ToDos.push(testToDo)
            ProjectsAndTasks.projects.push(test)
            Display.displayProjects();
            Display.displayToDos();
        } else {
            ProjectsAndTasks.projects = storedProjects

        }
    }

//funcion para crear y guardar nueva tarea en array ToDos del currentProject
    const createTask = () => {
        const newTaskTitle = document.querySelector(".newTaskTitle")
        const newTaskNota = document.querySelector(".newTaskNota")
        const newTaskFecha = document.querySelector(".newTaskFecha")
        const newTaskPriority = document.querySelector(".newTaskPriority")
        const newToDoTitle = newTaskTitle.value;
        const newToDoNota = newTaskNota.value;
        const newToDoFecha = newTaskFecha.value;
        const newToDoPriority = newTaskPriority.textContent;
        const ToDoTitle = newToDoTitle
        const ToDoNota = newToDoNota
        const ToDoFecha = newToDoFecha
        const ToDoPriority = newToDoPriority
        const ToDoComplete = false;
        //si faltan datos, alerta
        if (ToDoTitle === "") {
            alert("Falta completar campo Titulo")

        } else if (ToDoPriority === "Prioridad") {
            alert("Por favor elige Prioridad")
        } else {
            //loop entre todos los proyectos para seleccionar el proyecto actual, y pushea la nueva tarea a ese proyecto
            const newToDo = ToDo(ToDoTitle, ToDoNota, ToDoFecha, ToDoPriority, ToDoComplete)
            const proyectosAgregados = document.querySelectorAll(".proyectosAgregados")
            for (let i = 0; i < proyectosAgregados.length; i++) {
                if (proyectosAgregados[i].textContent === Display.currentProject.currentProject.textContent) {
                    for (let j = 0; j < ProjectsAndTasks.projects.length; j++) {
                        if (proyectosAgregados[i].textContent === ProjectsAndTasks.projects[j].title + "X") {
                            ProjectsAndTasks.projects[j].ToDos.push(newToDo);
                            //redisplay del proyectyo actual
                            proyectosAgregados[i].click();
                            //se se habilita eventlistener
                            const agregarTareas = document.querySelector("#agregarTareas");
                            agregarTareas.addEventListener("click", Display.crearTaskDisplay);
                        }
                    }

                }
            }
        }
    }
    //funcion para crear proyecto y sumarlo a array projects
    const createProject = () => {
        const newProjectTitleSpace = document.querySelector(".newProjectTitleSpace");
        const newProjectTitle = newProjectTitleSpace.value;
        //some() para que cada nombre sea unico
        if (ProjectsAndTasks.projects.some(project => project.title === newProjectTitle)) {
            alert("Por favor elige otro Titulo")
        } else if (newProjectTitle === "") {
            alert("Falta completar campo Titulo")
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
    //se define currentProject como object, para poder exportarlo a funcion ProjectsAndTasks
    let currentProject = { currentProject: 0 };
    const crearProyectoDisplay = () => {
        //si display de newTask esta abierto, lo cierra
        const newTaskCancel = document.querySelector(".newTaskCancel")
        if (newTaskCancel !== null) {
            newTaskCancel.click();
        }
        //creacion dinamica de display Proyecto
        crearProyecto.removeEventListener("click", crearProyectoDisplay)
        const newProject = document.createElement("div");
        newProject.classList.add("newProject")
        const newProjectTitleSpace = document.createElement("input");
        newProjectTitleSpace.setAttribute("type", "text");
        newProjectTitleSpace.setAttribute("placeholder", "Titulo nueva lista");
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
        newProject.appendChild(newProjectTitleSpace);
        newProject.appendChild(newProjectSave);
        newProject.appendChild(newProjectCancel);
    }
    const crearProyecto = document.querySelector("#crearProyecto")
    crearProyecto.addEventListener("click", crearProyectoDisplay)


    const crearTaskDisplay = () => {
        // si existe proyecto y se selecciono un proyecto, se crea el display de agregarTarea
        if (ProjectsAndTasks.projects[0] !== undefined && Display.currentProject.currentProject !== 0) {
            const newProjectCancel = document.querySelector(".newProjectCancel")
            //si el display de newProject esta abierto, lo cierra
            if (newProjectCancel !== null) {
                newProjectCancel.click();
            }
            //se deshabilita eventListener para que no sea posible crear mas de un display
            agregarTareas.removeEventListener("click", crearTaskDisplay);
            //creacion dinamica displayTask
            const newTask = document.createElement("div");
            newTask.classList.add("newTask")
            const newTaskTitle = document.createElement("input");
            newTaskTitle.classList.add("newTaskTitle");
            newTaskTitle.setAttribute("type", "text");
            newTaskTitle.setAttribute("placeholder", "Titulo");
            const newTaskNota = document.createElement("input");
            newTaskNota.classList.add("newTaskNota");
            newTaskNota.setAttribute("type", "text");
            newTaskNota.setAttribute("placeholder", "Nota");
            const newTaskFecha = document.createElement("input");
            newTaskFecha.classList.add("newTaskFecha");
            newTaskFecha.setAttribute("type", "text");
            newTaskFecha.setAttribute("placeholder", "Fecha limite");
            //se agregan los siguientes attributes para poder mostrar placeholder
            newTaskFecha.setAttribute("onfocus", "(this.type='date')")
            newTaskFecha.setAttribute("onblur", "(this.type='text')")
            const newTaskPriority = document.createElement("p");
            newTaskPriority.classList.add("newTaskPriority");
            newTaskPriority.textContent = "Prioridad"
            //eventlistener para cambiar prioridad
            newTaskPriority.addEventListener("click", () => {
                if (newTaskPriority.textContent === "Prioridad") {
                    newTaskPriority.textContent = "Prioridad Alta"
                    newTaskPriority.style.cssText = "background-color: rgb(255 0 0 / 31%)"
                } else if (newTaskPriority.textContent === "Prioridad Alta") {
                    newTaskPriority.textContent = "Prioridad Media"
                    newTaskPriority.style.cssText = "background-color: rgb(255 238 0 / 31%)"
                } else if (newTaskPriority.textContent === "Prioridad Media") {
                    newTaskPriority.textContent = "Prioridad Baja"
                    newTaskPriority.style.cssText = "background-color: rgb(13 255 0 / 25%)"
                } else if (newTaskPriority.textContent === "Prioridad Baja") {
                    newTaskPriority.textContent = "Prioridad Alta"
                    newTaskPriority.style.cssText = "background-color: rgb(255 0 0 / 31%)"
                }
            })
            const newTaskSave = document.createElement("p");
            newTaskSave.textContent = "Guardar";
            newTaskSave.classList.add("newTaskSave")
            const newTaskCancel = document.createElement("p");
            newTaskCancel.textContent = "Cancelar";
            newTaskCancel.classList.add("newTaskCancel")
            newTaskSave.addEventListener("click", () => {
                ProjectsAndTasks.createTask();
                ProjectsAndTasks.saveProjects();
            })
            newTaskCancel.addEventListener("click", () => {
                //al cancelar, se habilita addeventListener y se redisplay el proyecto actual
                agregarTareas.addEventListener("click", crearTaskDisplay);
                const proyectosAgregados = document.querySelectorAll(".proyectosAgregados")
                for (let i = 0; i < proyectosAgregados.length; i++) {
                    if (proyectosAgregados[i].textContent === Display.currentProject.currentProject.textContent) {
                        for (let j = 0; j < ProjectsAndTasks.projects.length; j++) {
                            if (proyectosAgregados[i].textContent === ProjectsAndTasks.projects[j].title + "X") {
                                proyectosAgregados[i].click();
                            }
                        }
                    }
                }
                Display.displayProjects();
                Display.displayToDos();
            })
            tareas.appendChild(newTask);
            newTask.appendChild(newTaskTitle)
            newTask.appendChild(newTaskNota)
            newTask.appendChild(newTaskFecha)
            newTask.appendChild(newTaskPriority)
            newTask.appendChild(newTaskSave)
            newTask.appendChild(newTaskCancel)

        }
    }
    const agregarTareas = document.querySelector("#agregarTareas");
    agregarTareas.addEventListener("click", crearTaskDisplay)
//display de proyectos guardados en array projects
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
//display de ToDos guardados en proyecto seleccionado
    const displayToDos = () => {
        const proyectosAgregados = document.querySelectorAll(".proyectosAgregados")
        const tareas = document.querySelector("#tareas");
        for (let i = 0; i < proyectosAgregados.length; i++) {
            proyectosAgregados[i].addEventListener("click", () => {
                const newProjectCancel = document.querySelector(".newProjectCancel")
                if (newProjectCancel !== null) {
                    newProjectCancel.click();
                }
                agregarTareas.addEventListener("click", crearTaskDisplay)
                //loop para volver al color original proyectos deseleccionados
                document.querySelector("#agregarTareas").style.cssText = "visibility: visible";
                for (let u = 0; u < proyectosAgregados.length; u++) {
                    proyectosAgregados[u].style.background = "rgb(56, 56, 56)"
                }
                //al proyecto seleccionado, cambia background-color
                proyectosAgregados[i].style.background = "rgb(56, 56, 56, 0.5)"
                while (tareas.firstChild) {
                    tareas.removeChild(tareas.firstChild);
                }
                //creacion dinamica de cada ToDo guardado en el proyecto
                for (let j = 0; j < ProjectsAndTasks.projects.length; j++) {
                    if (proyectosAgregados[i].textContent === (ProjectsAndTasks.projects[j].title + "X")) {
                        currentProject.currentProject = proyectosAgregados[i];
                        for (let l = 0; l < ProjectsAndTasks.projects[j].ToDos.length; l++) {
                            const ToDo = document.createElement("div");
                            ToDo.classList.add("ToDo");
                            if (ProjectsAndTasks.projects[j].ToDos[l].priority === "Prioridad Baja") {
                                ToDo.style.cssText = " background-color: rgb(13 255 0 / 25%)"
                            } else if (ProjectsAndTasks.projects[j].ToDos[l].priority === "Prioridad Media") {
                                ToDo.style.cssText = "background-color: rgb(255 238 0 / 31%)"
                            } else if (ProjectsAndTasks.projects[j].ToDos[l].priority === "Prioridad Alta") {
                                ToDo.style.cssText = "background-color: rgb(255 0 0 / 31%)"
                            }
                            const ToDoTitle = document.createElement("p");
                            ToDoTitle.classList.add("ToDoTitle");
                            ToDoTitle.textContent = ProjectsAndTasks.projects[j].ToDos[l].title;
                            const ToDoNota = document.createElement("p");
                            ToDoNota.classList.add("ToDoInfo");
                            ToDoNota.textContent = `Nota: ${ProjectsAndTasks.projects[j].ToDos[l].Nota}`;
                            const ToDoDueDate = document.createElement("p");
                            ToDoDueDate.classList.add("ToDoInfo");
                            ToDoDueDate.textContent = `Fecha limite: ${ProjectsAndTasks.projects[j].ToDos[l].dueDate}`;
                            const ToDoPriority = document.createElement("p");
                            ToDoPriority.classList.add("ToDoInfo");
                            ToDoPriority.textContent = ProjectsAndTasks.projects[j].ToDos[l].priority;
                            if (ProjectsAndTasks.projects[j].ToDos[l].complete === true) {
                                ToDo.style.cssText = "text-decoration: line-through"
                            }
                            const ToDoComplete = document.createElement("p");
                            ToDoComplete.classList.add("ToDoComplete");
                            ToDoComplete.textContent = "Completar"
                            ToDoComplete.style.cssText = "cursor: pointer"
                            //add event listener activar/desactivar completar y cambiar estilos del ToDo
                            ToDoComplete.addEventListener("click", () => {
                                if (ProjectsAndTasks.projects[j].ToDos[l].complete === true) {
                                    ProjectsAndTasks.projects[j].ToDos[l].complete = false;
                                    ToDoComplete.textContent = "Completar"
                                    ToDo.style.cssText = "text-decoration: auto"
                                    if (ProjectsAndTasks.projects[j].ToDos[l].priority === "Prioridad Baja") {
                                        ToDo.style.cssText = " background-color: rgb(13 255 0 / 25%)"
                                    } else if (ProjectsAndTasks.projects[j].ToDos[l].priority === "Prioridad Media") {
                                        ToDo.style.cssText = "background-color: rgb(255 238 0 / 31%)"
                                    } else if (ProjectsAndTasks.projects[j].ToDos[l].priority === "Prioridad Alta") {
                                        ToDo.style.cssText = "background-color: rgb(255 0 0 / 31%)"
                                    }
                                    ProjectsAndTasks.saveProjects();
                                } else if (ProjectsAndTasks.projects[j].ToDos[l].complete === false) {
                                    ProjectsAndTasks.projects[j].ToDos[l].complete = true
                                    ToDoComplete.textContent = "Completar"
                                    ToDo.style.cssText = "text-decoration: line-through"
                                    ProjectsAndTasks.saveProjects();
                                }
                            })
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
                            ToDo.appendChild(ToDoNota);
                            ToDo.appendChild(ToDoDueDate);
                            ToDo.appendChild(ToDoPriority);
                            ToDo.appendChild(ToDoComplete);
                            ToDo.appendChild(ToDoDelete);
                        }
                    }
                }
            })
        }
    }
    return { displayProjects, displayToDos, currentProject, crearProyectoDisplay, crearTaskDisplay };
})();
//funciones para mostrar projectos y tareas guardadas
ProjectsAndTasks.loadProjects();
Display.displayProjects();
Display.displayToDos();
