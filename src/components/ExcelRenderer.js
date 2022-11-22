import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import Swal from 'sweetalert2';
import moment from 'moment';

import React, { Component } from "react";
class DcelRenderer extends Component{
  constructor(props)
  {
    super(props)
    
    this.state = {
      DataExcel:[],
      user: null,
            page: 1,
            assets: [],
            requestNo: [],
            totalItems: 0,

            assetPaging: [],

            pageFilter: 1,
            totalItemsFilter: 0,
            assetFilter: [],
            assetFilterPaging: [],

            companys: [],
            ba: [],
            pca: [],
            cca: [],

            searchAssetNo: '',
            searchCompany: [],
            searchBA: [],
            searchPCA: [],
            searchCCA: [],
            searchDateFrom: moment(new Date).subtract(7, 'days').format('YYYY-MM-DD'),
            searchDateTo: moment(new Date).format('YYYY-MM-DD'),

            searchRequestNo: '',
            searchCompanyCode: '',
            searchBACode: '',
            searchPCACode: '',
            searchCCACode: '',
            
            isOpen: false,
            dataLoaded: false,
            isFormInvalid: false,
            rows: null,
            cols: null,
            
            countlogin: 0,
            dataexcelupload: [],
            columnexcelupload: 0,
            dem_ins: 0,
            dem_up: 0,
            dem: 0,
            row_assets_update: '',
    
            isLoadingRequest: false, 
            isRefreshingRequest: false

    }
    this.fileHandler = this.fileHandler.bind(this);
    this.renderFile = this.renderFile.bind(this);
  }


    fileHandler = (event) => {
        let fileObj = event.target.files[0];
        let fileName = fileObj.name;
        if(fileName.slice(fileName.lastIndexOf('.')+1) === "xlsx"){
          ExcelRenderer(fileObj, (err, resp) => {
            if(err){
              console.log(err);            
            }
            else{

              this.props.data(resp.rows)
            }
          });       
        }    
        else{
       
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Incorrect File Format! Please choose file with format *.xlsx!',
            showConfirmButton: false,
            timer: 1500
          })
         
       
        }
        //just pass the fileObj as parameter
               
    
      }

        

    renderFile = (fileObj) => {
      //just pass the fileObj as parameter
      ExcelRenderer(fileObj, (err, resp) => {
        if(err){
          //console.log(err);            
        }
        else
        {
          //console.log("cols: ", resp.cols)
          //console.log("rows: ", resp.rows)
          
          this.setState({
            dataLoaded: true,
            cols: resp.cols,
            rows: resp.rows,
            dataexcelupload: resp.rows,
            columnexcelupload: (resp.cols).length,
          });
          console.log('321312',resp.rows)
          this.handleConfirmUploadFile(resp.rows)
        }
      }); 
    } 
    handleConfirmUploadFile = async (dataexcelupload) =>{
      let {  row_assets_update} = this.state;
    
      
      let obj =[]
      var tmpTop=[]
      let tmp=[]
    
      if(dataexcelupload.length > 1)
      {
        

          row_assets_update= '';
          dataexcelupload.shift()

           
             tmpTop = dataexcelupload.filter((item,index,arr)=>{
                
                if(index===0)
                {
                    return item
                }
            })

             tmp = dataexcelupload.filter((item,index,arr)=>{
                
              if(index!==0)
              {
                  return item
              }
            })

    


            for(let i=0;i<=tmp.length;i++)
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
              
              console.log('tmp',tmp)
              
            }

        }
       
    }
    render(){
        return(
            <>
            <input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />
            </>
        )
    }
}
export default DcelRenderer