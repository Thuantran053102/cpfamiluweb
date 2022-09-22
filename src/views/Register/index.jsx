import React, { Component } from "react";
import Loading from "../../shares/Loading";
import clsx from "clsx";
import Style from './Register.module.scss';
import default_img from "./../../images/default-avatar.jpg";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Path } from "../../api/Path";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { DatePicker, Stack } from 'rsuite';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import isBefore from 'date-fns/isBefore';

import  isAfter  from "date-fns/isAfter";
import { postManagerImageOpenSale } from "../../api/User";
import { CheckTOkenRule,CheckUserRule } from "../../shares/Func";
import moment from "moment";

class Register extends Component{
    constructor(props)
    {
      super(props)
      
      this.state = {
        isLoading:false ,
        imgValue:'',
        Banner_Image: {},
        Banner_Image_File: null,
        filePreview:'',
        imgAvatar:'',
        Member:{
            EMPL_ID:''
            ,Name_Local:   ''
            ,Sex: ''
            ,BirthDate: ''	
            ,Hire_DT: ''	
            ,Termination_DT: ''	
            ,Service_Year: null	
            ,Performance: null
            ,Phone: ''
            ,Email:''	
            ,Address:  ''
            ,Status:null
            ,JobStatus: null
            ,Situation: ''
            ,HealthStatus:  ''	
            ,Remark:''	 
            ,Image: ''	
            ,Flag:null
            ,Province_ID:null
            ,Position_ID:null
            ,National_ID:null
            ,CCA_CODE: null
            ,Company_Code:""
        },
        optionsSex :[
            { value: 1, label: 'Nam' },
            { value: 2, label: 'Nữ' },
          ],
        optionPerformance:[
            { value: 1, label: 'Tham gia' },
            { value: 2, label: 'Không tham gia' },
        ],
        optionsStatus :[
            { value: 1, label: 'Còn sống' },
            { value: 2, label: 'Đã mất' },
          ],
          optionsJobStatus :[
            { value: 1, label: 'Đang làm' },
            { value: 2, label: 'Đã nghỉ' },
          ],
          notify:{
            hire:{
                value:false,
                lable:'Chưa hợp lệ'
            },
            termination:{
                value:false,
                lable:'Chưa hợp lệ'
            },
            birthdate:{
                value:false,
                lable:'Chưa hợp lệ'
            }
          }
      }

    }
    fnHandleSelect=(key,item)=>{
        const {Member} = this.state
        if(key==='sex')
        {
            this.setState({Member:{...Member,Sex:item.value}})
        }
        if(key==='performance')
        {
            this.setState({Member:{...Member,Performance:item.value}})
            // this.setState({performance:item.value})
        }
        if(key==='jobStatus')
        {
            this.setState({Member:{...Member,JobStatus:item.value}})
            // this.setState({jobStatus:item.value})
        }
        if(key==='status')
        {
            this.setState({Member:{...Member,Status:item.value}})
            this.setState({status:item.value})
        }
        // this.setState(key,item)
    }
     handlePreviewAvatar= (e)=>{
        // this.setState({imgValue:e.target.files[0]})
 
        // this.setState({
        //     Banner_Image: e.target.files[0].name,
        //     Banner_Image_File: e.target.files[0],
        //     filePreview: URL.createObjectURL(e.target.files[0])
        // });
        const file = e.target.files[0];
        file.review = URL.createObjectURL(file)
        let name=e.target.files[0].name
        let type=e.target.files[0].type
        let uri = file;
       

        // const name= "67b2a7ee-147f-4177-bf3e-aa11e155c7cf.jpg"
        // const type= "image/jpg"
        // const uri= "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540thuan.tran%252FCLBCP/ImagePicker/67b2a7ee-147f-4177-bf3e-aa11e155c7cf.jpg"
        // setProjectValue({...projectValue, urlImg:e.target.files[0]})
        // setImgValue(e.target.files[0])
        this.setState({imgAvatar:file,
            Banner_Image:{ uri, name, type }
        })
        this.handleCheckImg()
    }
    handleCheckImg= async()=>{
        const {Banner_Image,dataProfile} = this.state
        const images=[]
        await images.push(Banner_Image)
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
     
        const Body = {
            "DataBaseName":Path.DataBaseName,
                "Params":  [
                    'VN00070534'
                ],
                "StoreProcedureName": "SP_PICTUREVISIT_INSERT",
            "SchemaName":"SQL01UAT"
            }
            const formData = new FormData();
            formData.append('data',JSON.stringify(Body));
         
            if(images.length>0)
            {
                for(let i =0 ;i< images.length; i++)
                {
                    formData.append("files[]", images[i]);
                }
            }else{
            }
            postManagerImageOpenSale(username,password,Token,formData,async res => {
              
                if(res.Status ===200)
              {
                // Alert.alert("Thông báo", "Thành công") 
                // this.fnHandleGetPicture()
              }
        })
    }
    fileHandler = (event) => {    
       
        
        if(event.target.files.length){
          let fileObj = event.target.files[0];
          let fileName = fileObj.name;
            
          
          //check for file extension and pass only if it is .xlsx and display error message otherwise
     
        }               
      }
      handleDatepicker=(type,value)=>{
        
        const fmDate= moment(value).format()
        const {Member} = this.state
        
            if(type==='hireDate')
            {
                this.setState({Member:{...Member,Hire_DT:fmDate}})
                this.handleCheckDate(fmDate,Member.Termination_DT,Member.BirthDate)
            }
            else if(type==='terminationDate')
            {
                this.setState({Member:{...Member,Termination_DT:fmDate}})
                this.handleCheckDate(Member.Hire_DT,fmDate,Member.BirthDate)
            }
            else if(type==='birthDate')
            {
                this.setState({Member:{...Member,BirthDate:fmDate}})
                this.handleCheckDate(Member.Hire_DT,Member.Termination_DT,fmDate)
            }
       
      }
      handlechangeValue=(type,value)=>{
        const {Member} = this.state
        if(type==='EMPL_ID')
        {
            this.setState({Member:{...Member,EMPL_ID:value.target.value}})
        }
        if(type==='Name_Local')
        {
            this.setState({Member:{...Member,Name_Local:value.target.value}})
        }
        if(type==='Email')
        {
            this.setState({Member:{...Member,Email:value.target.value}})
        }
        if(type==='Phone')
        {
            this.setState({Member:{...Member,Phone:value.target.value}})
        }
        
      }
      handleCheckDate=(hire,termination,birtdate)=>{
        const {Member} = this.state
        // if(Member.JobStatus)
        // {
        //     if(hire && termination )
        //     {
        //         let hired =hire.slice(0,hire.indexOf('-')) 
        //         let terminationd=termination.slice(0,termination.indexOf('-')) 
        //         let ServiceY= Number(terminationd) - Number(hired)
        //         if(ServiceY>0  )
        //         {
        //             const {notify}= this.state
        //             this.setState({notify:{...notify,
        //                 hire:{
        //                 value:true,
        //                 lable:''
        //             },termination:{
        //                 value:true,
        //                 lable:''
        //             }}})
        //             if(birtdate)
        //             {
        //                 let birthD=birtdate.slice(0,birtdate.indexOf('-'))
        //                 let yearOld =Number(hired) - Number(birthD) 
        //                 console.log(yearOld)
        //                 if(yearOld>17)
        //                 {
                           
        //                     this.setState({notify:{...notify,
        //                         hire:{
        //                         value:true,
        //                         lable:'Ngày vào làm phải nhỏ hơn ngày nghỉ làm'
        //                     },termination:{
        //                         value:true,
        //                         lable:'Ngày nghỉ làm phải lớn hơn ngày vào làm'
        //                     },birtdate:{
        //                         value:true,
        //                         lable:'Ngày nghỉ làm phải lớn hơn ngày vào làm'
        //                     }
        //                     }})
        //                 }
        //                 else{
        //                     const {notify}= this.state
        //                     this.setState({notify:{...notify,
        //                         hire:{
        //                         value:false,
        //                         lable:'Chưa hợp lệ với ngày sinh'
        //                     },birtdate:{
        //                         value:false,
        //                         lable:'Chưa hợp lệ với ngày vào làm'
        //                     }
        //                     }})
        //                 }
        //             }
                   
        //         }
        //         else{
        //             const {notify}= this.state
        //             this.setState({notify:{...notify,
        //                 hire:{
        //                 value:false,
        //                 lable:'Ngày vào làm phải nhỏ hơn ngày nghỉ làm'
        //             },termination:{
        //                 value:false,
        //                 lable:'Ngày nghỉ làm phải lớn hơn ngày vào làm'
        //             }
        //             }})
        //         }
                
        //     }
        // }
      }
   
