
  // Import the functions you need from the SDKs you need
  import { initializeApp} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
  import { getFirestore,collection,addDoc,getDocs,deleteDoc,doc,getDoc,updateDoc,onSnapshot} from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js'

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDhCXEmcDqMGJYl8J5DPauMU1bV1Cuo3mQ",
    authDomain: "fir-crud-javascript-3b561.firebaseapp.com",
    projectId: "fir-crud-javascript-3b561",
    storageBucket: "fir-crud-javascript-3b561.appspot.com",
    messagingSenderId: "523258505397",
    appId: "1:523258505397:web:efd3819d2991b425f2b6fc"
  };

  // Initialize Firebase
  const app =initializeApp(firebaseConfig);

  const db = getFirestore(app);
//creando la colleccion de tareas
  export const saveTask = (title,description) => 
addDoc(collection(db,'tasks'),{title,description});
  //enviando datos ami collecccion de tareas
export const getTasks = ()=>getDocs(collection(db,'tasks'));
//fn para obtener los datos

 export const onGetTasks = (callback)=>onSnapshot(collection(db,'tasks'),callback);
//elimina datos de mi firebASE
 export const deleteTask = (id) => deleteDoc(doc(db,'tasks',id));
 //fn para mabdar a llamar un doc para editar
 export const getTask = (id) => getDoc(doc(db,'tasks',id));

 //fdn para actualizar un dato 
 export const updateTask =(id,newFields)=>updateDoc(doc(db,'tasks',id),newFields);
