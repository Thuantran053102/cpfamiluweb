import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import CustomizedTablesImportExcel from './TableTemplateImportExcel';
function MyVerticallyCenteredModal(props) {
  const {dataExcelUp}= props
  const [dataAsset,setDataAsset] = dataExcelUp
  return (
    // {
    //   dataAsse.lenght>0?
    // }

    <Modal
    show={props.show}
    onHide={props.onHide}
    dialogClassName="modal-90w"
    aria-labelledby="example-custom-modal-styling-title"
    className='setHeight'
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-custom-modal-styling-title">
        Duplicate data
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='duplitcate'>
      
      <CustomizedTablesImportExcel data={[dataAsset,setDataAsset]}/>
    </Modal.Body>
  </Modal>


  );
}

function ModalDupExcel(prop) {
  const {start,data}= prop
  const [modalShow, setModalShow] = start
  const [dataAsset,setDataAsset]= useState(data)
 useEffect(()=>{

  setDataAsset(data)
  console.log(data)
  if(data.length<=0)
  {
    setModalShow(false)
  }
 },[data])
  return (
    <>
     {
      data&& data.length>0?<MyVerticallyCenteredModal
      // duplicateData={duplicateData}
      dataExcelUp={[dataAsset,setDataAsset]}
      show={modalShow}
      onHide={() => setModalShow(false)}
      />:null
    }

      
    </>
  );
}

export default ModalDupExcel