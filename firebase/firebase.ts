import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, updateDoc } from "firebase/firestore"; 
import { IShippingFields } from "@/form.interface";

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const addTaskToFirebase = async ({ title, desc, completed, category, deadline, status }:IShippingFields) => {
    try {
        await addDoc(collection(db, "todos"), {
            title: title || null,
            desc: desc || null,
            completed: false,
            category: category || null,
            time: new Date() || null,
            deadline: deadline || null,
            status: status || null
        });
      
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

const getTasksFromFirebase = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const todos = querySnapshot.docs.map(todo => todo.data())
    const todosIdList = querySnapshot.docs.map(todo => todo.id)
    return { todos, todosIdList }
}

const deleteTask = async (id:string) => {
  deleteDoc(doc(db, "todos", id))
}

const updateTaskCompleted = async (id:string, completed:boolean) => {
  await updateDoc(doc(db, "todos", id), {
    completed: !completed
  })
}

export { auth, provider, app, addTaskToFirebase, getTasksFromFirebase, deleteTask, updateTaskCompleted }


