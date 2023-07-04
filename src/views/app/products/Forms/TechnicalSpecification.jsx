import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Field, Form,FieldArray, Formik } from 'formik';
import React, { useState , forwardRef} from 'react';
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
const TechnicalSpecification = forwardRef((props, ref) => {
  const [formKey] = useState(()=>0);
  const [options, setOptions] = useState(()=>[]);
  

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
      validationSchema={schema}
        initialValues= {{technicalSpec : []}}
        onSubmit={() => {}}
      >
        {({ values , errors ,  setFieldValue  , setFieldTouched}) => (
          <>
          {console.log(errors)}
            <Form Form className="av-tooltip tooltip-label-bottom">
            <FieldArray name='technicalSpec'>
            {({ push, remove }) => ( <>
              <table className="table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Specification</th>
                    <th>Values</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
               {values && values?.technicalSpec?.map((item,index) =>   <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>
                      <FormikReactSelect
                         name={`technicalSpec[${index}].id`}
                        id={`technicalSpec[${index}].id`}
                        options={options}
                        onChange={setFieldValue}
                        // onChange={(_,value) => setFieldTouchedCb(value,index , 'techSpech' , values)}
                        onBlur={setFieldTouched}
                      />
                      {errors?.technicalSpec?.[index]?.id && <div className="invalid-feedback d-block">
                       {errors?.technicalSpec?.[index]?.id}
                      </div>}
                    </td>
                    <td>
                      <FormGroup className="form-group ">
                        <Field className="form-control" 
                         name={`technicalSpec[${index}].value`}
                        />
                     {errors?.technicalSpec?.[index]?.value && <div className="invalid-feedback d-block">
                       {errors?.technicalSpec?.[index]?.value}
                      </div>}
                      </FormGroup>
                    </td>
                    <td>
                      <Row>
                        <button
                          type="button"
                          className="glyph-icon action-icons m-2 simple-icon-trash"
                          onClick={() => remove(index)}
                        />
                      </Row>
                    </td>
                  </tr>)}
                </tbody>
              </table>
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
