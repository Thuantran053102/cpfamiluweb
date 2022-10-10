import Style from "./User.module.scss"
import clsx from "clsx"

import React, { Component, useEffect, useState } from 'react'
import DateRangePicker from 'rsuite/DateRangePicker';
import { startOfDay, endOfDay, addDays, subDays } from 'date-fns';
import 'rsuite/dist/rsuite-rtl.min.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { removeUnicode } from "../../utils/utils";
import { CheckTOkenRule, CheckUserRule } from "../../shares/Func";
import { Path } from "../../api/Path";
import * as $ from "jquery"
import { handleGetLable } from "../../utils/utils";
import Select from 'react-select'
import { Link } from "react-router-dom";
import moment from "moment";
import { ar } from "date-fns/locale";
import Loading from "../../shares/Loading"
import { ApiAuthority } from "../../api/User";

import { Button, Modal, Form } from "react-bootstrap";
import Swal from 'sweetalert2'


function Users() {

    //---------------------------------------------------------useState


    // bộ lọc

    const [pageindex, setPageindex] = useState(0)// trang 

    const [isLoading, setIsLoading] = useState(false)

    const [listUsers,setListUsers] = useState([])
    const [listDept,setListDept]=useState([])
    const [optionsProvince,setOptionsProvince] = useState([{ value: '', label: 'Tất cả' },])
    const [optionsProvinceI,setOptionsProvinceI] = useState([])
    const [optionsName,setOptionsName] = useState([{ value: '', label: 'Tất cả' },])
    const [optionsUserID,setOptionsUserID] = useState([{ value: '', label: 'Tất cả' },])
    const [optionsType,setOptionsType] = useState([{ value: '', label: 'Tất cả' },
    { value: 'ADM001', label: 'Admin' },{ value: 'HRBP001', label: 'User' }])
    const [filter,setFilter]= useState({
        province:{ value: '', label: 'Tất cả' }
        ,name:{ value: '', label: 'Tất cả' },
        dept:{ value: '', label: 'Tất cả' },
        userid:{ value: '', label: 'Tất cả' },
        type:{ value: '', label: 'Tất cả' }
    })
    const [optionDept,setOptionDept]= useState([{value: '', label: 'Tất cả' }])

    // modal
    const[showDelp,setShowDelp]= useState(false)
    const[deptValue,setDeptValue] = useState('')
    const[showModalUpdateDept,setShowModalUpdateDept] = useState(false)
    const[updateDept,setUpdateDept]= useState({})
    const[showModalUser,setShowModalUser]= useState(false)
    const[userItem,setUserItem]= useState({DeptID:'' ,
        Email: '',
        Full_Name:'',
        Permission_ID:'',
        Phone:'',
        User_ID:'',
        User_Name:''})
    const [selectProvince, setSelectProvince] = useState([])
    const [optionDeptI,setOptionDeptI] = useState([])
    //------------------------------------------------------------useEffect

    useEffect(()=>{
       
       
        fnHandleGetAuthority()
        fnHandleDeptGetAll()
        fnHandleGetProvinceByUserID()
    },[])

    async function fnHandleGetAuthority(){
        
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [

                username,
                password,
                ''
            ],
            StoreProcedureName: "SP_NATIONALLITY_PROVINCE_GET",
            SchemaName: "SQL01UAT"
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {

           
            if(res.Status===200)
            {
                setOptionsProvince([...[{ value: '', label: 'Tất cả' }],...res.Data.map((item)=>{
                    return({
                        value: item.Province_ID,
                        label: item.Province_Name
                    })
                })])
                setOptionsProvinceI(res.Data.map((item)=>{
                    return({
                        value: item.Province_ID,
                        label: item.Province_Name
                    })
                }))
               
            }
           
        })
    }
    
    useEffect(()=>{
        fnHandlegetMemall()

    },[filter])
    async function fnHandleGetProvinceByUserID(id){
        
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                id
            ],
            StoreProcedureName: "SP_PROVINCE_GETBYUSERID",
            SchemaName: "SQL01UAT"
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
            if(res.Status===200)
            {
                
                setSelectProvince(res.Data.map(function(item){
                    return{
                        value:item.Province_ID,
                        label:item.Province_Name
                    }
                }))
               
               
            }
           
        })
    }
  
    async function fnHandlegetMemall(){
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password = User.password
   
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                filter.dept.value+'',
                filter.userid.value,
                filter.name.value,
                filter.province.value,
                filter.type.value
            ],
            StoreProcedureName: "SP_USERWEB_GETALL",
            SchemaName: "SQL01UAT"
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        ApiAuthority(username, password, Token, formData, async res => {
        
            if(res.Status===200)
            {

                setListUsers(res.Data)
                setOptionsName([...[{ value: '', label: 'Tất cả' }],...res.Data.map((item)=>{
                    return({
                        value: item.User_Name,
                        label: item.User_Name
                    })
                })])
                setOptionsUserID([...[{ value: '', label: 'Tất cả' }],...res.Data.map((item)=>{
                    return({
                        value: item.User_ID,
                        label: item.User_ID
                    })
                })])
            }
           
        })
    }
    // GET ALL DEPT 
    async function fnHandleDeptGetAll(){
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password = User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [ 
            ],
            StoreProcedureName: "CP_DEPT_GETALL",
            SchemaName: "SQL01UAT"
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        ApiAuthority(username, password, Token, formData, async res => {
            if(res.Status===200)
            {
                setListDept(res.Data)
                setOptionDept([...[{ value: '', label: 'Tất cả' }],...res.Data.map((item)=>{
                    return({
                        value: item.DEPT_ID,
                        label: item.DEPT_Name
                    })
                })])
                setOptionDeptI(res.Data.map((item)=>{
                    return({
                        value: item.DEPT_ID,
                        label: item.DEPT_Name
                    })
                }))
                
            }
           
        })
    }

    // UPDATE USER
    async function fnHandleUpdateUser(){
   
        console.log('userádasadáItem',userItem)
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password = User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [ 
                userItem.User_ID,
                userItem.Full_Name,
                userItem.DeptID.value?userItem.DeptID.value:userItem.DeptID,
                userItem.Email,
                userItem.Phone
            ],
            StoreProcedureName: "SP_USER_UPDATE",
            SchemaName: "SQL01UAT"
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        ApiAuthority(username, password, Token, formData, async res => {
           
            if(res.Status===200)
            {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cập nhật thành công',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  fnHandleDeptGetAll()
                  updateUserProvince()
                  fnHandlegetMemall()
            }
            else
            {
                fnHandleDeptGetAll()
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Không được để trống ',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setShowModalUpdateDept(false)
                    setShowDelp(true)
            }
           
        })
    }
    async function fnHandleDeptUpdate(){
        if(updateDept.DEPT_Name)
        {
            let Token = await CheckTOkenRule();
            let User = await CheckUserRule();
            const username = User.username
            const password = User.password
            const valuef = {
                "DataBaseName": Path.DataBaseName,
                Params: [ 
                    updateDept.DEPT_ID,
                    updateDept.DEPT_Name
                ],
                StoreProcedureName: "SP_DEPT_UPDATE",
                SchemaName: "SQL01UAT"
            }
            let formData = new FormData();
            formData.append('data', JSON.stringify(valuef))
            ApiAuthority(username, password, Token, formData, async res => {
                if(res.Status===200)
                {
                    fnHandleDeptGetAll()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Cập nhật thành công',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      setShowModalUpdateDept(false)
                        setShowDelp(true)
                }
                else
                {
                    fnHandleDeptGetAll()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Không được để trống ',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      setShowModalUpdateDept(false)
                        setShowDelp(true)
                }
               
            })
        }
        else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Tên bộ phận quá ngắn',
                showConfirmButton: false,
                timer: 1500
              })
        }
       
    }
    async function updateUserProvince(){
        

        let arr= selectProvince.map((item)=>{
            return item.value
        })
      
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password = User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [ 
                userItem.User_ID,
                arr.join()
            ],
            StoreProcedureName: "SP_TB_USR_PROV_UPDATE",
            SchemaName: "SQL01UAT"
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        ApiAuthority(username, password, Token, formData, async res => {
            
            if(res.Status===200)
            {
                setShowModalUser(false)
            }
           
        })
    }





    // INSERT DEPT
    async function fnHandleInsertDept(){
        if(deptValue.length>6)
        {
            let Token = await CheckTOkenRule();
            let User = await CheckUserRule();
            const username = User.username
            const password = User.password
       
            const valuef = {
                "DataBaseName": Path.DataBaseName,
                Params: [
                    deptValue
                ],
                StoreProcedureName: "SP_DEPT_INSERT",
                SchemaName: "SQL01UAT"
            }
            let formData = new FormData();
            formData.append('data', JSON.stringify(valuef))
            ApiAuthority(username, password, Token, formData, async res => {
              
                if(res.Status===200)
                {
                   
                    
                    if(res.Data[0].ERROR===1)
                    {
                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Tên bộ phận đã tồn tại',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                    else if(res.Data[0].ERROR===0){
                       
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Thêm thành công',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          fnHandleDeptGetAll()
                    }
                }
               
            })
        }
        else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Tên bộ phận quá ngắn',
                showConfirmButton: false,
                timer: 1500
              })
        }
        
    }
    function handleShowUpdateDept(item){
        setShowModalUpdateDept(true)
        setUpdateDept(item)
        setShowDelp(false)
    }
    function hanldeHideModalUpdateDept()
    {
        setShowModalUpdateDept(false)
        setShowDelp(true)
    }
    function handleShowModalUser(item){
        fnHandleGetProvinceByUserID(item.User_ID)
        setShowModalUser(true)
        setUserItem(item)
        console.log('item',item)
    }

   
    function handleGetValue(otion,item)
    {
        return (
            otion.find(function (itemCategoty) {
              
                if ( Number(itemCategoty.value) ===Number(item)) {
                    
                   
                    return itemCategoty
                }
            })
        )
    }
    async function handleChangePer(id)
    {
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password = User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [ 
                id
            ],
            StoreProcedureName: "SP_TBUSRPER_UPDATEPER",
            SchemaName: "SQL01UAT"
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))

        Swal.fire({
            title: 'Thông Báo',
            text: "Bạn có chắc muốn cấp quyền admin cho người dùng này?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ok'
          }).then((result) => {
            if (result.isConfirmed) {
                ApiAuthority(username, password, Token, formData, async res => {
            
                    if(res.Status===200)
                    {
                        fnHandlegetMemall()
                          Swal.fire(
                            'Cấp quyền!',
                            'Cấp quyền thành công',
                            'success'
                          )
                    }
                   
                })
            
            }
          })
       
        
        
    }
    return (
        <div className="flex-grow-1">
            {
                isLoading ? <Loading /> : ""
            }
            <div className={clsx(Style.project, "main-manage container-fluid w-100")}>
                <div className="container-fluid w-100 pe-5">
                    <div className={clsx('row')}>
                        
                        <div className={clsx(Style.titleBlock, ' w-100 main-top col-12 pt-4 pb-4')}>
                            <h3 className={clsx(Style.titleProject)}>Quản lý tài khoản người dùng</h3>
                            <div >

                                <span  onClick={() => {setShowDelp(true)
                                }} className={clsx(Style.btnCreateProject, "btn me-2")}>
                                    <span className="mdi mdi-plus-circle pe-2"></span>Bộ phận</span>
                              
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx('row')}>
                    <div className={clsx(Style.filterBlock, 'filter col-md-3 col-12 mb-1')}>
                        <div className={Style.filterBlockSpan}>
                            <div className={''}>
                            <h5 className={clsx(Style.searchContent, '')}>Tỉnh</h5>
                                <div className="form-group">
                                    <Select defaultValue={filter.province} onChange={(e)=>setFilter({...filter,province:e})} className={clsx(Style.Inputfocus)} placeholder='Tỉnh thành' options={optionsProvince} />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent, '')}>Bộ phận</h5>
                                <div className="form-group">
                                    <Select defaultValue={filter.dept} onChange={(e)=>setFilter({...filter,dept:e})} className={clsx(Style.Inputfocus)} placeholder='danh mục' options={optionDept} />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent, '')}>Domain</h5>
                                <div className="form-group">
                                    <Select defaultValue={filter.name} onChange={(e)=>setFilter({...filter,name:e})} className={clsx(Style.Inputfocus)} placeholder='danh mục' options={optionsName} />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent, '')}>ID User</h5>
                                <div className="form-group">
                                    <Select defaultValue={filter.userid} onChange={(e)=>setFilter({...filter,userid:e})} className={clsx(Style.Inputfocus)} placeholder='trạng thái' options={optionsUserID} />
                                </div>
                            </div>
                            <div className={'mt-4'}>
                                <h5 className={clsx(Style.searchContent, '')}>Loại Tài Khoản</h5>
                                <div className="form-group">
                                    <Select defaultValue={filter.type} onChange={(e)=>setFilter({...filter,type:e})} className={clsx(Style.Inputfocus)} placeholder='trạng thái' options={optionsType} />
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
                                                <th className="text-center" scope="col">#</th>
                                                <th  scope="col">ID</th>
                                                <th scope="col">Họ tên</th>
                                                <th scope="col">Domain</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Điện thoại</th>
                                                <th  scope="col">Phòng bang</th>
                                                <th className="text-center" scope="col">Chức vụ</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listUsers.map(function (item, index, arr) {
                                                    return (
                                                        <tr key={index} style={{ lineHeight: '2rem' }}>

                                                            <th scope="row">{index + 1}</th>
                                                            <td className={clsx(Style.lh,)} >{item.User_ID}</td>
                                                            <td className={clsx(Style.lh,)} >{item.Full_Name}</td>
                                                            <td className={clsx(Style.lh,)} >{item.User_Name}</td>
                                                            <td className={clsx(Style.lh,)} >{item.Email}</td>

                                                            <td className={clsx(Style.lh,)} >{item.Phone}</td>
                                                            <td className={clsx(Style.lh,)} >{handleGetValue(optionDept,item.DeptID).label}</td>
                                                            <td className={clsx(Style.lh, "text-center", item.Permission_ID==='ADM001' ? 'text-warning' : 'text-primary')} >{item.Permission_ID==='ADM001' ? 'Admin' : 'User'}</td>
                                                           

                                                            <td className=" text-center align-middle ">
                                                                <Dropdown className="d-inline mx-2 " >
                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin")}
                                                                        style={{ position: 'relative', height: '30px', backgroundColor: 'transparent', border: 'none' }}>
                                                                        <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                        <Dropdown.Item onClick={() =>{handleShowModalUser(item)}} 
                                                                        className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>

                                                                            Chi tiết
                                                                        </Dropdown.Item>
                                                                        {
                                                                            item.Permission_ID!=='ADM001'?
                                                                            <Dropdown.Item onClick={() =>{handleChangePer(item.User_ID)}} 
                                                                                className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>
                                                                                Cấp quyền Admin
                                                                            </Dropdown.Item>:null
                                                                        }

                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </td>


                                                        </tr>

                                                    )
                                                })
                                            }


                                        </tbody>
                                    </table>

                                </div>
                                <div className="d-flex">
                                    <div>
                                        <button onClick={() => setPageindex(pageindex != 0 ? pageindex - 1 : pageindex)} className={clsx(Style.prevBtn, ' px-2')}>
                                            <span className="mdi mdi-chevron-double-left"></span>
                                        </button>
                                        <span className="px-3 text-secondary">{pageindex}</span>
                                        <button onClick={() => setPageindex(pageindex + 1)} className={clsx(Style.nextBtn, ' px-2')}>
                                            <span className="mdi mdi-chevron-double-right"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Modal show={showDelp}  size="sm-down"  onHide={()=>setShowDelp(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Bộ phận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <h5>Thêm bộ phận</h5>
                        <Form.Label>Tên bộ phận</Form.Label>
                        <div className="w-100 "  style={{ lineHeight:'30px', display:"flex" , justifyContent:'center'}}>
                            <input value={deptValue} onChange={(e)=>setDeptValue(e.target.value)} className="me-2" type="text"placeholder="" style={{width:'80%'}}/>
                            <Button variant="primary" style={{width:'10%',padding:'4px'}} onClick={()=>fnHandleInsertDept()}>
                                Lưu
                            </Button>
                        </div>
                        </Form.Group>
                       
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                            <div style={{maxHeight:'400px', overflow:'scroll'}}>

                            <table className="table" style={{maxHeight:'300px'}}>
                                        <thead>
                                            <tr>
                                                <th className="text-center" scope="col">#</th>
                                                <th className="text-center" scope="col">ID</th>
                                                <th className="text-center" scope="col">Tên bộ phận</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listDept.map(function (item, index, arr) {
                                                    return (
                                                        <tr key={index}  style={{ lineHeight: '2rem' }}>

                                                            <th scope="row"  className="text-center">{index + 1}</th>
                                                            
                                                            <td className={clsx(Style.lh,"text-center")}  >{item. DEPT_ID}</td>
                                                            <td className={clsx(Style.lh,"text-center")}  >{item.DEPT_Name}</td>

                                                            <td className=" text-center align-middle ">
                                                                <Dropdown className="d-inline mx-2 " >
                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin")}
                                                                        style={{ position: 'relative', height: '30px', backgroundColor: 'transparent', border: 'none' }}>
                                                                        <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                       
                                                                        <Dropdown.Item onClick={() =>{ handleShowUpdateDept(item)} } className={clsx(Style.itemDrop)} ><i className={clsx("mdi mdi-lock-reset")}></i>
                                                                            Sửa
                                                                        </Dropdown.Item>
                                                                      
                                                                     
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </td>


                                                        </tr>

                                                    )
                                                })
                                            }


                                        </tbody>
                                    </table>
                            </div>
                        
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={ ()=>setShowDelp(false)}>
                        Close
                    </Button>
                   
                    </Modal.Footer>
                </Modal>
               
            </div>
             {/* sửa dept */}
             <Modal show={showModalUpdateDept} onHide={()=>hanldeHideModalUpdateDept()}>
                    <Modal.Header closeButton>
                    <Modal.Title>Cập nhật bộ phận ID:{updateDept.DEPT_ID}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên bộ phận</Form.Label>
                        <input
                            type="text"
                            placeholder=""
                            value={updateDept.DEPT_Name}
                            onChange={(e)=>{setUpdateDept({...updateDept,DEPT_Name:e.target.value})}}
                        />
                        </Form.Group>
                   
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>hanldeHideModalUpdateDept()}>
                        Đóng
                    </Button>
                    <Button onClick={()=>{fnHandleDeptUpdate()}} variant="primary" >
                        Cập nhật
                    </Button>
                    </Modal.Footer>
                </Modal>
            
            {/* modal người dùng */}
            
            <Modal show={showModalUser} size="lg"  onHide={()=>setShowModalUser(false)}  centered>
                <Modal.Header closeButton>
                <Modal.Title>Chi tiết: {userItem.Full_Name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className="row">

                            <div className="col-12 col-md-6">
                                <label>Mã người dùng</label>
                                <input readOnly style={{backgroundColor:'#c5c5c5', padding:'5px'}}  
                                className="w-100" placeholder="" value={userItem.User_ID}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Tên người dùng</label>
                                <input  className="w-100 p-2"placeholder="" value={userItem.Full_Name}
                                onChange={(e)=>setUserItem({...userItem,Full_Name:e.target.value})}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <label>User Domain</label>
                                <input readOnly style={{backgroundColor:'#c5c5c5'}} 
                                className="w-100 p-2" placeholder="" value={userItem.User_Name}
                               
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Email</label>
                                <input  className="w-100 p-2" placeholder="" value={userItem.Email}
                                onChange={(e)=>setUserItem({...userItem,Email:e.target.value})}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Số điện thoại</label>
                                <input  className="w-100 p-2" placeholder="" value={userItem.Phone}
                                 onChange={(e)=>setUserItem({...userItem,Phone:e.target.value})}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Bộ Phận</label>
                                <Select 
                                    onChange={(e)=>setUserItem({...userItem,DeptID:e})} 
                                    className={clsx(Style.category, 'w-100')} 
                                    options={optionDeptI} 
                                    defaultValue={handleGetLable(optionDeptI,userItem.DeptID)}  
                                />
                               
                            </div>
                            <div className="col-12 ">
                                <label>Các tỉnh đang quản lý</label>
                            
                                
                                <Select 
                                    value={ selectProvince} 
                                    onChange={setSelectProvince}
                                    options={optionsProvinceI} 
                                    defaultValue={optionsProvinceI} 
                                    className={clsx(Style.category,'w-100')}isMulti 
                                 ></Select>
                               
                            </div>
                    
                        </div>
                    </Form.Group>
                   
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>setShowModalUser(false)}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={()=>fnHandleUpdateUser()}>
                    Cập nhật
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
        
    )
}
export default Users