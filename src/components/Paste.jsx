import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const filterData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId))
  }

  function handleCopy(paste){
    navigator.clipboard.writeText(paste?.content);
    toast.success("Copied to clipboard");
  }
  return (
    <div>
      <input 
        className='p-2 rounded-2xl min-w-[600px] mt-4'
        type='search' 
        placeholder='search here' 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5'>
        {
          filterData.length > 0 &&
          filterData.map(
            (paste) => {
              return (
                <div className='border' key={paste?._id}> 
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly'>
                    <button>
                      <NavLink to={`../?pasteId=${paste?._id}`}>Edit</NavLink>
                    </button>
                    <button>
                      <NavLink to={`/pastes/${paste?._id}`}>View</NavLink>
                    </button>
                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button onClick={() => handleCopy(paste)}>
                      Copy
                    </button>
                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            } 
          )
        }
      </div>
    </div>
  )
}

export default Paste
