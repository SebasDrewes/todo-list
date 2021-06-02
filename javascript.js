const projects = [];
//toDo factory
const ToDo = (title, description, dueDate, priority) => {
    return { title, description, dueDate, priority }; 
}

//projects factory
const NewProject = (title) => {
    const ToDos = [];
        return {title, ToDos}
    }

const defaultProject = NewProject("Default Project");
let pepe = ToDo("titulo", "descripcion", "fecha", "prioridad");
let pepa = ToDo("titulo", "descripcion", "fecha", "prioridad");
const ewProject = NewProject("Otro projecto");
projects.push(ewProject);
projects.push(defaultProject);
defaultProject.ToDos.push(pepe);
defaultProject.ToDos.push(pepa);


function displayProjects() {
    const container = document.querySelector(".container")
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (let i = 0; i < projects.length; i++){
        const proyectoAgregado = document.createElement('div');
        proyectoAgregado.textContent = projects[i].title;
        container.appendChild(proyectoAgregado);
    for (let j = 0; j < projects[i].ToDos.length; j++){
        const ToDoTitle = document.createElement('div');
        ToDoTitle.textContent = projects[i].ToDos[j].title;
        const ToDoDescription = document.createElement('div');
        ToDoDescription.textContent = projects[i].ToDos[j].description;
        const ToDodueDate = document.createElement('div');
        ToDodueDate.textContent = projects[i].ToDos[j].dueDate;
        const ToDopriority = document.createElement('div');
        ToDopriority.textContent = projects[i].ToDos[j].priority;
        proyectoAgregado.appendChild(ToDoTitle);
        proyectoAgregado.appendChild(ToDoDescription);
        proyectoAgregado.appendChild(ToDodueDate);
        proyectoAgregado.appendChild(ToDopriority);
    }
    }
}
displayProjects()