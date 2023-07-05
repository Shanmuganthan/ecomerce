import { Field, Formik } from 'formik';
import React , {forwardRef} from 'react';
import { Form, FormGroup, Label } from 'reactstrap';

const ProductVariants = forwardRef((props,ref) => {
  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={{
          name: '',
        }}
        onSubmit={() => {}}
      >
        {({ errors, touched }) => <>
        
        <Form  className="av-tooltip tooltip-label-bottom">
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
});

ProductVariants.displayName = "ProductVariants";

export default ProductVariants;
