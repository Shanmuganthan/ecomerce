import { FieldArray, Form, Formik ,Field} from 'formik';
import React, { forwardRef, useEffect, useState , createRef } from 'react';
import { Button, FormGroup, Label  } from 'reactstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { getLov } from 'services/ColorSpecification';
import DropzoneExample from 'containers/forms/DropzoneExample';
import ImagePreview from 'utility/ImagePreview';

const schema = Yup.object().shape({
  productVariants: Yup.array().of(
    Yup.object().shape({
      variant: Yup.object()
        .shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
        .nullable()
        .required('This Field is required'),
      sku: Yup.string().required('This Field is required'),
      availabelQty: Yup.number().positive().required('This Field is required'),
      pricePerUnit: Yup.number().positive().required('This Field is required'),
      unitsInOrder: Yup.number().positive(),
      images  : Yup.array().of(Yup.string()).required("This Field is required"),
    })
  ),
  // .test('unique', 'Values must be unique', function (value) {
  //   return new Set(value.id).size === value.length;
  // }),
});
const singleRow = {
  variant: '',
  sku: '',
  availabelQty: '',
  pricePerUnit: '',
  unitsInOrder: '',
  images: [],
};
const ProductVariants = forwardRef(({ data }, ref) => {
  const [formKey, setFormKey] = useState(() => 0);
  const [options, setOptions] = useState(() => []);
  const [dynamicFields, setDynamicFields] = useState(() => []);

  const setInitialData = () => {
    if (data) {
      setDynamicFields(data?.productVariants);
      setFormKey((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setInitialData();
  }, [data]);

  const getRow = () => {
    const row = singleRow;
    row.id = uuidv4();
    return row;
  };

  const getListOfValues = async () => {
    let res = await getLov();
    res = res.data;
    setOptions(res.data);
  };

  useState(async () => {
    getListOfValues();
  }, []);


  const createDynamicRef = () => {
   return createRef(null)
  }


  const customSetField = (index,files,flag,values) =>{
    if(flag === 'A'){
        values?.productVariants[index].images.push(files);
    }else{ 
    
      values.productVariants[index].images.splice(values.productVariants[index].images.indexOf(files),1);
    }
  }
  return (
    <>
      <Formik
        innerRef={ref}
        key={formKey}
        enableReinitialize={false}
        validationSchema={schema}
        initialValues={{ productVariants: dynamicFields }}
        onSubmit={() => {}}
      >
        {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
          <>
            <Form className="av-tooltip tooltip-label-bottom">
              <FieldArray name="productVariants">
                {({ push, remove }) => (
                  <>
                    {values &&
                      values?.productVariants?.map((item, index) => (
                        <React.Fragment key={`PV-${item.id ? item?.id : index}`}>
                          {' '}
                          <div className="row">
                            <div className="col-md-6 mb-5 pr-5">
                            <Label>Choose Product Variant</Label>
                              <FormikReactSelect
                                name={`productVariants[${index}].variant`}
                                id={`productVariants[${index}].variant`}
                                options={options}
                                value={values?.productVariants?.[index]?.variant}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors?.productVariants?.[index]?.variant &&
                                touched?.productVariants?.[index]?.variant&& (
                                  <span className="invalid-feedback d-block">
                                    {errors?.productVariants?.[index]?.variant?.label}
                                  </span>
                                )}
                            </div>
                          </div>
                          <div className="col-md-12 row">
                            <div className="col-md-12 row">
                              <div className="col-md-6 pl-0">
                                <FormGroup className="form-group ">
                                  <Label>SKU</Label>
                                  <Field
                                    className="form-control"
                                    name={`productVariants[${index}].sku`}
                                    value={
                                      values?.productVariants?.[index]?.sku
                                    }
                                  />
                                  {errors?.productVariants?.[index]?.sku &&
                                    touched?.productVariants?.[index]?.sku && (
                                      <div className="invalid-feedback d-block">
                                        {errors?.productVariants?.[index]?.sku}
                                      </div>
                                    )}
                                </FormGroup>
                              </div>


                              <div className="col-md-6 pl-0">
                                <FormGroup className="form-group ">
                                  <Label>Available Quantity</Label>
                                  <Field
                                    className="form-control"
                                    name={`productVariants[${index}].availabelQty`}
                                    value={
                                      values?.productVariants?.[index]?.availabelQty
                                    }
                                  />
                                  {errors?.productVariants?.[index]?.availabelQty &&
                                    touched?.productVariants?.[index]?.availabelQty && (
                                      <div className="invalid-feedback d-block">
                                        {errors?.productVariants?.[index]?.availabelQty}
                                      </div>
                                    )}
                                </FormGroup>
                              </div>
                              
                              
                              <div className="col-md-6 pl-0">
                                <FormGroup className="form-group ">
                                  <Label>Price Per Unit </Label>
                                  <Field
                                    className="form-control"
                                    name={`productVariants[${index}].pricePerUnit`}
                                    value={
                                      values?.productVariants?.[index]?.pricePerUnit
                                    }
                                  />
                                  {errors?.productVariants?.[index]?.pricePerUnit &&
                                    touched?.productVariants?.[index]?.pricePerUnit && (
                                      <div className="invalid-feedback d-block">
                                        {errors?.productVariants?.[index]?.pricePerUnit}
                                      </div>
                                    )}
                                </FormGroup>
                              </div>


                              <div className="col-md-6 pl-0">
                                <FormGroup className="form-group ">
                                  <Label>Units In Order</Label>
                                  <Field
                                    className="form-control"
                                    name={`productVariants[${index}].unitsInOrder`}
                                    value={
                                      values?.productVariants?.[index]?.unitsInOrder
                                    }
                                  />
                                </FormGroup>
                              </div>


                              <div className='col-md-6 pl-0'>
                              <DropzoneExample values={values}  type="product-thumb" maxFileSize={1} ref={createDynamicRef()}  name={index} setFieldValueCb={customSetField} />
                              {errors?.productVariants?.[index]?.images &&
                                    touched?.productVariants?.[index]?.images && (
                                      <div className="invalid-feedback d-block">
                                        {errors?.productVariants?.[index]?.images}
                                      </div>
                                    )}
                              </div>


                              <div className='col-md-6 pl-0'>
                              {   values?.productVariants?.[index]?.images &&  values?.productVariants?.[index]?.images?.map((image)  => <React.Fragment key={`${image}`} > <ImagePreview customClass="display-inline" deleteImages={customSetField} originalValue={values} index={index} type="product-thumb" values={{name : image ,  image  }}  /> </React.Fragment> )}
                                </div>
                              

                            </div>
                           
                          </div>
                          <div className="col-md-12 text-right mb-5">
                          <button
                            type="button"
                            className="glyph-icon action-icons m-2 simple-icon-trash"
                            onClick={() => remove(index)}
                          />
                          </div>
                        </React.Fragment>
                      ))}
                  <div className='row'>
                    <div className="  text-right col-md-12 mb-5">
                      <Button
                        color="primary"
                        size="lg"
                        className="top-right-button mb-5 float-right"
                        onClick={() => push(getRow())}
                      >
                        Add New
                      </Button>
                      </div>
                    </div>
                  </>
                )}
              </FieldArray>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
});

ProductVariants.displayName = 'ProductVariants';

export default ProductVariants;
