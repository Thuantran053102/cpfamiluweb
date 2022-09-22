import logo from './logo.svg';
import './App.css';
import { POST_DATA } from './api/Fetch';
import React, { Component,Suspense } from 'react';
import * as process from "process";
import 'react-confirm-alert/src/react-confirm-alert.css';
import htmlToPdfmake from 'html-to-pdfmake';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Login from './views/login';
import {QRCodeSVG} from 'qrcode.react';
import ClientLayout from './layouts/ClientLayout';
import "rsuite/dist/rsuite.css";

import "./css/main.css"

import {
  BrowserRouter,
  Route, Switch
} from 'react-router-dom';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  componentDidMount=()=>{

    // var html = htmlToPdfmake(`
    //   <div>
    //     <h1>My title</h1>
    //     <p>
    //       This is a sentence with a <strong>bold word</strong>, <em>one in italic</em>,
    //       and <u>one with underline</u>. And finally <a href="https://www.somewhere.com">a link</a>.
    //     </p>
    //   </div>
    // `);
  //   const html =[]
  //   const head_title_1 = {
  //     columns: [
  //         {
  //             width: '100%',
  //             text: 'NGHỊ QUYẾT CỦA HỘI ĐỒNG QUẢN TRỊ',
  //             alignment: 'center',
  //             fontSize: 10,
  //             bold: true
  //         }
  //     ],
  //     marginBottom: 2
  // }
    // html.push(head_title_1)
    // const doc = new jsPDF(); // 
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // const documentDefinition ={content: html }
    // pdfMake.createPdf(documentDefinition).download('file.pdf');
    // console.log(html)



    // this.callApi()


  }
  // callApi=async()=>{
    
  //   const Body = {
  //     UserName: "quockhanh",
  //     Password: "cpvn!1202",
  //   }
  //   const URL ="http://172.21.1.99/WebServiceCPMyAssets/api/get-token-domain"
  //   await POST_DATA(URL, Body, res => {
        
  //     if (res.Status === 200)// status trả về
  //     {
  //       if (res.Data)// nếu res.Data !== null
  //       {
  //         localStorage.setItem("_Token", res.Token);// lưu token trên localStore
  //         // this.fnHandleSubLogin(username, password);// gọi hàm fnHandleSubLogin
  //         console.log("_Token", res.Token)
  //       }
       
  //     }
     
  //   });
  // }
 
  render(){
    return(
      <>
        <BrowserRouter>
            <Switch>
              <Route  path="/login" component={Login}/>
              
              <Route  path="/" component={ClientLayout}/>
            </Switch>
        </BrowserRouter>
      </>
    )
    
  } 
}

