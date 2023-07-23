import React, { useEffect , useState } from 'react';
import { Field, Form } from 'formik';
import { FormGroup, Row } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikRadioButtonGroup, FormikReactSelect } from 'containers/form-validations/FormikFields';
import { getLov } from 'services/SubCategory';

const options = [
  { value: 'percentage', label: 'Percentage' },
  { value: 'fixed', label: 'Fixed' }
]

const PromotionForm = ({ touched, values, setFieldTouched,setFieldValue, errors }) => {
  const [subCategories, setSubCategories] = useState(()=>[]);
  const getLovList = async() => {
    let res = await getLov();
    res=res.data;
    setSubCategories(res.data)
  }

  useEffect(()=>{
    getLovList();
  },[])

  return (
    <>
      <Form className="av-tooltip tooltip-label-right">
        <FormGroup className="error-l-75">
          <div>Name</div>
          <Field className="form-control" name="name" />
          {errors.name && touched.name && (
            <div className="invalid-feedback d-block">{errors.name}</div>
          )}
        </FormGroup>

        <FormGroup className="error-l-75">
          <div>Description</div>
          <Field
            className="form-control"
            name="description"
            component="textarea"
          />
           {errors.description && touched.description && (
            <div className="invalid-feedback d-block">{errors.description}</div>
          )}
        </FormGroup>

        <FormGroup className="error-l-75">
          <div>Start Date</div>
          <Row className="mb-5">
            <Colxx xxs="12">
              <DatePicker
                selected={values.startDate }
                onChange={(e) => setFieldValue('startDate', e)}
                name="startDate"
                placeholderText="Start Date"
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm"
                timeFormat="HH:mm"
                timeIntervals={10}
                timeCaption="Time"
              />
            </Colxx>
          </Row>
          {errors.startDate && touched.startDate && (
            <div className="invalid-feedback d-block">{errors.startDate}</div>
          )}
        </FormGroup>

        <FormGroup className="error-l-75">
          <div>End Date</div>
          <Row className="mb-5">
            <Colxx xxs="12">
              <DatePicker
                selected={values.endDate}
                onChange={(e) => setFieldValue('endDate', e)}
                name="endDate"
                placeholderText="End Date"
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm"
                timeFormat="HH:mm"
                timeIntervals={10}
                timeCaption="Time"
              />
            </Colxx>
          </Row>
          {errors.endDate && touched.endDate && (
            <div className="invalid-feedback d-block">{errors.endDate}</div>
          )}
        </FormGroup>

        <FormGroup className="error-l-75">
          <div>Discount Type</div>
          <FormikRadioButtonGroup
                  name="discountType"
                  id="discountType"
                  value={values.discountType}
                  options={options}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                    />
            {errors.discountType && touched.discountType && (
              <div className="invalid-feedback d-block">{errors.discountType}</div>
            )}
        </FormGroup>

        <FormGroup className="error-l-75">
          <div>Discount Value</div>
          <Field className="form-control" name="discountValue" />
          {errors.discountValue && touched.discountValue && (
              <div className="invalid-feedback d-block">{errors.discountValue}</div>
            )}
        </FormGroup>
        <FormGroup className="error-l-75">
          <div>Priotity </div>
          <Field className="form-control" name="priotityValue" />
        </FormGroup>

        <FormGroup className="error-l-75">
        <div>Sub Categories*(If None is selected promotion will apply to allthe products)</div>
         <FormikReactSelect
                      name="subCategories"
                      id="subCategories"
                      value={values.subCategories}
                      isMulti
                      options={subCategories}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
           </FormGroup>

      </Form>
    </>
  );
};
export default PromotionForm;
