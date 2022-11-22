import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useEffect } from 'react';
import { Path } from '../api/Path';
import moment from 'moment';
import { CheckTOkenRule,CheckUserRule } from '../shares/Func';
import { ApiAuthority } from '../api/User';
function MyVerticallyCenteredModal(props) {
    const[data,setData]= useState([])
    const [users,setUsers]= useState([])
    useEffect(()=>{
        handleGetTransactionAPI()
        handleGetUserByID()
    },[props])
    const handleGetTransactionAPI=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
  
                props.idAsset
            ],
            StoreProcedureName: "SP_HISTORY_BYID",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status=200)
          {
            console.log(res.Data)
            setData(res.Data)
          } 
        })
  
      }
    const handleGetUserByID=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                username,
                password
            ],
            StoreProcedureName: "SP_USER_BYID",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status=200)
          { 
            setUsers( res.Data.map((item)=>{
                return({
                  value:item.User_ID,
                  label:item.User_Name
                }
            )}))
          } 
        })
    }
 
    const handleGetItemOption= (valueItem,option)=>{
        var value 
        if(valueItem && option && option.length>0)
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Warranty
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Asset ID: {props.idAsset}</h4>
        <table className="table ">
                    <thead>
                    <tr key='1'>
                        <th scope="col">#</th>
                        <th scope="col">Warranty ID</th>
                        <th scope="col">Warranty</th>
                        <th scope="col">Create date</th>
                        <th scope="col">Creator</th>
                    </tr>
                    </thead>
                    <tbody style={{overflow:'scroll', maxHeight:600}}>
                    
                    {
                        data.map(function (item, index, arr) {
                         
                                return(
                               
                                    <tr key={index} style={{ lineHeight: '2rem' }}>             
                                        <td  >{index}</td>
                                        <td  >{item.History_ID}</td>
                                        <td  >{moment(item.Warranty).format("DD MMM YY")  }</td>         
                                        <td  >{item.Remark}</td>
                                        <td  >{ (handleGetItemOption(item.User_ID,users)) && (handleGetItemOption(item.User_ID,users).length>0) ?handleGetItemOption(item.User_ID,users)[0].label:'' }</td>
                                    </tr>
                                )

                            
                        })
                    }
                        


                    </tbody>
                </table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalHistoryById(prop) {
    const{showModal,id}= prop
  const [modalShow, setModalShow] = showModal

  return (
    <>
     

      <MyVerticallyCenteredModal
        idAsset={id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ModalHistoryById