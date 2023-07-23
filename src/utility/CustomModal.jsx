import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const CustomModal = ({ wrapClassName='',hideSaveBtn = false, modalOpen, toggleModal,confirmAction,title , children }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName={wrapClassName}
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <div> {title}  </div>
      </ModalHeader>
      <ModalBody>
      {children}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
         Cancel 
        </Button>
      {!hideSaveBtn && <Button  type='button' color="primary" onClick={confirmAction}>
         Save
        </Button> } {' '}
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
