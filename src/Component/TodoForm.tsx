import React , {Dispatch , SetStateAction , useState} from 'react'
import TodoService  from '../TodoService'
import TodoTypes from '../todo'
import "../CSS/TodoForm.css"

interface PropTypes {
    setTodos : Dispatch<SetStateAction<TodoTypes[]>>
}

const TodoForm:React.FC<PropTypes> = ({setTodos}) => {
    const [newTodotxt , setNewTodotxt] = useState<string>("");
    const handleAddTodo = () => {
        if(newTodotxt.trim() !== ""){
            const newTodo = TodoService.addTodos(newTodotxt);
            setTodos((prevTodo) => [...prevTodo , newTodo]);
            setNewTodotxt("");
          
        }
     }
  return (

    <div className='inputForm'>
       <input type='text' value={newTodotxt} onChange={(e) => setNewTodotxt(e.target.value)}
       autoFocus={true}
       placeholder='Add task'/>
       <button onClick={handleAddTodo}> Add Todo</button>
    </div>
  )
}

export default TodoForm
