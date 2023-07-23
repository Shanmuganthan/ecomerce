// @flow 
import * as React from 'react';
import {  Card, CardBody } from 'reactstrap';

 const PromotionLists = ({promotion}) => {
    return (
        <div>
            

            <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <div
    
              className=" mb-0  w-40 w-xs-100  mb-1 mt-1"
            >
           
              <span className="align-middle d-inline-block">{promotion.name}</span>
            </div>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
             {promotion.discountType}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
            {promotion.discountValue}
            </p>
            
          </CardBody>
          {false && <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
            <div
              className="itemCheck mb-0   simple-icon-trash"
            />
          </div> }
        </div>
        <div className="card-body pt-1">
        <p className="mb-0"> Start Date : {promotion.startDate} </p>
        <p className="mb-0"> End Date : {promotion.endDate} </p>
          <p className="mb-0">
            {promotion.description}
          </p>
        </div>
      </Card>



        </div>
    );
};

export default PromotionLists;