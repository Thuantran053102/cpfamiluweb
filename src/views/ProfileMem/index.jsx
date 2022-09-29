import React, { Component } from "react";
import { components } from "react-select";
import Style from "./ProfileMem.module.scss"
import Loading from "../../shares/Loading";
import clsx from "clsx";
import { CheckTOkenRule,CheckUserRule } from "../../shares/Func";
import { Path } from "../../api/Path";
import moment from "moment/moment";
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';
import { ApiAuthority } from "../../api/User";
import { profileMem } from "../../api/SubUrl";
import default_img from "./../../images/default_image.png";
import ReactToPrint from "react-to-print";
class ProfileMem extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading:false,
            fillter:{
                notify:true,
                image:false,
                child:false,
            },
            profileMem:{
                Address: "",
                BirthDate: "",
                CCA_CODE: null,
                nullCompany_Code: "",
                EMPL_ID: "",
                Email: "",
                Flag: 1,
                HealthStatus: '',
                Hire_DT:'',
                Image:'',
                JobStatus:'',
                Name_Local:'',
                National_ID:'',
                Performance:'',
                Phone:'',
                Position_ID:'',
                Province_ID:'',
                Remark:'',
                Service_Year:'',
                Sex:'',
                Situation:'',
                Status:'',
                Termination_DT:'',

            },
            provinceName:'',
            company:'',
            c:0,
            dataPicture:'',
            dataChildrent:'',
        }
    }
    componentDidMount=()=>{
         this.handleGetValueMem()
        
    }

    //---------------------------------------------- get id
    // get id thành viên
    handleGetValueMem=async()=>{
        const pathname= window.location.pathname.slice(window.location.pathname.lastIndexOf('/')+1)
       
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                pathname
            ],
            StoreProcedureName: "SP_MEMBER_GET",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        ApiAuthority(username,password,Token,formData,async res => {
           
           if(res.Status===200)
           {
                console.log(res.Data[0])
                this.setState({profileMem:res.Data[0]})
                this.HandleGetLocation(res.Data[0])
                this.HandleGetNameCompany(res.Data[0])
                this.HandleGetPicture(res.Data[0])
                this.HandleGetChildrent(res.Data[0])
           }
        })
    }

    // get address
    HandleGetLocation= async (Data)=>{
       
        const {profileMem} = this.state
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                Data.Province_ID
            ],
            StoreProcedureName: "SP_ADDRESS_GETINSERT",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        ApiAuthority(username,password,Token,formData,async res => {
            
            
            if(res.Status===200)
            {
              
                this.setState({provinceName:res.Data[0]})
            }
        })
    }
    // get company
    HandleGetNameCompany= async (data)=>{
        
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                data.Company_Code
                
            ],
            StoreProcedureName: "SP_COMPANY_GETBYID",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        ApiAuthority(username,password,Token,formData,async res => {
            // console.log('company',res.Data[0])
            if(res.Status===200)
            {
                this.setState({
                    company:res.Data[0]
                })
                
            }
           
        })
    }

    // get image
    HandleGetPicture= async (data)=>{
        
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                data.EMPL_ID
               
            ],
            StoreProcedureName: "SP_PICTUREVISIT",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        ApiAuthority(username,password,Token,formData,async res => {
           
            this.setState({
                dataPicture:res.Data
            })
            
        })
    }
    
    HandleGetChildrent= async(data)=>{
        
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                data.EMPL_ID
                
            ],
            StoreProcedureName: "SP_CHILDRENT_GETALL",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        ApiAuthority(username,password,Token,formData,async res => {
            
            if(res.Status===200)
            {

                
                this.setState({
                    
                    dataChildrent:res.Data
                })
            }
          
        })
    }

    render(){
        const {isLoading,fillter,dataChildrent,dataPicture,profileMem,provinceName,company,c}= this.state

        
        return(
            
            <div className="flex-grow-1">
            {
                isLoading ? <Loading/> : ""
            }
            <div className={clsx(Style.project, "main-manage container-fluid w-100")}>
                <div className="container-fluid w-100 pe-5">
                    <div className={clsx('row')}>
                        <div className={clsx(Style.titleBlock, ' w-100 main-top col-12 pt-4 pb-4 ms-2')}>
                            <h3 className={clsx(Style.titleProject)}>Chi tiết thành viên </h3>
                          
                        </div>
                    </div>
                </div>
                <div className={clsx('row')}>
                    <div className={clsx(Style.filterBlock, ' filter col-12 my-1 col-lg-3' )}>
                        <div className={Style.filterBlockSpan}>
                        
                        <div className={clsx(Style.checkForm,"form-check mx-2")}>
                                <input className="form-check-input " onChange={()=>{this.setState({fillter:{...fillter,notify:!fillter.notify}})}} type="checkbox"  id="flexCheckDefault" checked={fillter.notify} />
                                <label className="form-check-label mx-xl-2" for="flexCheckDefault">
                                    Thông tin cá nhân
                                </label>
                            </div>
                            <div className={clsx(Style.checkForm,"form-check mx-2")}>
                                <input className="form-check-input" onChange={()=>{this.setState({fillter:{...fillter,image:!fillter.image}})}} type="checkbox" value="" id="flexCheckChecked" />
                                <label className="form-check-label mx-xl-2" for="flexCheckChecked">
                                    Hình ảnh
                                </label>
                            </div>
                            <div className={clsx(Style.checkForm,"form-check mx-2")}>
                                <input className="form-check-input" onChange={()=>{this.setState({fillter:{...fillter,child:!fillter.child}})}} type="checkbox" value="" id="flexCheckChecked" />
                                <label className="form-check-label mx-xl-2" for="flexCheckChecked">
                                    Người thân
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={clsx('list col-12 col-lg-9')}>
                    <div className={clsx(Style.listPoject, 'h-100')}>
                            <div className="page-aside-right h-100 d-flex flex-column justify-content-between">
                                <div className={clsx(Style.table_responsive,)}  >
                                    {
                                        fillter.notify?
                                        <div style={{backgroundColor:'var(--admin-background)' , overflow:'scroll'}}>
                                        
                                            <div className={clsx(Style.printPdb,'d-flex justify-content-start w-100')}>
                                                <ReactToPrint
                                                trigger={() => <button style={{backgroundColor:'#f6685e',color:'#fdfdfd'}} href="#">Print PDF!</button>}
                                                content={() => this.componentRef}
                                                />
                                                <button style={{backgroundColor:'#00bcd4' , color:'#fff'}}>
                                                    Chỉnh sửa
                                                </button>
                                            </div>
                                            <div className="col-12 mx-4 mgl py-4" 
                                             ref={el => (this.componentRef = el)} values={[c]} >

                                                <div className={clsx(Style.BoclkImg,"col-12 BoclkImg")}>
                                                    <div  className={clsx(Style.BockImgWrap,"col-12 m-xl-1 m-4 BockImgWrap")}>
                                                        <img id="img-banner1" src={Path.IMAGE_MYASSET+profileMem.Image} className={clsx(Style.img_item, "img_item rounded-circle border border-1 img-fluid img-auto-size ")} />       
                                                    
                                                    </div>
                                                    <div className="d-block w-100 d-flex justify-content-center py-1">

                                                     <span className="">Mã thành viên: {profileMem.EMPL_ID}</span>
                                                    </div>
                                                   
                                                </div>
                                              
                                                <div className="mx-xl-4 px-xl-4" >

                                                    <div className={clsx(Style.wrapNotify," p-xl-1 wrapNotify")}>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Tên thành viên:<span className={clsx(Style.fontvl,'fontvl')}>{profileMem.Name_Local}</span> </span>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Giới tính: <span className={clsx(Style.fontvl,'fontvl')}>{profileMem.Sex.includes('M')?'Nam':'Nữ'}</span></span>
                                                    
                                                    </div>
                                                    <div className={clsx(Style.wrapNotify," p-xl-1 wrapNotify")}>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>ngày sinh: <span className={clsx(Style.fontvl,'fontvl')}>{moment(profileMem.BirthDate).format('DD/MM/yyyy')}</span> </span>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Quốc tịch: <span className={clsx(Style.fontvl,'fontvl')}>{Number(profileMem.National_ID)===1?'Vietnamese':'Thai'}</span> </span>
                                                    </div>
                                                    <div className={clsx(Style.wrapNotify," p-xl-1 wrapNotify")}>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Số điện thoại: <span className={clsx(Style.fontvl,'fontvl')}>{profileMem.Phone}</span> </span>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Địa chỉ: <span className={clsx(Style.fontvl,'fontvl')}>{profileMem.Address},{provinceName.Province_Name}</span> </span>
                                                    </div>
                                                    <div className={clsx(Style.wrapNotify," p-xl-1 wrapNotify")}>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Email: <span className={clsx(Style.fontvl,'fontvl')}>{profileMem.Email}</span> </span>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Công ty: <span className={clsx(Style.fontvl,'fontvl')}>{company.Company_Name_Loc}</span> </span>
                                                    </div>
                                                    <div className={clsx(Style.wrapNotify," p-xl-1 wrapNotify")}>
                                                        {
                                                            Number(profileMem.JobStatus)===2?
                                                            <span className={clsx(Style.fontlb,'fontlb')}>Số năm làm: <span className={clsx(Style.fontvl,'fontvl')}>{profileMem.Service_Year}</span> </span>
                                                            :null
                                                        }
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Sống/Mất: <span className={clsx(Style.fontvl,'fontvl')}>{Number(profileMem.Status)===1?'Còn sống':'Đã mất'}</span> </span>
                                                    </div>
                                                    <div className={clsx(Style.wrapNotify," p-xl-1 wrapNotify")}>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Tham gia/Không tham gia: <span className={clsx(Style.fontvl,'fontvl')}>{Number(profileMem.Performance)===1?'Tham gia':'Không tham gia'}</span> </span>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Đang làm/ Đã nghỉ: <span className={clsx(Style.fontvl,'fontvl')}>{Number(profileMem.JobStatus)===1?'Đang làm':'Đã nghỉ'}</span> </span>
                                                    </div>
                                                    <div className={clsx(Style.wrapNotify,"p-xl-1 wrapNotify")}>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Ngày vào làm: <span className={clsx(Style.fontvl,'fontvl')}>{moment(profileMem.Hire_DT).format('DD/MM/yyyy')}</span> </span>
                                                        {
                                                            Number(profileMem.JobStatus)===2?
                                                            <span className={clsx(Style.fontlb,'fontlb')}>Ngày nghỉ làm:<span className={clsx(Style.fontvl,'fontvl')}>{moment(profileMem.Termination_DT).format('DD/MM/yyyy')}</span> </span>
                                                            :null
                                                        }
                                                    </div>
                                                    <div className={clsx(Style.wrapNotify," p-xl-1 wrapNotify")}>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>tình trạng sức khỏe:  </span>
                                                        <span className={clsx(Style.fontvl,'fontvl','w-100 fontlb')}>{profileMem.HealthStatus}</span>
                                                    </div>
                                                    <div className={clsx(Style.wrapNotify," p-xl-1 wrapNotify")}>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Hoàn cảnh gia đình: </span>
                                                        <span className={clsx(Style.fontvl,'fontvl','fontlb w-100')}>{profileMem.Situation}</span>
                                                    </div>
                                                    <div className={clsx(Style.wrapNotify," p-xl-1 wrapNotify")}>
                                                        <span className={clsx(Style.fontlb,'fontlb')}>Ghi chú:  </span>
                                                        <div style={{width:'100%',whiteSpace:'pre-wrap'}}>

                                                            {/* <textarea value={profileMem.Remark} readOnly className={clsx(Style.fontvl,'fontvl','fontlb w-100')} style={{height:'200px'}}></textarea> */}
                                                             <span className={clsx(Style.fontvl,'fontvl','fontlb w-100')} >{profileMem.Remark}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :null
                                    }
                                    {
                                        fillter.image ?
                                            <div className="col-12 container-fluid mt-2" style={{backgroundColor:'var(--admin-background)'}}>
                                                <div className='row' style={{magrin:'20px', display:'flex', flex:'row',flexWrap: 'wrap'}}>
                                                    {
                                                        dataPicture.length>0 &&dataPicture.map((item)=>{
                                                            return(
                                                                <>
                                                                <div className='col-12 col-md-6 col-xxl-4 my-3' >
                                                                     <img id="img-banner1" src={Path.IMAGE_MYASSET+item.Name} className={clsx(Style.imglistItem, " img-fluid img-auto-size ")} />       
                                                                </div>
                                                              
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        dataPicture.length<15 &&
                                                            <div className='col-3 m-xl-3 m-1' style={{border:'1px solid #191919', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                                <span class="mdi mdi-plus" style={{fontSize:'100px' }}></span>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        :null
                                    }
                                    {
                                        fillter.child?
                                            <div className="col-12 container-fluid mt-2" style={{backgroundColor:'var(--admin-background)'}}>
                                               <div className='row'>
                                               <table className="table" id="table-to-xls">
                                        <thead>
                                            <tr>
                                                <th className="text-center" scope="col">#</th>
                                                <th className="text-center" scope="col">Họ tên</th>
                                                {/* <th className="text-center" scope="col">Hình ảnh</th> */}
                                                <th scope="col">Số điện thoại</th>
                                                <th scope="col">Mối quan hệ</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                dataChildrent.map(function (item, index, arr) {
                                                    return (
                                                        
                                                        <tr key={index} style={{ lineHeight: '2rem' }}>

                                                            <th scope="row" className={clsx(Style.lh,)}>{index + 1}</th>
                                                            <td className={clsx(Style.lh,)}>
                                                                {item.CHILDR_Name}
                                                            </td>
                                                            <td className={clsx(Style.lh,)} >{item.Phone}</td>
                                                            <td className={clsx(Style.lh,)} >{item.Relationship}</td>

                                                         
                                                            

                                                            <td className=" text-center align-middle " style={{color:'black'}}>
                                                                <Dropdown className="d-inline mx-2 " >
                                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className={clsx(Style.btnDrop, "project-admin")}
                                                                        style={{ position: 'relative', height: '30px', backgroundColor: 'transparent', border: 'none' }}>
                                                                        <i className={clsx(Style.iconDrop, "text-light mdi mdi-dots-vertical font-18 text-primary")}></i>
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(Style.listDrop)} style={{}}>
                                                                        <Dropdown.Item  onClick={() => {window.location=`/profileMem/${item.EMPL_ID}`}}  className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>
                                                                            Thêm 
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item  onClick={() => {window.location=`/profileMem/${item.EMPL_ID}`}}  className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>
                                                                            Sửa
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item  onClick={() => {window.location=`/profileMem/${item.EMPL_ID}`}}  className={clsx(Style.itemDrop)}><i className="mdi mdi-window-restore "></i>
                                                                            Xóa 
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
                                            </div>
                                        :null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default ProfileMem