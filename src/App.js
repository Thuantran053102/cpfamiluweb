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
import { login ,subUrl} from './api/SubUrl';

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
    console.log('dsad')
  }
 
  render(){
    return(
      <>
        <BrowserRouter>
            <Switch>
              <Route  path={login} component={Login}/>
              <Route  path={subUrl} component={ClientLayout}/>
            </Switch>
        </BrowserRouter>
      </>
    )
    
  } 
}

