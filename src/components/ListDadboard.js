import { useScrollTrigger } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Path } from '../api/Path';
import { CheckUserRule,CheckTOkenRule } from '../shares/Func';
import { ApiAuthority } from '../api/User';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import moment from "moment";
import Select from 'react-select'
function TransactionList(){

    let d = new Date()
    
    const optionMonth=[
        {value:'1',label:'1'},
        {value:'2',label:'2'},
        {value:'3',label:'3'},
        {value:'4',label:'4'},
        {value:'5',label:'5'},
        {value:'6',label:'6'},
        {value:'7',label:'7'},
        {value:'8',label:'8'},
        {value:'9',label:'9'},
        {value:'10',label:'10'},
        {value:'11',label:'11'},
        {value:'12',label:'12'},
    ]
    const [data,setData] = useState([])
    const [users,setUsers]= useState([])
    const [type,setType]= useState(1)

    const [dataYear,setDataYear] = useState({
        value:'2021',
        label:'2021'
    })

    const [dataMonth,setDataMonth]= useState({
        value:d.getMonth()+1,label:d.getMonth()+1
    })

    const [optionYear,setOptionYear] = useState([])

    let arr=[]
    useEffect(()=>{
        let d = new Date();
        setDataYear(
            {
                value:d.getFullYear(),
                label:d.getFullYear()
            }
        )
        
        for(let i =d.getFullYear()-10 ; i<=d.getFullYear(); i++ )
        {
            arr.push({
                value:i,
                label:i
            })
        }
        setOptionYear([...arr])
    },[])

    useEffect(()=>{
        transactionGetDataAPI()
        handleGetUserByID()
    },[dataMonth,dataYear,type])

    const transactionGetDataAPI=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                type,
                dataMonth.value,
                dataYear.value
            ],
            StoreProcedureName: "SP_TRANSACTION_GETALL_DADBOARD",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status=200)
          {
            setData(res.Data)
           
          } 
        })
    }
    const handleGetUserByID=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                username,
                password
            ],
            StoreProcedureName: "SP_USER_BYID",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status=200)
          { 
            setUsers( res.Data.map((item)=>{
                return({
                  value:item.User_ID,
                  label:item.User_Name
                }
            )}))
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
    return(
        <div>

                <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>

                    <ButtonGroup  aria-label="Basic example">
                            <Button onClick={()=>{setType(1)}} variant="secondary">Extend</Button>
                            <Button onClick={()=>{setType(2)}}variant="secondary">Transfer</Button>
                            <Button onClick={()=>{setType(3)}} variant="secondary">New purchase</Button>
                        
                            
                        </ButtonGroup>
                        <div>

                            <div style={{display:'inline-block', width:"100px", backgroundColor:'white', borderRadius:'10px', marginRight:'5px'}}>
                            
                            <Select styles={{width:'100px', backgroundColor:'white'}} className="input" 
                                value={dataMonth}
                                onChange={(e)=>{setDataMonth(e)}}
                                options={optionMonth}
                            />
                        </div>
                            <div style={{display:'inline-block', width:"100px", borderRadius:'10px', backgroundColor:'white'}}>
                            
                                <Select styles={{width:'100px', backgroundColor:'white'}} className="input" 
                                    value={dataYear}
                                    onChange={(e)=>{setDataYear(e)}}
                                    options={optionYear}
                                />
                            </div>
                        </div>
                </div>
            <div id="style-5" style={{maxHeight:'600px', overflow:'auto',backgroundColor:'white'}}>
    <table className="table ">
                        <thead>
                        <tr key='1'>
                            <th style={{whiteSpace: 'nowrap'}} scope="col">#</th>
                            <th style={{whiteSpace: 'nowrap'}} scope="col">ID</th>
                            <th style={{whiteSpace: 'nowrap'}} scope="col">Type</th>
                            <th style={{whiteSpace: 'nowrap'}} scope="col">Dicription</th>
                            <th style={{whiteSpace: 'nowrap'}} scope="col">Create Date</th>
                            <th style={{whiteSpace: 'nowrap'}} scope="col">Creator</th>
                        </tr>
                        </thead>
                        <tbody style={{overflow:'scroll', maxHeight:600}}>
                        
                        {
                            data.map(function (item, index, arr) {
                            
                            
                                    return(
                                
                                        <tr key={index} style={{ lineHeight: '2rem' }}>             
                                            <td style={{whiteSpace: 'nowrap'}} >{index}</td>
                                            <td  style={{whiteSpace: 'nowrap'}}>{item.Transaction_ID}</td>
                                            <td  style={{whiteSpace: 'nowrap'}}>{Number(item.TRN_Type)===1?'extend':Number(item.TRN_Type)===2?'transfer':'New purchase'}</td> 
                                            <td style={{whiteSpace: 'nowrap'}} >{item.Disctription}</td>
                                            <td  style={{whiteSpace: 'nowrap'}}>{moment(item.TRN_Date).format("DD MMM YY") }</td>         
                                            <td  style={{whiteSpace: 'nowrap'}}>{ (handleGetItemOption(item.User_ID,users)) && (handleGetItemOption(item.User_ID,users).length>0) ?handleGetItemOption(item.User_ID,users)[0].label:'' }</td>
                                        </tr>
                                    )

                                
                            })
                        }
                            


                        </tbody>
                    </table>
            </div>
        </div>
    )
}
export default TransactionList