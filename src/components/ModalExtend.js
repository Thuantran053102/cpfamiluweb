import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DatePicker,DateRangePicker, Stack } from 'rsuite';
import moment from 'moment';

function ModalExtend(prop) {
    const {showTend,warrantyEx}= prop
    const [show, setShow] = showTend
    const [warranty,setWarranty]= warrantyEx


    

   

  const handleClose = () => {

      setShow(false);
  }
  const handleShow = () => setShow(true);

  return (
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Extend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="d-block w-100 my-1 col-md-2 ">
                                  <label htmlFor="" className="mx-md-4 mx-2">Warranty
                                  {/* {
                                      !checkValues.warranty?
                                      <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc </span>:null
                                    } */}
                                    </label> 
                                  <div className="mx-md-4 mx-2 d-flex TerminationDTPicker"  style={{width:'auto'}}>
                               <DatePicker
                             placement="bottomStart"
                              className="w-100 "
                              format='dd-MM-yyyy'
                              onChange={(e)=>{setWarranty(e)}}
                              />
                              {
                                warranty?
                                <span className='HireDatePickerValue'>
                                   {moment(warranty).format('DD-MM-yyyy') }
                              
                                </span>:null
                              }
                                
                              
                              </div>
                            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{prop.handled()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalExtend