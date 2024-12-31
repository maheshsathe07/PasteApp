import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

const ViewPaste = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {id} = useParams();

    const allPastes = useSelector((state) => state.paste.pastes);

    const paste = allPastes.filter((item) => item._id === id)[0];

    return (
        <div className='flex flex-col gap-7'>
            <div className='flex flex-row gap-4 place-content-between'>
                <input
                    className='p-3 rounded-2xl mt-2 w-[65%] pl-4'
                    type='text' 
                    placeholder='Enter your title'
                    disabled
                    value={paste.title}
                />
            </div>
            <div className='mt-8'>
                <textarea 
                    className='rounded-2xl mt-4, min-w-[500px] p-4'
                    value={paste.content}
                    placeholder='Enter your content'
                    disabled
                    rows={20}/>
            </div>
        </div>
    )
}

export default ViewPaste
