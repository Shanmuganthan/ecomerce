import { Colxx } from 'components/common/CustomBootstrap';
import { Form, Field, Formik } from 'formik';
import React , {useState , forwardRef , useEffect} from 'react';
import {  FormGroup, Label, Row } from 'reactstrap';
import * as Yup from 'yup';

const formInitialValues = {
  metaTitle: '',
  metaDesc: '',
  metaKeywords: '',
};

const schema = Yup.object().shape({
  metaTitle: Yup.string().required('Meta Tile is required'),
  metaDesc: Yup.string().required('Meta Description is required'),
  metaKeywords: Yup.string().required('Meta keywords are required'),
});

const SEOAndMarketingDetails = forwardRef(({ data }, ref) => {
  const [formKey, setFormKey] = useState(0);
  const [initialValues, setInitialValues] = useState(() => formInitialValues);

  const copyObject = (source, destination) =>{
    const result = {};
    Object.keys(source).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(destination, key)) {
        result[key] = source[key];
      }
    })
    return result;
  }

  useEffect(() => {
    if (data != null) {
      const values = {...copyObject(data , initialValues)};
      setInitialValues(values);
      setFormKey(1);
    }
  }, [data]);

  return (
    <>
      <Colxx lg="12" xl="12">
        <Formik
          key={formKey}
          enableReinitialize
          innerRef={ref}
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={() => {}}
        >
          {({ errors, touched }) => (
            <>
              <Form Form className="av-tooltip tooltip-label-bottom">
                <Row className="mb-4 col-md-12">
                  <div className="col-md-6">
                    <FormGroup className="form-group ">
                      <Label>Meta Title</Label>
                      <Field className="form-control" name="metaTitle" />
                      {errors.metaTitle && touched.metaTitle && (
                        <div className="invalid-feedback d-block">
                          {errors.metaTitle}
                        </div>
                      )}
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup className="form-group ">
                      <Label>Meta Keywords</Label>
                      <Field className="form-control" name="metaKeywords" />
                      {errors.metaKeywords && touched.metaKeywords && (
                        <div className="invalid-feedback d-block">
                          {errors.metaKeywords}
                        </div>
                      )}
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup className="form-group ">
                      <Label>Meta Description</Label>
                      <Field className="form-control" name="metaDesc" />
                      {errors.metaDesc && touched.metaDesc && (
                        <div className="invalid-feedback d-block">
                          {errors.metaDesc}
                        </div>
                      )}
                    </FormGroup>
                  </div>
                </Row>
              </Form>
            </>
          )}
        </Formik>
      </Colxx>
    </>
  );
});

SEOAndMarketingDetails.displayName = "SEOAndMarketingDetails";
export default SEOAndMarketingDetails;
