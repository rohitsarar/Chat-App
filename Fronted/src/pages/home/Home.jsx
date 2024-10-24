import React from 'react'
import Sidebar from '../../components/Sidebar';
import MessagesContainer from '../../components/MessagesContainer';

function Home() {
  return (
    <div className='flex sm:h-[450px] md:h-[730px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
     <Sidebar/>
     <MessagesContainer/>
    </div>

  )
}

export default Home;