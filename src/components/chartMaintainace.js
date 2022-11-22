import { Component, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Path } from '../api/Path';
import CustomizedTablesImportExcel from './TableTemplateImportExcel'
import { CheckUserRule,CheckTOkenRule } from '../shares/Func';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ApiAuthority } from '../api/User';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import moment from 'moment';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function MychartMaintainace
(){



    const [dataAsset,setDataAsset]= useState([])
    const [historyData,setHistoryData] = useState([])
    
   
    useEffect(()=>{
        handleGetDataChart()
    },[])



    const handleGetDataChart=async()=>{

        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
               
            ],
            StoreProcedureName: "SP_ASSET_MAINANEC",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status=200)
          {
            setDataAsset(res.Data)
          }
        })
  
    }
   
    useEffect(()=>{
        console.log('dataAsset',dataAsset)
    },[dataAsset])


    const HistoryApi=async ()=>{
      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      const username = User.username
      const password =User.password
      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [
            
          ],
          StoreProcedureName: "SP_HISTORY_GET",
          SchemaName: Path.sqlName
      }
      let formData = new FormData();
      formData.append('data', JSON.stringify(valuef))
      await ApiAuthority(username, password, Token, formData, async res => {
     
        if(res.Status=200)
        {
          setHistoryData(res.Data)
        } 
      })
    }

    const hanldeGetWaranty=(value)=>{
      const a= historyData.filter((item)=>{
       if(item.Asset_ID=== value)
       {
         return item
       }
      })
      return (a[0] && a.length>0)?
        moment(a[0].Warranty).format("DD MMM YY") :null
      
      
   }

 
    return(
        <>
        <div className='my-3 p-2' style={{backgroundColor:'white', borderRadius:'10px'}}>
          <div className='py-1' style={{display:'flex', justifyContent:'center'}}>

            <h4 style={{color:'#6c757d'}}>¤ Tài sản sắp hết hạn bảo hành ¤</h4>
          </div>
        <TableContainer component={Paper} className='templateStatiscal'  id='style-5'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" id='table-to-xls'>
          <TableHead>
            <TableRow>
            
            {/* <StyledTableCell>STT</StyledTableCell> */}
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="right">Area</StyledTableCell>
              <StyledTableCell align="right">Site&nbsp;Name</StyledTableCell>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
              <StyledTableCell align="right">Model</StyledTableCell>
              <StyledTableCell align="right">Brand</StyledTableCell>
              <StyledTableCell align="right">Asset&nbsp;Type</StyledTableCell>
              <StyledTableCell align="right">S/N</StyledTableCell>
              <StyledTableCell align="right">Warranty&nbsp;Status</StyledTableCell>
        
              <StyledTableCell align="right">Location</StyledTableCell>
              <StyledTableCell align="right">Rack&nbsp;ID</StyledTableCell>
              <StyledTableCell align="right">Floor</StyledTableCell>
              <StyledTableCell align="right">Unit</StyledTableCell>
              <StyledTableCell align="right">IP&nbsp;Switch</StyledTableCell>
              <StyledTableCell align="right">ID&nbsp;Switch</StyledTableCell>
              <StyledTableCell align="right">Switch&nbsp;Port</StyledTableCell>
              <StyledTableCell align="right">User&nbsp;Name</StyledTableCell>
              <StyledTableCell align="right">Password</StyledTableCell>
              <StyledTableCell align="right">Local&nbsp;IP</StyledTableCell>
              <StyledTableCell align="right">Local&nbsp;Port</StyledTableCell>
              <StyledTableCell align="right">Public&nbsp;IP</StyledTableCell>
              <StyledTableCell align="right">Public&nbsp;Port</StyledTableCell>
              <StyledTableCell align="right">Contract&nbsp;Number</StyledTableCell>
              <StyledTableCell align="right">Buy&nbsp;Date</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>

              <StyledTableCell align="right">Warranty</StyledTableCell>
              <StyledTableCell align="right">Supplier&nbsp;Install</StyledTableCell>
              <StyledTableCell align="right">IT&nbsp;Site</StyledTableCell>

              <StyledTableCell align="right">C</StyledTableCell>
              <StyledTableCell align="right">I</StyledTableCell>
              <StyledTableCell align="right">A</StyledTableCell>
              <StyledTableCell align="right">Remark</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>

            {  
            dataAsset && dataAsset.length>0?
            dataAsset.map((item,index) => (
              <StyledTableRow key={index} 
              className={Number(item.Status)===3?'bgMaintainaceStatusd':''}>
                <StyledTableCell className={Number(item.Status)===1?'EnableStatus':Number(item.Status)===2?'DisableStatus':Number(item.Status)===3?'MaintainaceStatus':'IngrogressStatus'} component="th" style={{whiteSpace: 'nowrap'}} scope="row">
                  <span style={{color:'black', padding:'4px'}}>

                    {index+1}
                  </span>
                {
                    Number(item.Status)===1?<span  className="mdi mdi-checkbox-marked-circle"  style={{fontSize:'1.2rem'}}></span>
                    :Number(item.Status)===2?<span className="mdi mdi-minus-circle"style={{ fontSize:'1.2rem'}}></span>:
                    Number(item.Status)===3?<span className="mdi mdi-timelapse" style={{ fontSize:'1.2rem'}}></span>:
                    <span className="mdi mdi-sync-off" style={{ fontSize:'1.2rem'}}></span>
                  }
                </StyledTableCell>
                  {/* <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell> */}
                <StyledTableCell component="th"  scope="row">{item.Area_Name}</StyledTableCell>
                <StyledTableCell align="right"   style={{whiteSpace: 'nowrap' }}   scope="row">{item.Site_Name}&nbsp;</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.ID_Name}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Type_Name}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Model_Name}</StyledTableCell>

                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Brand_Name}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Asset_Type_Name}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.SeriNo}</StyledTableCell>
                <StyledTableCell align="right"  style={Number(item.Warranty_Status)===1?{color:'#f44336',whiteSpace: 'nowrap'}:{color:'#03a9f4',whiteSpace: 'nowrap'}}>{Number(item.Warranty_Status)===1?'Expire':'Available'}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Location}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Rack_Name}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Floor}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Unit}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.IP_Switch}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.ID_Switch}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Switch_Port}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.User_Name}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap',color:'#03a9f4'}}>{item.PassWord}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Local_IP}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Local_Port}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>
                <a href={item.Public_IP} target="_blank" >
                                  
                                  {item.Public_IP} </a>
                  </StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Public_Port}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Contract_Number}</StyledTableCell>
                  <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{moment(item.Buy_Date_).format("DD MMM YY")}</StyledTableCell>
                <StyledTableCell align="right" className={Number(item.Status)===1?'EnableStatus':Number(item.Status)===2?'DisableStatus':Number(item.Status)===3?'MaintainaceStatus':'IngrogressStatus'}  style={{whiteSpace: 'nowrap'}}>
                  {Number(item.Status)===1?'Enable':Number(item.Status)===2?'Disable':Number(item.Status)===3?'Maintainace':'Ingrogress'}
                
                  </StyledTableCell>
                
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>
                  {hanldeGetWaranty(item.Asset_ID)
                  }
                  
                  </StyledTableCell>
                  <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Supplier_Name}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.User_Name1}</StyledTableCell>
                  <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.C}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.I}</StyledTableCell>
                  <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.A}</StyledTableCell>
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>{item.Remark}</StyledTableCell>
           

              </StyledTableRow>
            ))
            :null
          }
          </TableBody>
        </Table>
        
        </TableContainer>
        </div>

        </>
    )
    
}
export default MychartMaintainace
