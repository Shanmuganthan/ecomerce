import React from 'react';
import { Field  , Form} from 'formik';
import { FormGroup } from 'reactstrap';


const TechnicalSpecificationForm = ({ touched ,errors }) => {


  return (
    <>
      <Form className="av-tooltip tooltip-label-right">
       
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
          <div >Description</div>
          <Field 
          className="form-control" name="description"
          component="textarea"
          />
        </FormGroup>
      </Form>
    </>
  );
};
export default TechnicalSpecificationForm;
