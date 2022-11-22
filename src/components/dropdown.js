import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { CheckTOkenRule ,CheckUserRule} from "../shares/Func";
import { Path } from "../api/Path";
import Swal from "sweetalert2";
import { } from "../api/SubUrl";
import { ApiAuthority,postManagerImageOpenSale } from "../api/User";
function DropdownModal(props){
    const[showChild,setShowchild]= useState(false)
    const [value, setValue]= useState(props.value)
    useEffect(()=>{
        
    })

    function hanlde(){
        setShowchild(!showChild)
       
            
        
    }
    async function  handleUpdate(){    
            
            let Token = await CheckTOkenRule();
            let User = await CheckUserRule();
            const username=User.username
            const password= User.password
           
            const valuef={
                "DataBaseName": Path.DataBaseName,
                Params:  [
                    value.CHILDR_ID,
                    value.CHILDR_Name,
                    value.Phone,
                    value.Relationship
                ],
                StoreProcedureName: "SP_CHILDRENT_UPDATE",
                SchemaName:Path.sqlName
                }
            let formData = new FormData();
            formData.append('data',JSON.stringify(valuef))
            ApiAuthority(username,password,Token,formData,async res => {
                if(res.Status===200)
                {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Cập nhật thành công',
                        showConfirmButton: false,
                        timer: 1500
                      })
                  fnhandleGetIDFullNameUsr()
                  
                }
                else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Cập nhật thất bại',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
              })
    }

    async function fnhandleGetIDFullNameUsr(){

        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const Body = {
            "DataBaseName": Path.DataBaseName,
                "Params":  [
                  username,// sửa
                  password
                ],
                "StoreProcedureName": "SP_USER_GET",
            "SchemaName":Path.sqlName
            }
            const formData = new FormData();
            formData.append('data',JSON.stringify(Body));
            ApiAuthority(username,password,Token,formData,async res => {
              
              if(res.Status===200)
              {
               
                
                 fnhandleSaveLog(res.Data)
              }
            })
      }

      async function fnhandleGetIDFullNameUsrdelete(){
        
         let Token = await CheckTOkenRule();
         let User = await CheckUserRule();
         const username=User.username
         const password= User.password
         const Body = {
             "DataBaseName": Path.DataBaseName,
                 "Params":  [
                   username,// sửa
                   password
                 ],
                 "StoreProcedureName": "SP_USER_GET",
             "SchemaName":Path.sqlName
             }
             const formData = new FormData();
             formData.append('data',JSON.stringify(Body));
             ApiAuthority(username,password,Token,formData,async res => {
               
               if(res.Status===200)
               {
                
                 
                fnhandleSaveLogDelete(res.Data)
               }
             })
       }
     async function handleAccept(){
      
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
       
        const username=User.username
        const password= User.password
        
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                value.CHILDR_ID,
                
            ],
            StoreProcedureName: "SP_CHILDRENT_DELETE",
            SchemaName:Path.sqlName
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        ApiAuthority(username,password,Token,formData,async res => {
        
            if(res.Status===200)
            {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Xóa thành công',
                    showConfirmButton: false,
                    timer: 1500
                  })
              
              fnhandleGetIDFullNameUsrdelete()
            
            }
            else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Xóa thất bại',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
          })
      
      }
      async function fnhandleSaveLogDelete(useId){
    
    
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const Body = {
            "DataBaseName": Path.DataBaseName,
                "Params":  [
                  '2',// xóa
                  `xóa thông tin ${value.CHILDR_Name} ${value.Relationship} của thành viên id ${props.mem.EMPL_ID} `,
                  useId[0].User_ID,
                  '3' // child
                ],
                "StoreProcedureName": "SP_LOG",
            "SchemaName":Path.sqlName
            }
            const formData = new FormData();
            formData.append('data',JSON.stringify(Body));
      
            ApiAuthority(username,password,Token,formData,async res => {
              if(res.Status===200)
              {
                window.location=`${profileMemStr}${props.mem.EMPL_ID}`
              }
            })
      }
    async function fnhandleSaveLog(useId){
        
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const Body = {
            "DataBaseName": Path.DataBaseName,
                "Params":  [
                  '3',// sửa
                  `Sửa thông tin ${value.CHILDR_Name} ${value.Relationship} của thành viên id ${props.mem.EMPL_ID} `,
                  useId[0].User_ID,
                  '3'
                ],
                "StoreProcedureName": "SP_LOG",
            "SchemaName":Path.sqlName
            }
            const formData = new FormData();
            formData.append('data',JSON.stringify(Body));
      
            ApiAuthority(username,password,Token,formData,async res => {
              if(res.Status===200)
              {
               
                window.location=`${profileMemStr}${props.mem.EMPL_ID}`
              }
            })
      }

      function handleDelete(){
         
            Swal.fire({
                title: 'Bạn có chắc?',
                text: "Muốn xóa thông tin người này",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2bb9c4 ',
                cancelButtonColor: 'var(--love-color-4)',
                confirmButtonText: 'ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    handleAccept()
                }
            })
      }
    return(
        <div>

            <div className="dropdown">
            <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className={ "text-dark mdi mdi-dots-vertical font-18 text-primary"}></i>
            </button>
            <ul className="dropdown-menu">
                <li onClick={()=>{hanlde()}}><div className="dropdown-item"  href="#">Chỉnh sửa</div></li>
                <li onClick={()=>{handleDelete()}}><div className="dropdown-item"  href="#">Xóa</div></li>
            </ul>
        </div>
        <Modal
                show={showChild}
                onHide={() => hanlde()}
                size='md'
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title" className="text-black-50">
                  Chi tiết
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className=" col-12">
                                
                                <label htmlFor="namechild">Họ tên</label>
                                <input value={value.CHILDR_Name}onChange={(e)=>setValue({...value,CHILDR_Name:e.target.value})} style={{width:'100%'}}/>
                                <label htmlFor="namechild">Số điện thoại</label>
                                <input value={value.Phone} onChange={(e)=>setValue({...value,Phone:e.target.value})} style={{width:'100%'}}/>
                                <label htmlFor="namechild">Mối quan hệ</label>
                                <input value={value.Relationship} onChange={(e)=>setValue({...value,Relationship:e.target.value})} style={{width:'100%'}}/>
                            </div>
                            <div className=" col-12 mt-3">
                                <span  onClick={()=>handleUpdate()} className="btnwew me-1" style={{ cursor:'pointer',backgroundColor: 'var(--admin-btn-color)'}}>
                                    <span className="mdi mdi-plus-circle pe-2">Cập nhật</span> 
                                </span>
                                <span onClick={()=>hanlde()} className="btnwew ms-1" style={{cursor:'pointer',backgroundColor: 'var(--love-color-5)'}}>
                                    <span  className="mdi mdi-plus-circle pe-2">Đóng</span> 
                                </span>
                            </div>
                        </div>
                        
                    </div>
                   
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default DropdownModal