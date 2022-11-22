import React,{useState,useEffect} from "react";
import { CheckTOkenRule,CheckUseID,CheckUserRule } from "../../../shares/Func";
import { Path } from "../../../api/Path";
import { ApiAuthority } from "../../../api/User";
import moment from "moment";
import Select from 'react-select'
import {  statistical } from "../../../api/SubUrl";
import { DatePicker,DateRangePicker, Stack } from 'rsuite';
import Swal from "sweetalert2";
import { set } from "rsuite/esm/utils/dateUtils";
import './Insert.css' 
import ModalMoreSelect from "../../../components/ModalMore";


function InsertStatiscal(){

    // option
    const optionStatus=[
      {value: '1', label: 'Enable'},
      {value: '2', label: 'Disable'},
      {value: '3', label: 'Maintainace'},
      {value: '4', label: 'Ingrogress'},
    ]
    const optionFloor=[
      {value: '1', label: '1'},{value: '2', label: '2'},{value: '3', label: '3'},
      {value: '4', label: '4'},{value: '5', label: '5'},{value: '6', label: '6'},
      {value: '7', label: '7'},{value: '8', label: '8'},{value: '9', label: '9'},
      {value: '10', label: '10'},{value: '11', label: '11'},{value: '12', label: '12'},
      {value: '13', label: '13'}, {value: '14', label: '14'},{value: '15', label: '15'},
      {value: '16', label: '16'}, {value: '17', label: '17'}, {value: '18', label: '18'},
      {value: '19', label: '19'}, {value: '20', label: '20'},{value: '21', label: '20'},
      {value: '22', label: '21'},{value: '23', label: '22'},{value: '24', label: '23'},
      {value: '25', label: '24'},{value: '26', label: '25'},{value: '27', label: '26'},
      {value: '28', label: '27'},{value: '29', label: '28'},{value: '30', label: '29'},
      {value: '31', label: '30'},{value: '32', label: '31'},{value: '33', label: '32'},
      {value: '34', label: '33'}, {value: '35', label: '34'},{value: '36', label: '35'},
      {value: '37', label: '36'}, {value: '38', label: '37'}, {value: '39', label: '38'},
      {value: '40', label: '39'},{value: '41', label: '40'},{value: '42', label: '41'},
      {value: '43', label: '42'},

    ]
    const optionWarrantyStatus=[
        {value: '1', label: 'Expire'}, {value: '2', label: 'Available'}
    ]
    // const optionLocation=[
    //     {value: '1', label: 'Office'},
    // ]
    const optionUnit=[
      {value: '1', label: '1'},{value: '2', label: '2'},{value: '3', label: '3'},
      {value: '4', label: '4'},{value: '5', label: '5'},{value: '6', label: '6'},
      {value: '7', label: '7'},{value: '8', label: '8'},{value: '9', label: '9'},
      {value: '10', label: '10'},{value: '11', label: '11'},{value: '12', label: '12'},
      {value: '13', label: '13'}, {value: '14', label: '14'},{value: '15', label: '15'},
      {value: '16', label: '16'}, {value: '17', label: '17'}, {value: '18', label: '18'},
      {value: '19', label: '19'}, {value: '20', label: '20'},{value: '21', label: '20'},
      {value: '22', label: '21'},{value: '23', label: '22'},{value: '24', label: '23'},
      {value: '25', label: '24'},{value: '26', label: '25'},{value: '27', label: '26'},
      {value: '28', label: '27'},{value: '29', label: '28'},{value: '30', label: '29'},
      {value: '31', label: '30'},{value: '32', label: '31'},{value: '33', label: '32'},
      {value: '34', label: '33'}, {value: '35', label: '34'},{value: '36', label: '35'},
      {value: '37', label: '36'}, {value: '38', label: '37'}, {value: '39', label: '38'},
      {value: '40', label: '39'},{value: '41', label: '40'},{value: '42', label: '41'},
      {value: '43', label: '42'},
    ]  
    const optionMonth=[
      {value: '0', label: '0'},
      {value: '1', label: '1'},{value: '2', label: '2'},{value: '3', label: '3'},
      {value: '4', label: '4'},{value: '5', label: '5'},{value: '6', label: '6'},
      {value: '7', label: '7'},{value: '8', label: '8'},{value: '9', label: '9'},
      {value: '10', label: '10'},{value: '11', label: '11'}
    ]
    const optionYear=[
      {value: '0', label: '0'},
      {value: '1', label: '1'},{value: '2', label: '2'},{value: '3', label: '3'},
      {value: '4', label: '4'},{value: '5', label: '5'},{value: '6', label: '6'},
      {value: '7', label: '7'},{value: '8', label: '8'},{value: '9', label: '9'},
      {value: '10', label: '10'}
    ]
    //------------------- useState 

    // load page
    const [isLoading,setIsLoading]= useState(false)

    //// option
    const [optionSite,setOptionSite] = useState([])
    const [optionType,setOptionType] = useState([])
    const [optionBrand,setOptionBrand] = useState([])
    const [optionRack,setOptionRack] = useState([])
    const [optionArea,setOptionArea] = useState([])
    const [optionSiteName,setOptionSiteName] =useState([])
    const [optionAssetType,setOptionAssetType] = useState([])
    const [optionIDDTL,setOptionIDDTL]= useState([])
    const [optionSuplier,setOptionSuplier]=useState([])
    const [optionLocation,setOptionLocation]= useState([])

    // values 
    const [valuesAsset,setValuesAsset]= useState({
      buy_Date:'',
      it_Site:'',
      status:'',
      type:'',
      brand:'',
      rack:'',
      floor:'',
      area:'',
      site_Name:'',
      id:'',
      model:'',
      asset_Type:'',
      serino:'',
      warranty_Status:'',
      location:'',
      unit:'',
      ip_Switch:'',
      id_Switch:'',
      switch_Port:'',
      user_Name:'',
      password:'',
      local_ip:'',
      local_Port:'',
      public_IP:'',
      public_Port:'',
      contrac_Number:'',
      warranty:'',
      suplier_Install:'',
      C:'',
      I:'',
      A:'',
      Remark:'',
    })
    // show modal insert more
    const [showModal,setShowModal]= useState(false)
    const [typeInsertMore,setTypeInsertMore]= useState()

    // month year warranty
    const [ valueMonths,setValueMonths]=useState(0)
    const [valueYear,setValueYear]= useState(0)
    // check
    const [checkValues,setCheckValues]= useState({
      model:false,
      serino:true,
      ip_Switch:false,
  
      userName:false,
      password:false,
      local_ip:false,
      contrac_Number:false,
      warranty:false,
    })

    const [valuesToCheckWarranty,setValuesToCheckWarranty] = useState([])



    useEffect(()=>{
     
      if(valuesAsset.model && valuesAsset.model.length>6)
      {
        setCheckValues({...checkValues,model:true})

      }
      else{
       
        setCheckValues({...checkValues,model:false})
      }
      
    },[valuesAsset.model])
  

    useEffect(()=>{
        
      if(valuesAsset.contrac_Number && valuesAsset.contrac_Number.length>8)
      {
        setCheckValues({...checkValues,contrac_Number:true})
      }
      else{
        setCheckValues({...checkValues,contrac_Number:false})
        
      }
    },[valuesAsset.contrac_Number])



    useEffect(()=>{
        
      if(valuesAsset.local_ip && valuesAsset.local_ip.length>4)
      {
        setCheckValues({...checkValues,local_ip:true})
      }
      else{
        setCheckValues({...checkValues,local_ip:false})

      }
    },[valuesAsset.local_ip])
    useEffect(()=>{
      if(valuesAsset.password && valuesAsset.password.length>4)
      {
        setCheckValues({...checkValues,password:true})
      }
      else{
        setCheckValues({...checkValues,password:false})

      }
    },[valuesAsset.password])

    useEffect(()=>{
      if(valuesAsset.user_Name && valuesAsset.user_Name.length>4)
      {
        setCheckValues({...checkValues,userName:true})
      }
      else{
        setCheckValues({...checkValues,userName:false})

      }
    },[valuesAsset.user_Name])


    useEffect(()=>{
      if(valuesAsset.ip_Switch && valuesAsset.ip_Switch.length>6)
      {
        setCheckValues({...checkValues,ip_Switch:true})
      }
      else{
        setCheckValues({...checkValues,ip_Switch:false})
      }
    },[valuesAsset.ip_Switch])

    useEffect(()=>{

      var serinoC=false,warrantyC=false
      if(valuesAsset.id && !['RK','FS','EB','MH'].includes(((valuesAsset.id).label+'').slice(0,2)) )
      {
        if(valuesAsset.serino.length>6){
            serinoC=true
        }
        else{

          serinoC=false
        }

      }
      else{
        serinoC=true
      }

     
      if( !valuesToCheckWarranty.includes(((valuesAsset.id).label+'').slice(0,2)))
      {
        if(  valuesAsset.warranty.length>1)
        {
          warrantyC=true
        }
        else{
          warrantyC=false
        }
      }
      else{
        warrantyC=true
      }

  

      setCheckValues({...checkValues,serino:serinoC,warranty:warrantyC})
      
    },[valuesAsset.id,valuesAsset.serino,valuesAsset.warranty])

    useEffect(()=>{
      console.log(checkValues)
    },[checkValues])

    useEffect(()=>{
        hanldeGetValuesFilterSite()
        hanldeGetValuesFilterType()
        hanldeGetValuesFilterBrand()
        hanldeGetValuesFilterRack()
        hanldeGetValuesFilterArea()
        hanldeGetValuesSiteName()
        hanldeGetValuesAssetType()
        hanldeGetValuesFilterIDDTL()
        hanldeGetValuesFilterSuplier()
        handleGetValuesCheckWarranty()
        handleGetValuesLocation()
    },[])

    
    useEffect(()=>{
      let month= Number(moment(valuesAsset.buy_Date).format('MM'))+Number(valueMonths)
      let year = Number(moment(valuesAsset.buy_Date).format('YYYY'))+Number(valueYear)
      if(month>=12)
      {
        year=year+1
        month=month-12
      }
      if(month>0 || year>0)
      {
        setValuesAsset({...valuesAsset,warranty:year+'/'+month+'/'+moment(valuesAsset.buy_Date).format('DD')})

      }
      else{
        setValuesAsset({...valuesAsset,warranty:''})
      }
      
    },[valueYear,valueMonths,valuesAsset.buy_Date])

    // handle
      const hanldeGetValuesFilterSite=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
  
                username,
                password,
            ],
            StoreProcedureName: "SP_USER_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.User_ID,
                  label: item.User_Name
              })
            })
            setOptionSite([...filterData]) 
          } 
        })
  
      }
      const hanldeGetValuesFilterSuplier=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
  
                username,
                password,
            ],
            StoreProcedureName: "SP_SUPPLIER_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.Supplier_ID,
                  label: item.Supplier_Install
              })
            })
            setOptionSuplier([...filterData]) 
          } 
        })
  
      }
      const hanldeGetValuesFilterType=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
  
                username,
                password,
            ],
            StoreProcedureName: "SP_TYPE_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
         
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.Type_ID,
                  label: item.Type_Name
              })
            })
            setOptionType([...filterData]) 
          } 
        })
      }
      const hanldeGetValuesFilterBrand=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
  
                username,
                password,
            ],
            StoreProcedureName: "SP_BRAND_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.Brand_ID,
                  label: item.Brand_Name
              })
            })
            setOptionBrand([...filterData]) 
          } 
        })
  
      }
      const hanldeGetValuesAssetType=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
  
                username,
                password,
            ],
            StoreProcedureName: "SP_ASSETTYPE_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.Asset_Type_ID,
                  label: item.Asset_Type_Name
              })
            })
            setOptionAssetType([...filterData]) 
          } 
        })
  
      }
      const hanldeGetValuesFilterRack=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
  
                username,
                password,
            ],
            StoreProcedureName: "SP_RACK_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
         
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.ID_Rack,
                  label: item.Rack_Name
              })
            })
            setOptionRack([...filterData]) 
          } 
        })
  
      }
      const hanldeGetValuesSiteName=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
  
                username,
                password,
            ],
            StoreProcedureName: "TB_SITE_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
         
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.Site_ID,
                  label: item.Site_Name
              })
            })
            setOptionSiteName([...filterData]) 
          } 
        })
  
      }
      const hanldeGetValuesFilterIDDTL=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
  
                username,
                password,
            ],
            StoreProcedureName: "SP_ID_DTL_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
       
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.ID_ID,
                  label: item.ID_Name
              })
            })
            setOptionIDDTL([...filterData]) 
          } 
        })
  
      }
      const hanldeGetValuesFilterArea=async()=>{
        
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                username,
                password,
            ],
            StoreProcedureName: "SP_AREA_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
       
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.Area_ID,
                  label: item.Area_Name
              })
            })
          
            setOptionArea([...filterData]) 
          } 
        })
  
      }
      const handleGetValuesCheckWarranty= async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                username,
                password,
            ],
            StoreProcedureName: "SP_CHECKSERIALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
       
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return item.ID_ASSET_TYPE_Code
              
            })
          
            setValuesToCheckWarranty([...filterData]) 
          } 
        })
      }
      const handleCheckValues=()=>{
        let check = true
    
        
        Object.entries(valuesAsset).forEach((item)=>{
            if( !item.includes('Remark') && !item.includes('I') && !item.includes('C') && !item.includes('A') &&
            !item.includes('serino') &&  !item.includes('warranty') &&  item[1]==='')
            {
              check=false
              Swal.fire({
                title: `'${item[0]}' Invalid data`,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            }
            
            
            else if(item.includes('serino')&&  (!['RK','FS','EB','MH'].includes(((valuesAsset.id).label+'').slice(0,2))) &&item[1]==='')
            {
              check=false
                
                Swal.fire({
                  title: `serino Invalid data`,
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
            }
          
            else if( item.includes('warranty') &&  (!valuesToCheckWarranty.includes(((valuesAsset.id).label+'').slice(0,2))) &&item[1]==='')
            {
              check=false
              Swal.fire({
                title: `warranty Invalid data`,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
             
            }
          })

         
          var an= Object.entries(checkValues).every((item)=>{
              return item[1]
          })
        
          if(check && an)
          {
            console.log(12312)
            handleGetExcelItemAPI()
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'notify',
              text: 'check values!',
            
            })
          }
         
      }
      const handleGetExcelItemAPI=async(arrexcel)=>{
          let Token = await CheckTOkenRule();
          let User = await CheckUserRule();
          let UserID= await CheckUseID()
          const username = User.username
          const password =User.password

              const valuef = {
                  "DataBaseName": Path.DataBaseName,
                  Params: [
                    moment(valuesAsset.buy_Date).format('yyyy/MM/DD'),
                    valuesAsset.status,
                    valuesAsset.warranty_Status,
                    valuesAsset.location,
                    valuesAsset.serino,
                    valuesAsset.floor,
                    valuesAsset.unit,
                    valuesAsset.ip_Switch,
                    valuesAsset.switch_Port,
                    valuesAsset.user_Name,
                      valuesAsset.password,
                      valuesAsset.local_ip,
                      valuesAsset.local_Port,
                      valuesAsset.public_IP,
                      valuesAsset.public_Port,
                      valuesAsset.contrac_Number,
                      valuesAsset.it_Site,
                      valuesAsset.site_Name,
                      valuesAsset.type,
                      valuesAsset.brand,
                      valuesAsset.model,
                      valuesAsset.asset_Type,
                      valuesAsset.suplier_Install,
                      valuesAsset.id.value,
                      valuesAsset.id_Switch,
                      valuesAsset.rack,
                      valuesAsset.C,
                      valuesAsset.I,
                      valuesAsset.A,
                      valuesAsset.Remark,
                      valuesAsset.warranty,
                      UserID
                  ],
                  StoreProcedureName: "SP_ASSET_INSERT",
                  SchemaName: Path.sqlName
              }
             
              let formData = new FormData();
              formData.append('data', JSON.stringify(valuef))
              await ApiAuthority(username, password, Token, formData, async res => {
             
                
                if(res.Status=200)
                {
                 
              
                  
                  if(res.Data && res.Data.length>0)
                  {
                    Swal.fire({
                      icon: 'error',
                      title: 'notify',
                      text: 'Duplicate data!',
                    
                    })
                  }else{
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                    })
                    
                    Toast.fire({
                      icon: 'success',
                      title: 'successfully'
                    })
                    window.location=statistical;
                    
                
                  }
                } 
                else{
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: 'error'
                  })
                }
              })
              
              
            
      }

      const handleGetValuesLocation= async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                username,
                password,
            ],
            StoreProcedureName: "SP_LOCATION_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
       
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return ({ 
                value:item.id,
                label:item.location_Name})
              
            })
          
            setOptionLocation([...filterData]) 
          } 
        })
      }

      // handle show modal
      const handleShowModal=(type)=>{
        setShowModal(true)
        setTypeInsertMore(type)
      }

      const handleCalAPI= ()=>{
        hanldeGetValuesFilterSite()
        hanldeGetValuesFilterType()
        hanldeGetValuesFilterBrand()
        hanldeGetValuesFilterRack()
        hanldeGetValuesFilterArea()
        hanldeGetValuesSiteName()
        hanldeGetValuesAssetType()
        hanldeGetValuesFilterIDDTL()
        hanldeGetValuesFilterSuplier()
        handleGetValuesCheckWarranty()
        handleGetValuesLocation()
      }

      
    return(
        <>
            <div className="container-fluid">
                <div className="row m-4 p-4">
                  {/* row 1 */}
                  <div className="my-md-3 my-1 py-md-3 py-1" style={{borderRadius:'20px', backgroundColor:'#fff'}}>
                    
                    <div className="col-md-12 col-12 my-md-4 my-2 d-flex" >
                        {/* area */}
                        <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">Area 
                            {
                              !valuesAsset.area?

                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              
                            }
                            </label> 
                            <div className="d-flex">

                              <div style={{flex:'24'}}>

                              <Select className=" input inputRadius selectInsert ms-md-4 ms-2"  
                                onChange={(e)=>{setValuesAsset({...valuesAsset,area:e.value})}}
                                options={optionArea}
                              
                            />
                              </div>
                              <button onClick={()=>handleShowModal('area')} className="hoverMore me-md-4 me-2">
                              <span class="mdi mdi-plus-outline"></span>
                              </button>
                            </div>
                            
                        </div>
                        {/* site name */}
                        <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">Site Name
                            {
                              !valuesAsset.site_Name?

                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              
                            }</label> 
                          <div className="d-flex">

                            <div style={{flex:'24'}}>

                              <Select className=" input inputRadius selectInsert ms-md-4 ms-2"  
                              onChange={(e)=>{setValuesAsset({...valuesAsset,site_Name:e.value})}}
                              options={optionSiteName}
                              />
                            </div>
                            <button
                            onClick={()=>handleShowModal('siteName')}
                              className="hoverMore me-md-4 me-2"
                                style={{    backgroundColor: 'var(--admin-btn-color)',
                                  borderRadius: 'var(--boder-radius)',
                                  color: 'var(--text-nav-color)',
                                  maxWidth: '160px',flex:'1'}}>
                            <span class="mdi mdi-plus-outline"></span>
                            </button>
                          </div>
                        
                        </div>
                          {/* id */}
                        <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">ID</label> 
                            {
                              !valuesAsset.id?

                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              
                            }
                            <div className="d-flex">
                              <div style={{flex:'24'}}>
                                <Select className=" input inputRadius selectInsert ms-md-4 ms-2"  
                                onChange={(e)=>{setValuesAsset({...valuesAsset,id:e})}}
                                options={optionIDDTL}
                                />
                              </div>
                                <button
                                  onClick={()=>handleShowModal('id')}
                                  className="hoverMore hoverMore me-md-4 me-2"
                                    >
                                <span class="mdi mdi-plus-outline"></span>
                                </button>
                            </div>
                          
                        </div>
                        {/* type */}
                        <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">Type</label> 
                            {
                              !valuesAsset.type?

                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              
                            }
                            <div className="d-flex">

                              <div style={{flex:'24'}}>

                                <Select className=" input inputRadius selectInsert ms-md-4 ms-2" 
                                    onChange={(e)=>{setValuesAsset({...valuesAsset,type:e.value})}}
                                    options={optionType}
                                />
                              </div>
                              <button
                                onClick={()=>handleShowModal('type')}
                                className="hoverMore me-md-4 me-2"
                                  >
                                <span class="mdi mdi-plus-outline"></span>
                              </button>
                            </div>
                        </div>

                        {/* model */}
                        <div className="my-1 col-md-2">
                              <label htmlFor="" className="mx-md-4 mx-2">MoDel
                                {
                                  !checkValues.model?
                                  <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                                }
                              </label> 
                              <div className="mx-md-4 mx-2"  style={{width:'auto'}}>

                            <input
                             
                              onChange={(e)=>{setValuesAsset({...valuesAsset,model:e.target.value})}}
                              className="d-block p-2 input inputRadius w-100 "  style={{}}type='text ' placeholder="MoDel"/>
                                      
                              </div>
                        </div>
                        {/* brand */}
                        <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">Brand</label> 
                            {
                              !valuesAsset.brand?

                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              
                            }
                            <div className="d-flex">
                              <div style={{flex:'24'}}>
                                <Select className=" input inputRadius selectInsert ms-md-4 ms-2"  
                                  onChange={(e)=>{setValuesAsset({...valuesAsset,brand:e.value})}}
                                  options={optionBrand}
                                />
                              </div>
                                <button
                                  onClick={()=>handleShowModal('brand')}
                                  className="hoverMore hoverMore me-md-4 me-2"
                                    >
                                <span class="mdi mdi-plus-outline"></span>
                                </button>
                            </div>
                            
                        </div>

                    </div>
                            {/* d */}
                    <div className="col-md-12 col-12 my-md-4 my-2 d-flex" >
                        {/* assetType */}
                        <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">Asset Type</label> 
                            {
                              !valuesAsset.asset_Type?

                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              
                            }
                              <div className="d-flex">
                              <div style={{flex:'24'}}>
                                <Select className=" input inputRadius selectInsert ms-md-4 ms-2"  
                                  onChange={(e)=>{setValuesAsset({...valuesAsset,asset_Type:e.value})}}
                                  options={optionAssetType}
                                />
                              </div>

                                <button 
                                  onClick={()=>handleShowModal('assetType')}
                                  className="hoverMore hoverMore me-md-4 me-2"
                                    >
                                <span class="mdi mdi-plus-outline"></span>
                                </button>
                            </div>
                            
                          
                        </div>
                            {/* s/n */}
                        <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">S/N
                            {
                                  !checkValues.serino?
                                  <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                                }</label> 
                            <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
        
                            <input
                                onChange={(e)=>{setValuesAsset({...valuesAsset,serino:e.target.value})}}
                                className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="S/N"/>
                            </div>
                                    
                          
                        </div>
                          {/* warranty_Status */}
                        <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">Warranty Status</label> 
                            {
                              !valuesAsset.warranty_Status?

                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              
                            }
                        
                              <div>
                                <Select className=" input inputRadius selectInsert mx-md-4 mx-2"  
                                  onChange={(e)=>{setValuesAsset({...valuesAsset,warranty_Status:e.value})}}
                                  options={optionWarrantyStatus}
                                />
                              </div>
                                
                            
                        </div>
                        {/* Location */}
                        <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">Location</label> 
                            {
                              !valuesAsset.location?

                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              
                            }
                            <div className="d-flex">
                              <div style={{flex:'24'}}>
                                <Select className=" input inputRadius selectInsert ms-md-4 ms-2"  
                                  onChange={(e)=>{setValuesAsset({...valuesAsset,location:e.label})}}
                                  options={optionLocation}
                                />
                              </div>
                                <button
                                  onClick={()=>handleShowModal('location')}
                                  className="hoverMore hoverMore me-md-4 me-2"
                                    >
                                <span class="mdi mdi-plus-outline"></span>
                                </button>
                            </div>
                            
                        </div>
                          {/* rack id */}
                        <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">Rack ID</label> 
                            {
                              !valuesAsset.rack?

                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              
                            }
                              <div className="d-flex">
                              <div style={{flex:'24'}}>
                                <Select className=" input inputRadius selectInsert ms-md-4 ms-2"  
                                  onChange={(e)=>{setValuesAsset({...valuesAsset,rack:e.value})}}
                                  options={optionRack}
                                />
                              </div>
                                <button 
                                  onClick={()=>handleShowModal('rackId')}
                                  className="hoverMore hoverMore me-md-4 me-2"
                                    >
                                <span class="mdi mdi-plus-outline"></span>
                                </button>
                            </div>
                            
                        </div>
                            {/* Floor */}
                        <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">Floor
                            {
                              !valuesAsset.floor?

                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              
                            }</label> 
                            <Select className="input inputRadius selectInsert mx-md-4 mx-2" 
                                onChange={(e)=>{setValuesAsset({...valuesAsset,floor:e.value})}}
                                options={optionFloor}
                                
                            />
                        </div>
                    </div>

                    <div className="col-md-12 col-12 my-md-4 my-2 d-flex" >

                    <div className="my-1 col-md-2">
                        <label htmlFor="" className="mx-md-4 mx-2">Unit
                        {
                          !valuesAsset.unit?

                            <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                          
                        }</label> 

                        <Select className="input inputRadius selectInsert mx-md-4 mx-2" 
                            onChange={(e)=>{setValuesAsset({...valuesAsset,unit:e.value})}}
                            options={optionUnit}
                          
                        />
                    </div>
                    <div className="my-1 col-md-2">
                        <label htmlFor="" className="mx-md-4 mx-2">IP Switch
                        {
                              !checkValues.ip_Switch?
                              <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                            }
                        </label> 
                        <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                          <input
                          onChange={(e)=>{setValuesAsset({...valuesAsset,ip_Switch:e.target.value})}}
                          className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="IP Switch"/>
                          </div>
                                
                    </div>
                    <div className="my-1 col-md-2">
                          <label htmlFor="" className="mx-md-4 mx-2">ID Switch
                          {
                              !valuesAsset.id_Switch?
                              <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                            }</label> 
                          <div className="mx-md-4 mx-2"  style={{width:'auto'}}>

                            <input

                              value={valuesAsset.id_Switch}
                              onChange={(e) => {
                                if (Number.isFinite(Number(e.target.value))) {
                                  setValuesAsset({...valuesAsset,id_Switch:e.target.value})

                                }
                              }}
                            className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="ID Switch"/>
                            </div>
                                
                      
                    </div>
                    <div className="my-1 col-md-2">
                          <label htmlFor="" className="mx-md-4 mx-2">Switch Port
                          {
                              !valuesAsset.switch_Port?
                              <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                            }</label> 
                          <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                            <input
                            value={valuesAsset.switch_Port}
                            onChange={(e) => {
                              if (Number.isFinite(Number(e.target.value))) {
                                setValuesAsset({...valuesAsset,switch_Port:e.target.value})

                              }
                            }}
                            
                            className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="Switch Port"/>
                            </div>
                                
                      
                    </div>
              <div className="my-1 col-md-2">
                <label htmlFor="" className="mx-md-4 mx-2">User Name
                {
                    !checkValues.userName?
                    <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                  }</label> 
                <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                  <input
                  onChange={(e)=>{setValuesAsset({...valuesAsset,user_Name:e.target.value})}}
                  className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="User Name"/>
                  </div>
          

                </div>
                <div className="my-1 col-md-2">
                      <label htmlFor="" className="mx-md-4 mx-2">Password
                      {
                          !checkValues.password?
                          <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                        }</label> 
                      <div className="mx-md-4 mx-2"  style={{width:'auto'}}>

                        <input
                        onChange={(e)=>{setValuesAsset({...valuesAsset,password:e.target.value})}}
                        className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="Password"/>
                      </div>
                            
                  
                </div>
                    </div>
                  </div>
                  {/* row 2 */}
                  <div className="my-md-3 my-1 py-md-3 py-1" style={{borderRadius:'20px', backgroundColor:'#fff'}}>
                      
                      <div className="col-md-12 col-12 my-md-4 my-2 d-flex" >
                      {/* Local IP */}
                      <div className="my-1 col-md-2">
                        <label htmlFor="" className="mx-md-4 mx-2">Local IP
                        {
                            !checkValues.local_ip?
                            <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                          }</label> 
                        <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                          <input
                          onChange={(e)=>{setValuesAsset({...valuesAsset,local_ip:e.target.value})}}
                          className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="Local IP"/>
                          </div>
                      </div>
                      {/* Local Port */}
                      <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">Local Port
                            {
                                !valuesAsset.local_Port?
                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              }</label> 
                            <div className="mx-md-4 mx-2"  style={{width:'auto'}}>

                              <input

                                      value={valuesAsset.local_Port}
                                      onChange={(e) => {
                                      if (Number.isFinite(Number(e.target.value))) {
                                        setValuesAsset({...valuesAsset,local_Port:e.target.value})

                                      }
                                      }}
                              
                              className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="Local Port"/>
                            </div>
                                  
                        
                      </div>
                      {/* Public IP */}
                      <div className="my-1 col-md-2">
                            <label htmlFor="" className="mx-md-4 mx-2">Public IP
                            </label> 
                            <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                              <input
                              onChange={(e)=>{setValuesAsset({...valuesAsset,public_IP:e.target.value})}}
                              className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="Public IP"/>
                              </div>
                                  
                        
                      </div>
                      {/* Public Port */}
                      <div className="my-1 col-md-2">
                          <label htmlFor="" className="mx-md-4 mx-2">Public Port
                          {
                                !valuesAsset.public_Port?
                                <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                              }</label> 
                          <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                            <input
                                  value={valuesAsset.public_Port}
                                  onChange={(e) => {
                                  if (Number.isFinite(Number(e.target.value))) {
                                    setValuesAsset({...valuesAsset,public_Port:e.target.value})

                                  }
                                  }}

                          
                            className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="Public Port"/>
                            </div>
                                  
                      </div>
                      {/* Contract Number */}
                      <div className="my-1 col-md-2">
                  <label htmlFor="" className="mx-md-4 mx-2">Contract Number
                  {
                      !checkValues.contrac_Number?
                      <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                    }</label> 
                  <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                    <input
                    onChange={(e)=>{setValuesAsset({...valuesAsset,contrac_Number:e.target.value})}}
                    className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="Contract Number"/>
                    </div>
                    
              
                      </div>
                      {/* Buy Date */}
                      <div className="my-1 col-md-2">
                          <label className="d-bock w-100 mx-md-4 mx-2" htmlFor="" >Buy Date
                          {
                            !valuesAsset.buy_Date?

                              <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                            
                          }
                          </label> 
                          <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                          <DatePicker
                          placement="topStart"
                              className="w-100 "
                              format='dd-MM-yyyy'
                              onChange={(e)=>{setValuesAsset({...valuesAsset,buy_Date:e})}}
                              />
                              </div>
                      </div>

                  </div>  
                        <div className="col-md-12 col-12 my-md-4 my-2 d-flex" >
                          {/* Status */}
                            <div className="my-1 col-md-2">
                                <label htmlFor="" className="mx-md-4 mx-2">Status
                                {
                                  !valuesAsset.status?

                                    <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                                  
                                }
                                </label> 
                                <Select className=" input inputRadius selectInsert mx-md-4 mx-2"  
                                      onChange={(e)=>{setValuesAsset({...valuesAsset,status:e.value})}}
                                      options={optionStatus}
                                    />
                               
                                
                            </div>
                            {/* Warranty */}
                            <div className="my-1 col-md-2">
                                  <label htmlFor="" className="mx-md-4 mx-2">Warranty
                                  {
                                      !checkValues.warranty?
                                      <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc </span>:null
                                    }</label> 
                                  <div className="mx-md-4 mx-2 d-flex"  style={{width:'auto'}}>
                                <Select  className="input w-50 inputRadius selectInsert " 
                                  onChange={(e=>{setValueMonths(e.value)})}
                                    placeholder='Months'
                                  options={optionMonth}
                                />
                                <Select  className="input w-50 inputRadius selectInsert " 
                                  onChange={(e=>{setValueYear(e.value)})}
                                  placeholder='Years'
                                  options={optionYear}
                                />
                                
                                
                              
                                    
                              
                            </div>
                            </div>
                            {/* Suplier Install */}
                            <div className="my-1 col-md-2">
                                <label htmlFor="" className="mx-md-4 mx-2">Suplier Install
                                {
                                  !valuesAsset.suplier_Install?

                                    <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                                  
                                }</label> 
                                <div className="d-flex">
                                  <div style={{flex:'24'}}>
                                    <Select className=" input inputRadius selectInsert ms-md-4 ms-2"  
                                      onChange={(e)=>{setValuesAsset({...valuesAsset,suplier_Install:e.value})}}
                                      options={optionSuplier}
                                    />
                                  </div>
                                    <button
                                    onClick={()=>handleShowModal('suplierInstall')}
                                    className=" hoverMore me-md-4 me-2"
                                        >
                                    <span class="mdi mdi-plus-outline"></span>
                                    </button>
                                </div>
                                
                            </div>
                            {/* IT Site */}
                            <div className="my-1 col-md-2">
                                <label htmlFor="" className="mx-md-4 mx-2">IT Site</label> 
                                {
                                  !valuesAsset.it_Site?

                                    <span style={{color:'red', fontSize:'14px'}}>* Bắt buộc</span>:null
                                  
                                }
                                <Select className="input inputRadius selectInsert mx-md-4 mx-2" 
                                    onChange={(e)=>{setValuesAsset({...valuesAsset,it_Site:e.value})}}
                                    options={optionSite}
                                
                                />
                            </div>
                            {/* i */}
                            <div className="my-1 col-md-4">
                                  <label htmlFor="" className="mx-md-4 mx-2">I
                                  </label> 

                                  <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                                    <textarea
                                    onChange={(e)=>{setValuesAsset({...valuesAsset,I:e.target.value})}}
                                    className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="I"/>
                                    </div>
                                    
                              
                            </div>
                        </div>
                        <div className="col-md-12 col-12 my-md-4 my-2 d-flex" >
                            <div className="my-1 col-md-4">
                                <label htmlFor="" className="mx-md-4 mx-2">C</label> 
                                <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                                <textarea
                                    onChange={(e)=>{setValuesAsset({...valuesAsset,C:e.target.value})}}
                                    className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="C"/>
                                </div>
                            </div>
                            {/* A */}
                            <div className="my-1 col-md-4">
                                  <label htmlFor="" className="mx-md-4 mx-2">A</label> 
                                  <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                                    <textarea
                                    onChange={(e)=>{setValuesAsset({...valuesAsset,A:e.target.value})}}
                                    className="d-block p-2 input inputRadius w-100"  tstyle={{}}ype='text' placeholder="A"/>
                                    </div>
                            </div>
                            {/* Remark */}
                            <div className="my-1 col-md-4">
                                    <label htmlFor="" className="mx-md-4 mx-2">Remark</label> 
                                    <div className="mx-md-4 mx-2"  style={{width:'auto'}}>
                                  <textarea
                                  onChange={(e)=>{setValuesAsset({...valuesAsset,Remark:e.target.value})}}
                                  className="d-block p-2 input inputRadius w-100 "  style={{minHeight:'200px'}}ype='text' placeholder="Remark"/>
                                    </div>
                            </div>
                        </div>
                  </div>
                  {/* row 2 */}   
                  <div style={{display:'flex',justifyContent:'end'}}>
                      <button className="btn"
                      style={{    backgroundColor: 'var(--admin-btn-color)',
                        borderRadius: 'var(--boder-radius)',
                        color: 'var(--text-nav-color)',
                        maxWidth: '160px'}} onClick={()=>{handleCheckValues()}}>supmit</button>
                  </div>  
                </div>
                {
                  setShowModal?
                  <ModalMoreSelect handle={handleCalAPI} showModal={[showModal,setShowModal]} type={typeInsertMore}/>:null
                }
            </div>
        </>
    )
}
export default InsertStatiscal