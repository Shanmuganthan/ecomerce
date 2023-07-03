import React , { useState ,useEffect, createRef} from 'react';
import { useHistory,useParams } from 'react-router-dom';
import { Wizard, Step, Steps } from 'react-albus';
import { Card, CardBody } from 'reactstrap';
import TopNavigation from 'components/wizard/TopNavigation';
import BottomNavigation from 'components/wizard/BottomNavigation';
import { postData } from 'services/Products';

import BasicDetails from './Forms/BasicDetails';
import SEOAndMarketingDetails from './Forms/SEOAndMarketingDetails';
import ProductVariants from './Forms/ProductVariants';
import TechnicalSpecification from './Forms/TechnicalSpecification';

const ProductForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [topNavDisabled] = useState(false);
  const [loading,setLoading] = useState(()=>false);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [operations , setOperations ] = useState(() => 'A');
  const forms = [createRef(null), createRef(null), createRef(null)];
  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    push(stepItem.id);
  };

  useEffect(() =>{
    if(id)
    setOperations('E')
    else
    setOperations('A')
  } ,[id])

  const onClickNext = (goToNext, steps, s) => {
    const step = s;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;
 

form.submitForm().then(async () => {
      if (!form.isDirty && form.isValid) {
        const newFields = { ...form.values };
        setLoading(true);
        if(step.id === "Step1"){
          newFields.category  = newFields.category?.value;
          newFields.brand  = newFields.brand?.value;
          newFields.productCategory  = newFields.productCategory?.value;
          newFields.subCategory  = newFields.subCategory?.value;
          
          if(operations === 'A'){
             let res = await postData(newFields)
            res = res.data;
            history.push(`/app/product/update/${res?.data?.id}`);

          }
        }

        if (steps.length - 2 <= steps.indexOf(step)) {
          // done
          setBottomNavHidden(true);
        }
        setLoading(false);
        goToNext();
        step.isDone = true;
      }
    });
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };
 

  return (
    <>
      <Card>
        <CardBody className="wizard wizard-default">
        <Wizard>
          <TopNavigation
            className="justify-content-between"
            disableNav={operations === 'A'}
            topNavClick={topNavClick}
          />
 
          {loading && <div className='loading'/>}
   
            <Steps>
              <Step
                id="Step1"
                name="Basic Details"
                desc="Basic Details of the Product"
              >
                <div className="wizard-basic-step">
                  <BasicDetails ref={forms[0]} />
                </div>
              </Step>

              <Step
                id="Step2"
                name="SEO & Marketing Details"
                desc="SEO & Marketing Details"
              >
                <div className="wizard-basic-step">
                  <SEOAndMarketingDetails />
                </div>
              </Step>

              <Step
                id="Step3"
                name="Product Variant"
                desc="Product Variant Details"
              >
                <div className="wizard-basic-step">
                  <ProductVariants />
                </div>
              </Step>

              <Step
                id="Step4"
                name="Technical Specification"
                desc="Technical Specficiation Details"
              >
                <div className="wizard-basic-step">
                  <TechnicalSpecification />
                </div>
              </Step>
            </Steps>

            <BottomNavigation
              onClickNext={onClickNext}
              onClickPrev={onClickPrev}
              className={`justify-content-between ${
                bottomNavHidden && 'invisible'
              }`}
              prevLabel="Back"
              nextLabel="Next"
            />
          </Wizard>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductForm;
