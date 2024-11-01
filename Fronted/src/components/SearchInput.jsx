import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import useConversation from '../zushand/useConversation';
import useGetConversations from './hooks/useGetConversations';
import toast from 'react-hot-toast';

function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!search) return;
    if (search.length < 3) {
      return toast.error('Search term must be at least 3 characters long');
    }
  
    if (!conversations) {
      return toast.error("Conversations data is not available");
    }
  
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
  
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch(""); // Clear search input after selection
    } else {
      toast.error("No such user found!");
    }
  };

  

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search...'
        className='input input-bordered rounded-full'
        value={search} // Bind `search` state to the input
        onChange={(e) => setSearch(e.target.value)} // Update `search` state on input change
      />
      <button type='submit' className='btn btn-circle bg-500 text-white'>
        <FaSearch />
      </button>
    </form>
  );
}

export default SearchInput;
