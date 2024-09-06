import React, { useEffect, useState } from 'react'
import "./Home.css"
import { SiWelcometothejungle } from "react-icons/si";
import { MdAddToPhotos, MdAssignment, MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import toast, { Toaster } from 'react-hot-toast';
import { GiCrossMark } from "react-icons/gi";
import {saveTOLocalStorage} from "./../../Util/LocalStorage"
import Card from '../../component/Card/Card';
function Home() {
  const [open,setopen]=useState(false)
  const [openemoji,setopenemoji]=useState(false)
  const [showData,setShowData]=useState(false)
  const [data,setData]=useState({
    title:"",
    priority:"",
    description:"",
    emoji:""
  })
  const[task,setTask]=useState([])
  const [emoji,setEmoji]=useState("")
  const [isEdit,setIsEdit]=useState(false)

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if(savedTasks && savedTasks.length>0){
          setTask(savedTasks);
        }
  }, []);

  const handleChange=(e)=>{
      const {name,value}=e.target;
      setData((prevData)=>({
        ...prevData,
        [name]:value
      
      }))
  }

  const handleEmojiClick = (emojiObject) => {
    setEmoji(emojiObject.emoji);
    setData((prevData) => ({
      ...prevData,
      emoji: emojiObject.emoji
    }));
    setopenemoji(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const random = Math.ceil(Math.random() * 1000);
    const newTask = {
      id: random,
      title: data.title,
      description: data.description,
      priority: data.priority,
      emoji: data.emoji
    };
    const updatedTasks = [...task, newTask];
    setTask(updatedTasks);
    
  saveTOLocalStorage(updatedTasks)
   
    setData({
      title: "",
      priority: "",
      description: "",
      emoji: ""
    });
    setEmoji("");
    toast.success("Add Task SucessFully")
    setopen(false)
  };

  const handleRemove = (id)=>{
    const updatetask= task.filter((obj)=>obj.id!==id)
    setTask(updatetask)
    saveTOLocalStorage(updatetask)
       
  }

  const handleEdit = (id)=>{
    setIsEdit(true)
    setShowData(false)
    setopen(true)
    const editTask = task.find((obj)=>obj.id===id)
      setData({
      title: editTask.title,
      priority: editTask.priority,
      description: editTask.description,
    })
    setEmoji(editTask.emoji)    
  }
  
  return (
    <>
      <div className='main'>
      <h1 className='title'><SiWelcometothejungle/>elcome to my TodoZen! </h1>
      <p className='about-home'>With our TodoZen app do , you can easily prioritize your daily tasks, ensuring you never forget anything important. Simply think through your tasks, and you can add, delete, or update them based on your current needs and priorities.<del> Say goodbye to forgetting tasks </del> &nbsp; and hello to a more organized and efficient you!😇
      </p>

      <div className='sub-area'>
           <div className='box-contanier'>
            <div className='boxes '>
              <p className='icons'><MdAddToPhotos/></p>
              <p className='icon-text'>Add Your All Notes</p>
            </div>
            <div className='boxes'>
            <p className='icons'><MdAssignment/></p>
              <p className='icon-text'>See Your All Added Notes</p>
            </div>
           </div>
           <div className='box-contanier' >
            <div className='boxes'>
            <p className='icons'><FaRegEdit/></p>
              <p className='icon-text'>Edit Your Notes</p>
            </div>
            <div className='boxes'>
            <p className='icons'><MdDelete/></p>
              <p className='icon-text'>Delete Your Notes</p>
            </div>
           </div>
           </div>

       
       
       <div className='btn-container mt'>
        <button className='btn m' onClick={()=>(setopen(true))}> <MdAddToPhotos/> Add Notes</button>
        <button className='btn m' onClick={()=>setShowData(true)}> <MdAddToPhotos/> See Notes</button>
       </div>

           {/* Add a note add drawer */}
           {
        open && <div className='Model'>
        <div className='add-note'>
          <GiCrossMark className='modal-Close' onClick={()=>setopen(false)}/>
          <h1 className='title'>Add Your Notes</h1>
           <form onSubmit={handleSubmit}>
           <input className='input' type='text'  value={data.title} name='title' placeholder='Enter Title' onChange={handleChange}/>
           <input className='input'  type='text'  value={data.description} name='description' placeholder='Enter Description'onChange={handleChange}/>
            <select className='select' name='priority' value={data.priority}  onChange={handleChange}>
              <option>SELECT</option>
              <option value={"High"}>High</option>
              <option value={"Medium"}>Medium</option>
              <option value={"Low"}>Low</option>
            </select>
            <input className='input' readOnly onClick={()=>setopenemoji(true)} value={emoji} placeholder='Choose Emoji'/>

            <EmojiPicker 
             open={openemoji}
             className='emoji'
             skinTonesDisabled
             onEmojiClick={handleEmojiClick}
            />

            <button type='submit' className='btn' style={{
              display:"block",
              margin:"20px auto",
              width:"70%",
              fontWeight:"600"
            }}>Add Note</button>
           </form>

        </div>
       </div>
       }

       {showData && 
         <div className='Model'>
         <div className='add-note'>
           <GiCrossMark className='modal-Close' onClick={()=>setShowData(false)}/>
           <h1 className='title'>Show task</h1>
          <div className='show-data'> 
              {
                task.length>0 ? (task.map((obj,i)=>{
                  const {title,priority,description,emoji,id}=obj
                  return <Card title={title} discription={description} priority={priority} removeFromTaskBar={()=>handleRemove(id)} setTaskEdit={()=>handleEdit(id)} key={id} emoji={emoji}/>
                })) : <p className='no-task'>No Task Found</p>
              }
          </div>
         </div>
        </div>
       }

      </div>
      <Toaster/>
    </>
  )
}

export default Home
