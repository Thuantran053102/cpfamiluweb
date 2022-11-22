import React from "react";
import './Users.css'
import Select from 'react-select'
import { useEffect,useState } from "react";
import { ApiAuthority } from "../../api/User";
import { Path } from "../../api/Path";
import { CheckUserRule,CheckTOkenRule } from "../../shares/Func";
import moment from "moment";
function Users(){

    const optionTypeLog=[
        {value: '', label: 'Tất cả'},
        {value: 'M', label: 'Insert'},
        {value: 'D', label: 'Delete'},
        {value: 'F', label: 'Update'}
    ]

    const [optionSite,setOptionSite] = useState([{value: '', label: 'Tất cả'}])
    const [dataUsers,setDataUsers]= useState([])
 
    useEffect(()=>{
        handleGetUsers()
    },[])

    const handleGetUsers=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
            ],
            StoreProcedureName: "SP_USERS_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status=200)
          {
            console.log(res.Data)
            setDataUsers(res.Data)
          } 
        })
  
      }

     
    return(
       <div className="container-fluid">
            <div className="container">
                <div className="row">
                   
                    <div className="col-12">
                    <div className="p-md-4 menuLog tableLog" id="style-5">
                        <table className="table duplitecate" style={{ overflow: 'auto',
                                    boxShadow:'1px 1px 10px #cccbcb',
                                    maxHeight:'300px'}}>
                                <thead>
                                    <tr key='1'>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">#</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">User ID</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">User Domain</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Full Name</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Phone Number</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">CCA Code</th>
                                    </tr>
                                </thead>
                                <tbody style={{overflow:'scroll', maxHeight:600}}>
                                
                                    {
                                            dataUsers.map((item,index)=>{
                                            return(
                                                <tr  key={index} style={{ lineHeight: '2rem'}}>
                                                    <td style={{whiteSpace: 'nowrap' }}>{index}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.User_ID}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.User_Name}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.Full_Name}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.Phone}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.CCA_CODE}</td>
                                                </tr>
                                                )         
                                            })   
                                    }
                                </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
       </div>
    )

}
export default Users