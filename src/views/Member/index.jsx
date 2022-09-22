import { render } from "@testing-library/react";
import React, { Component } from "react";
import clsx from "clsx";
import Style from "./Member.module.scss"
import Loading from "../../shares/Loading";
import { ApiAuthority } from "../../api/User";
import { Path } from "../../api/Path";
import { CheckTOkenRule,CheckUserRule } from "../../shares/Func";
import { removeUnicode } from "../../utils/utils";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import Select from 'react-select'
import { register,dashboard } from "../../api/SubUrl";
import { Link } from "react-router-dom";
class Member extends Component{
    constructor(props)
    {
      super(props)
      
      this.state = {
          provinceData: [
              {User_ID:'USR001',
                  Full_Name:"Trần Văn Thuận",
                  Performance_ID:'ADM001',
                  Province_Name:'Lào Cai',
                  Province_ID:1 },
          ],
        optionsProvince: [
            { value: '', label: 'Tất cả' },
          
          ],
          addtressProvince: [],
          ListMember: [
              {
              EMPL_ID:'VN00070534	'
              ,Name_Local:   'Trần Văn Thuận1	'
              ,Sex: 'M '
              ,BirthDate: '1999-09-23 00:00:00.000'	
              ,Hire_DT: '2022-07-01 00:00:00.000'	
              ,Termination_DT: '2022-07-01 00:00:00.000'	
              ,Service_Year: 14	
              ,Performance: 2
              ,Phone: '0987654321'
              ,Email:'tranthua@gmail.com'	
              ,Address:  'thiện tân'
              ,Status:1
              ,JobStatus: 2
              ,Situation: 'khó khăn'
              ,HealthStatus:  'khỏe như trâu'	
              ,Remark:'không vấn đề'	 
              ,Image: 'img-1133053783122154480.jpg'	
              ,Flag:1
              ,Province_ID:2
              ,Position_ID:1
              ,National_ID:1
              ,CCA_CODE: null
              ,Company_Code:"512"},
             
          ],
          provall: [{
              "Full_Name": "",
              "Permission_ID": "ADM001",
              "Province_ID": '',
              "Province_Name": "Tất cả",
              "User_ID": "",
          }],
          valueSearch: '',
          nameSearch:'',
          idSreach:'',
          sLoading:false,
          showSearchProvince:false,
          
      }
    }


    // load page
    componentDidMount = () => {
        // this.props.navigation.addListener("focus", async () => {
        //    
        //    this.setState({valueSearch:'Tất cả'})
        // })
        this.setState({valueSearch:{ value: '', label: 'Tất cả' }})
        this.fnHandleGetAuthority()
        

    }
    handleValue = (type,e) => {
        
        const {valueSearch,nameSearch,idSreach} = this.state
        if(type==='Province')
        {

            this.setState({valueSearch:e})
            setTimeout(()=>{
                this.fnHandlegetMemall(e.value,nameSearch,idSreach)
            },500)
            
        }
       else if(type==='Name')
       {
            this.setState({nameSearch:e})
            setTimeout(()=>{
                this.fnHandlegetMemall(valueSearch.value,e,idSreach)
            },500)
           
       }
       else if(type==='Id')
       {
            this.setState({idSreach:e})
            setTimeout(()=>{
                this.fnHandlegetMemall(valueSearch.value,nameSearch,e)
            },500)
           
       }
      
      
    }
    // }

