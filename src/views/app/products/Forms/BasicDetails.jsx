import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Label, Row } from 'reactstrap';
import { FormikCustomCheckbox, FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Colxx } from 'components/common/CustomBootstrap';
import DropzoneExample from 'containers/forms/DropzoneExample';

import { getLov as categoryLov } from 'services/Category';
import { getLov as brandsLov } from 'services/Brands';
import { getLov as productCategoryLov } from 'services/productCategory';
import { getLov as  subCategory } from 'services/SubCategory';
import ImagePreview from 'utility/ImagePreview';



const formInitialValues = {
  productName: '',
  productShortDesc: '',
  productDesc: '',
  productThumb: '',
  brand: '',
  productCategory: '',
  category: '',
  subCategory: '',
  active: true,
  displayInHome: true,
  isDraft: true,
  isFeatureProduct: true,
};

const schema = Yup.object().shape({
  productName: Yup.string().required('Product Name is required'),
  productShortDesc: Yup.string().required(
    'Product Short Description is required'
  ),
  productDesc: Yup.string().required('Product Long Description is required'),
  productThumb: Yup.string().required('Product Thumbnail is required'),
  brand: Yup.object()
  .shape({})
  .nullable().required('Manufacturer is required'),
  productCategory: Yup.object()
    .shape({})
    .nullable()
    .required('Product Category is required'),
  category: Yup.object().shape({}).nullable().required('Category is required'),
  subCategory: Yup.object()
    .shape({})
    .nullable()
    .required('Sub Category is required'),
  active: Yup.bool(),
  displayInHome: Yup.bool(),
  isDraft: Yup.bool(),
});

const BasicDetails = forwardRef(({data , operations},ref) => {
  const [options, setOptions] = useState(()=>({}));
  const [formKey, setFormKey] = useState(0);
  const [originalOptions, setOrginalOptions] = useState(()=>({}));
  const [initialValues,setInitialValues] = useState(() => formInitialValues);
  // const [loading, setLoading] = useState(()=>true);

  const copyObject = (source, destination) =>{
    const result = {};
    Object.keys(source).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(destination, key)) {
        result[key] = source[key];
      }
    })
    return result;
  }
  
  const dropzone = useRef();

  const getMasterData = async () => {
   const  res =await Promise.all([ productCategoryLov(), brandsLov() ,  categoryLov() ,  subCategory()])
   res.map((item) => item.data).forEach((item) => {
    options[item.type] = item.data
   });
   setOptions(options)
   setOrginalOptions({...options})
  }

  useEffect(()=>{
    getMasterData();
  },[])


   useEffect(()=>{
    if(data != null){
      const values = {...copyObject(data , initialValues)};
      setInitialValues(values);
        setFormKey(1)
    }
   },[data])

   const categoryChange = (name , value , setFieldValueCb,values) => {
    const val = values;
    if(name === "productCategory"){
      val.category = '';
    options.category = originalOptions.category.filter((item) => item.parentId === value.value)
    
    }else if(name === 'category'){
      val.subCategory = '';
      options.subCategory = originalOptions.subCategory.filter((item) => item.parentId === value.value)
     }    
    
     setFieldValueCb(name,value)
     setOptions(options)
   
    }

  return (
    <>
      <Formik
        key={formKey}
        enableReinitialize
        innerRef={ref}
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={() => {}}
      >
        {({ errors, touched, values , setFieldValue,
                setFieldTouched }) => (
          <>
            <Form className="av-tooltip tooltip-label-bottom">
              <Colxx lg="12" xl="12">
              <Row className="mb-4 col-md-12">
                <div className="col-md-6">
                  <FormGroup className="form-group ">
                    <Label>Product Name</Label>
                    <Field className="form-control"
                    value={values.productName}
                    name="productName" />
                    {errors.productName && touched.productName && (
                      <div className="invalid-feedback d-block">
                        {errors.productName}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group ">
                    <Label>Product Short Description</Label>
                    <Field className="form-control"    component="textarea" name="productShortDesc" />
                    {errors.productShortDesc && touched.productShortDesc && (
                      <div className="invalid-feedback d-block">
                        {errors.productShortDesc}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group ">
                    <Label>Product Description</Label>
                    <Field className="form-control"    component="textarea" name="productDesc" />
                    {errors.productDesc && touched.productDesc && (
                      <div className="invalid-feedback d-block">
                        {errors.productDesc}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group ">
                    <Label>Product Thumb</Label>

                    {operations !== 'A' &&  values.productThumb && <ImagePreview type="product-thumb" values={{name : values.productName ,  image : values.productThumb}}  /> }
                    <DropzoneExample type="product-thumb" maxFileSize={1} ref={dropzone}  name="productThumb" setFieldValue={setFieldValue} />
                    {errors.productThumb && touched.productThumb && (
                      <div className="invalid-feedback d-block">
                        {errors.productThumb}
                      </div>
                    )}
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup className="form-group ">
                    <Label>Manufacturer</Label>

                    <FormikReactSelect
                      name="brand"
                      id="brand"
                      value={values.brand}
                      options={options?.brand}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.parentId && touched.parentId && (
                      <div className="invalid-feedback d-block">
                        Manufacturer is required!
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group ">
                    <Label>Product Category</Label>
                    <FormikReactSelect
                      name="productCategory"
                      id="productCategory"
                      value={values.productCategory}
                      options={options?.productCategory}
                      onChange={(name,value) => categoryChange(name,value,setFieldValue,values)}
                      onBlur={setFieldTouched}
                    />
                    {errors.productCategory && touched.productCategory && (
                      <div className="invalid-feedback d-block">
                        Product Category is required!
                      </div>
                    )}
                  </FormGroup>

                  {values.productCategory.value  && <FormGroup className="form-group ">
                    <Label>Category</Label>
                    <FormikReactSelect
                      name="category"
                      id="category"
                      value={values.category}
                      options={options?.category}
                      onChange={(name,value) => categoryChange(name,value,setFieldValue,values)}
                      onBlur={setFieldTouched}
                    />
                    {errors.category && touched.category && (
                      <div className="invalid-feedback d-block">
                        Category is required!
                      </div>
                    )}
                  </FormGroup> }

                  {values.category.value  &&<FormGroup className="form-group ">
                    <Label>Sub Category</Label>

                    <FormikReactSelect
                      name="subCategory"
                      id="subCategory"
                      value={values.subCategory}
                      options={options?.subCategory}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.subCategory && touched.subCategory && (
                      <div className="invalid-feedback d-block">
                        Sub Category is required!
                      </div>
                    )}
                  </FormGroup> }


                  <FormGroup className="error-l-175 ">
                    <FormikCustomCheckbox
                      inline
                      name="active"
                      id="active"
                      label="Active?"
                      value={values.active}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  </FormGroup>

                  <FormGroup className="error-l-175 ">
                    <FormikCustomCheckbox
                      inline
                      name="displayInHome"
                      id="displayInHome"
                      label="Display In Home?"
                      value={values.displayInHome}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  </FormGroup>
                  <FormGroup className="error-l-175 ">
                    <FormikCustomCheckbox
                      inline
                      name="isDraft"
                      id="isDraft"
                      label="Is Draft(Future Product)"
                      value={values.isDraft}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  </FormGroup>

                </div>
                </Row>
              </Colxx>
            </Form>
          </>
        )}
      </Formik>

    </>
  );
});

BasicDetails.displayName = "BasicDetails";
export default BasicDetails;
