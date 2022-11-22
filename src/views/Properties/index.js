import React from "react";
import { useEffect,useState } from "react";
import { CheckTOkenRule,CheckUseID,CheckUserRule } from "../../shares/Func";
import { Path } from "../../api/Path";
import { ApiAuthority } from "../../api/User";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { type } from "@testing-library/user-event/dist/type";
 import Dropdown from 'react-bootstrap/Dropdown';
 import ModalUpdateProperties from "../../components/ModalUpdateProperties";
import './properties.css'
import ModalMoreSelect from "../../components/ModalMore";
import Swal from 'sweetalert2';

function Properties(){
    
    // useState 
    const [areasVL,setAreasVL]= useState([])
    const [areas,setAreas]= useState([])
    const [SiteName,setSiteName] =useState([])
    const [IDDTL,setIDDTL]= useState([])
    const [Type,setType] = useState([])
    const [assetType,setAssetType] = useState([])
    const [brand,setBrand] = useState([])
    const [Rack,setRack] = useState([])
    const [Location,setLocation]= useState([])
    const [Suplier,setSuplier]=useState([])
    const [typeInsertMore,setTypeInsertMore]= useState()
    const [typeLeft,setTypeLeft] = useState({
        area:true,
        siteName:false,
        id:false,
        type:false
    })
    const [dataUpdate,setDataUpdate]= useState({

    })
    const [typeRight,setTypeRight] = useState({
        brand:true,
        assetType:false,
        location:false,
        rack:false,
        suplier:false
    })
    const [showModal,setShowModal]= useState(false)
    const [showModalUpdate,setShowModalUpdate]= useState(false)
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
            setType([...filterData]) 
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
            setSiteName([...filterData]) 
          } 
        })
  
      }
      const handleDeleteProperties= async(type,id)=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        let UserID = await CheckUseID()
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                type,
                id,
                UserID
            ],
            StoreProcedureName: "SP_PROPERTIES_DELETE",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status=200)
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
                title: 'Signed in successfully'
              })
              handleCalAPI()
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
            setSuplier([...filterData]) 
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
            setIDDTL([...filterData]) 
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
            setBrand([...filterData]) 
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
            setAssetType([...filterData]) 
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
            setRack([...filterData]) 
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
          
            setLocation([...filterData]) 
          } 
        })
      }

      useEffect(()=>{
        handleGetValuesArea()
        hanldeGetValuesSiteName()
        hanldeGetValuesFilterIDDTL()
        hanldeGetValuesFilterBrand()
        hanldeGetValuesFilterRack()
        hanldeGetValuesAssetType()
        hanldeGetValuesFilterType()
        handleGetValuesLocation()
        hanldeGetValuesFilterSuplier()
      },[])

      const handleCalAPI= ()=>{
        handleGetValuesArea()
        hanldeGetValuesSiteName()
        hanldeGetValuesFilterIDDTL()
        hanldeGetValuesFilterBrand()
        hanldeGetValuesFilterRack()
        hanldeGetValuesAssetType()
        hanldeGetValuesFilterType()
        handleGetValuesLocation()
        hanldeGetValuesFilterSuplier()
      }
  

    const handleShowModal=(type)=>{
        setShowModal(true)
        setTypeInsertMore(type)
    }
    const handleShowModelUpdate=(type,id,value)=>{
        setShowModalUpdate(true)
        setTypeInsertMore(type)
        setDataUpdate(
            {
                id,
                value
            }
        )
    }
    const QuestionDeleteProperties=(type,id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteProperties(type,id)
              }
           
          })
    }
    return(
        <div className="container mt-3">
            <div className="row">
                    <div className="col-md-6" >
                    <ButtonGroup  aria-label="Basic example">
                        <Button onClick={()=>{setTypeLeft({ area:true,
                                                            siteName:false,
                                                            id:false,
                                                            type:false})}} variant="secondary">Area</Button>
                        <Button onClick={()=>{setTypeLeft({ area:false,
                                                            siteName:true,
                                                            id:false,
                                                            type:false})}} variant="secondary">Site Name</Button>
                        <Button onClick={()=>{setTypeLeft({ area:false,
                                                            siteName:false,
                                                            id:true,
                                                            type:false})}} variant="secondary"> ID</Button>
                        <Button onClick={()=>{setTypeLeft({ area:false,
                                                            siteName:false,
                                                            id:false,
                                                            type:true})}} variant="secondary"> Type</Button>
                        
                    </ButtonGroup>
                    <div className="col-md-12">
                    {
                        typeLeft.area?
                        <>
                         <h5>
                            Area
                        </h5>
                        <table className="table duplitecate " style={{ overflow: 'auto',
                            boxShadow:'1px 1px 10px #cccbcb',
                            backgroundColor:'white',
                            maxHeight:'300px',
                            }}>
                        <thead>
                            <tr key='1'>
                                    <th style={{whiteSpace: 'nowrap' }}  scope="col">#</th>
                                    <th style={{whiteSpace: 'nowrap' }}  scope="col">Area ID</th>
                                    <th style={{whiteSpace: 'nowrap' }}  scope="col">Area Name</th>
                            </tr>
                        </thead>
                        <tbody style={{overflow:'scroll', maxHeight:600}}>
                    
                        {
                            areas.map((item,index)=>{
                            return(
                                <tr  key={index} style={{ lineHeight: '2rem'}}>
                                    <td style={{whiteSpace: 'nowrap' }}>{index}</td>
                                    <td style={{whiteSpace: 'nowrap' }}>{item.id}</td>
                                    <td style={{whiteSpace: 'nowrap' }}>{item.value}</td>
                                   
                    <Dropdown>
                        <Dropdown.Toggle  id="dropdown-basic">
                            
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                            item.Status===3 ?<Dropdown.Item  style={{textDecoration: 'none'}}
                            //    onClick={()=>{handleChangeStatus(item.Asset_ID)}}
                            >
                                <span className="mdi mdi-timelapse px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                skip
                            
                            </Dropdown.Item> :null
                            }
                            
                            <Dropdown.Item
                            onClick={()=>{handleShowModelUpdate('area',item.id,item.value)}}
                            style={{textDecoration: 'none'}} >
                            <span className="mdi mdi-update px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                            Updata</Dropdown.Item>
                            <Dropdown.Item
                             onClick={()=>{QuestionDeleteProperties('area',item.id)}}

                            style={{textDecoration: 'none'}} >
                            <span className="mdi mdi-delete-circle px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                            Delete
                            </Dropdown.Item>
                        
                        </Dropdown.Menu>
                    </Dropdown>

                                </tr>
                                )         
                            })   
                        }
                        </tbody>
                        </table>
                        <button  onClick={()=>handleShowModal('area')} className="w-100 p-2 buttonBo"  >More</button>
                        </>:null
                    }
                    {
                        typeLeft.siteName?
                        <>
                            <h5>
                                    Site Name
                                </h5>
                                <table className="table " style={{ overflow: 'auto',
                                    boxShadow:'1px 1px 10px #cccbcb',
                            backgroundColor:'white', maxHeight:'300px',
                                     }}>
                                <thead>
                                    <tr key='1'>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">#</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Site ID</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Site Name</th>
                                    </tr>
                                </thead>
                                <tbody style={{overflow:'scroll', maxHeight:600}}>
                                
                                    {
                                            SiteName.map((item,index)=>{
                                            return(
                                                <tr  key={index} style={{ lineHeight: '2rem'}}>
                                                    <td style={{whiteSpace: 'nowrap' }}>{index}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.value}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.label}</td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle  id="dropdown-basic">
                                                            
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {
                                                            item.Status===3 ?<Dropdown.Item  style={{textDecoration: 'none'}}
                                                            //    onClick={()=>{handleChangeStatus(item.Asset_ID)}}
                                                            >
                                                                <span className="mdi mdi-timelapse px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                                skip
                                                            
                                                            </Dropdown.Item> :null
                                                            }
                                                            
                                                            <Dropdown.Item
                                                            onClick={()=>{handleShowModelUpdate('siteName',item.value,item.label)}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-update px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Updata</Dropdown.Item>
                                                            <Dropdown.Item
                                                             onClick={()=>{QuestionDeleteProperties('siteName',item.value)}}
                                                            //  onClick={()=>{handleShowExtend(item.Asset_ID,hanldeGetWaranty(item.Asset_ID))}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-delete-circle px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Delete
                                                            </Dropdown.Item>
                                                        
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </tr>
                                                )         
                                            })   
                                    }
                                </tbody>
                                </table>
                                <button onClick={()=>handleShowModal('siteName')} className="w-100 p-2 buttonBo"  >More</button>            
                        </>:null
                    }
                    </div>

                    {
                        typeLeft.id?
                        <>
                            <h5>
                            ID
                        </h5>
                        <div style={{ overflow: 'auto',
                              boxShadow:'1px 1px 10px #cccbcb',
                            backgroundColor:'white', 
                                 maxHeight:'400px'}}>

                            <table className="table duplitecate" style={{ overflow: 'auto',
                                boxShadow:'1px 1px 10px #cccbcb',
                            backgroundColor:'white',
                                maxHeight:'300px'}}>
                            <thead>
                                <tr key='1'>
                                        <th style={{whiteSpace: 'nowrap' }}  scope="col">#</th>
                                        <th style={{whiteSpace: 'nowrap' }}  scope="col"> ID</th>
                                        <th style={{whiteSpace: 'nowrap' }}  scope="col"> Name</th>
                                </tr>
                            </thead>
                            <tbody   style={{overflow:'scroll', maxHeight:600}}>
                            
                                {
                                        IDDTL.map((item,index)=>{
                                        return(
                                            <tr  key={index} style={{ lineHeight: '2rem'}}>
                                                <td style={{whiteSpace: 'nowrap' }}>{index}</td>
                                                <td style={{whiteSpace: 'nowrap' }}>{item.value}</td>
                                                <td style={{whiteSpace: 'nowrap' }}>{item.label}</td>
                                                <Dropdown>
                                                        <Dropdown.Toggle  id="dropdown-basic">
                                                            
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {
                                                            item.Status===3 ?<Dropdown.Item  style={{textDecoration: 'none'}}
                                                            //    onClick={()=>{handleChangeStatus(item.Asset_ID)}}
                                                            >
                                                                <span className="mdi mdi-timelapse px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                                skip
                                                            
                                                            </Dropdown.Item> :null
                                                            }
                                                            
                                                            <Dropdown.Item
                                                            onClick={()=>{handleShowModelUpdate('id',item.value,item.label)}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-update px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Updata</Dropdown.Item>
                                                            <Dropdown.Item
                                                             onClick={()=>{QuestionDeleteProperties('id',item.value)}}
                                                            //  onClick={()=>{handleShowExtend(item.Asset_ID,hanldeGetWaranty(item.Asset_ID))}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-delete-circle px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Delete
                                                            </Dropdown.Item>
                                                        
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                            </tr>
                                            )         
                                        })   
                                }
                            </tbody>
                            </table>
                            
                        </div>
                        <button onClick={()=>handleShowModal('id')} className="w-100 p-2 buttonBo"  >More</button>
                        </>:null
                    }
                    {
                        typeLeft.type?   
                        <>
                            <h5>
                            Type
                            </h5>
                            <table className="table duplitecate" style={{ overflow: 'auto',
                                boxShadow:'1px 1px 10px #cccbcb',
                            backgroundColor:'white',
                            maxHeight:'300px'}}>
                            <thead>
                            <tr key='1'>
                                    <th style={{whiteSpace: 'nowrap' }}  scope="col">#</th>
                                    <th style={{whiteSpace: 'nowrap' }}  scope="col">Type ID</th>
                                    <th style={{whiteSpace: 'nowrap' }}  scope="col">Type Name</th>
                                
                            </tr>
                            </thead>
                            <tbody style={{overflow:'scroll', maxHeight:600}}>

                            {
                                    Type.map((item,index)=>{
                                    return(
                                        <tr  key={index} style={{ lineHeight: '2rem'}}>
                                            <td style={{whiteSpace: 'nowrap' }}>{index}</td>
                                            <td style={{whiteSpace: 'nowrap' }}>{item.value}</td>
                                            <td style={{whiteSpace: 'nowrap' }}>{item.label}</td>
                                            <Dropdown>
                                                        <Dropdown.Toggle  id="dropdown-basic">
                                                            
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {
                                                            item.Status===3 ?<Dropdown.Item  style={{textDecoration: 'none'}}
                                                            //    onClick={()=>{handleChangeStatus(item.Asset_ID)}}
                                                            >
                                                                <span className="mdi mdi-timelapse px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                                skip
                                                            
                                                            </Dropdown.Item> :null
                                                            }
                                                            
                                                            <Dropdown.Item
                                                            onClick={()=>{handleShowModelUpdate('type',item.value,item.label)}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-update px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Updata</Dropdown.Item>
                                                            <Dropdown.Item
                                                              onClick={()=>{QuestionDeleteProperties('type',item.value)}}
                                                            //  onClick={()=>{handleShowExtend(item.Asset_ID,hanldeGetWaranty(item.Asset_ID))}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-delete-circle px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Delete
                                                            </Dropdown.Item>
                                                        
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                        </tr>
                                        )         
                                    })   
                            }
                            </tbody>
                            </table>
                            <button   onClick={()=>handleShowModal('type')} className="w-100 p-2 buttonBo"  >More</button>
                        </> 
                        :null
                    }
                </div>

                   
                 
                    <div className="col-md-6" >
                    <ButtonGroup aria-label="Basic example">
                        <Button onClick={()=>{setTypeRight({ brand:true,
                                                            assetType:false,
                                                            location:false,
                                                            rack:false,
                                                            suplier:false})}} variant="secondary">Brand</Button>
                        <Button  onClick={()=>{setTypeRight({ brand:false,
                                                            assetType:true,
                                                            location:false,
                                                            rack:false,
                                                            suplier:false})}} variant="secondary">Asset Type</Button>
                        <Button  onClick={()=>{setTypeRight({ brand:false,
                                                            assetType:false,
                                                            location:true,
                                                            rack:false,
                                                            suplier:false})}} variant="secondary">Location</Button>
                        <Button  onClick={()=>{setTypeRight({ brand:false,
                                                            assetType:false,
                                                            location:false,
                                                            rack:true,
                                                            suplier:false})}} variant="secondary">Rack</Button>
                        <Button  onClick={()=>{setTypeRight({ brand:false,
                                                            assetType:false,
                                                            location:false,
                                                            rack:false,
                                                            suplier:true})}} variant="secondary">Suplier</Button>
                        
                    </ButtonGroup>

                        {
                            typeRight.brand?
                            <>
                                <h5>
                                    Brand
                                </h5>
                                <table className="table duplitecate" style={{ overflow: 'auto',
                                    boxShadow:'1px 1px 10px #cccbcb',
                            backgroundColor:'white',
                                    maxHeight:'300px',
                                    }}>
                                <thead>
                                    <tr key='1'>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">#</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Brand ID</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Brand Name</th>
                                    </tr>
                                </thead>
                                <tbody style={{overflow:'scroll', maxHeight:600}}>
                                
                                    {
                                            brand.map((item,index)=>{
                                            return(
                                                <tr  key={index} style={{ lineHeight: '2rem'}}>
                                                    <td style={{whiteSpace: 'nowrap' }}>{index}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.value}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.label}</td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle  id="dropdown-basic">
                                                            
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {
                                                            item.Status===3 ?<Dropdown.Item  style={{textDecoration: 'none'}}
                                                            //    onClick={()=>{handleChangeStatus(item.Asset_ID)}}
                                                            >
                                                                <span className="mdi mdi-timelapse px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                                skip
                                                            
                                                            </Dropdown.Item> :null
                                                            }
                                                            
                                                            <Dropdown.Item
                                                            onClick={()=>{handleShowModelUpdate('brand',item.value,item.label)}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-update px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Updata</Dropdown.Item>
                                                            <Dropdown.Item
                                                              onClick={()=>{QuestionDeleteProperties('brand',item.value)}}
                                                            //  onClick={()=>{handleShowExtend(item.Asset_ID,hanldeGetWaranty(item.Asset_ID))}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-delete-circle px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Delete
                                                            </Dropdown.Item>
                                                        
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </tr>
                                                )         
                                            })   
                                    }
                                </tbody>
                                </table>
                                <button  onClick={()=>handleShowModal('brand')} className="w-100 p-2 buttonBo"  >More</button>
                            </>:null
                        }
                             {
                            typeRight.assetType?
                            <>
                                <h5>
                                    Asset Type
                                </h5>
                                <table className="table duplitecate" style={{ overflow: 'auto',
                                    boxShadow:'1px 1px 10px #cccbcb',
                            backgroundColor:'white',
                                    maxHeight:'300px'}}>
                                <thead>
                                    <tr key='1'>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">#</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Asset Type ID</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Asset Type Name</th>
                                    </tr>
                                </thead>
                                <tbody style={{overflow:'scroll', maxHeight:600}}>
                                
                                    {
                                            assetType.map((item,index)=>{
                                            return(
                                                <tr  key={index} style={{ lineHeight: '2rem'}}>
                                                    <td style={{whiteSpace: 'nowrap' }}>{index}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.value}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.label}</td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle  id="dropdown-basic">
                                                            
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {
                                                            item.Status===3 ?<Dropdown.Item  style={{textDecoration: 'none'}}
                                                            //    onClick={()=>{handleChangeStatus(item.Asset_ID)}}
                                                            >
                                                                <span className="mdi mdi-timelapse px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                                skip
                                                            
                                                            </Dropdown.Item> :null
                                                            }
                                                            
                                                            <Dropdown.Item
                                                            onClick={()=>{handleShowModelUpdate('assetType',item.value,item.label)}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-update px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Updata</Dropdown.Item>
                                                            <Dropdown.Item
                                                             onClick={()=>{QuestionDeleteProperties('assetType',item.value)}}
                                                            //  onClick={()=>{handleShowExtend(item.Asset_ID,hanldeGetWaranty(item.Asset_ID))}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-delete-circle px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Delete
                                                            </Dropdown.Item>
                                                        
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </tr>
                                                )         
                                            })   
                                    }
                                </tbody>
                                </table>
                                <button  onClick={()=>handleShowModal('assetType')} className="w-100 p-2 buttonBo"  >More</button>
                            </>:null
                        }
                              {
                            typeRight.location?
                            <>
                                <h5>
                                    Location
                                </h5>
                                <table className="table duplitecate" style={{ overflow: 'auto',
                                    boxShadow:'1px 1px 10px #cccbcb',
                            backgroundColor:'white',
                                    maxHeight:'300px'}}>
                                <thead>
                                    <tr key='1'>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">#</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Location ID</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Location Name</th>
                                    </tr>
                                </thead>
                                <tbody style={{overflow:'scroll', maxHeight:600}}>
                                
                                    {
                                            Location.map((item,index)=>{
                                            return(
                                                <tr  key={index} style={{ lineHeight: '2rem'}}>
                                                    <td style={{whiteSpace: 'nowrap' }}>{index}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.value}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.label}</td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle  id="dropdown-basic">
                                                            
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {
                                                            item.Status===3 ?<Dropdown.Item  style={{textDecoration: 'none'}}
                                                            //    onClick={()=>{handleChangeStatus(item.Asset_ID)}}
                                                            >
                                                                <span className="mdi mdi-timelapse px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                                skip
                                                            
                                                            </Dropdown.Item> :null
                                                            }
                                                            
                                                            <Dropdown.Item
                                                            onClick={()=>{handleShowModelUpdate('location',item.value,item.label)}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-update px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Updata</Dropdown.Item>
                                                            <Dropdown.Item
                                                             onClick={()=>{QuestionDeleteProperties('location',item.value)}}
                                                            //  onClick={()=>{handleShowExtend(item.Asset_ID,hanldeGetWaranty(item.Asset_ID))}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-delete-circle px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Delete
                                                            </Dropdown.Item>
                                                        
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </tr>
                                                )         
                                            })   
                                    }
                                </tbody>
                                </table>
                                <button   onClick={()=>handleShowModal('location')} className="w-100 p-2 buttonBo"  >More</button>
                            </>:null
                        }
                         {
                            typeRight.rack?
                            <>
                            <h5>
                                Rack ID
                            </h5>
                            <div style={{ overflow: 'auto',
                                   boxShadow:'1px 1px 10px #cccbcb',
                            backgroundColor:'white',  maxHeight:'400px'}}>

                                <table className="table duplitecate" style={{ overflow: 'auto',
                                    boxShadow:'1px 1px 10px #cccbcb',
                            backgroundColor:'white',
                                    maxHeight:'300px'}}>
                                <thead>
                                    <tr key='1'>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">#</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Rack ID</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Rack Name</th>
                                    </tr>
                                </thead>
                                <tbody style={{overflow:'scroll', maxHeight:600}}>
                                
                                    {
                                            Rack.map((item,index)=>{
                                            return(
                                                <tr  key={index} style={{ lineHeight: '2rem'}}>
                                                    <td style={{whiteSpace: 'nowrap' }}>{index}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.value}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.label}</td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle  id="dropdown-basic">
                                                            
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {
                                                            item.Status===3 ?<Dropdown.Item  style={{textDecoration: 'none'}}
                                                            //    onClick={()=>{handleChangeStatus(item.Asset_ID)}}
                                                            >
                                                                <span className="mdi mdi-timelapse px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                                skip
                                                            
                                                            </Dropdown.Item> :null
                                                            }
                                                            
                                                            <Dropdown.Item
                                                            onClick={()=>{handleShowModelUpdate('rackId',item.value,item.label)}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-update px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Updata</Dropdown.Item>
                                                            <Dropdown.Item
                                                             onClick={()=>{QuestionDeleteProperties('rackId',item.value)}}
                                                            //  onClick={()=>{handleShowExtend(item.Asset_ID,hanldeGetWaranty(item.Asset_ID))}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-delete-circle px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Delete
                                                            </Dropdown.Item>
                                                        
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </tr>
                                                )         
                                            })   
                                    }
                                </tbody>
                                </table>
                            </div>
                            
                                <button  onClick={()=>handleShowModal('rackId')} className="w-100 p-2 buttonBo"  >More</button>
                            </>:null
                        }
                        {
                            typeRight.suplier?
                            <>
                              <h5>
                                Suplier Install
                                </h5>
                                <table className="table duplitecate" style={{ overflow: 'auto',
                                    boxShadow:'1px 1px 10px #cccbcb',
                            backgroundColor:'white',
                                    maxHeight:'300px'}}>
                                <thead>
                                    <tr key='1'>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">#</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Suplier ID</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Suplier Name</th>
                                    </tr>
                                </thead>
                                <tbody style={{overflow:'scroll', maxHeight:600}}>
                                
                                    {
                                            Suplier.map((item,index)=>{
                                            return(
                                                <tr  key={index} style={{ lineHeight: '2rem'}}>
                                                    <td style={{whiteSpace: 'nowrap' }}>{index}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.value}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.label}</td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle  id="dropdown-basic">
                                                            
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {
                                                            item.Status===3 ?<Dropdown.Item  style={{textDecoration: 'none'}}
                                                            //    onClick={()=>{handleChangeStatus(item.Asset_ID)}}
                                                            >
                                                                <span className="mdi mdi-timelapse px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                                skip
                                                            
                                                            </Dropdown.Item> :null
                                                            }
                                                            
                                                            <Dropdown.Item
                                                            onClick={()=>{handleShowModelUpdate('suplierInstall',item.value,item.label)}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-update px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Updata</Dropdown.Item>
                                                            <Dropdown.Item
                                                             onClick={()=>{QuestionDeleteProperties('suplierInstall',item.value)}}
                                                            //  onClick={()=>{handleShowExtend(item.Asset_ID,hanldeGetWaranty(item.Asset_ID))}}
                                                            style={{textDecoration: 'none'}} >
                                                            <span className="mdi mdi-delete-circle px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                                                            Delete
                                                            </Dropdown.Item>
                                                        
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </tr>
                                                )         
                                            })   
                                    }
                                </tbody>
                                </table>
                                <button  onClick={()=>handleShowModal('suplierInstall')} className="w-100 p-2 buttonBo"  >More</button>
                                    </>:null
                        }
                      
                    </div>
                    {
                    setShowModal?
                    <ModalMoreSelect handle={handleCalAPI} showModal={[showModal,setShowModal]} type={typeInsertMore}/>:null
                    }
                    {
                        showModalUpdate ?
                        <ModalUpdateProperties handle={handleCalAPI} Data={[dataUpdate,setDataUpdate]}  showModal={[showModalUpdate,setShowModalUpdate]} type={typeInsertMore}/>:null
                    }
            </div>
        </div>
    )
}
export default Properties