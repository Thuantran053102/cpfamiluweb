import React, { Component } from "react";
import { components } from "react-select";
import Style from "./ProfileMem.module.scss"
import Loading from "../../shares/Loading";
import clsx from "clsx";
import { handleShowmodal } from "../../utils/utils";
import { CheckTOkenRule,CheckUserRule } from "../../shares/Func";
import { postManagerImageOpenSale } from "../../api/User";
import { Path } from "../../api/Path";
import moment from "moment/moment";
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';
import { ApiAuthority } from "../../api/User";
import Modal from 'react-bootstrap/Modal';
import DropdownModal from "../../components/dropdown";
import { profileMem } from "../../api/SubUrl";
import default_img from "./../../images/default_image.png";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";
class ProfileMem extends Component{
    constructor(props){
        super(props)
        this.state={
            Group_Image_File: null,
          
            imgModal:'',
            childModal:{
                CHILDR_Name:'',
                Phone:'',
                Relationship:''
            },
            showImg:false,
            showChild:false,
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
        this.setState({isLoading:true})
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
                this.setState({isLoading:false})
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
        this.setState({isLoading:true})
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
                this.setState({isLoading:false})
                this.setState({provinceName:res.Data[0]})
            }
        })
    }
    // get company
    HandleGetNameCompany= async (data)=>{
        this.setState({isLoading:true})
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
           
            if(res.Status===200)
            {
                this.setState({isLoading:false})
                this.setState({
                    company:res.Data[0]
                })
                
            }
           
        })
    }

    // get image
    HandleGetPicture= async (data)=>{
        this.setState({isLoading:true})
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
           
            if(res.Status===200)
            {
                this.setState({isLoading:false})
                const  {imgModal} = this.state
                this.setState({
                    dataPicture:res.Data
                })
                let asd=res.Data.filter((item)=>{
                    if(imgModal.IMG_ID && Number(item.IMG_ID)===Number(imgModal.IMG_ID))
                    {
                        return item
                    }
                })
                if(imgModal.IMG_ID)
                {

                    this.setState({imgModal:{...imgModal,Name:asd[0].Name}})
                }
                
            }
            
        })
    }
    
    HandleGetChildrent= async(data)=>{
        this.setState({isLoading:true})
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

                this.setState({isLoading:false})
                this.setState({
                    
                    dataChildrent:res.Data
                })
            }
          
        })
    }

    handleShowChildModal=(item)=>{
        const {showChild}= this.state
        this.setState({showChild:!showChild,childModal:item})
       
    }

    HandlehideImg =(item)=>{
        const {showImg}= this.state
        this.setState({showImg:!showImg,imgModal:item})

    }
    hanldeChild=()=>{
        const {showChild}= this.state
        this.setState({showChild:!showChild})
    }
    handleCheckValues =()=>{
        const {childModal}= this.state
        if(childModal.Name_Local.length>6 && childModal.Phone.length>8 && childModal.Relationship.length>6)
        {
            this.handleCreateChild()
        }   
        else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Thông tin chưa hợp lệ',
                showConfirmButton: false,
                timer: 1500
              })
        }
      }

    handleCreateChild= async()=>{
        const {childModal,profileMem}= this.state
        this.setState({isLoading:true})
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
      
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                childModal.CHILDR_Name,
                childModal.Phone,
                profileMem.EMPL_ID,
                childModal.Relationship
            ],
            StoreProcedureName: "SP_CHILDRENT_INSERT",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        ApiAuthority(username,password,Token,formData,async res => {
            
            if(res.Status===200)
            {
                this.setState({isLoading:false})
                const {profileMem} = this.state
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Thêm thành công',
                    showConfirmButton: false,
                    timer: 1500
                  })
           
                this.HandleGetChildrent(profileMem)
                this.fnhandleGetIDFullNameUsr()
            
            }
            else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Thêm thông tin thất bại',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    fnhandleGetIDFullNameUsr=async()=>{
        this.setState({isLoading:true})
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
            "SchemaName":"SQL01UAT"
            }
            const formData = new FormData();
            formData.append('data',JSON.stringify(Body));
            ApiAuthority(username,password,Token,formData,async res => {
              if(res.Status===200)
              {
                this.setState({isLoading:false})
              
                 this.fnhandleSaveLog(res.Data)
              }
            })
      }
      
      fnhandleSaveLog=async(useId)=>{
        const {childModal,profileMem} = this.state
        this.setState({isLoading:true})
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const Body = {
            "DataBaseName": Path.DataBaseName,
                "Params":  [
                  '1',// sửa
                  `Thêm thông tin ${childModal.CHILDR_Name} ${childModal.Relationship} của thành viên id ${profileMem.EMPL_ID} `,
                  useId[0].User_ID,
                  '3'
                ],
                "StoreProcedureName": "SP_LOG",
            "SchemaName":"SQL01UAT"
            }
            const formData = new FormData();
            formData.append('data',JSON.stringify(Body));
      
            ApiAuthority(username,password,Token,formData,async res => {
                if(res.Status===200)
                {
                    this.setState({isLoading:false})
                    this.HandleGetChildrent(profileMem.EMPL_ID)
                }
            })
      }

      handleChangtext =(type,value)=>{
    
        const {childModal} = this.state
        type==='name' && this.setState({childModal:{...childModal,CHILDR_Name:value}})
        type=== 'phone' && Number.isFinite(Number(value)) && this.setState({childModal:{...childModal,Phone:value}})
        type=== 'relationship' && this.setState({childModal:{...childModal,Relationship:value}})
        this.handleCheck(type,value)
      }
 
      handleUpImg=(name,e,type)=>{
        this.setState({
            Group_Image_File:e.target.files[0]
        })
        
            this.handleCheckImg(name,e.target.files[0],type)
        
      }
     
      handleCheckImg= async(name,Group_Image,type)=>{
        const {imgModal,profileMem} = this.state
       
        this.setState({isLoading:true})
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
     
        const Body = {
            "DataBaseName":Path.DataBaseName,
                "Params":  [
                    Number(type)===1?profileMem.EMPL_ID:imgModal.IMG_ID
                ],
                "StoreProcedureName": Number(type)===1? "SP_PICTUREVISIT_INSERT":"SP_PICTURE_UPDATE",
            "SchemaName":"SQL01UAT"
            }
            const formData = new FormData();
            formData.append('data',JSON.stringify(Body));
            formData.append("files",Group_Image);
            
            postManagerImageOpenSale(username,password,Token,formData,async res => {
              
            
               
            if(res.Status ===200)
              {
                this.setState({isLoading:false})
                this.HandleGetPicture(profileMem)
                this.fnhandleGetIDFullNameUsrs(name,type)
                // this.setState({imgModal:{...imgModal,IMG_ID:}})
              }
        })
    }
    fnhandleGetIDFullNameUsrs=async(name,type)=>{

        this.setState({isLoading:true})
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
            "SchemaName":"SQL01UAT"
            }
            const formData = new FormData();
            formData.append('data',JSON.stringify(Body));
            ApiAuthority(username,password,Token,formData,async res => {
              if(res.Data)
              {
                await this.setState({user:res.Data})
                this.setState({isLoading:false})
                 this.fnhandleSaveLogs(name,res.Data,type)
              }
            })
      }

    fnhandleSaveLogs=async(name,useId,type)=>{
        this.setState({isLoading:true})
        const {profileMem}= this.state
        console.log('đâsadasdass',name,type)
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const Body = {
            "DataBaseName": Path.DataBaseName,
                "Params":  [
                    name+'',// sửa
                    Number(type)===1?`Thêm ảnh thành viên id ${profileMem.EMPL_ID}`:(Number(type)===2?`Xóa ảnh thành viên id ${profileMem.EMPL_ID}`:`Sửa ảnh thành viên id ${profileMem.EMPL_ID} `),
                    useId[0].User_ID,
                    type+''
                ],
                "StoreProcedureName": "SP_LOG",
            "SchemaName":"SQL01UAT"
            }
            const formData = new FormData();
            formData.append('data',JSON.stringify(Body));
      
            ApiAuthority(username,password,Token,formData,async res => {
              if(res.Status==200)
              {
                this.setState({isLoading:false})
              }
            })
      }

      handleDeleteImg=(name,type)=>{
       
        Swal.fire({
            title: 'Thông Báo',
            text: "Bạn có chắc muốn xóa hình ảnh này",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2bb9c4 ',
            cancelButtonColor: 'var(--love-color-4)',
            confirmButtonText: 'ok'
          }).then((result) => {
            if (result.isConfirmed) {
                this.handleAccepDelete(name,type)
                
            }
          })
      }
      handleAccepDelete= async(name,type)=>{
        this.setState({isLoading:true})
        const {imgModal,profileMem}= this.state
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password=User.password
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                imgModal.IMG_ID
            ],
            StoreProcedureName: "SP_PICTURE_DELETE",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        postManagerImageOpenSale(username,password,Token,formData,async res => {
    
            if(res.Status===200)
            {
                this.setState({isLoading:false})
                 Swal.fire(
                'Xóa!',
                'Xóa ảnh thành công',
                'success'
              )
              this.fnhandleGetIDFullNameUsrs(name,type)
              await this.HandlehideImg('')
              await this.HandleGetPicture(profileMem)
            }
          })
      
      }

    render(){
        const {imgModal,isLoading,childModal,showChild,showImg,fillter,dataChildrent,dataPicture,profileMem,provinceName,company,c}= this.state

        console.log('2132',Path.IMAGE_MYASSET+profileMem.Image)
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
                    <div className={clsx(Style.listPoject, 'h-100 p-xl-3')}>
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
                                                <button style={{backgroundColor:'#00bcd4' , color:'#fff'}} onClick={()=>{window.location=`/member/update/${profileMem.EMPL_ID}`}}>
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
                                                                <div className='col-6 col-md-6 col-xxl-4 my-3' style={{maxHeight:'300px'}} onClick={()=>{this.HandlehideImg(item)}}>
                                                                     <img style={{width:'100%',height:'100%'}} id="img-banner1" src={Path.IMAGE_MYASSET+item.Name} className={clsx(Style.imglistItem, " ")} />       
                                                                </div>
                                                              
                                                              
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        dataPicture.length<15 &&
                                                            <div className='col-6 col-md-6 col-xxl-4 my-3' style={{border:'1px solid #191919',position:'relative', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                               <input type="file" onChange={(e)=>this.handleUpImg(2,e,1)} style={{ cursor: "pointer", opacity: "0",top:0,left:0,right:0,bottom:0, cursor: "pointer",position:'absolute' }} />
                                                                <span className="mdi mdi-plus" style={{fontSize:'100px' }}></span>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        :null
                                    }
                                    {
                                        fillter.child?
                                            <div className="col-12 container-fluid mt-2" style={{backgroundColor:'var(--admin-background)'}}>
                                                <button className="px-3" onClick={()=>this.hanldeChild()} style={{backgroundColor:'#00bcd4' , color:'#fff'}} >
                                                    Thêm
                                                </button>
                                               <div className='row'>
                                               <table className="table" id="table-to-xls">
                                        <thead>
                                            <tr >
                                                <th className="text-center" scope="col">#</th>
                                                <th className="text-center" scope="col">Họ tên</th>
                                                {/* <th className="text-center" scope="col">Hình ảnh</th> */}
                                                <th scope="col">Số điện thoại</th>
                                                <th scope="col">Mối quan hệ</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                            dataChildrent ?
                                                dataChildrent.map(function (item, index, arr) {
                                                    return (
                                                       
                                                        <tr key={index} style={{ lineHeight: '2rem' }}>

                                                            <th scope="row" className={clsx(Style.lh,)}>{index + 1}</th>
                                                            <td className={clsx(Style.lh,)}>
                                                                {item.CHILDR_Name}
                                                            </td>
                                                            <td className={clsx(Style.lh,)} >{item.Phone}</td>
                                                            <td className={clsx(Style.lh,)} >{item.Relationship}</td>

                                                         
                                                            

                                                            <td className=" text-center align-middle " style={{color:'black'}} >
                                                                <DropdownModal value={item} mem={profileMem}/>
                                                          
                                                            </td>


                                                        </tr>

                                                    )
                                                })
                                                :null
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
            <Modal
                show={showImg}
                onHide={() => this.HandlehideImg(imgModal)}
                size='xl'
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title" className="text-black-50">
                  Hình ảnh: 
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-9 col-12">
                                <img id="img-banner1" src={Path.IMAGE_MYASSET+imgModal.Name} 
                                className={clsx(Style.imglistItem, " img-fluid img-auto-size ")}
                                style={{border:'1px solid #757575'}}/>
                            </div>
                            <div className="col-xl-3 col-12" >
                                <span className={clsx(Style.btnCreateProject, )} style={{position:'relative'}}>
                                    <input type="file" onChange={(e)=>this.handleUpImg(3,e,2)} style={{ cursor: "pointer", opacity: "0",top:0,left:0,right:0,bottom:0, cursor: "pointer",position:'absolute' }} />
                                    {/* <span onClick={()=>{this.handleUpImg()}} className="mdi mdi-plus-circle pe-2"></span> Đổi ảnh  */}
                                    Đổi ảnh
                                </span>
                                <span onClick={()=>{this.handleDeleteImg(2,2)}} className={clsx(Style.btnDeleteProject, )}>
                                    <span className="mdi mdi-plus-circle pe-2"></span> Xóa ảnh 
                                </span>
                            
                        
                            </div>
                        </div>
                        
                    </div>
                   
                </Modal.Body>
            </Modal>
            {/* thêm child */}
            <Modal
                show={showChild}
                onHide={() => this.hanldeChild()}
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
                                
                                <label htmlFor="">Họ tên</label>
                                <input value={childModal.CHILDR_Name} onChange={(e)=>{this.handleChangtext('name',e.target.value)}} style={{width:'100%'}}/>
                                <label htmlFor="">Số điện thoại</label>
                                <input  value={childModal.Phone} onChange={(e)=>{this.handleChangtext('phone',e.target.value)}} style={{width:'100%'}}/>
                                <label htmlFor="">Mối quan hệ</label>
                                <input value={childModal.Relationship} onChange={(e)=>{this.handleChangtext('relationship',e.target.value)}} style={{width:'100%'}}/>
                            </div>
                            <div className=" col-12 mt-3">
                                <span  onClick={()=>this.handleCreateChild()} className="btnwew me-1" style={{ cursor:'pointer',backgroundColor: 'var(--admin-btn-color)'}}>
                                    <span className="mdi mdi-plus-circle pe-2">Thêm</span> 
                                </span>
                                <span onClick={()=>this.hanldeChild()} className="btnwew ms-1" style={{cursor:'pointer',backgroundColor: 'var(--love-color-5)'}}>
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
}
export default ProfileMem