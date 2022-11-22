import React from "react";
import './History.css'
import Select from 'react-select'
import { useEffect,useState } from "react";
import { ApiAuthority } from "../../api/User";
import { Path } from "../../api/Path";
import { CheckUserRule,CheckTOkenRule } from "../../shares/Func";
import { DateRangePicker } from 'rsuite';
import moment from "moment";
function History(){

    const optionTypeLog=[
        {value: '', label: 'Tất cả'},
        {value: 'M', label: 'Insert'},
        {value: 'D', label: 'Delete'},
        {value: 'F', label: 'Update'}
    ]

    const [optionSite,setOptionSite] = useState([{value: '', label: 'Tất cả'}])
    const [dataLog,setDataLog]= useState([])
    const [dateData, setDateData]=useState('')
    const [filter,setFilter] = useState({
        search:'',
        type:'',
        userId:'',
        page:1
    })
    useEffect(()=>{
        hanldeGetValuesFilterSite()
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

      const handleGetLogAPI=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                filter.type,
                filter.search,
                filter.userId,
                dateData && dateData.length>0? moment(dateData[0]).subtract( 'days').calendar():'',
                dateData && dateData.length>0? moment(dateData[1]).subtract( 'days').calendar() :'',
                filter.page
            ],
            StoreProcedureName: "SP_LOG_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status=200)
          {
            setDataLog(res.Data)
          } 
        })
  
      }
      const handleGetItemOption= (valueItem,option)=>{
        var value 
        
        if(valueItem && option && option.length>0)
        {
  
          value= option.filter((item)=>{
           
            if(Number(item.value)=== Number(valueItem))
            {
              return item
            }
            else if(item.value=== valueItem || item.label===valueItem)
            {
              return item
            }
          })
        }
      
        return value
    }
    
      useEffect(()=>{
        console.log('filter',filter)
        handleGetLogAPI()
    
      },[filter,dateData])
    return(
       <div className="container-fluid">
            <div className="constainer">
                <div className="row">
                    <div className="col-3">
                        <div className="p-md-4 menuLog">
                            <label htmlFor="">Search</label>
                                <input
                                onChange={(e)=>{setFilter({...filter,search:e.target.value})}}
                                className="d-block w-100 p-2 input inputRadius" type='text' 
                                placeholder="Remark"/>

                        <div className="my-3">
                            <label htmlFor="">Type</label> 
                            <Select className="input inputRadius" 
                                onChange={(e)=>{setFilter({...filter,type:e.value})}}
                                options={optionTypeLog}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="">User Create</label> 
                            <Select className="input inputRadius" 
                                onChange={(e)=>{setFilter({...filter,userId:e.value})}}
                                options={optionSite}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="">Date</label> 
                            <DateRangePicker 
                            onChange={(e)=>setDateData(e)}
                            className="w-100"
                            format='dd-MM-yyyy'
                            />
                        </div>
                       
                        </div>
                    </div>
                    <div className="col-9">
                    <div className="p-md-4 menuLog tableLog" id="style-5">
                        <table className="table duplitecate" style={{ overflow: 'auto',
                                    boxShadow:'1px 1px 10px #cccbcb',
                                    maxHeight:'300px'}}>
                                <thead>
                                    <tr key='1'>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">#</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Log ID</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Type</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Discription</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Create Date</th>
                                            <th style={{whiteSpace: 'nowrap' }}  scope="col">Creator</th>
                                    </tr>
                                </thead>
                                <tbody style={{overflow:'scroll', maxHeight:600}}>
                                
                                    {
                                            dataLog.map((item,index)=>{
                                            return(
                                                <tr  key={index} style={{ lineHeight: '2rem'}}>
                                                    <td style={{whiteSpace: 'nowrap' }}>{index}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.Log_ID}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.Log_Type==='M'?'Insert':item.Log_Type==='D'?'Delete':'Update'}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{item.Log_Discription}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{moment(item.Log_Date).format('llll')}</td>
                                                    <td style={{whiteSpace: 'nowrap' }}>{(handleGetItemOption(item.User_ID,optionSite))&& (handleGetItemOption(item.User_ID,optionSite).length)?handleGetItemOption(item.User_ID,optionSite)[0].label:''}</td>
                                                </tr>
                                                )         
                                            })   
                                    }
                                </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
       </div>
    )

}
export default History