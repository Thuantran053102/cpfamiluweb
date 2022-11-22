import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { DatePicker,DateRangePicker, Stack } from 'rsuite';
import Select from 'react-select'
import { CheckTOkenRule,CheckUserRule } from '../shares/Func';
import { Path } from '../api/Path';
import { ApiAuthority } from '../api/User';
import moment from 'moment';

function ModalTransfer(prop) {
    const {showFer,itsiteTransfer}= prop
    const [show, setShow] = showFer
    const [itSite,setitSite]= itsiteTransfer
    const [optionSite,setOptionSite] = useState([])

  const handleClose = () => {

      setShow(false);
  }

  useEffect(()=>{
    hanldeGetValuesFilterSite()
  },[])

  const handleShow = () => setShow(true);
  const hanldeGetValuesFilterSite=async()=>{
    let Token = await CheckTOkenRule();
    let User = await CheckUserRule();
    const username = User.username
    const password =User.password
    const valuef = {
        "DataBaseName": Path.DataBaseName,
        Params: [

            username,
            password,
        ],
        StoreProcedureName: "SP_USER_GETALL",
        SchemaName: Path.sqlName
    }
    let formData = new FormData();
    formData.append('data', JSON.stringify(valuef))
    await ApiAuthority(username, password, Token, formData, async res => {
      if(res.Status=200)
      {
        let filterData
        filterData=res.Data.map((item,index)=>{
          return({
              value: item.User_ID,
              label: item.User_Name
          })
        })
        setOptionSite([...filterData]) 
      } 
    })

  }
  const handleGetItemOption= (valueItem,option)=>{
        var value 
        if(valueItem)
        {

        value= option.filter((item)=>{
        
            if(Number(item.value)=== Number(valueItem))
            {
            
            return item
            }
            else if(item.value=== valueItem || item.label===valueItem)
            {
            return item
            }
        
            
        })
        }
        return value
    }   

  return (
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Label>IT Site</Form.Label>
                        <Select className=" input inputRadius selectInsert "
                            value={handleGetItemOption(itSite,optionSite)}
                           
                            onChange={(e)=>{setitSite(e.value)}}
                            options={optionSite}        
                        />
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

export default ModalTransfer