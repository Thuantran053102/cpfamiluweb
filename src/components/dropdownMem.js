
// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import Modal from 'react-bootstrap/Modal';
// import { CheckTOkenRule ,CheckUserRule} from "../shares/Func";
// import { Path } from "../api/Path";
// import Swal from "sweetalert2";

// import { ApiAuthority,postManagerImageOpenSale } from "../api/User";
// import Dropdown from 'react-bootstrap/Dropdown'
// import Button from 'react-bootstrap/Button';


// function DropdownMem(...props){
//     const [id]= props
//     const [permissionID,setPermissionID]= useState('')
//     function handleDeleteQues(){
//          Swal.fire({
//             title: 'Bạn có chắc',
//             text: "Bạn muốn xóa thông tin thành viên này",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'OK'
//           }).then((result) => {
//             if (result.isConfirmed) {
//                 handleDeleteMem()
             
//             }
//           })
//     }

//     const handleDeleteMem= async()=>{
//         let Token = await CheckTOkenRule();
//         let User = await CheckUserRule();
//         const username = User.username
//         const password = User.password
   
//         const valuef = {
//             "DataBaseName": Path.DataBaseName,
//             Params: [
//                 id.id
//             ],
//             StoreProcedureName: "SP_MEMBER_DELETE",
//             SchemaName: Path.sqlName
//         }
//         let formData = new FormData();
//         formData.append('data', JSON.stringify(valuef))
//         ApiAuthority(username, password, Token, formData, async res => {
            
//             if(res.Status===200)
//             {
//                 Swal.fire(
//                     'Deleted!',
//                     'Xóa thành công',
//                     'success'
//                   )
//                 //   window.location=member
//             }
        
           
//         })
//     }
//     useEffect(()=>{
//         handleGetName()
//     })

//     const handleGetName=async()=>{
       
//         let Token = await CheckTOkenRule();
//         let User = await CheckUserRule();
//         const username=User.username
//         const password= User.password
    
//         const valuef={
//             "DataBaseName": Path.DataBaseName,
//             Params:  [
//               username,
//               password
//             ],
//             StoreProcedureName: "SP_USER_GETBYID",
//             SchemaName:Path.sqlName
//             }
//         let formData = new FormData();
//         formData.append('data',JSON.stringify(valuef))
//         ApiAuthority(username,password,Token,formData,async res => {
           
         
//             if(res.Status===200)
//             {   
//                 setPermissionID(res.Data[0].Permission_ID)
             
//             }
//         })
//     }
//     return(
//         <div>

//             <div className="dropdown">
//             <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
//             <i className={ "text-dark mdi mdi-dots-vertical font-18 text-primary"}></i>
//             </button>
//             <ul className="dropdown-menu">
//                 <li onClick={() => {}}><div className="dropdown-item"  href="#">Chỉnh sửa</div></li>
//                {
//                 permissionID==='ADM001'?
//                 <li onClick={()=>{handleDeleteQues()}}><div className="dropdown-item"  href="#">Xóa</div></li>:null
//                }
//             </ul>
//         </div>
       
//         </div>
//     )
// }
// export default DropdownMem