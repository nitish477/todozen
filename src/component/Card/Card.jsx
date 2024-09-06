import "./Card.css"
import {  MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
function Card({title,discription,id,priority,removeFromTaskBar,setTaskEdit,emoji}){
    return (
        
    <>
    
       <div className='task-contanier'>
           <h2 className='task-title'>{title} {" "} {emoji}</h2>
           <p className='task-discription'> {discription} </p>
           <span className='task-priority'>  {priority} </span>
           <span className='remove-task' onClick={()=>
        {
            removeFromTaskBar(id)
        }} ><MdDelete/></span>
           <span className='edit-task' onClick={()=>
        {
            setTaskEdit(id)
        }} ><FaRegEdit/></span>
       </div>

    </>
    
    )

}

export default Card