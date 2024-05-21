import TodoTypes from "./todo";
const LOCAL_STORAGE_KEY = 'todos';
const TodoService = {
//Get Todos
getTodos: (): TodoTypes[] => {
 const todoString = localStorage.getItem(LOCAL_STORAGE_KEY)
 return  todoString ? JSON.parse(todoString) : [];
},
//Adding Todos
addTodos:(text:string):TodoTypes => {
    const todos = TodoService.getTodos();
    const newTodo: TodoTypes = {
        id: todos.length + 1,
        text: text,
        completed: false
    }
    const updateTodos = [...todos ,  newTodo];
    localStorage.setItem(LOCAL_STORAGE_KEY , JSON.stringify(updateTodos));
    return newTodo;
},
//update Todos
updateTodo : (todo:TodoTypes): TodoTypes | null=> {
const todos = TodoService.getTodos();
const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t ));
localStorage.setItem(LOCAL_STORAGE_KEY , JSON.stringify(updateTodos));
return updateTodos.find((t) => t.id === todo.id) || null;
},
//Deleting the Todos
deleteTodo: (id:number):void => {
    const todos = TodoService.getTodos();
    const updatedTodos =  todos.filter((todos) => todos.id !==id);
    localStorage.setItem(LOCAL_STORAGE_KEY , JSON.stringify(updatedTodos))

}
}
export default TodoService