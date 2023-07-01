import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const AlertModal = ({  modalOpen, toggleModal,confirmAction,title , message='Are you sure you want to delete this item?' }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      centered   >
      <ModalHeader toggle={toggleModal}>
        <div> {title}   </div>
      </ModalHeader>
      <ModalBody>
      {message}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
         Cancel 
        </Button>
       <Button  type='button' color="primary" onClick={confirmAction}>
         Confirm
        </Button>  {' '}
      </ModalFooter>
    </Modal>
  );
};

export default AlertModal;
