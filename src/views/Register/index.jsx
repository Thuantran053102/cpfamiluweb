import React, { Component } from "react";
import Loading from "../../shares/Loading";
import clsx from "clsx";
import Style from './Register.module.scss';
import default_img from "./../../images/default-avatar.jpg";

import { Path } from "../../api/Path";
import Select from 'react-select';
import { isEmail, IsNullOrEmpty, removeUnicode } from "../../utils/utils";
import { DatePicker,DateRangePicker, Stack } from 'rsuite';

import { ApiAuthority } from "../../api/User";

import Swal from "sweetalert2";

import { getDateNew ,getBirthdate,getTerminationDate,getDateNewHire,
    getTerminationHire,getDateNewBirth,getHireBirth
} from "../../utils/utils";
import  isAfter  from "date-fns/isAfter";

import { postManagerImageOpenSale } from "../../api/User";
import { CheckTOkenRule,CheckUserRule } from "../../shares/Func";
import moment from "moment";

const { allowedRange } =
DateRangePicker;
class Register extends Component{
    constructor(props)
    {
      super(props)
      
      this.state = {
        Group_Image_File:'',
        provinceData: [
            {User_ID:'USR001',
                Full_Name:"Trần Văn Thuận",
                Performance_ID:'ADM001',
                Province_Name:'Lào Cai',
                Province_ID:1 },
        ],
        isLoading:false ,
        imgValue:'',
        adress:[],
        Banner_Image: {},
        Banner_Image_File: null,
        filePreview:'',
        imgAvatar:'',
        valueSearch: '',
        valuePosition:'',
        valueCompany:'',
        imgFormat:['png',"jpg","jpeg",
        "JPG","PNG","JPEG","jpe",
        "JPE","bmp","BMP","gif","GIF"],
        check:{
            chID:false,
            chName:false,
            chSex:false,
            chPerformance:false,
            chStatus:false,
            chStatusJob:false,
            chEmail:false,
            chPhone:false,
            chAdress:false,
            chHireDate:false,
            chTermination:false,
            chBirthDate:false,
            chImg:false,
            chProvince:false,
            chCountryName:true,
            chNationality:false,
            chPosition:false,
            chCompany:false,
          },
          
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
        valueNationallity:'',
        optionsProvince: [
            { value: '', label: 'Tất cả' }
          
          ],
          optionsNationality:[
            { value: '', label: '' }
          ],
          optionsPosition:[
            { value: '', label: '' }
          ],
          optionsCompany:[
            { value: '', label: '' }
          ],
        optionsSex :[
            { value: 'M', label: 'Nam' },
            { value: "F", label: 'Nữ' },
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

    componentDidMount=()=>{
        this.fnHandleGetAuthority()
        this.fnHandleGetNationality()
        this.fnHandleGetPosition()
        this.fnHandleGetCompany()
    }

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

           
         
            if(res.Status===200)
            {
               
                const {optionsProvince} = this.state
                // this.setState({ provinceData:[...provall, ...res.Data] })
                let a= res.Data.map((item)=>{
                    return({
                        value: item.Province_ID,
                        label: item.Province_Name
                    })
                })
                

                this.setState({optionsProvince:[...a]})
                
            }
           
           
        })
    }
    fnHandleGetLocation= async (e)=>{
        
       
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                e
            ],
            StoreProcedureName: "SP_ADDRESS_GETINSERT",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        ApiAuthority(username,password,Token,formData,async res => {
           
            
            if(res.Status===200)
            {
                this.setState({adress:res.Data})
            }
            
            // setAdress(res.Data)
        })
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
                console.log('312321',item.value)
            this.setState({Member:{...Member,JobStatus:item.value}})
            
