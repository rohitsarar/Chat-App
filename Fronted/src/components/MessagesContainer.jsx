import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import {TiMessages} from 'react-icons/ti'
import useConversation from '../zushand/useConversation'
import { useAuthContext } from './context/AuthContext'

function MessagesContainer() {
 const {selectedConversation,setSelectedConversation}=useConversation();

 useEffect(()=>{
  return ()=>setSelectedConversation(null);
 },[setSelectedConversation]);
 
  return (
    <div className='md:min-w-[1100px] flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected/>
      ):(
        <>
        <div className='bg-slate-500 px-4 py-2 mb-2'>
        <span className='label-text'>To:</span>
        <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
      </div>
      <Messages/>
      <MessageInput/>
      </>
      )} 
    </div>
  );
};

export default MessagesContainer;


const NoChatSelected=()=>{
  const {authUser}=useAuthContext();
  return(
    <div className='flex items-center justify-center w-full h-full'>
      <div className=' px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 To {authUser.fullName} </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center'/>
      </div>
    </div>
  )
};




// import React from 'react'
// import Messages from './Messages'
// import MessageInput from './MessageInput'
// import {TiMessages} from 'react-icons/ti'

// function MessagesContainer() {
//   const noChatSelected=true;
//   return (
//     <div className='md:min-w-[1100px] flex flex-col'>
//       {noChatSelected ? (
//         <NoChatSelected/>
//       ):(
//         <>
//         <div className='bg-slate-500 px-4 py-2 mb-2'>
//         <span className='label-text'>To:</span>
//         <span className='text-gray-900 font-bold'>Rohit bhai</span>
//       </div>
//       <Messages/>
//       <MessageInput/>
//       </>
//       )} 
//     </div>
//   );
// };

// export default MessagesContainer;


// const NoChatSelected=()=>{
//   return(
//     <div className='flex items-center justify-center w-full h-full'>
//       <div className=' px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
//         <p>Welcome 👋 To Chat-App </p>
//         <p>Select a chat to start messaging</p>
//         <TiMessages className='text-3xl md:text-6xl text-center'/>
//       </div>
//     </div>
//   )
// };