    // lấy quyền user
    fnHandleGetAuthority = async (id) => {
        const { provall, valueSearch } = this.state
      
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [

                username,
                password,
                valueSearch.includes('Tất cả')?'':valueSearch,
            ],
            StoreProcedureName: "SP_NATIONALLITY_PROVINCE_GET",
            SchemaName: "SQL01UAT"
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {

           
            if(res.Status)
            {
                const {optionsProvince} = this.state
                this.setState({ provinceData:[...provall, ...res.Data] })
                this.setState({optionsProvince:[...optionsProvince,...res.Data.map((item)=>{
                    return({
                        value: item.Province_ID,
                        label: item.Province_Name
                    })
                })]})
            }
             setTimeout(()=>{
                if (id) {
               
                    this.fnHandlegetMemall(id)
               }
               else {
                
                    this.fnHandlegetMemall()
                  
               }
             },1000)
           
        })
    }
    handleChoseItemSelect =async (type, value, id) => {
        this.setState({valueSearch:''})
        
        if (type) {
    
            this.setState({ selectBoolen: true })
        }
        else {
            if (value === '' && id === '') {
           
                this.setState({ selectBoolen: false })
            }
            else {
                this.setState({ valueSearch: value })
                setTimeout(() => {

                    this.fnHandleGetAuthority(id)
                    // this.setState({spinner:false})
                }, 500)
                this.setState({ selectBoolen: false })
            }

        }
        setTimeout(()=>{

            this.fnHandleGetAuthority(id)
        },500)

    }
    // lấy danh sách 
    fnHandlegetMemall = async (prv_id,searchName,Id) => {
        const { provinceData,nameSearch,valueSearch } = this.state
        if (!prv_id) {
            prv_id = ''
        }
        if(!searchName)
        {
            searchName=''
        }
        if(!Id){
            Id=''
        }

        console.log(123,valueSearch.value)
        
        console.log(321,removeUnicode(searchName))

        console.log(321,removeUnicode(Id))
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password = User.password
   
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                provinceData[1].User_ID,
                prv_id,
                removeUnicode(searchName),
                removeUnicode(Id)
            ],
            StoreProcedureName: "SP_MEMBER_GETALL",
            SchemaName: "SQL01UAT"
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        ApiAuthority(username, password, Token, formData, async res => {
            this.setState({ ListMember: res.Data })
        
           
        })
    }

    // handleClose = () => {
    //     this.setState({showSearch:false})
        
    // }
    handleShow = (type) => {
        if(type==='province')
        {

            this.setState({showSearchProvince:true})
        }
    }
    handleChangePage=()=>{
        window.location= register
    }   
    render(){
        const {isLoading,ListMember,provinceData,idSreach,valueSearch,optionsProvince,options,showSearchProvince
        ,nameSearch} = this.state
        
       
        return(
            <div className="flex-grow-1">
            {
                isLoading ? <Loading/> : ""
            }
            <div className={clsx(Style.project, "main-manage container-fluid w-100")}>
                <div className="container-fluid w-100 pe-5">
                    <div className={clsx('row')}>
                        <div className={clsx(Style.titleBlock, ' w-100 main-top col-12 pt-4 pb-4')}>
                            <h3 className={clsx(Style.titleProject)}>Quản lý thông tin thành viên</h3>
                            <div>

                            <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button"
                                        table="table-to-xls"
                                        filename="tablexls"
                                        sheet="tablexls"
                                        buttonText="export excel"
                                        Style={{}}/>

                            <span onClick={()=>{this.handleChangePage()}} className={clsx(Style.btnCreateProject, "btn")}>
                                  

                                <span className="mdi mdi-plus-circle pe-2"></span> Thêm thanh viên 
                                </span>

                                {/* <button onClick={()=>{this.handleChangePage()}} className={clsx(Style.btnLogin,"w-100 my-2 py-1")}>
                                                Thêm thành viên
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx('row')}>
                    <div className={clsx(Style.filterBlock, 'filter col-3')}>
                        <div className={Style.filterBlockSpan}>
                            <div className={''}>
                                <h5 className={clsx(Style.searchContent, '')}>Tỉnh thành</h5>
                                <Select value={valueSearch} onChange={(e)=>{this.handleValue('Province',e)}} className={clsx(Style.category, 'w-100')} options={optionsProvince} defaultValue={optionsProvince}  />
                              
                            </div>
                            <div className={''} style={{marginTop:'10px'}}>
                                <h5 className={clsx(Style.searchContent, '')}>Tên thành viên</h5>
                                <div className="form-group">
                                    <input value={nameSearch} onChange={(e) => {this.handleValue('Name', e.target.value) }} id="ipt-text-search" type="text" className={clsx(Style.searchInput, Style.Inputfocus, 'form-control')} placeholder="Tìm theo tên thành viên" autoComplete="off" />
                                </div>
                            </div>
                            <div className={''} style={{marginTop:'10px'}}>
                                <h5 className={clsx(Style.searchContent, '')}>Mã thành viên</h5>
                                <div className="form-group">
                                    <input value={idSreach} onChange={(e) => {this.handleValue('Id', e.target.value) }} id="ipt-text-search" type="text" className={clsx(Style.searchInput, Style.Inputfocus, 'form-control')} placeholder="Tìm theo ma thành viên" autoComplete="off" />
                                </div>
                            </div>
                          
                        </div>
                    </div>
                    <div className={clsx('list col-9')}>
                        <div className={clsx(Style.listPoject, 'h-100')}>
                            <div className="page-aside-right h-100 d-flex flex-column justify-content-between">
                                <div className={clsx(Style.table_responsive, 'table-responsive')}  style={{overflow:"scroll",height:600}}>
                                  
                                    <table className="table" id="table-to-xls">
                                        <thead>
                                            <tr>
                                                <th className="text-center" scope="col">#</th>
                                                <th className="text-center" scope="col">MNV</th>
                                                {/* <th className="text-center" scope="col">Hình ảnh</th> */}
                                                <th scope="col">Họ tên</th>
                                                <th scope="col">Tuổi</th>
                                                <th scope="col">Điện thoại</th>
                                                <th className="text-center" scope="col">Địa chỉ</th>
                                                <th className="text-center" scope="col">Quốc tịch</th>
                                                <th className="text-center" scope="col">Tham gia/Không TG</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                ListMember.map(function (item, index, arr) {
                                                    return (
                                                        <tr key={index} style={{ lineHeight: '2rem' }}>

                                                            <th scope="row" className={clsx(Style.lh,)}>{index + 1}</th>
                                                            <td className={clsx(Style.lh,)}>
                                                               {item.EMPL_ID}

                                                            </td>
                                                            {/* <td>
                                                                <div className={clsx(Style.imgAccount, "col-4 col-md-2 mx-auto")}>
                                                                    <img id="img-banner1" src={Path.IMAGE_MYASSET+item.Image} className={clsx(Style.img_item, "rounded-circle border border-1 img-fluid img-auto-size ")} />
                                                                </div>
                                                            </td> */}



                                                            <td className={clsx(Style.lh,)} >{item.Name_Local}</td>
                                                            <td className={clsx(Style.lh,)} > {moment(item.createTime).format('DD/MM/YYYY')}</td>

                                                            <td className={clsx(Style.lh,)} >{item.Phone}</td>
                                                            <td className={clsx(Style.lh, "text-center")} >{item.Address}</td>
                                                            <td className={clsx(Style.lh, "text-center", item.National_ID===2 ? 'text-warning' : 'text-primary')} >{item.National_ID===1?'VietNam':'Thai'}</td>
                                                            <td className={clsx(Style.lh, "text-center")} >
                                                                <span className={clsx(Style.StatusItem, 'position-relative', Number(item.Performance) === 1 ? 'doneStatus' : 
                                                                (Number(item.Performance) === 2 ? ' doingStatus' : 'doingStatus'))}>{Number(item.Performance)===1 ? 'Tham gia':'Không tham gia' }

                                                                </span>

                                                            </td>

                                                            <td className=" text-center align-middle ">
                                                                <Dropdown className="d-inline mx-2 " >
                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin")}
                                                                        style={{ position: 'relative', height: '30px', backgroundColor: 'transparent', border: 'none' }}>
                                                                        <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                        <Dropdown.Item onClick={() => {

                                                                            // powerCreate = 3
                                                                            // handleShow(item, 'Chỉnh sửa thông tin người dùng')
                                                                        }} className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>

                                                                            Chi tiết
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item 
                                                                        // onClick={() => handleChangePassword(item.email)} 
                                                                        className={clsx(Style.itemDrop)} ><i className={clsx("mdi mdi-lock-reset")}></i>
                                                                            Đổi mật khẩu
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item 
                                                                        // onClick={() =>  handleblockAcount('mở khóa', item.id) }
                                                                     className={clsx(Style.itemDrop, item.status === 1 ? "show" : "hide")} ><i className={clsx("mdi mdi-lock-reset")}></i>
                                                                            Mở khóa tài khoản
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item
                                                                        //  onClick={() => handleblockAcount('khóa', item.id)}
                                                                          className={clsx(Style.itemDrop, item.status === 1 ? "hide" : "show")} >
                                                                            <i className="mdi mdi-block-helper"></i>

                                                                            Khóa tài khoản
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
                                <div className="d-flex">
                                    <div>
                                        <button 
                                        // onClick={() => setPageindex(pageindex != 0 ? pageindex - 1 : pageindex)}
                                         className={clsx(Style.prevBtn, ' px-2')}>
                                            <span className="mdi mdi-chevron-double-left"></span>
                                        </button>
                                        {/* <span className="px-3 text-secondary">{pageindex}</span> */}
                                        <button 
                                        // onClick={() => setPageindex(pageindex + 1)}
                                         className={clsx(Style.nextBtn, ' px-2')}>
                                            <span className="mdi mdi-chevron-double-right"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* <Modal show={false} onHide={this.handleClose()} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose()}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal> */}
            
            </div>
        </div>
        )
    }
}

export default Member