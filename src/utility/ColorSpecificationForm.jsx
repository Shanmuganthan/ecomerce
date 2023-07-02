import React from 'react';
import { Field  , Form} from 'formik';
import { FormGroup } from 'reactstrap';


const ColorSpecificationForm = ({ touched ,errors }) => {


  return (
    <>
      <Form className="av-tooltip tooltip-label-right">
       
        <FormGroup className="error-l-75">
          <div >Color</div>
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
          <div >Color Code</div>
          <Field 
          className="form-control" name="colorCode"
          />
        </FormGroup>
      </Form>
    </>
  );
};
export default ColorSpecificationForm;
