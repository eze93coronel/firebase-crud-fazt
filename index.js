import {saveTask,getTasks,onGetTasks,deleteTask,getTask,updateTask} from './firebase.js'

const TaskForm = document.getElementById('task-form');
const tasksContainer = document.getElementById('tasks-container');
 let editStatus = false;
 let id = '';
window.addEventListener('DOMContentLoaded',async()=>{
     
  //obtengo los datos de mi fire base y los enlisto en un div 
  onGetTasks((querySnapshot)=>{
     tasksContainer.innerHTML = '';
    let html = '';

    querySnapshot.forEach(doc =>{
   const tasks = doc.data()
  
      html +=`
       <div class="card card-body mt-2 border-primary">
         <h3 class="h5">${tasks.title}</h3>
         <p>${tasks.description}</p>
        <div>
           <button class="btn btn-primary btn-delete" data-id="${doc.id}">Delete</button> 
           <button class=" btn btn-secondary btn-edit" data-id="${doc.id}">Edit</button> 
        </div>

       </div>
      `
  
    });
    //doc.id = es la forma de aderrir cada tarea su id unico para asi identificarlo e eliminarlo
    tasksContainer.innerHTML = html;
    // del container que guarda los div seleccionamos la clase del button 
  const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');
  //iteramos en cada button y por medio dela fn deletetasks eliminamos cada tarea por su id   
  btnsDelete.forEach(btn=>{
    btn.addEventListener('click', ({target:{dataset}})=>{
      deleteTask(dataset.id);
    })
  });
  
  // editamos y rellenamos un campo
const btnsEdit =  tasksContainer.querySelectorAll('.btn-edit');
 btnsEdit.forEach(btn=>{
    btn.addEventListener('click', async (e) =>{
      const doc = await getTask(e.target.dataset.id);
      const task = doc.data();
     
      TaskForm['task-title'].value = task.title;
      TaskForm['task-description'].value = task.description;

   editStatus = true;
   id = doc.id;
   TaskForm['btn-task-save'].innerText = 'Update';

    })
 })


  });
  });



TaskForm.addEventListener('submit',(e)=>{
   e.preventDefault();
 
  const title = TaskForm['task-title']
 const description = TaskForm['task-description']
 
 if(!editStatus){
  saveTask(title.value, description.value)

   
 }else{
   updateTask(id,{title:title.value,description:description.value})

   editStatus = false;
 }

 //limpia el formulario
   TaskForm.reset();

   
})
