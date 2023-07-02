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
import TechnicalSpecificationForm from 'utility/TechnicalSpecificationForm';
import { getData, patchData, postData, putData } from 'services/TechnicalSpecification';

const schema = Yup.object().shape({
  description: Yup.string(),
  name: Yup.string().required('Name is required'),
});

const title= {
  'A' : 'Add Technoical SPecifiction',
  'E' : 'Edit Technoical SPecifiction',
  'V' : 'View Technoical SPecifiction',
}
const sort = {
  1 : 'sort-asc',
  "-1" : 'sort-desc',
}

const formInitialValues = {
  name: '',
    description: '',
    active: true,
}
// const {REACT_APP_PAGE_SIZE} = process.env;
const TechnicalSpecification = ({ match }) => {
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

  const onSubmit = async (values , {resetForm}) => {
    setLoading(true);
    if(operations === 'A'){
    await postData(values)
    NotificationManager.success('New Technical Specifiction has been added!','Success!')
    }else{
      const {id} = selectedItem;
      await putData(id,values)
    NotificationManager.success('Technical Specifiction has been updated successfuly!','Success!')
    }
    get()
    toggleModal();
    resetForm(initialValues)
    setLoading(false);
   }

   const eitAndView = (slug , item) =>{
    setInitialValue(item);
    setSelectedItem(item);
    setOperations(slug);
    setModalOpen((prevState) => !prevState);
   }

   const deleteProduct = async() => {
    await patchData(selectedItem.id)
    NotificationManager.success('Technical Specifiction has been deleted successfuly!','Success!')
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
          <Breadcrumb heading="menu.technical-specification" match={match} />
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
                      <tr>
                        <th>S.No</th>
                        <th className={`sort-column ${tableOptions.sort === 'name' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('name')}>Name</th>
                        <th className={`sort-column ${tableOptions.sort === 'description' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('description')}>Description</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {data.length === 0 && <tr>  <td colSpan={5}> No Result Found!.</td>  </tr>}
                      {data.length > 0 &&
                        data.map((item, index) => (
                          <tr key={item.name}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                              {' '}
                              <span
                                className={`badge  badge-pill  ${
                                  item.active
                                    ? 'badge-success '
                                    : ' badge-danger'
                                } `}
                              >
                                {' '}
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
        {({ errors , setFieldValue ,values ,touched}) => (
          <CustomModal
            title={title[operations]}
            hideSaveBtn={operations === 'V'}
            confirmAction={saveData}
            toggleModal={toggleModal}
            modalOpen={modalOpen}
            wrapClassName="modal-right"
            saveBtnType="submit"
            
          >
            <TechnicalSpecificationForm setFieldValue ={setFieldValue} operation={operations}  name='image' errors={errors}  values = {values } touched={touched} />
          </CustomModal>
        )}
      </Formik>
    </>
  );
};

export default TechnicalSpecification;
