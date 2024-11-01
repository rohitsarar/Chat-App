import React, { useState } from 'react';
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import useSendMessage from './hooks/useSendMessage';

function MessageInput() {
  const [message,setMessage]=useState("");
  const{loading,sendMessage}=useSendMessage();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!message)
      return;
    await sendMessage(message);
    setMessage("")
  }
  return (
    <form className='px-3 my-3'onSubmit={handleSubmit}>
      <div className='w-full relative flex items-center'>
       
        <button type='button' className='absolute inset-y-0 left-3 flex items-center text-gray-400'>
          <FaRegSmile />
        </button>
        <button type='button' className='absolute inset-y-0 left-10 flex items-center text-gray-400'>
          <ImAttachment />
        </button>

    
        <input
          type='text'
          className='pl-16 pr-12 border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
          placeholder='Send a message'
          value={message}
          onChange={(e)=>
            setMessage(e.target.value)
          }
        />

     
        <button type='submit' className='absolute inset-y-0 right-3 flex items-center text-gray-400'>
          {loading ? <div className='loading loading-spinner'></div>: <IoSend />}
         
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
