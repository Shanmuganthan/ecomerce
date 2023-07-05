import { IMAGE_URL } from 'constants/defaultValues';
import React from 'react';

const ImagePreview = ({type,values , deleteImages , originalValue , index ,customClass=''}) => {
    return (
        <>
        <div className={`custom-preview dropzone  ${customClass}` }><div className='dz-preview mb-3 dz-processing dz-image-preview dz-success dz-complete'> 
        
        <div className="d-flex flex-row "> <div className="p-0 w-30 position-relative" >
        <div className="preview-container"><img className='img-thumbnail border-0' src={`${IMAGE_URL}/${type}/${values.image}`} alt={values.name}/> </div> 
        </div><div className='pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative'>
        <div> <span data-dz-name="true">{values.image}</span> </div>
        </div>
        </div>
        { deleteImages && <a onClick={()=>deleteImages(index , values.name , 'D' , originalValue)} href="#/" className="remove" > <i className="glyph-icon simple-icon-trash" /> </a> }
        </div></div>
        </>
    )
}

export default ImagePreview;