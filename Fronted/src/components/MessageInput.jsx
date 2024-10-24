import React from 'react';
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";

function MessageInput() {
  return (
    <form className='px-3 my-3'>
      <div className='w-full relative flex items-center'>
        {/* Smile icon button on the left */}
        <button type='button' className='absolute inset-y-0 left-3 flex items-center text-gray-400'>
          <FaRegSmile />
        </button>

        {/* Attachment icon button next to the smile icon */}
        <button type='button' className='absolute inset-y-0 left-10 flex items-center text-gray-400'>
          <ImAttachment />
        </button>

        {/* Input field with adjusted padding to account for both icons */}
        <input
          type='text'
          className='pl-16 pr-12 border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
          placeholder='Send a message'
        />

        {/* Send button on the right */}
        <button type='submit' className='absolute inset-y-0 right-3 flex items-center text-gray-400'>
          <IoSend />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
