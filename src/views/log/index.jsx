import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Style from './log.module.scss'
import Select from 'react-select'
import { CheckTOkenRule, CheckUserRule } from "../../shares/Func";
import { Path } from "../../api/Path";
import { ApiAuthority } from "../../api/User";
import { Dropdown } from "rsuite";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loading from "../../shares/Loading";
function Log(){
    const filterName = [
        { value: '', label: 'Tất cả' },
        { value: '1', label: 'Thành viên' },
        { value: '2', label: 'Hình ảnh' },
        { value: '3', label: 'Người thân thành viên' },
    ]
    const filterType = [
        { value: '', label: 'Tất cả' },
        { value: '1', label: 'Thêm' },
        { value: '2', label: 'Xóa' },
        { value: '3', label: 'Sửa' },
    ]
 
    const [filterUser,setFilterUser] = useState([{ value: '', label: 'Tất cả' }])
    const [inputSearh,setInputSearh]=  useState({
        Name:'',
        Type:'',
        UserId:'',
    })
    const [isLoading,setIsLoading] = useState(false)
    const [showModalProfile,setShowModalProfile] = useState(false)
    const [Profile,setProfile]= useState({
        Function_Name:3,
        Log_DateTime:"2022-10-01T19:38:39.143",
        Note:"Sửa thông tin thành viên Trần văn b id VN00000002 ",
        Type:1,
        User_ID:"USR001",
    })
    const [listLog,setListLog] = useState([{
        Function_Name:3,
        Log_DateTime:"2022-10-01T19:38:39.143",
        Note:"Sửa thông tin thành viên Trần văn b id VN00000002 ",
        Type:1,
        User_ID:"USR001",
    }])

    // get danh sách user
    useEffect(async()=>{
        setIsLoading(true)
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password = User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                ''
            ],
            StoreProcedureName: "SP_USER_GETALL",
            SchemaName: "SQL01UAT"
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        ApiAuthority(username, password, Token, formData, async res => {
            
            if(res.Status===200)
            {
                setIsLoading(false)
                var arr= res.Data.map((item)=>{
                    return(
                        {
                        value:item.User_ID,
                        label:item.User_Name})
                })
                setFilterUser([...[{ value: '', label: 'Tất cả' }],...arr])
                
            }
        })
    },[])

    function getUserName(id)
    {
        var art
       for(let i=0; i<filterUser.length;i++)
       {
            if(filterUser[i].value!='' && filterUser[i].value===id)
            {
                art= filterUser[i].label
            }
       }
       
       return art
            
     
        
    }
  
    useEffect(()=>{
        getAllLog()
   
       
    },[inputSearh])
    useEffect(()=>{
        console.log('listLog',listLog)
    },[listLog])
    
    async function getAllLog()
    {
        setIsLoading(true)
        let Token = await CheckTOkenRule();
            let User = await CheckUserRule();
            const username = User.username
            const password = User.password
        setTimeout(()=>{
        
            const valuef = {
                "DataBaseName": Path.DataBaseName,
                Params: [
                    inputSearh.Name.value ? inputSearh.Name.value :'',
                    inputSearh.Type.value ? inputSearh.Type.value :'',
                    inputSearh.UserId.value ? inputSearh.UserId.value :'',
                ],
                StoreProcedureName: "SP_LOG_GETALL",
                SchemaName: "SQL01UAT"
            }
            let formData = new FormData();
            formData.append('data', JSON.stringify(valuef))
           
            ApiAuthority(username, password, Token, formData, async res => {
                if(res.Status===200)
                {
                    setIsLoading(false)
                    setListLog(res.Data)
                }
            })
        },1000)
    }

    function handleShowModal(item){
        setShowModalProfile(true)
        setProfile(item)
    }

    return(
        <div className="flex-grow-1">
            {
               isLoading ? <Loading /> : ""
               }
            <div className={clsx(Style.project, "main-manage container-fluid w-100")}>
            <div className="container-fluid w-100 pe-5">
                <div className={clsx('row')}>
                    <div className={clsx(Style.titleBlock, ' w-100 main-top col-12 pt-4 pb-4')}>
                        <h3 className={clsx(Style.titleProject)}>Quản lý lịch sử giao dịch</h3>

                    </div>
                </div>
            </div>
            <div className={clsx('row')}>
                <div className={clsx(Style.filterBlock, 'filter col-12 col-md-3 mb-1')}>
                    <div className={Style.filterBlockSpan}>

                        <div className={'mt-4'}>
                            <span className={clsx(Style.searchContent, '')}>Loại</span>
                            <div className="form-group">
                                <Select defaultValue={inputSearh.Name} onChange={(e)=>{setInputSearh({...inputSearh,Name:e})}} className={clsx(Style.Inputfocus)} placeholder='' options={filterName} />
                            </div>
                        </div>
                        <div className={'mt-4'}>
                            <span className={clsx(Style.searchContent, '')}>Kiểu</span>
                            <div className="form-group">
                                <Select defaultValue={inputSearh.Type} onChange={(e)=>{setInputSearh({...inputSearh,Type:e})}} className={clsx(Style.Inputfocus)} placeholder='' options={filterType} />
                            </div>
                        </div>
                        <div className={'mt-4'}>
                            <span className={clsx(Style.searchContent, '')}>Người thực hiện</span>
                            <div className="form-group">
                                <Select defaultValue={inputSearh.UserId} onChange={(e)=>{setInputSearh({...inputSearh,UserId:e})}} className={clsx(Style.Inputfocus)} placeholder='' options={filterUser} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className={clsx('list col-12 col-md-9')}>
                    <div className={clsx(Style.listPoject, 'h-100')}>
                        <div className="page-aside-right h-100 d-flex flex-column justify-content-between">
                            <div className={clsx(Style.table_responsive, 'table-responsive')}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Loại</th>
                                            <th scope="col">Ngày</th>
                                            <th scope="col">Ghi chú</th>
                                            <th className="text-center" scope="col">Kiểu</th>
                                            <th className="text-center" scope="col">Người thực hiện</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listLog.length>0?                                        listLog.map(function (item, index, arr) {
                                                return (
                                                    <tr key={index} style={{ lineHeight: '2rem' }}>

                                                        <th scope="row">{index + 1}</th>
                                                        <td  >{ Number(item.Function_Name)===1 ?'Thành viên':(Number(item.Function_Name)===2?'Hình ảnh':'Người thân')}</td>
                                                        <td  >{moment(item.Log_DateTime).format('DD/MM/yyyy')}</td>
                                                        <td  >{item.Note.length > 15 ? item.Note.slice(0, 15) + '...' : item.Note}</td>
                                                        <td style={{textAlign:'center'}} >{Number(item.Type)===1 ?'Thêm':(Number(item.Type)===2)?'Xóa':'Sửa'}</td>
                                                        <td className="text-center">{ 
                                                            getUserName(item.User_ID)
                                                        
                                                        
                                                        }</td>
                                                    

                                                        <td key={index + 'dropdow'} onClick={()=>{handleShowModal(item)}} className=" text-center align-middle ">
                                                            <span  className={clsx(Style.StatusItem, 'position-relative doneStatus')}>Chi tiết

                                                            </span>
                                                        </td>


                                                    </tr>
                                                )
                                            }):null
                                        }


                                    </tbody>
                                </table>
                            </div >
                            <div className="d-flex">
                                <div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={showModalProfile} onHide={()=>{setShowModalProfile(false)}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container-fluid ">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="namechild">Loại</label>
                                    <input value={ Number(Profile.Function_Name)===1 ?'Thành viên':(Number(Profile.Function_Name)===2?'Hình ảnh':'Người thân')} readOnly={true} style={{width:'100%'}}/>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="namechild">Ngày</label>
                                    <input value={moment(Profile.Log_DateTime).format('DD/MM/yyyy')} readOnly={true} style={{width:'100%'}}/>
                                </div>
                                <div className="col-12 ">
                                    <label htmlFor="namechild">Ghi chú</label>
                                    <textarea readOnly={true} value={Profile.Note}  style={{width:'100%'}}/>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="namechild">Kiểu</label>
                                    <input value={Number(Profile.Type)===1 ?'Thêm':(Number(Profile.Type)===2)?'Xóa':'Sửa'} readOnly={true} style={{width:'100%'}}/>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label htmlFor="namechild">người thực hiện</label>
                                    <input value={getUserName(Profile.User_ID)} readOnly={true} style={{width:'100%'}}/>
                                </div>
                            </div>
                        </div>
                        
                        {/* <span className="w-100 d-block">Loại: </span>
                        <span className="w-100 d-block">Ngày: {moment(Profile.Log_DateTime).format('DD/MM/yyyy')}</span>
                        <span className="w-100 d-block">Ghi chú: {Profile.Note}</span>
                        <span className="w-100 d-block">Kiểu: {Number(Profile.Type)===1 ?'Thêm':(Number(Profile.Type)===2)?'Xóa':'Sửa'}</span>
                        <span className="w-100 d-block">người thực hiện: {getUserName(Profile.User_ID)}</span> */}
                        </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{setShowModalProfile(false)}}>
                        Close
                    </Button>
                
                    </Modal.Footer>
                </Modal>
            </div>
            </div>
        </div>
    )
}

export default Log