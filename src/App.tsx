import {FaPen , FaClipboardList} from 'react-icons/fa'
import TodoList from './Component/TodoList'
import "./CSS/App.css"
function App() {


  return (
    <div className='App'>
 <div className='header'> 
  <div className='logoside'>
  <FaPen/>
 <h1>What To do</h1>
 <FaClipboardList/>
  </div>
  </div>
  <TodoList/>
    </div>
  )
}

export default App
