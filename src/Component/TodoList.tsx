import React, {useState} from 'react'
import TodoTypes from '../todo'
import TodoService from '../TodoService'
import {FaEdit , FaCheck} from "react-icons/fa"
import {GiCancel} from "react-icons/gi"
import {RiDeleteBin5Fill} from "react-icons/ri"
import TodoForm from './TodoForm'
import "../CSS/TodoList.css"
const TodoList = () => {
    const [todos , setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
    const [editID , seteditID] = useState<number| null>(null)
    const [editText, setEditText] = useState<string>('')
// function for handling edit functions

const handleEditStart = (id:number , text:string) => {
    seteditID(id)
    setEditText(text)
}
const handleEditCancel = () => {
    seteditID(null)
    setEditText("")
}
const handleEditSave = (id: number) => {
    if (editText.trim() !== '') {
      const existingTodo = todos.find(t => t.id === id);
      if (existingTodo) {
        const updatedTodo = TodoService.updateTodo({
          id,
          text: editText,
          completed: existingTodo.completed, // Preserve the completed status
        });

        if (updatedTodo) {
          setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
          );
          seteditID(null);
          setEditText('');
        } else {
          console.error(`Failed to update todo with id ${id}`);
        }
      }
    }
  };
  //function to delete todo
const handleDeleteTodo = (id:number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodo)=> prevTodo.filter((todo)=> todo.id !== id)) 
}
  return (
    <div className='todoContainer'>
      <div>
      <TodoForm setTodos = {setTodos}/>
      </div>
      {todos.map((todo) => (
        <div className='items' key={todo.id}>
            {editID == todo.id ? (
                <div className='editedText'> 
                <input type='text' value={editText} onChange={(e)=> setEditText(e.target.value)} autoFocus={true}/>
                <button className='cancelBtn' onClick={()=> handleEditSave(todo.id)}> <FaCheck/></button>
                <button onClick={()=> handleEditCancel()}><GiCancel/> </button>

                </div>
            ):( 
              <div className="editBtn">
              <span>{todo.text}</span>
              <button onClick={()=> handleEditStart(todo.id , todo.text)}><FaEdit/> </button>
              </div>
            
            )}
            <button onClick={()=> handleDeleteTodo(todo.id)}> <RiDeleteBin5Fill/></button>
        </div>
      ))}
    </div>
  )
}

export default TodoList
