import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Field, Form,FieldArray, Formik } from 'formik';
import React, { useState , forwardRef, useEffect} from 'react';
import { Button,  FormGroup,  Row } from 'reactstrap';
import { getLov } from 'services/TechnicalSpecification';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

const singleRow =   { id : "" , value : ""};
const schema =  Yup.object().shape({
  technicalSpec: Yup.array().of(
    Yup.object().shape({
      id: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }).nullable().required('This Field is required'),
      value: Yup.string().required('This Field is required'),
    })
  ),
});
const TechnicalSpecification = forwardRef(({data}, ref) => {
  const [formKey,setFormKey] = useState(()=>0);
  const [options, setOptions] = useState(()=>[]);
  const [techSpec ,setTechSpec] = useState(()=>[]);
  
  useEffect(()=>{
      if(data){
        setTechSpec(data?.technicalSpec);
        setFormKey(prev=>prev+1)
      }
  },[data])

  const getRow = () =>{
     const row = singleRow;
     row.id = uuidv4();
     return row;

  }

 const getTechSpec = async () =>{
  let res = await getLov()
  res = res.data;
  setOptions(res.data);
 }

  useState(async ()=>{
    getTechSpec();
  },[])


  return (
    <>
      <Formik
      innerRef={ref}
      key={formKey}
      enableReinitialize ={false}
      validationSchema={schema}
        initialValues= {{technicalSpec : techSpec}}
        onSubmit={() => {}}
      >
        {({ values , errors , touched ,  setFieldValue  , setFieldTouched}) => (
          <>

            <Form Form className="av-tooltip tooltip-label-bottom">
            <FieldArray name='technicalSpec'>
            {({ push, remove }) => ( <>
              <div className="col-md-12">
                
                  <div className='row'>
                    <div className='col-md-2'>S.No</div>
                    <div className='col-md-4'>Specification</div>
                    <div className='col-md-4'> Values</div>
                    <div className='col-md-2'> Actions</div>
                  </div>
                
               {values && values?.technicalSpec?.map((item,index) =>   <div className='row' key={uuidv4()}>
                    <div className='col-md-2'>{index+1}</div>
                    <div className='col-md-4'>
                      <FormikReactSelect
                         name={`technicalSpec[${index}].id`}
                        id={`technicalSpec[${index}].id`}
                        options={options}
                        value={values?.technicalSpec?.[index]?.id}
                        onChange={setFieldValue}
                        // onChange={(_,value) => setFieldTouchedCb(value,index , 'techSpech' , values)}
                        onBlur={setFieldTouched}
                      />
                      {errors?.technicalSpec?.[index]?.id &&  touched?.technicalSpec?.[index]?.id && <span className="invalid-feedback d-block">
                       {errors?.technicalSpec?.[index]?.id}
                      </span>}
                    </div>
                    <div className='col-md-4'>
                      <FormGroup className="form-group ">
                        <Field className="form-control" 
                        name={`technicalSpec[${index}].value`}
                        value={values?.technicalSpec?.[index]?.value}
                        />
                     {errors?.technicalSpec?.[index]?.value && touched?.technicalSpec?.[index]?.value && <div className="invalid-feedback d-block">
                       {errors?.technicalSpec?.[index]?.value}
                      </div>}
                      </FormGroup>
                    </div>
                    <div className='col-md-2'>
                      <Row>
                        <button
                          type="button"
                          className="glyph-icon action-icons m-2 simple-icon-trash"
                          onClick={() => remove(index)}
                        />
                      </Row>
                    </div>
                  </div>)}
                </div>
               <div className='row'>
               <div className=" col-md-12 mb-5">
                 <Button
                   color="primary"
                   size="lg"
                   className="top-right-button float-right"
                   onClick={()=>push(getRow())}
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
TechnicalSpecification.displayName = "TechnicalSpecification";
export default TechnicalSpecification;
