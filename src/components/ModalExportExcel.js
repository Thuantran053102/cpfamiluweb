import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Capture1 from '../images/Capture1.PNG'
import Capture2 from '../images/Capture2.PNG'
import Capture3 from '../images/Capture3.PNG'
import DcelRenderer from './ExcelRenderer';
import Swal from 'sweetalert2';
import { CheckTOkenRule,CheckUserRule,CheckFullName } from '../shares/Func';
import { ApiAuthority } from '../api/User';
import { Path } from '../api/Path';
import moment from "moment";
import { handleShowmodal } from '../utils/utils';
import Loading from '../shares/Loading';
import ModalDupExcel from './ModalDupExcel';
import { CheckUseID } from '../shares/Func';
import { Link } from 'react-router-dom';

function ModelExcel(prop) {
    const {data}= prop
    
    var arrrr=[]
    const [showModalExcelRender,setShowModalExcelRender] = data
    const [dataExcelUpload,setDataExcelUpload] = useState([])
    const [sitesVL,setSitesVL]= useState([])
    const [areasVL,setAreasVL]= useState([])
    const [idDTLVL,setIdDTLVL]= useState([])
    const [typeVL,setTypeVL]= useState([])
    const [brandVL,setBrandVL] =useState([])
    const [assetVL,setAssetVL]= useState([])
    const [rackVL,setRackVL]= useState([])
    const [checkExcel,setCheckExcel]= useState(false)
    const [SerialVL,setSerialVL]= useState([])
    const [supplierVL,setSupplierVL] = useState([])
    const [userVL,setUserVL] = useState([])

    const [sites,setSites]= useState([])
    const [areas,setAreas]= useState([])
    const [idDTLs,setIdDTLs]= useState([])
    const [types,setTypes]= useState([])
    const [brands,setBrands]= useState([])
    const [racks,setRacks]= useState([])
    const [assets,setAssets]= useState([])
    const [suppliers,setSuppliers]= useState([])
    const [duplicateData,setDuplicateData]= useState([])
    const [users,setUsers]= useState([])

    const [arrNewRequest,setArrNewRequest] = useState([])

    const [isLoading,setIsLoading]= useState(false)

    const [modalShow, setModalShow]= useState(false)
    
   

  const [fullscreen, setFullscreen] = useState(true);


  useEffect(()=>{
   
  },[showModalExcelRender])

  function getExcel(data){

    let obj =[]
    var tmpTop=[]
    let tmp=[]
    if(data)
    {
           tmpTop = data.filter((item,index,arr)=>{
              if(index===0)
              {
                  return item
              }
          })
           tmp = data.filter((item,index,arr)=>{
            if(index!==0)
            {
                return item
            }
          })
          
          if(tmp && tmp.length>0)
          {

              for(let i=0;i<tmp.length;i++)
              {
               
                var a=[]
                for(let j=0;j<=tmp[i].length;j++)
                {
                  if(tmp[i][j]===undefined)
                  {
                    a.push(j)
                  }
                }
                a.map((item)=>{
                  tmp[i][item]=null
                })
              }
          }
          setDataExcelUpload([...tmpTop,...tmp]) 
         
      }

 
  }

  useEffect(()=>{
    hanldeGetValuesSite()
    handleGetValuesArea()
    hanldeGetValuesID_DTL()
    handleGetValuesType()
    handleGetValuesBrand()
    handleGetValuesAssetType()
    handleGetValuesRack()
    handleGetValuesCHECKSERIALL()
    handleGetValuesSupplier()
    handleGetValuesUsers()

  },[])

  const handleGetValuesArea=async()=>{
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
       
        setAreasVL(  res.Data.map((item)=>{
          return(
              item.Area_Name
          )
        }))
        setAreas(res.Data.map((item)=>{
          return(
            {
                id:item.Area_ID,
                value:item.Area_Name
            }
          )
        }))
      } 
    })

  }



  const hanldeGetValuesSite=async()=>{
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
        

          setSitesVL(  res.Data.map((item)=>{
              return(
                  item.Site_Name
              )
          }))
          setSites(res.Data.map((item)=>{
            return(
              {
                  id:item.Site_ID,
                  value:item.Site_Name
              }
            )
          }))
        
      
       
       
      } 
    })

  }

  const hanldeGetValuesID_DTL=async()=>{
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
        setIdDTLVL(  res.Data.map((item)=>{
            return(
                item.ID_Name
            )
        }))
        setIdDTLs(
            res.Data.map((item)=>{
              return({
                id:item.ID_ID,
                value:item.ID_Name
              }
              )
          })
        )
      
       
      } 
    })

  }
  
  const handleGetValuesType=async()=>{
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
       
        setTypeVL(  res.Data.map((item)=>{
          return(
              item.Type_Name
          )
        }))

        setTypes(
          res.Data.map((item)=>{
            return({
              id:item.Type_ID,
              value:item.Type_Name
            }
            )
        })
      )

      } 
    })

  }

  const handleGetValuesBrand=async()=>{
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
       
        setBrandVL(  res.Data.map((item)=>{
          return(
              item.Brand_Name
          )
        }))
        setBrands(
          res.Data.map((item)=>{
            return({
              id:item.Brand_ID,
              value:item.Brand_Name
            }
            )
        })
        )
      } 
    })

  }

  const handleGetValuesRack=async()=>{
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
       
        setRackVL(  res.Data.map((item)=>{
          return(
              item.Rack_Name
          )
        }))
        setRacks( res.Data.map((item)=>{
          return({
            id:item.ID_Rack,
            value:item.Rack_Name
          }
          )
        }))
      } 
    })

  }

  const handleGetValuesAssetType=async()=>{
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
        setAssetVL(  res.Data.map((item)=>{
          return(
              item.Asset_Type_Name
          )
        }))
        setAssets( res.Data.map((item)=>{
          return({
            id:item.Asset_Type_ID,
            value:item.Asset_Type_Name
          }
          )
      }))
      } 
    })

  }

  const handleGetValuesCHECKSERIALL=async()=>{
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
        setSerialVL(  res.Data.map((item)=>{
          return(
              item.ID_ASSET_TYPE_Code
          )
        }))
      } 
    })

  }

  const handleGetValuesSupplier=async()=>{
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
        setSupplierVL(  res.Data.map((item)=>{
          return(
              item.Supplier_Install
          )
        }))
        setSuppliers(res.Data.map((item)=>{
          return(
            {
              id:item.Supplier_ID,
              value:item.Supplier_Install
            }
          )
        }))
      } 
    })

  }


  const handleGetValuesUsers=async()=>{
    setIsLoading(true)
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
        setUserVL(  res.Data.map((item)=>{
          return(
              item.User_Name
          )
        }))
        setUsers(res.Data.map((item)=>{
          return(
            {
              id:item.User_ID,
              value: item.User_Name
            }
          )
        }))
        setIsLoading(false)
      } 
    })

  }

  // SP_CHECKSERIALL



  const handleExcelCheck=()=>{
    var Check= true
    setDuplicateData([])
    setIsLoading(true)
    
    
    if(dataExcelUpload[0].length>=33)
    {
      
        dataExcelUpload.map((item,index,arr)=>{
            if(index!==0)
            {
              
             
              if(!areasVL.includes(item[1]))
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[1]}" value at column "${arr[0][1]}" , row "${index}"`,
                 
                })
                Check=false
                setIsLoading(false)
              }
              else if(!sitesVL.includes(item[2]))
                {
                  Swal.fire({
                    icon: 'error',
                    title: 'Notify',
                    text: `Invalid "${item[2]}" value at column "${arr[0][2]}" , row "${index}"`,
                    
                  })
                  Check=false
                  setIsLoading(false)
                  
              }
              else if(!idDTLVL.includes(item[3]))
              {
                Check=false
                setIsLoading(false)
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[3]}" value at column "${arr[0][3]}" , row "${index}" `,
                  
                })
               
              }
              else if(!typeVL.includes(item[4]))
              {
                Check=false
                setIsLoading(false)
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[4]}" value at column "${arr[0][4]}" , row "${index}"`,
                  
                })
               
              }
              else if(!item[5])
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[5]}" value at column "${arr[0][5]}", row "${index}" `,
                  
                })
                Check=false
                setIsLoading(false)
              }
              else if(!brandVL.includes( item[6].toUpperCase()))
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[6]}" value at column "${arr[0][6]}" , row "${index}"`,
                })
                Check=false
                setIsLoading(false)
              }
              else if(!assetVL.includes( item[7]))
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[7]}" value at column "${arr[0][7]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if((!['RK','FS', 'EB', 'MH'].includes(item[3].slice(0,2)))&&!item[8])
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[8]}" value at column "${arr[0][8]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if((!['Expire','Available'].includes(item[9])))
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[9]}" value at column "${arr[0][9]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if(!item[10])
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[10]}" value at column "${arr[0][10]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if(!rackVL.includes(item[11]))
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[11]}" value at column "${arr[0][11]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if(!Number(item[12]) && Number(item[12])!==0)
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[12]}" value at column "${arr[0][12]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if(!Number(item[13]) && Number(item[13])!==0)
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[13]}" value at column "${arr[0][13]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if( !item[14] )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[14]}" value at column "${arr[0][14]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if( !Number(item[15]) && Number(item[15])!==0 )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[15]}" value at column "${arr[0][15]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if( !Number(item[16]) && Number(item[16])!==0 )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[16]}" value at column "${arr[0][16]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if( !item[17] )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[17]}" value at column "${arr[0][17]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if( !item[18] )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[18]}" value at column "${arr[0][18]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if( !item[19] )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[19]}" value at column "${arr[0][19]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if( !item[20] )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[20]}" value at column "${arr[0][20]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if( !item[23] )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[23]}" value at column "${arr[0][23]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if( !item[24] )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[24]}" value at column "${arr[0][24]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if(!['Enable','Disable','Maintainace','Inprogress'].includes(item[25]) )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[25]}" value at column "${arr[0][25]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if(!(SerialVL.includes(item[3].slice(0,2)))&&!item[26] )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[26]}" value at column "${arr[0][26]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if(!supplierVL.includes(item[27]) )
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[27]}" value at column "${arr[0][27]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
              else if(!userVL.includes(item[28]))
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Notify',
                  text: `Invalid "${item[28]}" value at column "${arr[0][28]}" , row "${index}" `,
                })
                Check=false
                setIsLoading(false)
              }
            }
        })
    }
    else{
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "template doesn't match",
            showConfirmButton: false,
            timer: 1500
          })
          Check=false
          setIsLoading(false)
    }
  
   
    hanldelValuesExcel(Check)
  }

  const handleGetID=(arr,valueItem)=>{
      return arr.find((item)=>{
          if(item.value===valueItem)
          {
        
            return item
          }
  
      })
    

    
  }

  

  const hanldelValuesExcel=async(Check)=>{
    
    if(Check)
    {
      
      var arrexcel= dataExcelUpload.map((item,index)=>{
        
        if(index!==0)
        {
          
          return({
          Buy_Date_:moment(item[24], 'DD/MM/YYYY').format('YYYY-MM-DD') //item[24]
          ,Status:item[25]==='Enable'?1:item[25]==='Disable'?2:item[25]==='Maintainace'?3:4       
          ,Warranty_Status:item[9]==='Expire'?1:2   
          ,Location:item[10]   
          ,SeriNo:item[8] 
          ,Floor:item[12]     
          ,Unit:item[13]     
          ,IP_Switch:item[14]     
          ,Switch_Port:item[16]     
          ,User_Name:item[17]     
          ,PassWord:item[18]     
          ,Local_IP:item[19]      
          ,Local_Port:item[20]      
          ,Public_IP:item[21]      
          ,Public_Port:item[22]      
          ,Contract_Number:item[23]      
          ,User_ID:handleGetID(users,item[28]).id// tên user -> user id  
          ,Site_ID:handleGetID(sites,item[2]).id// tên -> id site   
          ,Type_ID:handleGetID(types,item[4]).id// tên -> id     
          ,Brand_ID:handleGetID(brands,item[6]).id     // tên -> id
          ,Model_ID:item[5]  // tên -> id    
          ,Asset_Type_ID:handleGetID(assets,item[7]).id   // tên -> id
          ,Supplier_ID:handleGetID(suppliers,item[27]).id // tên -> id    
          ,ID_ID:handleGetID(idDTLs,item[3]).id // tên -> id     
          ,ID_Switch:item[15]   
          ,ID_Rack:handleGetID(racks,item[11]).id
          ,C:item[29]      
          ,I:item[30]      
          ,A:item[31] 
          ,Remark:item[32]  
          ,Waranty:item[26] ?moment(item[26], 'DD/MM/YYYY').format('YYYY-MM-DD'):null
        })

        }
       
      })
      if(arrexcel[0]===undefined)
      {
        arrexcel.shift()
      }
      
      handleGetExcelItemAPI(arrexcel)

    }
    else{
      setIsLoading(false)
    }
  }


  const handleGetExcelItemAPI=async(arrexcel)=>{
   
    if(arrexcel && arrexcel.length>0)
    {
      const userID=await CheckUseID()
      console.log('userID',userID)
      const fullName= await(CheckFullName())
      arrexcel.forEach(async(element,index) => {
       
        
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
              element.Buy_Date_
              ,element.Status
              ,element.Warranty_Status
              ,element.Location  
              ,element.SeriNo
              ,element.Floor     
              ,element.Unit  
              ,element.IP_Switch    
              ,element.Switch_Port    
              ,element.User_Name    
              ,element.PassWord    
              ,element.Local_IP    
              ,element.Local_Port     
              ,element.Public_IP   
              ,element.Public_Port     
              ,element.Contract_Number   
              ,element.User_ID
              ,element.Site_ID
              ,element.Type_ID
              ,element.Brand_ID   // tên -> id
              ,element.Model_ID 
              ,element.Asset_Type_ID
              ,element.Supplier_ID
              ,element.ID_ID   
              ,element.ID_Switch
              ,element.ID_Rack
              ,element.C     
              ,element.I   
              ,element.A
              ,element.Remark
              ,element.Waranty
              ,userID
            ],
            StoreProcedureName: "SP_ASSET_INSERTEXCELL",
            SchemaName: Path.sqlName
        }
       
        await handlePushValuesExcelAPI(valuef)
       
        
        
        if(index>=arrexcel.length-1)
        {
         
           
          
          
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
            title: 'more success'
          })
        
          setIsLoading(false)

         
       
          setIsLoading(false)
        }
      });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Notify',
        text: `Invalid value at column  , row ""`,
       
      })
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    var ar=[],ar1=[],dupbe
   
    if(duplicateData && duplicateData.length>0)
    {
      dupbe= duplicateData.filter((item,index)=>{ 
          if(item!=undefined)
          {
            return item
          }
      })
   
      ar =dupbe.map((item1,index)=>{
        return dataExcelUpload.filter((item,index1)=>{
          if(item[2]===item1.Site_Name && 
            item[3]===item1.ID_Name && 
            item[5]===item1.Model_Name && 
            item[23]===item1.Contract_Number)
          {
            return item
          }
        })
      })
      ar = ar.filter((item)=>{
        if(item[0] && item[0])
        {
          return item[0]
        }
      })
      // các giá trị  trùng lặp
      ar= ar.map((item)=>{
        return item[0]
      })

      // các giá trị ko trùng lặp
      ar1=dataExcelUpload.filter((item,index)=>{
        if(!ar.includes(item) && index!=0)
        {
          return item
        }
      })
      ar= ar.map((item)=>{
        return [...item,...['exists']]
      })
      ar1=ar1.map((item)=>{
        return [...item,...['notExists']]
      })

     
    }
  
    var arrNew=[...[dataExcelUpload[0]],...ar,...ar1]

 
  

    console.log('arrNew',arrNew)

    
    setArrNewRequest(arrNew)
  
    // setModalShow(true)
    
 
  },[duplicateData])
  
  useEffect(()=>{

  
    if(arrNewRequest[0]&& arrNewRequest.length>0)
    {
      setModalShow(true)
    }
  },[arrNewRequest])


  const handlePushValuesExcelAPI=async(valuef)=>{
    var valueDup=[]
    let Token = await CheckTOkenRule();
    let User = await CheckUserRule();
    const username = User.username
    const password =User.password
   
    let formData = new FormData();
    formData.append('data', JSON.stringify(valuef))
    await ApiAuthority(username, password, Token, formData, async res => {
      
      if(res.Status=200)
      {
      
        if(res.Data)
        {
          var lenght= arrrr.push(res.Data[0])
         
        }
      } 
      setDuplicateData([...arrrr])
    })
   
    
  }


 


  return (
    <>
      <Modal show={showModalExcelRender} fullscreen={fullscreen} onHide={() => setShowModalExcelRender(false)}>
        {
                isLoading ? <Loading/> : ""
        }
        <Modal.Header closeButton>

      
          <Modal.Title>Upload Excel</Modal.Title>
          
          <a  className='mx-2 p-2 dowloadTemplate' target="_blank" href='https://cpvn-my.sharepoint.com/:x:/g/personal/thuan_tran_cp_com_vn/ESWQQyQmr35Ap3jLAOIPGLQBRzXnWBQKgtWv5NUjMZLAEw'>
          <i className="mdi mdi-plus-circle me-1"></i>
            Download Template 

          </a>
        </Modal.Header>
        <Modal.Body>
            <div>
                <h5>Bảng mẫu</h5>
                <div style={{overflowX:'auto' , height:'200px', whiteSpace: 'nowrap'}} >
                    <img  style={{whiteSpace: 'nowrap'}} id="admin-img-avatar" src={Capture1} alt=""  />
                    <img   style={{whiteSpace: 'nowrap'}} id="admin-img-avatar" src={Capture2} alt="" />
                    <img   style={{whiteSpace: 'nowrap'}} id="admin-img-avatar" src={Capture3} alt="" />
                </div>
            </div>
            <DcelRenderer data={getExcel}/>
            {
                 dataExcelUpload && dataExcelUpload.length>0? 
                 <button onClick={()=>{handleExcelCheck()}} className='btn btnPri'>Confirm</button>:null
                
            }
           
           
            <div  style={{overflowX:'auto',border:'1px solid black' , maxHeight:'300px', whiteSpace: 'nowrap'}} >
                {
                dataExcelUpload && dataExcelUpload.length>0?
                <table className="table ">
                    <thead>
                    <tr key='1'>
                        {

                      

                            dataExcelUpload.map((item,index,arr)=>{
                                if(index===0)
                                {                                          
                                    return item.map((item1)=>{
                                        return(
                                            <th scope="col">{item1}</th>
                                        )
                                    })
                                    
                                }
                            })
                            
                        }
                      
                    </tr>
                    </thead>
                    <tbody style={{overflow:'scroll', maxHeight:600}}>
                    
                    {
                        dataExcelUpload.map(function (item, index, arr) {
                            if(index!==0)
                            {
                                return(
                               
                                <tr key={index} style={{ lineHeight: '2rem' }}>
                                    {

                                         item.map((item1)=>{
                                                

                                                    return(
                                                        <td  >{item1}</td>
                                                    
                                                    )
                                               
                                        })
                                    }
                                    </tr>
                                )

                            }
                        })
                    }
                        


                    </tbody>
                </table>:null
                }
            </div>

              {
                 setModalShow ?
                  <ModalDupExcel 
                  start={[modalShow, setModalShow]} 
                  data={arrNewRequest} 
                
                  
                  />:null
                
              }
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModelExcel