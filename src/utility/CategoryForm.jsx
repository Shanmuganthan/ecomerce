import React, { useRef ,useState  ,useEffect} from 'react';
import DropzoneExample from 'containers/forms/DropzoneExample';
import { Field  , Form} from 'formik';
import { FormGroup } from 'reactstrap';
import { IMAGE_URL } from 'constants/defaultValues';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { getLov } from 'services/productCategory';


const CategoryForm = ({setFieldValue , operation , touched ,values,errors , setFieldTouched}) => {
  const dropzone = useRef();
  const [productCategory , setProductCategory] = useState(()=>[]);
  
  const getProductCategoryLov = async () => {
     let res = await getLov();
     res = res.data;
     setProductCategory(res.data);
  }

  useEffect(()=>
  getProductCategoryLov()
  ,[])
console.log(values.parentId);

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
          <DropzoneExample type="category" maxFileSize={1} ref={dropzone} setFieldValue={setFieldValue} />
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
        <FormikReactSelect
                        name="parentId"
                        id="parentId"
                        value={values.parentId}
                        options={productCategory}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      </FormGroup>
        
      </Form>
    </>
  );
};
export default CategoryForm;
