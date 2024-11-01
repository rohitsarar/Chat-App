import React from 'react';
import Conversation from './Conversation';
import useGetConversations from './hooks/useGetConversations';
import { getRandomEmoji } from '../utils/emoji';

function Conversations() {
  const [loading, conversations] = useGetConversations();

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {loading && <span className='loading loading-spinner mx-auto'></span>}

      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1} // Corrected this line
        />
      ))}
    </div>
  );
}

export default Conversations;
