import React, { useRef } from 'react';
import DropzoneExample from 'containers/forms/DropzoneExample';
import { Field  , Form} from 'formik';
import { FormGroup } from 'reactstrap';
import { IMAGE_URL } from 'constants/defaultValues';

const BrandForm = ({setFieldValue , operation , touched ,values,errors}) => {
  const dropzone = useRef();
  console.log(operation)
  return (
    <>
      <Form className="av-tooltip tooltip-label-right">
        
       {operation !== 'A' && values.image && <div className='dropzone mb-3'><div className='dz-preview mb-3 dz-processing dz-image-preview dz-success dz-complete'> <div className="d-flex flex-row "> <div className="p-0 w-30 position-relative" >
        <div className="preview-container"><img className='img-thumbnail border-0' src={`${IMAGE_URL}/product-category/${values.image}`} alt={values.name}/> </div> 
        </div><div className='pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative'>
        <div> <span data-dz-name="true">{values.image}</span> </div>
        </div>
        </div></div></div>}
        
        
        {operation !== 'V' && <FormGroup className="error-l-75 ">
          <DropzoneExample type="brands" maxFileSize={1} ref={dropzone} setFieldValue={setFieldValue} />
          {errors.image && touched.image && (
                      <div className="invalid-feedback d-block">
                        {errors.image}
                      </div>
                    )}
        </FormGroup> }
        <FormGroup className="error-l-75">
          <div >Name</div>
          <Field 
          className="form-control" name="name"
          />
            {errors.name && touched.name && (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    )}
        </FormGroup>

        <FormGroup className="error-l-75">
          <div >Brand Home URL</div>
          <Field 
          className="form-control" name="url"
          />
        </FormGroup>
        
      </Form>
    </>
  );
};
export default BrandForm;
