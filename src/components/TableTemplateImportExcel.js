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

import ModelExcel from './ModalExportExcel';
import { ppid } from 'process';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

export default function CustomizedTablesImportExcel(...props) {
    const asset= props
    
    //------------------------------------------ useState()
    const [data,setData]= useState([])

    const [showModalExcelRender,setShowModalExcelRender]= useState(false)
  
    //------------------------------------------ useEffect()
    useEffect(()=>{
        if(asset.length>0)
        {
           
            setData(asset[0].data[0])
        }
        
        
    },[asset])
  
    //---------------------------------------- Function()
 

  return (
    <>
  
    <ModelExcel id='ImportExcel' className='ImportExcel' data={[showModalExcelRender,setShowModalExcelRender]} 
    />
            {  
            data && data.length>0?
              <table className="table duplitecate" style={{ overflow: 'auto',
                maxHeight:'300px'}}>
              <thead>
              <tr key='1'>
                  {

                

                  data.map((item,index,arr)=>{
                          if(index===0)
                          {                                          
                              return item.map((item1)=>{
                                  return(
                                      <th style={{whiteSpace: 'nowrap' }}  scope="col">{item1}</th>
                                  )
                              })
                              
                          }
                      })
                      
                  }
                
              </tr>
              </thead>
              <tbody style={{overflow:'scroll', maxHeight:600}}>
              
              {
                  data.map(function (item, index, arr) {
                      if(index!==0)
                      {
                        
                        if(item.includes('exists'))
                        {

                          return(
                          
                          <tr  key={index} style={{ lineHeight: '2rem'}}>
                              {

                                    item.map((item1,index1)=>{
                                          
                                      if(Number(index1)===2 || Number(index1)===3  || Number(index1)===5 || Number(index1)===23 || Number(index1)===24)
                                      {
                                        return(
                                          <td style={{whiteSpace: 'nowrap', color:'red' }}  >{item1}</td>
                                        )
                                      }
                                      else if(item1!=='exists' && item1!=='notExists' )
                                      {
                                        return(
                                            <td style={{whiteSpace: 'nowrap' }}  >{item1}</td>
                                        )
                                      }

                                          
                                  })
                              }
                              </tr>
                          )
                        }
                        else{
                          return(
                          
                            <tr  key={index} style={{ lineHeight: '2rem'}}>
                                {
  
                                  
                                      item.map((item1)=>{
                                            
                                        
                                        if(item1!=='exists' && item1!=='notExists' )
                                        {
                                          return(
                                              <td style={{whiteSpace: 'nowrap' }}  >{item1}</td>
                                          )
                                        }
                                            
                                    })
                                }
                                </tr>
                            )
                        }
                        

                      }
                  })
              }
                  


              </tbody>
              </table>
            :null
          }
     
    </>
  );
}
