import React from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Row } from 'reactstrap';


// const sort = {
//   1 : 'sort-asc',
//   "-1" : 'sort-desc',
// }
const Products = ({ match }) => {
//   const [data, setData] = useState([]);
//   const [operations, setOperations] = useState(()=>'');
//   const [selectedItem, setSelectedItem] = useState(()=>{});
//   const [loading, setLoading] = useState(()=>true);
//   const formikRef = useRef();
//   const [initialValues,setInitialValue] = useState(() => ({
//     image: '',
//     name: '',
//     active: true,
//   }));
//   const [modalOpen, setModalOpen] = useState(() => false);
//   const [alertOpen, setAlertOpen] = useState(() => false);
//   const [pageCount, setPageCount] = useState(0);
//   const [tableOptions ,setTableOptions]  = useState(()=>({
//     search : '',
//     page : 0,
//      sort : '_id',
//      direction : 1,
//      getCount : true,
//   }))


//   const search = (e) =>{
//     tableOptions.search = e.target.value;
//     setTableOptions(tableOptions)
//  }

//   const toggleModal = (slug) => {
//     setOperations(slug);
//     setModalOpen((prevState) => !prevState);
//   };

//   const toggleAlert = (item) => {
//     setSelectedItem(item);
//     setAlertOpen((prevState) => !prevState);
//   };

//   const saveData = () => {
//     if (formikRef.current) {
//       formikRef.current.submitForm();
//     }
//   };

//   const get = async () => {
//     setLoading(true);
//     let res = await getProductCategory(tableOptions);
//     res = res.data;
//     if (res.status) {
//       if(tableOptions.getCount){
//         setPageCount(() => res.count);  
//       }
//       setData(() => res.data);
      
//     } else {
//       NotificationManager.error(res.message, 'Error');
//     }
//     setLoading(false);
//   };

//   useEffect(async () => {
//     await get();
//     tableOptions.getCount = false;
//     setTableOptions(tableOptions)
//   }, []);

  // const onSubmit = async (values , {resetForm}) => {
  //   setLoading(true);
  //   if(operations === 'A'){
  //   await postProductCategory(values)
  //   NotificationManager.success('New Porduct Category has been added!','Success!')
  //   }else{
  //     const {id} = selectedItem;
  //     await putProductCategory(id,values)
  //   NotificationManager.success('Porduct Category has been updated successfuly!','Success!')
  //   }
  //   get()
  //   toggleModal();
  //   resetForm(initialValues)
  //   setLoading(false);
  //  }

  //  const editAndViewCategory = (slug , item) =>{
  //   setInitialValue(item);
  //   setSelectedItem(item);
  //   setOperations(slug);
  //   setModalOpen((prevState) => !prevState);
  //  }

  //  const deleteProduct = async() => {
  //   await patchProductCategory(selectedItem.id)
  //   NotificationManager.success('Porduct Category has been deleted successfuly!','Success!')
  //   get();
  //   toggleAlert('');
  //  }
   
//  const triggerSearch = () =>{
//   tableOptions.getCount = true;
//   setTableOptions(tableOptions);
//   get();
// }

// const sorting = (column) =>{
//   tableOptions.getCount = false;
//   if(tableOptions.sort === column){
//     tableOptions.direction = tableOptions.direction === -1 ? 1 : -1 ;
//   }
//   tableOptions.sort = column;
//   setTableOptions(tableOptions)
//   get();
// }
// const gotoPage = (p) => {
//   tableOptions.page = p;
//   setTableOptions(tableOptions);
//   get();
// }


  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.products" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
   
       {/* {loading && <div className='loading'/>} */}

        <Colxx lg="12" xl="12">
           <p>Under Maintance</p>
          </Colxx>
          </Row>
          
    </>
  );
};

export default Products;