    render(){
        const {isLoading,imgValue,optionsSex,optionsStatus,
            optionsJobStatus,status,Member,imgAvatar,optionPerformance,
            notify}= this.state

            
           
        return(
            <div className="flex-grow-1">
                {
                    isLoading ? <Loading /> : ""
                }
                <div className={clsx(Style.main, 'addprojectmain')}>
                    <div className={clsx(Style.titleWrap, 'container')}>
                        <div className='row w-100'>
                            <div className='col-12'>
                            <h3 className={clsx(Style.title, "px-2 px-md-1")}>Thêm thành viên</h3>
                        </div>
                    </div>
                </div>
                {/* chọn hình ảnh */}
                <div className={clsx(Style.imgavatar, 'container w-100')}>
                    <div className='row p-md-4 p-1'>
                        <span className={clsx(Style.imgTaitle)}>Chọn hình đại diện</span>
                        <div className="col-12 ">
                            {/* src={imgAvatar.review ? imgAvatar.review : default_img} */}
                            <div className="w-100">
                                <img id="img-banner" 
                                src={imgAvatar.review ? imgAvatar.review : default_img} 
                                className={clsx(Style.imgavatar_item, "mx-auto d-block img-fluid")} />
                            </div>
                            <div className='w-100 d-flex justify-content-end'>
                                <button className={clsx(Style.btnMoreImg, 'btn')}>
                                    <span style={{ cursor: "pointer", position: "absolute", textAlign: "center", fontSize: "1rem", lineHeight: "1.7rem", width: "100%", left: "0", right: "0" }}>Chọn hình đại điện</span>
                                  
                                    <input type="file" onChange={(e)=>this.handlePreviewAvatar(e)} style={{ cursor: "pointer", opacity: "0", width: '100%', height: "100%", cursor: "pointer" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(Style.information, 'container')}>
                    <div className='row  p-md-4 p-1'>
                        <h3>Thông tin</h3>
                        <div className='col-12 col-md-6 mt-2'>
                            <label htmlFor="urlProject" style={{color:'#585858'}}>ID thành viên</label>
                            <input value={Member.EMPL_ID} onChange={(e)=>{this.handlechangeValue('EMPL_ID',e)}} className={clsx(Style.urlProject, 'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label htmlFor="urlProject" style={{color:'#585858'}}>Tên thành viên</label>
                            <input value={Member.Name_Local} onChange={(e)=>{this.handlechangeValue('Name_Local',e)}} className={clsx(Style.urlProject, 'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Giới tính</label>
                           
                                <Select
                                    defaultValue={Member.sex}
                                    onChange={(item) => {
                                        this.fnHandleSelect("sex", item)
                                    }}
                                    options={optionsSex}
                                />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Tham gia/Không Tham gia</label>
                          
                            <Select
                                    defaultValue={Member.Performance}
                                    onChange={(item) => {
                                        this.fnHandleSelect("performance", item)
                                    }}
                                    options={optionPerformance}
                                />
                       
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Còn sống/Đã mất</label>
                            {/* onChange={(e) => { setProjectValue({ ...projectValue, description: e.target.value }) }} */}
                            {/* <input   className={clsx(Style.urlProject, 'w-100 ps-2 pe-2')} id='urlProject' type="text" /> */}
                            <Select

                                    defaultValue={Member.status}
                                    onChange={(item) => {
                                        this.fnHandleSelect("status", item)
                                    }}
                                    options={optionsStatus}
                                />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Tình trạng công việc</label>
                            {/* onChange={(e) => { setProjectValue({ ...projectValue, description: e.target.value }) }} */}
                            {/* <input   className={clsx(Style.urlProject, 'w-100 ps-2 pe-2')} id='urlProject' type="text" /> */}
                            <Select
                                    defaultValue={Member.JobStatus}
                                    onChange={(item) => {
                                        this.fnHandleSelect("jobStatus", item)
                                    }}
                                    options={optionsJobStatus}
                                />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Email</label>
                            {/* onChange={(e) => { setProjectValue({ ...projectValue, description: e.target.value }) }} */}
                            <input value={Member.Email} onChange={(e)=>{this.handlechangeValue('Email',e)}} className={clsx(Style.urlProject, 'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Số điện thoại</label>
                            {/* onChange={(e) => { setProjectValue({ ...projectValue, description: e.target.value }) }} */}
                            <input  value={Member.Phone} onChange={(e)=>{this.handlechangeValue('Phone',e)}}   className={clsx(Style.urlProject, 'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Ngày vào làm</label>
                            {
                                !notify.hire.value && <span style={{marginLeft:'10px', fontSize:'13px', color:'var(--bg-hover-color)'}}>{notify.hire.lable}</span>
                            }
                            <div className={clsx(Style.HireDatePicker)}>
                                <DatePicker

                                    // value={Member.Hire_DT}
                                    disabledDate={date => isAfter(date,Member.Termination_DT? new Date(): new Date())}
                                    // defaultValue={new Date('2020-9-12 09:15:30')}
                                    format='dd-MM-yyyy'
                                    onChange={(e)=>{this.handleDatepicker('hireDate',e)}}
                                    style={{ width: 200 }}/>
                            </div>
                          
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Ngày nghỉ làm</label>
                            {
                                !notify.termination.value && <span style={{marginLeft:'10px', fontSize:'13px', color:'var(--bg-hover-color)'}}>{notify.termination.lable}</span>
                            }
                            <div className={clsx(Style.TerminationDTPicker)}>
                                <DatePicker
                                   format='dd-MM-yyyy'
                                   onChange={(e)=>{this.handleDatepicker('terminationDate',e)}}
                                    style={{ width: 200 }}/>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <span style={{color:'#585858'}}>Số năm đã phục vụ : 
                            <span style={{color:'#009688', fontSize:'20px'}}> 2</span>
                            </span>
                          
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Ngày tháng năm sinh</label>
                            {
                                !notify.birthdate.value && <span style={{marginLeft:'10px', fontSize:'13px', color:'var(--bg-hover-color)'}}>{notify.birthdate.lable}</span>
                            }
                            <div className={clsx(Style.BirthDtPicker)}>
                                <DatePicker
                                   format='dd-MM-yyyy'
                                   onChange={(e)=>{this.handleDatepicker('birthDate',e)}}
                                    style={{ width: 200 }}/>
                            </div>
                        </div>
                   
                    </div>
                </div>
                <div className={clsx(Style.information, 'container')}>
                    <div className='row  p-md-4 p-1'>
                    <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Tỉnh /Thành</label>
                           
                            <input   className={clsx(Style.urlProject, 'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Khu vực</label>
                            
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Miền</label>
                           
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Quốc gia</label>
                           
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Quốc tịch</label>
                            
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Chức vụ</label>
                            
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Công ty</label>
                            
                        </div>
                    </div>
                </div>
                <div className={clsx(Style.detailWrap, "container")}>
                    <div className="row  p-md-4 p-1">
                        <div className="col-12 ">
                            <h3>Chi tiết dự án</h3>
                            <label style={{color:'#585858'}}>Ghi chú</label>
                            <div className="add-project_editor removeImg">
                            
                                 <textarea style={{height:'300px', width:'100%'}}></textarea>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <label style={{color:'#585858'}}>Hoàn cảnh gia đình</label>
                            <div className="add-project_editor removeImg">
                                <textarea style={{height:'300px', width:'100%'}}></textarea>
                              
                            </div>
                        </div> <div className="col-12 mt-3">
                            <label style={{color:'#585858'}}>Tình trạng sức khỏe</label>
                            <div className="add-project_editor removeImg">
                              
                                  <textarea style={{height:'300px', width:'100%'}}></textarea>
                            </div>
                        </div>
                           
                      
                    </div>
                </div>
                <div className='d-flex justify-content-end container'>
                {/* to={handlecheckValues}  */}
                    <Link className={clsx(Style.createbtn, 'btn')}>Tiếp tục</Link>

                </div>
            </div>

            </div>
        )
    }
}
export default Register