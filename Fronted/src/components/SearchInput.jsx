import React from 'react'
import { FaSearch } from "react-icons/fa";
function SearchInput() {
    return (
        <form className='flex items-center gap-2'>
         <input type='text' placeholder='Serach_' className='input input-bordered rouded-full'/>
     <button type='submit' className='btn btn-circle bg-500 text-white'>
     <FaSearch />
     </button>
        </form>
       )
}

export default SearchInput;