import { Field, Formik } from 'formik';
import React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';

const TechnicalSpecification = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={() => {}}
      >
         {({ errors, touched }) => <>
        
        <Form Form className="av-tooltip tooltip-label-bottom">
              <FormGroup className="form-group has-float-label">
                <Label>
                  Product Name
                </Label>
                <Field  className="form-control" name="productName" />
                {errors.productName && touched.productName && (
                  <div className="invalid-feedback d-block">{errors.productName}</div>
                )}
              </FormGroup>
              </Form>
        </>}
      </Formik>
    </>
  );
};

export default TechnicalSpecification;
