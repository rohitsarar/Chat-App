import React from 'react'
import useConversation from '../zushand/useConversation';
import { useSocketContext } from './context/SocketContext';

function Conversation({conversation,lastIdx,emoji}) {
  const {selectedConversation,setSelectedConversation}=useConversation();
  const isSelected=selectedConversation?._id === conversation._id;

//socket impletation

const {onlineUsers}=useSocketContext();
const isOnline=onlineUsers.includes(conversation._id)





  return (
    <>
    
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
      ${isSelected ? "bg-gray-500": ""}
      
      `}
      onClick={() => setSelectedConversation(conversation)}
      >
            
    <div className={`avatar ${isOnline ? "online" : ""}`}>
  <div className="w-24 rounded-full">
    <img src={conversation.profilePic} />
  </div>
</div>


<div className='flex flex-col flex-1'>
    <div className='flex gap-3 justify-between'>
        <p className='font-bold text-gray-200'>{conversation.fullName}
        </p>
        <span className='text-x1'>{emoji}</span>
    </div>
</div>


    </div>
    {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    
    </>
    
  )
}

export default Conversation;