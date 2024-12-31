import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useEffect } from 'react';
const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const pasteId = searchParams.get("pasteId"); // if url contains pasteid then only it contains value otherwise it is null.
    const dispatch = useDispatch();

    const allPastes = useSelector((state) => state.paste.pastes);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString()
        }

        if(pasteId){
            // updating the paste
            dispatch(updateToPastes(paste));
        }else{
            // creating new paste
            dispatch(addToPastes(paste));
        }

        // after creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    useEffect(() =>{
        if(pasteId){
            const paste = allPastes.find((item) => item._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
       
    }, [pasteId]);
    return (
        <div className='flex flex-col gap-7'>
            <div className='flex flex-row gap-4 place-content-between'>
                <input
                    className='p-3 rounded-2xl mt-2 w-[65%] pl-4'
                    type='text' 
                    placeholder='Enter your title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button 
                    onClick={createPaste}
                    className='p-3 rounded-2xl mt-2'>
                    {pasteId ? "Update My Paste" : "Create My Paste"}
                </button>
            </div>
            <div className='mt-8'>
                <textarea 
                    className='rounded-2xl mt-4, min-w-[500px] p-4'
                    value={value}
                    placeholder='Enter your content'
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}/>
            </div>
        </div>
    )
}

export default Home
