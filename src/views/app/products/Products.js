import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import {  Row } from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';
import { getData ,patchData} from 'services/Products';
import DataTablePagination from 'components/DatatablePagination';
import AlertModal from 'utility/AlertModal';
import CustomModal from 'utility/CustomModal';
import PromotionLists from './Forms/PromotionLists';



const sort = {
  1 : 'sort-asc',
  "-1" : 'sort-desc',
}
const Products = ({ match }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(() => {});
  const [loading, setLoading] = useState(() => true);

  const [alertOpen, setAlertOpen] = useState(() => false);
  const [pageCount, setPageCount] = useState(0);
  const [promotions , setPromotions] = useState(()=>[])
  const [tableOptions, setTableOptions] = useState(() => ({
    search: '',
    page: 0,
    sort: '_id',
    direction: 1,
    getCount: true,
  }));

  const [modalOpen, setModalOpen] = useState(() => false);

  const search = (e) => {
    tableOptions.search = e.target.value;
    setTableOptions(tableOptions);
  };

  const toggleAlert = (item) => {
    setSelectedItem(item);
    setAlertOpen((prevState) => !prevState);
  };

  const get = async () => {
    setLoading(true);
    let res = await getData(tableOptions);
    res = res.data;
    if (res.status) {
      if (tableOptions.getCount) {
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
    setTableOptions(tableOptions);
  }, []);

  const deleteProduct = async () => {
    await patchData(selectedItem.id);
    NotificationManager.success(
      'Porduct has been deleted successfuly!',
      'Success!'
    );
    get();
    toggleAlert('');
  };

  const triggerSearch = () => {
    tableOptions.getCount = true;
    setTableOptions(tableOptions);
    get();
  };

  const sorting = (column) => {
    tableOptions.getCount = false;
    if (tableOptions.sort === column) {
      tableOptions.direction = tableOptions.direction === -1 ? 1 : -1;
    }
    tableOptions.sort = column;
    setTableOptions(tableOptions);
    get();
  };
  const gotoPage = (p) => {
    tableOptions.page = p;
    setTableOptions(tableOptions);
    get();
  };


  const toggleModal = (promotion) => {
    setPromotions(promotion);
    setModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.products" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        {loading && <div className="loading" />}

        <Colxx lg="12" xl="12">
          <Row className="mb-4 col-md-12">
            <div className=" search-container col-md-8 pr-0">
              <div className="search">
                <input
                  name="searchKeyword"
                  onChange={search}
                  id="searchKeyword"
                  placeholder="Search"
                  type="text"
                  className="form-control"
                />
                <span
                  role="button"
                  tabIndex="0"
                  className="search-icon"
                  onKeyDown={triggerSearch}
                  onClick={triggerSearch}
                >
                  <i className="simple-icon-magnifier" />
                </span>
              </div>
            </div>
            <div className="text-zero top-right-button-container col-md-4  pr-0 ">
              <Link
                to="/app/product/create"
                color="primary"
                size="lg"
                className="top-right-button float-right btn btn-primary btn-lg"
              >
                Add New Product
              </Link>
            </div>
          </Row>
        </Colxx>
      </Row>

      <Row>
        <Colxx md="12" className="mb-12">
          <div className="card">
            <div className="card-body">
              <table className=" table ">
                <thead>
                  <tr>
                <th>S.No</th>
                <th className={`sort-column ${tableOptions.sort === 'productName' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('productName')}>Product Name</th>
                <th className={`sort-column ${tableOptions.sort === 'brands.name' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('brands.name')}>Manufacturer</th>
                <th className={`sort-column ${tableOptions.sort === 'category.name' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('category.name')}>Category</th>
                <th className={`sort-column ${tableOptions.sort === 'subProductCategory.name' ? sort[tableOptions.direction] :'' }`} onClick={()=>sorting('subProductCategory.name')}>Sub Category</th>
                <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {data.length > 0 && data.map((item,index) => <tr key={item.id}>
               <td>{index+1}</td>
               <td>{item.productName}</td>
               <td>{item.brands?.name}</td>
               <td>{item.category?.name}</td>
               <td>{item.subProductCategory?.name}</td>
               <td><Row>
                        <button type="button" onClick={()=>toggleAlert(item)}  className="glyph-icon action-icons m-2 simple-icon-trash" />
                        {Boolean(item.promotions?.length) && <button type="button" onClick={()=>toggleModal(item.promotions)}  className="glyph-icon action-icons m-2 iconsminds-gift-box" /> }
                                <Link  type="button" tabIndex="0" to={`/app/product/update/${item.id}`} className="glyph-icon action-icons m-2 simple-icon-pencil" />
                                <Link type='button' tabIndex="0"to={`/app/product/update/${item.id}`} className="glyph-icon m-2 action-icons simple-icon-eye" />
                              </Row>

               </td>

                </tr> )}
                {data.length === 0 && <tr><td colSpan={5}> No Result Found!.</td></tr>}
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


      <CustomModal
            hideSaveBtn = "true"
            title="Promotions"
            toggleModal={toggleModal}
            modalOpen={modalOpen}
            wrapClassName="modal-right"
            
          >
           { Boolean(promotions.length) &&  promotions.map((item) => <React.Fragment key={item.name}> <PromotionLists  promotion={item}/> </React.Fragment>)}
            </CustomModal>

      <AlertModal
        title="Alert"
        message="Are you sure you want to delete this item?"
        confirmAction={deleteProduct}
        toggleModal={toggleAlert}
        modalOpen={alertOpen}
      />
    </>
  );
};

export default Products;
