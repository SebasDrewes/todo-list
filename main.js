(()=>{const e=e=>({title:e,ToDos:[]}),t=(e,t,o,r,c)=>({title:e,Nota:t,dueDate:o,priority:r,complete:c}),o={projects:[],loadProjects:()=>{let c=JSON.parse(localStorage.getItem("projects"));if(0===c.length){const c=e("Lista default"),s=t("Test","Test nota","Mañana","Prioridad Media",!1);c.ToDos.push(s),o.projects.push(c),r.displayProjects(),r.displayToDos()}else o.projects=c},saveProjects:()=>{localStorage.setItem("projects",JSON.stringify(o.projects))},createTask:()=>{const e=document.querySelector(".newTaskTitle"),c=document.querySelector(".newTaskNota"),s=document.querySelector(".newTaskFecha"),a=document.querySelector(".newTaskPriority"),n=e.value,l=c.value,d=s.value,i=a.textContent;if(n.length>=15)alert("No mas de 15 caracteres por Titulo");else if(""===n)alert("Falta completar campo Titulo");else if(l.length>=15)alert("No mas de 15 caracteres por Nota");else if("Prioridad"===i)alert("Por favor elige Prioridad");else{const e=t(n,l,d,i,!1),c=document.querySelectorAll(".proyectosAgregados");for(let t=0;t<c.length;t++)if(c[t].textContent===r.currentProject.currentProject.textContent)for(let s=0;s<o.projects.length;s++)c[t].textContent===o.projects[s].title+"X"&&(o.projects[s].ToDos.push(e),c[t].click(),document.querySelector("#agregarTareas").addEventListener("click",r.crearTaskDisplay))}},createProject:()=>{const t=document.querySelector(".newProjectTitleSpace").value;if(o.projects.some((e=>e.title===t)))alert("Por favor elige otro Titulo");else if(""===t)alert("Falta completar campo Titulo");else if(t.length>=15)alert("No mas de 15 caracteres por Titulo");else{const c=e(t);o.projects.push(c),r.displayProjects(),r.displayToDos(),document.querySelector("#crearProyecto").addEventListener("click",r.crearProyectoDisplay)}}},r=(()=>{const e=document.querySelector("#projects");let t={currentProject:0};const c=()=>{const t=document.querySelector(".newTaskCancel");null!==t&&t.click(),s.removeEventListener("click",c);const a=document.createElement("div");a.classList.add("newProject");const n=document.createElement("input");n.setAttribute("type","text"),n.setAttribute("placeholder","Titulo nueva lista"),n.classList.add("newProjectTitleSpace");const l=document.createElement("p");l.textContent="Guardar",l.classList.add("newProjectSave");const d=document.createElement("p");d.textContent="Cancelar",d.classList.add("newProjectCancel"),l.addEventListener("click",(()=>{o.createProject(),o.saveProjects()})),d.addEventListener("click",(()=>{s.addEventListener("click",c),r.displayProjects(),r.displayToDos()})),e.appendChild(a),a.appendChild(n),a.appendChild(l),a.appendChild(d)},s=document.querySelector("#crearProyecto");s.addEventListener("click",c);const a=()=>{if(void 0!==o.projects[0]&&0!==r.currentProject.currentProject){const e=document.querySelector(".newProjectCancel");null!==e&&e.click(),n.removeEventListener("click",a);const t=document.createElement("div");t.classList.add("newTask");const c=document.createElement("input");c.classList.add("newTaskTitle"),c.setAttribute("type","text"),c.setAttribute("placeholder","Titulo");const s=document.createElement("input");s.classList.add("newTaskNota"),s.setAttribute("type","text"),s.setAttribute("placeholder","Nota");const l=document.createElement("input");l.classList.add("newTaskFecha"),l.setAttribute("type","text"),l.setAttribute("placeholder","Fecha limite"),l.setAttribute("onfocus","(this.type='date')"),l.setAttribute("onblur","(this.type='text')");const d=document.createElement("p");d.classList.add("newTaskPriority"),d.textContent="Prioridad",d.addEventListener("click",(()=>{"Prioridad"===d.textContent?(d.textContent="Prioridad Alta",d.style.cssText="background-color: rgb(255 0 0 / 31%)"):"Prioridad Alta"===d.textContent?(d.textContent="Prioridad Media",d.style.cssText="background-color: rgb(255 238 0 / 31%)"):"Prioridad Media"===d.textContent?(d.textContent="Prioridad Baja",d.style.cssText="background-color: rgb(13 255 0 / 25%)"):"Prioridad Baja"===d.textContent&&(d.textContent="Prioridad Alta",d.style.cssText="background-color: rgb(255 0 0 / 31%)")}));const i=document.createElement("p");i.textContent="Guardar",i.classList.add("newTaskSave");const p=document.createElement("p");p.textContent="Cancelar",p.classList.add("newTaskCancel"),i.addEventListener("click",(()=>{o.createTask(),o.saveProjects()})),p.addEventListener("click",(()=>{n.addEventListener("click",a);const e=document.querySelectorAll(".proyectosAgregados");for(let t=0;t<e.length;t++)if(e[t].textContent===r.currentProject.currentProject.textContent)for(let r=0;r<o.projects.length;r++)e[t].textContent===o.projects[r].title+"X"&&e[t].click();r.displayProjects(),r.displayToDos()})),tareas.appendChild(t),t.appendChild(c),t.appendChild(s),t.appendChild(l),t.appendChild(d),t.appendChild(i),t.appendChild(p)}},n=document.querySelector("#agregarTareas");n.addEventListener("click",a);const l=()=>{for(;e.firstChild;)e.removeChild(e.firstChild);for(let t=0;t<o.projects.length;t++){const r=document.createElement("div");r.textContent=o.projects[t].title,r.classList.add("proyectosAgregados");const c=document.createElement("div");c.classList.add("proyectoAgregadoDelete"),c.textContent="X",c.addEventListener("click",(()=>{delete o.projects[t],o.projects=o.projects.filter((e=>String(e).trim())),o.saveProjects(),l(),d()})),e.appendChild(r),r.appendChild(c)}},d=()=>{const e=document.querySelectorAll(".proyectosAgregados"),r=document.querySelector("#tareas");for(let c=0;c<e.length;c++)e[c].addEventListener("click",(()=>{const s=document.querySelector(".newProjectCancel");null!==s&&s.click(),n.addEventListener("click",a),document.querySelector("#agregarTareas").style.cssText="visibility: visible";for(let t=0;t<e.length;t++)e[t].style.background="rgb(56, 56, 56)";for(e[c].style.background="rgb(56, 56, 56, 0.5)";r.firstChild;)r.removeChild(r.firstChild);for(let s=0;s<o.projects.length;s++)if(e[c].textContent===o.projects[s].title+"X"){t.currentProject=e[c];for(let t=0;t<o.projects[s].ToDos.length;t++){const a=document.createElement("div");a.classList.add("ToDo"),"Prioridad Baja"===o.projects[s].ToDos[t].priority?a.style.cssText=" background-color: rgb(13 255 0 / 25%)":"Prioridad Media"===o.projects[s].ToDos[t].priority?a.style.cssText="background-color: rgb(255 238 0 / 31%)":"Prioridad Alta"===o.projects[s].ToDos[t].priority&&(a.style.cssText="background-color: rgb(255 0 0 / 31%)");const n=document.createElement("p");n.classList.add("ToDoTitle"),n.textContent=o.projects[s].ToDos[t].title;const l=document.createElement("p");l.classList.add("ToDoInfo"),l.textContent=`Nota: ${o.projects[s].ToDos[t].Nota}`;const d=document.createElement("p");d.classList.add("ToDoInfo"),d.textContent=`Fecha limite: ${o.projects[s].ToDos[t].dueDate}`;const i=document.createElement("p");i.classList.add("ToDoInfo"),i.textContent=o.projects[s].ToDos[t].priority,!0===o.projects[s].ToDos[t].complete&&(a.style.cssText="text-decoration: line-through");const p=document.createElement("p");p.classList.add("ToDoComplete"),p.textContent="Completar",p.style.cssText="cursor: pointer",p.addEventListener("click",(()=>{!0===o.projects[s].ToDos[t].complete?(o.projects[s].ToDos[t].complete=!1,p.textContent="Completar",a.style.cssText="text-decoration: auto","Prioridad Baja"===o.projects[s].ToDos[t].priority?a.style.cssText=" background-color: rgb(13 255 0 / 25%)":"Prioridad Media"===o.projects[s].ToDos[t].priority?a.style.cssText="background-color: rgb(255 238 0 / 31%)":"Prioridad Alta"===o.projects[s].ToDos[t].priority&&(a.style.cssText="background-color: rgb(255 0 0 / 31%)"),o.saveProjects()):!1===o.projects[s].ToDos[t].complete&&(o.projects[s].ToDos[t].complete=!0,p.textContent="Completar",a.style.cssText="text-decoration: line-through",o.saveProjects())}));const u=document.createElement("div");u.textContent="X",u.classList.add("ToDoDelete"),u.addEventListener("click",(()=>{delete o.projects[s].ToDos[t],o.projects[s].ToDos=o.projects[s].ToDos.filter((e=>null!==e)),o.saveProjects(),e[c].click()})),r.appendChild(a),a.appendChild(n),a.appendChild(l),a.appendChild(d),a.appendChild(i),a.appendChild(p),a.appendChild(u)}}}))};return{displayProjects:l,displayToDos:d,currentProject:t,crearProyectoDisplay:c,crearTaskDisplay:a}})();o.loadProjects(),r.displayProjects(),r.displayToDos()})();