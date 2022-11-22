import { render } from "@testing-library/react";
import React, { Component } from "react";
import clsx from "clsx";
import './statistical.css'
import Loading from "../../shares/Loading";
import { ApiAuthority } from "../../api/User";
import { Path } from "../../api/Path";
import { CheckTOkenRule,CheckUserRule ,CheckUseID} from "../../shares/Func";
import ModalTransactionByID from "../../components/ModalTransactionByID";
import moment from 'moment';
import Select from 'react-select'

import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

import CustomizedTables from "../../components/TableTemplate";

import { DatePicker,DateRangePicker, Stack } from 'rsuite';


const { allowedRange } =
DateRangePicker;
function Statistical(){
    const refBtn = useRef()
    const refMenu = useRef()
    const handleMenu= async()=>{
        if(refMenu.current.className.includes('active'))
        {
          refMenu.current.classList.remove('active')
        }
        else 
        {
            refMenu.current.classList.add('active')
        }
        if(refBtn.current.className.includes('active'))
        {
          refBtn.current.classList.remove('active')
        }
        else 
        {
            refBtn.current.classList.add('active')
        }
       
    }
    const [isLoading,setIsLoading]= useState(false)
    const [optionSite,setOptionSite] = useState([{value: '', label: 'Tất cả'}])
    const [optionType,setOptionType] = useState([{value: '', label: 'Tất cả'}])
    const [optionBrand,setOptionBrand] = useState([{value: '', label: 'Tất cả'}])
    const [optionRack,setOptionRack] = useState([{value: '', label: 'Tất cả'}])
    const [optionIpSwitch,setOptionIpSwitch] = useState([{value: '', label: 'Tất cả'}])
    const [optionSwitchPort,setOptionSwitchPort] = useState([{value: '', label: 'Tất cả'}])
    const [optionLocalPort,setOptionLocalPortPort] = useState([{value: '', label: 'Tất cả'}])
    const [filter,setFilter]= useState({
      search:'',
      buy_Date:'',
      it_Site:'',
      status:'',
      type:'',
      brand:'',
      rack:'',
      floor:'',
      ip_Switch:'',
      switch_Port:'',
      localport:'',

    })
    const [page,setPage]= useState(1)
    const [dataAsset,setDataAsset] = useState([])

    //------------------- useState 
    const optionStatus=[
      {value: '', label: 'Tất cả'},
      {value: '1', label: 'Enable'},
      {value: '2', label: 'Disable'},
      {value: '3', label: 'Maintainace'},
      {value: '4', label: 'Ingrogress'},
    ]
    const optionFloor=[
      {value: '', label: 'Tất cả'},
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

    useEffect(()=>{
      hanldeGetValuesFilterSite()
      hanldeGetValuesFilterType()
      hanldeGetValuesFilterBrand()
      hanldeGetValuesFilterRack()
      hanldeGetValuesFilterIPwitch()
      hanldeGetValuesFilterWitchPort()
      hanldeGetValuesFilterLocalPort()
   
    },[])

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
          setOptionSite([...[{value: '', label: 'Tất cả'}],...filterData]) 
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
          setOptionType([...[{value: '', label: 'Tất cả'}],...filterData]) 
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
          setOptionBrand([...[{value: '', label: 'Tất cả'}],...filterData]) 
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
          setOptionRack([...[{value: '', label: 'Tất cả'}],...filterData]) 
        } 
      })

    }


    const hanldeGetValuesFilterIPwitch=async()=>{
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
          StoreProcedureName: "SP_IPSWITCH",
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
                value: item.IP_Switch,
                label: item.IP_Switch
            })
          })
          setOptionIpSwitch([...[{value: '', label: 'Tất cả'}],...filterData]) 
        } 
      })

    }

    
    const hanldeGetValuesFilterWitchPort=async()=>{
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
          StoreProcedureName: "SP_SWITCHPORT",
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
                value: item.Switch_Port,
                label: item.Switch_Port
            })
          })
          setOptionSwitchPort([...[{value: '', label: 'Tất cả'}],...filterData]) 
        } 
      })

    }
    const hanldeGetValuesFilterLocalPort=async()=>{
      
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
          StoreProcedureName: "SP_LOCALPORT",
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
                value: item.Local_Port,
                label: item.Local_Port
            })
          })
        
          setOptionLocalPortPort([...[{value: '', label: 'Tất cả'}],...filterData]) 
        } 
      })

    }


    const handleGetAssetValues=async()=>{
      setIsLoading(true)
      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      const username = User.username
      const password =User.password
      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [
            filter.search,
            filter.buy_Date? moment(filter.buy_Date).format('DD/MM/yyyy'):'',
            filter.it_Site,
            filter.status,
            filter.type,
            filter.brand,
            filter.rack,
            filter.floor,
            filter.ip_Switch,
            filter.switch_Port,
            filter.localport,
            page
          ],
          StoreProcedureName: "SP_Asset_Select",
          SchemaName: Path.sqlName
      }
      let formData = new FormData();
      formData.append('data', JSON.stringify(valuef))
      await ApiAuthority(username, password, Token, formData, async res => {
        if(res.Status=200)
        {
          setIsLoading(false)
          setDataAsset(res.Data)
        } 
      })
    }

    //------------------------------------------------ useEfect
    useEffect(()=>{
      
      setTimeout(async()=>{
        
       await  handleGetAssetValues()
      },1000)
        
      
      
    
    },[filter,page])

 
    useEffect(() => {
      const list = document.getElementById('sidebar')
     
        window.addEventListener('scroll', () => {
          console.log(window.scrollY )
          if(window.scrollY>=111)
          {
            list.style.paddingTop = '0px'
          }
          else{
            list.style.paddingTop = '80px'
          }
        });
     
    }, []);


    const handleMorePage=()=>{
      if(dataAsset.length *page===35 *page )
      {
        setPage(page+1)
      }
    }
    return(
       
      <div className="flex-grow-1">
        {
                isLoading ? <Loading/> : ""
        }

        <div className="vertical-nav bg-white "  id="sidebar" ref={refMenu}>
          <div className="py-4 px-3 mb-4 bg-light">
            <div className="media d-flex align-items-center">
            <span className="mdi mdi-filter" style={{fontSize:'2rem'}}></span>
                {/* <img src="https://res.cloudinary.com/mhmd/image/upload/v1556074849/avatar-1_tcnd60.png" alt="..." width="65" className="mr-3 rounded-circle img-thumbnail shadow-sm"/> */}
              <div className="media-body">
                <h4 className="m-0">Filter</h4>
                
              </div>
            </div>
          </div>
            <div id='style-5' className="px-md-2  scrollbar" >
              <div>

                <label htmlFor="">Search</label>
                <input
                onChange={(e)=>{setFilter({...filter,search:e.target.value})}}
                 className="d-block w-100 p-2 input inputRadius" type='text' placeholder="site name, id, model,contract Number"/>
              </div>
              <div className="my-1">
                <label htmlFor="">IT Site</label> 
                {/* tên ng dùng  */}
                <Select className="input inputRadius" 
                    onChange={(e)=>{setFilter({...filter,it_Site:e.value})}}
                    options={optionSite}
                    // defaultValue={handleGetLable(optionDeptI,userItem.DeptID)}  
                  />
              </div>
              <div className="my-1">
                <label htmlFor="">Status</label> 
                {/* tên ng dùng  */}
                <Select className="input inputRadius" 
                   onChange={(e)=>{setFilter({...filter,status:e.value})}}
                    options={optionStatus}
                    // defaultValue={handleGetLable(optionDeptI,userItem.DeptID)}  
                  />
              </div>
              <div className="my-1">
                <label htmlFor="">Type</label> 
                {/* tên ng dùng  */}
                <Select className="input inputRadius" 
                     onChange={(e)=>{setFilter({...filter,type:e.value})}}
                    options={optionType}
                    // defaultValue={handleGetLable(optionDeptI,userItem.DeptID)}  
                  />
              </div>
              <div className="my-1">
                <label htmlFor="">Brand</label> 
                {/* tên ng dùng  */}
                <Select className="input inputRadius" 
                     onChange={(e)=>{setFilter({...filter,brand:e.value})}}
                    options={optionBrand}
                    // defaultValue={handleGetLable(optionDeptI,userItem.DeptID)}  
                  />
              </div>
              <div className="my-1">
                <label htmlFor="">Rack</label> 
                {/* tên ng dùng  */}
                <Select className="input inputRadius" 
                     onChange={(e)=>{setFilter({...filter,rack:e.value})}}
                    options={optionRack}
                    // defaultValue={handleGetLable(optionDeptI,userItem.DeptID)}  
                  />
              </div>
              <div className="my-1">
                <label htmlFor="">Floor</label> 
                {/* tên ng dùng  */}
                <Select className="input inputRadius" 
                     onChange={(e)=>{setFilter({...filter,floor:e.value})}}
                    options={optionFloor}
                    // defaultValue={handleGetLable(optionDeptI,userItem.DeptID)}  
                  />
              </div>
              <div className="my-1">
                <label htmlFor="">IP Switch</label> 
                {/* tên ng dùng  */}
                <Select className="input inputRadius" 
                     onChange={(e)=>{setFilter({...filter,ip_Switch:e.value})}}
                    options={optionIpSwitch}
                    // defaultValue={handleGetLable(optionDeptI,userItem.DeptID)}  
                  />
              </div>
              <div className="my-1">
                <label htmlFor="">Switch port</label> 
                {/* tên ng dùng  */}
                <Select className="input inputRadius" 
                    onChange={(e)=>{setFilter({...filter,switch_Port:e.value})}}
                    options={optionSwitchPort}
                    // defaultValue={handleGetLable(optionDeptI,userItem.DeptID)}  
                  />
              </div>
              <div className="my-1">
                <label htmlFor="">Local Port</label> 
                {/* tên ng dùng  */}
                <Select className="input inputRadius" 
                     onChange={(e)=>{setFilter({...filter,localport:e.value})}}
                    options={optionLocalPort}
                    // defaultValue={handleGetLable(optionDeptI,userItem.DeptID)}  
                  />
              </div>
              <div className="my-1">
                <label className="d-bock w-100" htmlFor="">Buy Date</label> 

             
                <DatePicker
                 placement="topStart"
                    className="w-100"
                    // disabledDate={allowedRange(Member.BirthDate? getBirthdate(Member.BirthDate): '',Member.JobStatus && Number(Member.JobStatus)===2 &&Member.Termination_DT?getTerminationDate(Member.Termination_DT):getDateNewHire())}
                    format='dd-MM-yyyy'
                    onChange={(e)=>{setFilter({...filter,buy_Date:e})}}
                   
                    />
              </div>
              <div style={{height:'100px'}}>

              </div>
            </div>

            
          </div>


        <div className="page-content p-5 " id="content" ref={refBtn}>
         
          <button onClick={()=>{handleMenu()}} id="sidebarCollapse" type="button" className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4"><i className="fa fa-bars mr-2"></i><small className="text-uppercase font-weight-bold">
          <span className="mdi mdi-menu"></span>
          </small></button>
       
       
          <div className="separator"></div>
          {
            dataAsset && dataAsset.length>0?
            <CustomizedTables data={[dataAsset,setDataAsset]} handleGetValuesAsset={handleGetAssetValues}/>:null
          }
         <span onClick={()=>{
          page>1?setPage(page-1):setPage(page) }} style={{fontSize:'2rem', color:'#7f7f7f'}} className="lessAsset mdi mdi-arrow-left-drop-circle-outline"></span>
          <span  className="mx-3" style={{fontSize:'1.6rem',lineHeight:'2rem', color:'#7f7f7f'}}> 
            {
              dataAsset&& dataAsset.length?dataAsset.length:null
            } /
            {
              page 
            }</span>
           
          <span onClick={()=>{ handleMorePage()
           
          }}  style={{fontSize:'2rem', color:'#7f7f7f'}} className="moreAsset mdi mdi-arrow-right-drop-circle-outline"></span>
         
          </div>
          
       </div>
        
    )

   
}

export default Statistical