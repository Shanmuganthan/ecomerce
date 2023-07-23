import React, { useEffect, useState , useRef} from 'react';
import { Button, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { NotificationManager } from 'components/common/react-notifications';
import CustomModal from 'utility/CustomModal';
import { Formik } from 'formik';

import * as Yup from 'yup';
import AlertModal from 'utility/AlertModal';
import DataTablePagination from 'components/DatatablePagination';
import { getData, patchData, postData, putData } from 'services/Promotions';
import PromotionForm from 'utility/PromotionForm';

const schema = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  name: Yup.string().required('Name is required'),
  priotityValue: Yup.number(),
  discountType: Yup.string().required('Discount Type is required'),
  discountValue: Yup.number().positive().required('Discount Value is required'),
  startDate: Yup.date().default(null).required('Discount Value is re  quired'),
  endDate: Yup.date().default(null).required('Discount Value is required'),
  subCategories : Yup.array().of(Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }))
  
});

const title= {
  'A' : 'Add Promotions',
  'E' : 'Edit Promotions',
  'V' : 'View Promotions',
}
const sort = {
  1 : 'sort-asc',
  "-1" : 'sort-desc',
}
const type = 'Promotions'
const formInitialValues = {
  name: '',
    description: '',
    startDate: '',
    endDate : '',
    discountType : '',
    discountValue : '',
    active: true,
    priotityValue : 0,
    subCategories: []
}
const PromotionSymmary = ({ match }) => {
  const [data, setData] = useState([]);
  const [operations, setOperations] = useState(()=>'');
  const [selectedItem, setSelectedItem] = useState(()=>{});
  const [loading, setLoading] = useState(()=>true);
  const formikRef = useRef();
  const [initialValues,setInitialValue] = useState(() => formInitialValues);
  const [modalOpen, setModalOpen] = useState(() => false);
  const [alertOpen, setAlertOpen] = useState(() => false);
  const [pageCount, setPageCount] = useState(0);
  const [tableOptions ,setTableOptions]  = useState(()=>({
    search : '',
    page : 0,
     sort : '_id',
     direction : 1,
     getCount : true,
  }))


  const search = (e) =>{
    tableOptions.search = e.target.value;
    setTableOptions(tableOptions)
 }

  const toggleModal = (slug) => {
    if(slug === 'A'){
      setInitialValue(formInitialValues);
    }
    setOperations(slug);
    setModalOpen((prevState) => !prevState);
  };

  const toggleAlert = (item) => {
    setSelectedItem(item);
    setAlertOpen((prevState) => !prevState);
  };

  const saveData = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const get = async () => {
    setLoading(true);
    let res = await getData(tableOptions);
    res = res.data;
    if (res.status) {
      if(tableOptions.getCount){
        setPageCount(() => res.count);  
      }
      setData(() => res.data);
      
    } else {
      NotificationManager.error(res.message, 'Error');
    }
    setLoading(false);
  };

  useEffect(async () => {
    await get();
    tableOptions.getCount = false;
    setTableOptions(tableOptions)
  }, []);

  const onSubmit = async (val , {resetForm}) => {
    const values = val;
    setLoading(true);
    values.subCategories = values.subCategories?.map((item) => item.value);
    if(operations === 'A'){
    await postData(values)
    NotificationManager.success(`New ${type} has been added!`,'Success!')
    }else{
      const {id} = selectedItem;
      await putData(id,values)
    NotificationManager.success(`${type} has been updated successfuly!`,'Success!')
    }
    get()
    toggleModal();
    resetForm(initialValues)
    setLoading(false);
   }


   const eitAndView = (slug , currentRow) =>{
   const item = currentRow
   item.startDate= new Date(currentRow.startDate);
   item.endDate= new Date(currentRow.endDate);

    setInitialValue(item);
    setSelectedItem(item);
    setOperations(slug);
    setModalOpen((prevState) => !prevState);
   }

   const deleteProduct = async() => {
    await patchData(selectedItem.id)
    NotificationManager.success(`${type} has been deleted successfuly!`,'Success!')
    get();
    toggleAlert('');
   }
   
 const triggerSearch = () =>{
  tableOptions.getCount = true;
  setTableOptions(tableOptions);
  get();
}

const sorting = (column) =>{
  tableOptions.getCount = false;
  if(tableOptions.sort === column){
    tableOptions.direction = tableOptions.direction === -1 ? 1 : -1 ;
  }
  tableOptions.sort = column;
  setTableOptions(tableOptions)
  get();
}
const gotoPage = (p) => {
  tableOptions.page = p;
  setTableOptions(tableOptions);
  get();
}


  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.promotions" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
   
       {loading && <div className='loading'/>}

        <Colxx lg="12" xl="12">
          <Row className="mb-4 col-md-12">
          <div className=" search-container col-md-8 pr-0">
          <div className="search"><input 
          name="searchKeyword" onChange={search} id="searchKeyword" placeholder="Search" type="text" className="form-control"
           />
          <span role='button' tabIndex="0" className="search-icon" onKeyDown={triggerSearch} onClick={triggerSearch}><i className="simple-icon-magnifier" /></span>
          </div>
            </div>
            <div className="text-zero top-right-button-container col-md-4  pr-0 ">
              <Button
                color="primary"
                size="lg"
                className="top-right-button float-right"
                onClick={() => toggleModal('A')}
              >
                Add New
              </Button>
            </div>
          </Row>
   
          <Row>
            <Colxx md="12" className="mb-12">
              <div className="card">
                <div className="card-body">
                  <table className=" table ">
                    <thead>
                      <tr><th>S.No</th>
                        <th className={`sort-column ${tableOptions.sort === 'name' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('name')}>Name</th>
                        <th className={`sort-column ${tableOptions.sort === 'description' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('description')}>Description</th>
                        <th className={`sort-column ${tableOptions.sort === 'startDate' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('startDate')}>Start Date</th>
                        <th className={`sort-column ${tableOptions.sort === 'endDate' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('endDate')}>End Date</th>
                        <th className={`sort-column ${tableOptions.sort === 'discountType' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('discountType')}>Discount Type</th>
                        <th className={`sort-column ${tableOptions.sort === 'discountValue' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('discountValue')}>Discount Value</th>
                        <th>Priotity </th>
                        <th>Expired</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {data.length === 0 && <tr>  <td colSpan={5}> No Result Found!.</td>  </tr>}
                      {data.length > 0 &&
                        data.map((item, index) => (<tr key={item.name}><td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.startDateFormatted}</td>
                            <td>{item.endDateFormatted}</td>
                            <td>{item.discountType?.toUpperCase()}</td>
                            <td>{item.discountValue}</td>
                            <td>{item.priotityValue}</td>
                            <td>
                              <span
                                className={`badge  badge-pill  ${
                                  !item.isExpired
                                    ? 'badge-success '
                                    : ' badge-danger'
                                } `}
                              >
                                {item.isExpired ? 'Expired' : 'Active'}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge  badge-pill  ${
                                  item.active
                                    ? 'badge-success '
                                    : ' badge-danger'
                                } `}
                              >
                                {item.active ? 'Active' : 'In-Active'}
                              </span>
                            </td>
                            
                            <td className="float-right">
                              <Row>
                                <button type="button" onClick={()=>toggleAlert(item)}  className="glyph-icon action-icons m-2 simple-icon-trash" />
                                 <button  type="button" tabIndex="0" onClick={()=>eitAndView('E' , item)} className="glyph-icon action-icons m-2 simple-icon-pencil" />
                                <button type='button' tabIndex="0" onClick={()=>eitAndView('V' , item)} className="glyph-icon m-2 action-icons simple-icon-eye" /> 
                              </Row>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>


                 <DataTablePagination
                                          page={tableOptions.page}
                                          pages={pageCount}
                                          onPageChange={(p) => gotoPage(p)}
                                          canPrevious={false}
                                          canNext={false}
                                     />
                 

                </div>
              </div>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
     
      <AlertModal
      title='Alert'
      message='Are you sure you want to delete this item?'
      confirmAction={deleteProduct}
      toggleModal={toggleAlert}
      modalOpen={alertOpen}
      
      />

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
        innerRef={formikRef}
        enableReinitialize

      >
        {({ errors ,  setFieldTouched ,setFieldValue,values ,touched}) => (
          <CustomModal
            title={title[operations]}
            hideSaveBtn={operations === 'V'}
            confirmAction={saveData}
            toggleModal={toggleModal}
            modalOpen={modalOpen}
            wrapClassName="modal-right"
            saveBtnType="submit"
            
          >
            <PromotionForm setFieldTouched={setFieldTouched} setFieldValue ={setFieldValue} operation={operations}  name='image' errors={errors}  values = {values } touched={touched} />
          </CustomModal>
        )}
      </Formik>
    </>
  );
};

export default PromotionSymmary;
