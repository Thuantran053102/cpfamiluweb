import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect ,useState} from 'react';
import { Link } from "react-router-dom";
import ModalTransactionByID from './ModalTransactionByID';
import ModalHistoryById from './modalHistoryById';
import Swal from 'sweetalert2';
import { Path } from '../api/Path';
import { CheckUserRule,CheckTOkenRule, CheckUseID } from '../shares/Func';
import { ApiAuthority } from '../api/User';
import { removeAccents } from '../utils/utils';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ModelExcel from './ModalExportExcel';
import { insertStatiscal,updataItem } from '../api/SubUrl';
import ModalExtend from './ModalExtend';
import ModalTransfer from './ModalTransfer';
import { NoLuggageOutlined } from '@mui/icons-material';
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

function createData(
   name='',
  calories=null,
  fat=null,
  carbs=null,
  protein=null,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables(...props) {
    const asset= props
    let da = new Date();
    //------------------------------------------ useState()
    const [data,setData]= useState([])
    const [historyData,setHistoryData] = useState([])
    const [showModalExcelRender,setShowModalExcelRender]= useState(false)
    const [showChoseItem,setShowChoseItem] = useState(true)
    const [showExtend,setShowExtend]= useState(false)
    const [showTransfer,setShowTransfer]= useState(false)
    const [warranty,setWarranty]=useState('')
    const [itSite,setItSite]=useState('')
    const [assetID,setAssetID]= useState('')
    const [showModalTransaction,setShowModalTransaction] = useState(false)
    const [showMaldolHistory,setShowMaldolHistory]= useState(false)
    const [transactionValues,settransactionValues]= useState([])
    const [historyValues,setHistoryValues]= useState([])
    const [fileName,setFileName]= useState('DataExport_'+da.getFullYear()+'/'+(da.getMonth()+1)+'/'+da.getDate())

    const [searchAll, setSearchAll] = useState('')
    //------------------------------------------ useEffect()

    useEffect(()=>{
      if(!searchAll && !searchAll.length>0)
      {
        setData(asset[0].data[0])
      }
    },[asset])

    useEffect(()=>{
      if(searchAll && searchAll.length>0)
      {
        fillterData(asset)
      }
      else{
        setData(asset[0].data[0])
      }
    },[searchAll])

    const fillterData=(dt)=>{

      
      console.log(dt[0].data[0])
      if(dt[0].data[0] && dt[0].data[0].length>0)
      {
        
        let ban=[]
        ban=dt[0].data[0].filter(( item)=>{
          
         
          for(let i =0; i<Object.values(item).length; i++)
          {

            
            if(Object.values(item)[i] && Object.values(item)[i].length>0 )
            {
            
              if( removeAccents((Object.values(item)[i].toUpperCase())).includes(removeAccents(searchAll.toUpperCase())))
              {
                return Object.values(item)
              }
             
             
            }
           
          }

        })

        
        setData([...ban])
        // setData([...ban])
       
        // dt.filter(name => name.includes('J')).map(filteredName => (
         
        //    console.log('filteredName',filteredName)
          
        // ))
      }
    }

    useEffect(()=>{
      HistoryApi()
      handelGetAllTransaction()
      handelGetAllHistory()
    },[])




    //---------------------------------------- Function()
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

    const handleShowExtend=(asset_id, warranty)=>{
      setAssetID(asset_id)
      setWarranty(warranty)
      setShowExtend(true)
    }
    
    const handleShowTransfer=(asset_id, itSite)=>{
      setAssetID(asset_id)
      setItSite(itSite)
      setShowTransfer(true)
    }
    // handle change status =4 
    const handleChangeStatus=(id)=>{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "you want to ignore this warning?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          handleChangeStatusAPI(id)
        } else if (
      
          result.dismiss === Swal.DismissReason.cancel
        ) 
        {
          
        }
      })
    }

    const handelGetAllTransaction =async()=>{
      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      const username = User.username
      const password =User.password
      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [
           
          ],
          StoreProcedureName: "SP_TRANSACTION_GETALL",
          SchemaName: Path.sqlName
      }
      let formData = new FormData();
      formData.append('data', JSON.stringify(valuef))
      await ApiAuthority(username, password, Token, formData, async res => {
     
        if(res.Status=200)
        {
          
          settransactionValues(res.Data)
        } 
      })
    }
    const handelGetAllHistory =async()=>{
      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      const username = User.username
      const password =User.password
      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [
           
          ],
          StoreProcedureName: "SP_HISTORY_GETALL",
          SchemaName: Path.sqlName
      }
      let formData = new FormData();
      formData.append('data', JSON.stringify(valuef))
      await ApiAuthority(username, password, Token, formData, async res => {
     
        if(res.Status=200)
        {
          
          setHistoryValues(res.Data)
        } 
      })
    }

    const handleChangeStatusAPI= async(id)=>{
      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      let UserID= await CheckUseID()
      const username = User.username
      const password =User.password
      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [
            id,
            UserID
          ],
          StoreProcedureName: "SP_STATUS_UPDATE",
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
            title: 'success'
          })
          props[0].handleGetValuesAsset()
        } 
      })
    }
    const handleCountTransaction=(id)=>{
      let a
        if(transactionValues && transactionValues.length>0)
        {
          a= transactionValues.filter((item)=>{
            if(item.Asset_ID===id)
            {
              return item
            }
          })
        }
      
      return a
    }
    const handleCountHistory=(id)=>{
      let a
        if(transactionValues && transactionValues.length>0)
        {
          a= historyValues.filter((item)=>{
            if(item.Asset_ID===id)
            {
              return item
            }
          })
        }
      
      return a
    }

    const handelExtentAPI=async()=>{
      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      let UserID = await CheckUseID()
      const username = User.username
      const password =User.password

      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [
            assetID,
            warranty,
            UserID
          ],
          StoreProcedureName: "SP_ASSET_WARRANTY_UPDATE",
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
            title: 'success'
          })
          setShowExtend(false)
          handelGetAllHistory()
         
            HistoryApi()
            props[0].handleGetValuesAsset()
         
        } 
      })
     
    }
 
    const handleChangeItsiteAPI=async()=>{
      
      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      let UserID= await CheckUseID()
      const username = User.username
      const password =User.password
      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [
            assetID,
            itSite,
            UserID,
          ],
          StoreProcedureName: "SP_ASSET_ITSITE_UPDATE",
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
            title: 'success'
          })
          setShowTransfer(false)
          props[0].handleGetValuesAsset()
         
        } 

      })
    }
    const handleShowModelTransaction=(id)=>{
      setAssetID(id)
      setShowModalTransaction(true)
    }

    const handleShowModelHistory=(id)=>{
      setAssetID(id)
      setShowMaldolHistory(true)
    }


  return (
    <>
    <ModelExcel data={[showModalExcelRender,setShowModalExcelRender]}/>
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <ButtonGroup style={{backgroundColor:'#33bbf1'}} className="mb-2">
          <Button onClick={()=>{setShowModalExcelRender(true)}} >Upload Excel</Button>
          <Button onMouseOver={()=>setShowChoseItem(false)} onMouseOut={()=>setShowChoseItem(true)}>  <ReactHTMLTableToExcel                    
                id="test-table-xls-button"
                className="download-table-xls-button "
                table="table-to-xls"
                filename={fileName}
                sheet="tablexls"
                buttonText="Export Excel"
                Style={{}}/>
          </Button>
          <Button >
            <Link to={insertStatiscal} className='moreAsset' >
                More 
            </Link>
            </Button>
      </ButtonGroup>
      <div className='d-inline-block' style={{}}>
        <input className="d-block w-100 p-1 input inputRadius my-1"  type='text' placeholder='Search all'
          value={searchAll}
        onChange={(e)=>setSearchAll(e.target.value)}/>
      </div>
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
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {  
            data && data.length>0?
            data.map((item,index) => (
              <StyledTableRow key={index} 
              className={Number(item.Status)===3?'bgMaintainaceStatus':''}>
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
                <StyledTableCell align="right"  style={{whiteSpace: 'nowrap'}}>
                  {
                    showChoseItem?
                  <Dropdown style={{height:'20px'}}>
                    <Dropdown.Toggle  id="dropdown-basic">
                        
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                          item.Status===3 ?<Dropdown.Item  style={{textDecoration: 'none'}} onClick={()=>{handleChangeStatus(item.Asset_ID)}}>
                            <span className="mdi mdi-timelapse px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                            skip
                          
                          </Dropdown.Item> :null
                        }
                        
                        <Dropdown.Item
                        onClick={()=>{window.location=`${updataItem}${item.Asset_ID}`}}
                        style={{textDecoration: 'none'}} >
                        <span className="mdi mdi-update px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                           Update</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{handleShowExtend(item.Asset_ID,hanldeGetWaranty(item.Asset_ID))}} style={{textDecoration: 'none'}} >
                        <span className="mdi mdi-clock-out px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                          Extend</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{handleShowTransfer(item.Asset_ID,item.User_Name1)}} style={{textDecoration: 'none'}} >
                        <span className="mdi mdi-account-switch px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                          Transfer</Dropdown.Item>
                          <Dropdown.Item onClick={()=>{handleShowModelTransaction(item.Asset_ID)}} style={{textDecoration: 'none'}} >
                        <span className="mdi mdi-rotate-3d px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                          Transaction 
                          <span className='px-md-1 ' style={{color:'var(--status-doing-color)', fontSize:'1rem'}}>

                            {handleCountTransaction(item.Asset_ID) && handleCountTransaction(item.Asset_ID).length>0?Number(handleCountTransaction(item.Asset_ID).length):'0'}
                          </span>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={()=>{handleShowModelHistory(item.Asset_ID)}} style={{textDecoration: 'none'}} >
                        <span className="mdi mdi-timer px-1" style={{color:'var(--status-doing-color)', fontSize:'1.2rem'}}></span>
                          Warranty
                          <span className='px-md-1 ' style={{color:'var(--status-doing-color)', fontSize:'1rem'}}>

                          {handleCountHistory(item.Asset_ID) && handleCountHistory(item.Asset_ID).length>0?Number(handleCountHistory(item.Asset_ID).length):'0'}
                          </span>
                          </Dropdown.Item>
                          
                    </Dropdown.Menu>
                    </Dropdown>:null
                  }
                </StyledTableCell>

              </StyledTableRow>
            ))
            :null
          }
          </TableBody>
        </Table>
        {
          showExtend?

          <ModalExtend warrantyEx={[warranty,setWarranty]} showTend={[showExtend,setShowExtend]} handled={handelExtentAPI}/>:null
        }
        {
          showTransfer?
          <ModalTransfer itsiteTransfer={[itSite,setItSite]} showFer={[showTransfer,setShowTransfer]} handled={handleChangeItsiteAPI} />:null
        }
        {
            showModalTransaction?
            <ModalTransactionByID showModal={[showModalTransaction,setShowModalTransaction]} id={assetID}/>:null
        }
        {
          showMaldolHistory?
          <ModalHistoryById showModal={[showMaldolHistory,setShowMaldolHistory]} id={assetID}/>:null
        }
        </TableContainer>
    </>
  );
}
