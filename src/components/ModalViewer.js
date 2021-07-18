import React from 'react';
import {Modal} from 'react-native';
import ChatViewer from './ChatViewer';

function ModalViewer({visibleModal, setvisibleModal}) {
  return (
    <Modal
      animationType="slide"
      visible={visibleModal}
      onRequestClose={() => {
        setvisibleModal(false);
      }}>
      <ChatViewer setvisibleModal={setvisibleModal} />
    </Modal>
  );
}

export default ModalViewer;