            // this.setState({jobStatus:item.value})
            this.handleYear('','',item.value)
        }
        if(key==='status')
        {
            this.setState({Member:{...Member,Status:item.value}})
            this.setState({status:item.value})
        }
        this.fncheckValues(key,item.value)
        // this.setState(key,item)
    }
    handlePreviewAvatar= (e)=>{

        const {imgFormat} = this.state
        const file = e.target.files[0];
        let resultimg= imgFormat.find(function(item){
            return removeUnicode((file.name).slice((file.name).lastIndexOf('.')+1))===removeUnicode(item)
        })
        if(!resultimg)
        {
            Swal.fire('File đã chọn sai định dạng')
        }
        else{
            file.review = URL.createObjectURL(file)
            
            this.setState({
                Group_Image_File:e.target.files[0],imgAvatar:e.target.files[0]
            })
            const {check} = this.state
            if(e.target.files[0]){
                this.setState({check:{...check,chImg:true}})
            }
            else{
                this.setState({check:{...check,chImg:false}})
            }
        }
      
       
    }


    fileHandler = (event) => {    
       
        
        if(event.target.files.length){
          let fileObj = event.target.files[0];
          let fileName = fileObj.name;
            
          
          //check for file extension and pass only if it is .xlsx and display error message otherwise
     
        }               
    }
    handleDatepicker= async(type,value)=>{
        
        const fmDate= moment(value).format()
       
        
        const {Member} = this.state
        
            if(type==='hireDate')
            {
                const termination = Member.Termination_DT
                await this.setState({Member:{...Member,Hire_DT:fmDate}})
                await this.handleYear(fmDate,termination,Member.JobStatus)
               
            }
             if(type==='terminationDate')
            {
                
                const hire = Member.Hire_DT
                
               await this.setState({Member:{...Member,Termination_DT:fmDate}})
               await this.handleYear(hire,fmDate,Member.JobStatus)
            }
             if(type==='birthDate')
            {
               
                await this.setState({Member:{...Member,BirthDate:fmDate}})
                // this.handleCheckDate(Member.Hire_DT,Member.Termination_DT,fmDate)
            }
            this.fncheckValues(type,value)
       
    }
    fnHandleGetPosition=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                username,
                password
            ],
            StoreProcedureName: "SP_POSITION_GETAll",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        await ApiAuthority(username,password,Token,formData,async res => {
        
            
            this.setState({optionsPosition:[...res.Data.map((item)=>{
                return({
                    value:item.Position_ID,
                    label:item.Position_NBR_name_VNI+' '+ '('+item.Position_Name+')'
                })
            })]})
            
        })
    }
    handlechangeValue=(type,value)=>{
        const {Member} = this.state
        if(type==='EMPL_ID')
        {
            this.setState({Member:{...Member,EMPL_ID:value.target.value}})
        }
        else if(type==='Name_Local')
        {
            this.setState({Member:{...Member,Name_Local:value.target.value}})
        }
        else if(type==='Email')
        {
            this.setState({Member:{...Member,Email:value.target.value}})
        }
        else if(type==='Phone')
        {
            this.setState({Member:{...Member,Phone:value.target.value}})
        }
        else if(type==='Adress'){
            this.setState({Member:{...Member,Address:value.target.value}})
        }
        else if(type==='remark')
        {
            this.setState({Member:{...Member,Remark:value.target.value}})
        }
        else if(type==='Situation')
        {
            this.setState({Member:{...Member,Situation:value.target.value}})
        }
        else if(type==='HealthStatus')
        {
            this.setState({Member:{...Member,HealthStatus:value.target.value}})
        }
        
        this.fncheckValues(type,value.target.value)
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
    //   fnHandleGetPosition=async()=>{
    //     let Token = await CheckTOkenRule();
    //     let User = await CheckUserRule();
    //     const username=JSON.parse(User).username
    //     const password= JSON.parse(User).password
    //     const valuef={
    //         "DataBaseName": Path.DataBaseName,
    //         Params:  [
    //             username,
    //             password
    //         ],
    //         StoreProcedureName: "SP_POSITION_GETAll",
    //         SchemaName:"SQL01UAT"
    //         }
    //     let formData = new FormData();
    //     formData.append('data',JSON.stringify(valuef))
    //     await ApiAuthority(username,password,JSON.parse(Token),formData,async res => {
    //         // setPosition( res.Data)
    //         this.setState({position:res.Data})
            
    //     })
    // }

    fnHandleGetCompany=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                username,
                password
            ],
            StoreProcedureName: "SP_TB_COMPANY_GETALL",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        await ApiAuthority(username,password,Token,formData,async res => {
            
            if(res.Status===200)
            {
                
                this.setState({optionsCompany:[...res.Data.map((item)=>{
                    return({
                        value:item.Company_Code,
                        label:item.Company_Name_Loc
                    })
                })]})
            }
        })
    }
      handleValue = (type,e) => {
        const {valueSearch,Member} = this.state
        if(type==='Province')
        {
            this.setState({valueSearch:e,Member:{...Member,Province_ID:e.value}})
            setTimeout(()=>{
                this.fnHandleGetLocation(e.value)
            },500) 
        }
        if(type==='Nationality')
        {
            this.setState({valueNationallity:e,Member:{...Member,National_ID:e.value}})
        }
        else if(type==='Position')
        {
            this.setState({valuePosition:e,Member:{...Member,Position_ID:e.value}})
        }else if(type ==='Company')
        {
            this.setState({valueCompany:e,Member:{...Member,Company_Code:e.value}})
        }

        this.fncheckValues(type,e.value)
       
    //    else if(type==='Name')
    //    {
    //         this.setState({nameSearch:e})
    //         setTimeout(()=>{
    //             this.fnHandlegetMemall(valueSearch.value,e,idSreach)
    //         },500)
           
    //    }
    //    else if(type==='Id')
    //    {
    //         this.setState({idSreach:e})
    //         setTimeout(()=>{
    //             this.fnHandlegetMemall(valueSearch.value,nameSearch,e)
    //         },500)
           
    //    }
      
      
    }
    fnHandleGetNationality=async()=>{
        
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username= User.username
        const password= User.password
       
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                username,
                password,
             
            ],
            StoreProcedureName: "SP_NATIONALITY_SELECT",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        await ApiAuthority(username,password,Token,formData,async res => {
          
            this.setState({optionsNationality:[...res.Data.map((item)=>{
                return({
                    value:item.National_ID,
                    label:item.National_Name
                })
            })]})
            
            // setNationality(res.Data)
        })
    }
    handleYear=async (hire,termination,jobStatus)=>{
        
        console.log(jobStatus)
        const {Member}= this.state
        if(!termination)
        {
            termination=Member.Termination_DT
        }
        if(!hire)
        {
            hire=Member.Hire_DT
        }
        
        if(hire && termination && Number(jobStatus)===2)
        {
          
           
            let serviceYear=Number(termination.slice(0,termination.indexOf('-')))-Number(hire.slice(0,hire.indexOf('-')))
           
            this.setState({Member:{...Member,Service_Year:serviceYear,JobStatus:jobStatus}})
        }
        else if(Number(jobStatus)===1)
        {
            this.setState({Member:{...Member,Service_Year:IsNullOrEmpty,Termination_DT:'',JobStatus:jobStatus}})
        }
       
    }

    fncheckValues=(type,value)=>{
        const {Member}= this.state
        if(type==='EMPL_ID')
        {
            
            const {check} = this.state
            value &&  value.length>=10 ? this.setState({check:{...check,chID:true}}):this.setState({check:{...check,chID:false}})
        }
        if(type==='Name_Local')
        {
            const {check } = this.state
            
            value && value.length>=7 && !(Number.isInteger(Number(value)))  ? this.setState({check:{...check,chName:true}}):this.setState({check:{...check,chName:false}})
        }
        if(type=== 'sex')
        {
            const {check} = this.state
            value ? this.setState({check:{...check,chSex:true}}) :this.setState({check:{...check,chSex:false}})
        }
        if(type=== 'performance')
        {
            const {check} = this.state
            value ? this.setState({check:{...check,chPerformance:true}}):this.setState({check:{...check,chPerformance:false}})
        }
        if(type=== 'status')
        {
            const {check} = this.state
            value ? this.setState({check:{...check,chStatus:true}}):this.setState({check:{...check,chStatus:false}})
        }
        if(type=== 'Phone')
        {
            const {check} = this.state
            value.length>8 ? this.setState({check:{...check,chPhone:true}}):this.setState({check:{...check,chPhone:false}})
        }
        if(type=== 'jobStatus')
        {
            const {check} = this.state
            value!=='' ? this.setState({check:{...check,chStatusJob:true}}):this.setState({check:{...check,chStatusJob:false}})
            value===1 ? this.setState({check:{...check,chTermination:true,chStatusJob:true}}):(value===2?this.setState({check:{...check,chTermination:false,chStatusJob:true}}):this.setState({check:{...check,chTermination:true,chStatusJob:true}}))
        }
        if(type=== 'Email')
        {
            const {check} = this.state
            value!=='' && isEmail(value)? this.setState({check:{...check,chEmail:true}}):this.setState({check:{...check,chEmail:false}})
        }
        if(type=== 'Adress')
        {
            const {check} = this.state
            value && value.length>10? this.setState({check:{...check,chAdress:true}}):this.setState({check:{...check,chAdress:false}})
        }
        if(type=== 'hireDate')
        {
            const {check} = this.state
            value? this.setState({check:{...check,chHireDate:true}}): this.setState({check:{...check,chHireDate:false}})
            // value && moment(value).format("DD/MM/YYYY") !== moment(new Date()).format("DD/MM/YYYY") ? this.setState({check:{...check,chHireDate:false}}):this.setState({check:{...check,chHireDate:fa}})
        }
       
        if(type=== 'terminationDate')
        {
        
            // const {check,Member} = this.state
            // (value && moment(value).format("DD/MM/YYYY") !== moment(new Date()).format("DD/MM/YYYY")) ?this.setState({check:{...check,chTermination:false}}):this.setState({check:{...check,chTermination:true}})

            const {check,Member} = this.state
            
            value && moment(value).format("DD/MM/YYYY") !== moment(new Date()).format("DD/MM/YYYY") ?this.setState({check:{...check,chTermination:true}}):this.setState({check:{...check,chTermination:false}})
        }
        if(type=== 'birthDate')
        {
            const {check} = this.state
            value && moment(value).format("DD/MM/YYYY") !== moment(new Date()).format("DD/MM/YYYY") ? this.setState({check:{...check,chBirthDate:true}}):this.setState({check:{...check,chBirthDate:false}})
        }
        if(type==='Province')
        {
            const {check} = this.state
            console.log(value)
            value ? this.setState({check:{...check,chProvince:true}}):this.setState({check:{...check,chProvince:false}})
        }
        if(type==='Nationality')
        {
            const {check} = this.state
            console.log(value)
            value ? this.setState({check:{...check,chNationality:true}}):this.setState({check:{...check,chNationality:false}})
        }
        if(type==='Position')
        {
            const {check} = this.state
            console.log(value)
            value ? this.setState({check:{...check,chPosition:true}}):this.setState({check:{...check,chPosition:false}})
        }

        if(type==='Company')
        {
            const {check} = this.state
            console.log(value)
            value ? this.setState({check:{...check,chCompany:true}}):this.setState({check:{...check,chCompany:false}})
        }
    }
    handleCreateMem=async()=>{
        const {Member,check,Group_Image_File} = this.state
        console.log('12323',check)
        let tifOptions = Object.keys(check).map(function( key  ) {
      
            
              return check[key]
            
          });
         
          let isDescArray= tifOptions.every(function (item, index, arr) {
                if (item) {
                    return true
                } else {
                    return false
                }
            });
            
           if(isDescArray)
           {

            console.log('3q21',Member)
               let Token = await CheckTOkenRule();
               let User = await CheckUserRule();
               const username=User.username
               const password= User.password
               const Body = {
                   "DataBaseName": Path.DataBaseName,
                       "Params":  [
                         Member.EMPL_ID,
                         Member.Name_Local,
                         Member.Sex,
                         moment(Member.BirthDate).format('yyyy-MM-DD') ,
                         moment(Member.Hire_DT).format('yyyy-MM-DD'),
                         Member.Termination_DT ?moment( Member.Termination_DT).format('yyyy-MM-DD'):'',
                         Member.Service_Year,
                         Member.Performance,
                         Member.Phone,
                         Member.Email,
                         Member.Address,
                         Member.Status,
                         Member.JobStatus,
                         Member.Situation,
                         Member.HealthStatus,
                         Member.Remark,
                         Member.Province_ID,
                         Member.Position_ID,
                         Member.National_ID,
                         Member.Company_Code
                       ],
                       "StoreProcedureName": "SP_MEMBER_INSERT",
                   "SchemaName":"SQL01UAT"
                   }
                   const formData = new FormData();
                   formData.append('data',JSON.stringify(Body));
                   formData.append("files", Group_Image_File);
                 
                   postManagerImageOpenSale(username,password,Token,formData,async res => {
                    console.log(res)
                     if(res.Data.length>0)
                     {
                       Swal.fire('Mã nhân viên trùng')
                      
                     }
                     else if(res.Status ===200)
                     {
                       
                       // this.fnhandleGetIDFullNameUsr()
                       Swal.fire({
                           position: 'top-end',
                           icon: 'success',
                           title: 'Thêm thành viên thành công',
                           showConfirmButton: false,
                           timer: 1500
                         })
                         this.fnhandleGetIDFullNameUsr()
                     }
               })
           }
           else{
            let timerInterval
            Swal.fire({
              title: 'Một vài thông tin chưa hợp lệ vui lòng kiểm tra lại',
              timer: 2000,
              timerProgressBar: true,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
           }
           
     
    }

    
fnhandleGetIDFullNameUsr=async()=>{

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
        postManagerImageOpenSale(username,password,Token,formData,async res => {
          if(res.Data)
          {
            await this.setState({user:res.Data})
          
             this.fnhandleSaveLog(res.Data)
          }
        })
  }
  
  fnhandleSaveLog=async(useId)=>{
    const {Member} = this.state
    let Token = await CheckTOkenRule();
    let User = await CheckUserRule();
    const username=User.username
    const password= User.password
    const Body = {
        "DataBaseName": Path.DataBaseName,
            "Params":  [
              '1',// thêm
              `Thêm thông tin thành viên ${Member.Name_Local} id ${Member.EMPL_ID} `,
              useId[0].User_ID,
              '1'// member
            ],
            "StoreProcedureName": "SP_LOG",
        "SchemaName":"SQL01UAT"
        }
        const formData = new FormData();
        formData.append('data',JSON.stringify(Body));
  
        postManagerImageOpenSale(username,password,Token,formData,async res => {
          
        })
  }
  
  
    render(){
        const {isLoading,imgValue,optionsSex,optionsStatus,
            optionsJobStatus,status,Member,imgAvatar,optionPerformance,
            notify,valueSearch,valuePosition,optionsPosition,optionsNationality,adress,
            optionsCompany,valueCompany,valueNationallity,optionsProvince,check}= this.state

       
         

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
                            
                            <div className="w-100">
                                <img id="img-banner" 
                                src={imgAvatar.review ? imgAvatar.review : default_img} 
                                className={clsx(Style.imgavatar_item, "mx-auto d-block img-fluid")} />
                                {
                                    !check.chImg?<span className="py-2" style={{marginTop:'10px', color:'red',display:'block', textAlign:'center'}}>Chưa hợp lệ</span>:null
                                }
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
                            
                            {
                                !check.chID? <span className='notify'>chưa hợp lệ</span>:null
                            }
                            <input value={Member.EMPL_ID} onChange={(e)=>{this.handlechangeValue('EMPL_ID',e)}} className={clsx(Style.urlProject, 'w-100 ps-2 pe-2 ')} id='nameProject' type="text" />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label htmlFor="urlProject" style={{color:'#585858'}}>Tên thành viên</label>
                            {
                                !check.chName? <span className='notify'>chưa hợp lệ</span>:null
                            }
                            <input value={Member.Name_Local} onChange={(e)=>{this.handlechangeValue('Name_Local',e)}} className={clsx(Style.urlProject, 'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Giới tính</label>
                            {
                                !check.chSex? <span className='notify'>chưa hợp lệ</span>:null
                            }
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
                            {
                                !check.chPerformance? <span className='notify'>chưa hợp lệ</span>:null
                            }
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
                            {
                                !check.chStatus? <span className='notify'>chưa hợp lệ</span>:null
                            }
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
                            {
                                !check.chStatusJob? <span className='notify'>chưa hợp lệ</span>:null
                            }
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
                            {
                                !check.chEmail? <span className='notify'>chưa hợp lệ</span>:null
                            }
                            <input value={Member.Email} onChange={(e)=>{this.handlechangeValue('Email',e)}} className={clsx(Style.urlProject, 'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Số điện thoại</label>
                            {
                                !check.chPhone? <span className='notify'>chưa hợp lệ</span>:null
                            }
                            {/* {
                                        if (Number.isFinite(Number(e.target.value))) {
                                            setAmountNeed(Number(e.target.value))

                                        }
                                    } */}
                            <input  value={Member.Phone} onChange={(e)=>{ if (Number.isFinite(Number(e.target.value))) {
                                           this.handlechangeValue('Phone',e)

                                        }}}   className={clsx(Style.urlProject, 'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Địa chỉ</label>
                            {
                                !check.chAdress? <span className='notify'>chưa hợp lệ</span>:null
                            }
                            <input  value={Member.Address} onChange={(e)=>{this.handlechangeValue('Adress',e)}}   className={clsx(Style.urlProject, 'w-100 ps-2 pe-2')} id='urlProject' type="text" />
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Ngày vào làm</label>
                            {
                                !check.chHireDate? <span className='notify'>chưa hợp lệ</span>:null
                            }
                           
                            <div className={clsx(Style.HireDatePicker)}>
                                <DatePicker
                                    disabledDate={allowedRange(Member.BirthDate? getBirthdate(Member.BirthDate): '',Member.JobStatus && Number(Member.JobStatus)===2 &&Member.Termination_DT?getTerminationDate(Member.Termination_DT):getDateNewHire())}
                                    format='dd-MM-yyyy'
                                    onChange={(e)=>{this.handleDatepicker('hireDate',e)}}
                                    style={{ width: 200 }}/>
                            </div>
                          
                        </div>
                        {
                            Number(Member.JobStatus)===2 ?
                            <>
                             <div className='col-12 col-md-6 mt-2'>
                                <label style={{color:'#585858'}}>Ngày nghỉ làm</label>
                                {
                                !check.chTermination? <span className='notify'>chưa hợp lệ</span>:null
                                }
                                {/* {
                                    !notify.termination.value && <span style={{marginLeft:'10px', fontSize:'13px', color:'var(--bg-hover-color)'}}>{notify.termination.lable}</span>
                                } */}
                                <div className={clsx(Style.TerminationDTPicker)}>
                                    <DatePicker
                                        disabledDate={allowedRange(Member.Hire_DT?moment(Member.Hire_DT).format('YYYY-MM-DD'):'',moment(new Date()).format('YYYY-MM-DD'))}
                                    format='dd-MM-yyyy' onChange={(e)=>{this.handleDatepicker('terminationDate',e)}}  style={{ width: 200 }}/>
                                </div>
                            </div>
                       
                     
                                <div className='col-12 col-md-6 mt-2'>
                                
                                    <span style={{color:'#585858'}}>Số năm đã phục vụ : 
                                    <span style={{color:'#009688', fontSize:'20px'}}>{Member.Service_Year}</span>
                                    </span>
                                
                                </div>
                            </>: null
                        }
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Ngày tháng năm sinh</label>
                            {
                                !check.chBirthDate? <span className='notify'>chưa hợp lệ</span>:null
                            }
                            {/* {
                                !notify.birthdate.value && <span style={{marginLeft:'10px', fontSize:'13px', color:'var(--bg-hover-color)'}}>{notify.birthdate.lable}</span>
                            } */}
                            <div className={clsx(Style.BirthDtPicker)}>
                                <DatePicker
                                   format='dd-MM-yyyy' 
                                   disabledDate={allowedRange('',Member.Hire_DT ?getHireBirth(Member.Hire_DT):getDateNewBirth())}
                                   onChange={(e)=>{this.handleDatepicker('birthDate',e)}}
                                    style={{ width: 200 }}/>
                            </div>
                        </div>
                   
                    </div>
                </div>
                <div className={clsx(Style.information, 'container')}>
                    <div className='row  p-md-4 p-1'>
                    <div className='col-12 col-md-6 mt-2'>
                            {/* <label style={{color:'#585858'}}>Tỉnh /Thành</label> */}
                            <div className={''}>
                            <label style={{color:'#585858'}}>Tỉnh thành</label>
                            {
                                !check.chProvince? <span className='notify'>chưa hợp lệ</span>:null
                                }
                                <Select value={valueSearch} onChange={(e)=>{this.handleValue('Province',e)}} className={clsx(Style.category, 'w-100')} options={optionsProvince} defaultValue={optionsProvince}  />
                              
                            </div>
                            {/* <input   className={clsx(Style.urlProject, 'w-100 ps-2 pe-2')} id='urlProject' type="text" /> */}
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Khu vực</label>
                          
                            <input className="w-100 p-2" value={adress.length>0 ? adress[0].Area_Name_Loc:'' } readOnly='true'/>
                           
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Miền</label>
                            <input className="w-100 p-2" value={adress.length>0 ?adress[0].Region_Name:'' } readOnly='true'/>
                            
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Quốc gia</label>
                           
                            <input className="w-100 p-2" value={adress.length>0 ? adress[0].Country_Name :''} readOnly='true'/>
                           
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                        
                            <div className={''}>
                            <label style={{color:'#585858'}}>Quốc tịch</label>
                            {
                                !check.chNationality? <span className='notify'>chưa hợp lệ</span>:null
                                }
                                <Select value={valueNationallity} onChange={(e)=>{this.handleValue('Nationality',e)}} className={clsx(Style.category, 'w-100')} options={optionsNationality} defaultValue={optionsNationality}  />
                              
                            </div>
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Chức vụ</label>
                            {
                                !check.chPosition? <span className='notify'>chưa hợp lệ</span>:null
                                }
                            <Select value={valuePosition} onChange={(e)=>{this.handleValue('Position',e)}} className={clsx(Style.category, 'w-100')} options={optionsPosition} defaultValue={optionsPosition}  />
                            
                        </div>
                        <div className='col-12 col-md-6 mt-2'>
                            <label style={{color:'#585858'}}>Công ty</label>
                            {
                                !check.chCompany? <span className='notify'>chưa hợp lệ</span>:null
                                }
                            <Select value={valueCompany} onChange={(e)=>{this.handleValue('Company',e)}} className={clsx(Style.category, 'w-100')} options={optionsCompany} defaultValue={optionsCompany}  />
                            
                        </div>
                    </div>
                </div>
                <div className={clsx(Style.detailWrap, "container")}>
                    <div className="row  p-md-4 p-1">
                        <div className="col-12 ">
                            <h3>Chi tiết dự án</h3>
                            <label style={{color:'#585858'}}>Ghi chú</label>
                            <div className="add-project_editor removeImg">
                            
                                 <textarea onChange={(e)=>{this.handlechangeValue('remark',e)}} style={{height:'300px', width:'100%'}}></textarea>
                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <label style={{color:'#585858'}}>Hoàn cảnh gia đình</label>
                            <div className="add-project_editor removeImg">
                                <textarea onChange={(e)=>{this.handlechangeValue('Situation',e)}} style={{height:'300px', width:'100%'}}></textarea>
                              
                            </div>
                        </div> <div className="col-12 mt-3">
                            <label style={{color:'#585858'}}>Tình trạng sức khỏe</label>
                            <div onChange={(e)=>{this.handlechangeValue('HealthStatus',e)}} className="add-project_editor removeImg">
                              
                                  <textarea onChange={(e)=>{this.handlechangeValue('HealthStatus',e)}} style={{height:'300px', width:'100%'}}></textarea>
                            </div>
                        </div>
                           
                      
                    </div>
                </div>
                <div className='d-flex justify-content-end container'>
               
                            <button className={clsx(Style.createbtn, 'btn')} onClick={()=>{this.handleCreateMem()}}>Tạo</button>
                    {/* <Link >Tiếp tục</Link> */}

                </div>
            </div>

            </div>
        )
    }
}
export default Register