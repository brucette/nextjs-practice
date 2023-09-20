'use client'
import React, { useState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface CloudinaryResult {
    public_id: string
}

const UploadPage = () => {
const [publicId, setPublicId] = useState('');

  return (
    <>
        {publicId && 
            <CldImage 
                src={publicId}
                width={270}
                height={180}
                alt='bright fuscia flowers' />}
        <CldUploadWidget 
            uploadPreset='kzai5csm'
            onUpload={(result, widget) => {
                console.log(result, widget)
                
                if (result.event !== 'success') return;
                const info = result.info as CloudinaryResult;
                setPublicId(info.public_id)
            }}>
            {/* CldUploadWidget expects a function as child/children */}
            {/* next-cloudinary passes an object to the below function, whcih we destructure and grap the 'open' function from */}
            {({ open }) => 
            <button 
            className='btn btn-primary'
            onClick={() => open()}>
                Upload
            </button>}
        </CldUploadWidget>
    </>
  )
}

export default UploadPage;