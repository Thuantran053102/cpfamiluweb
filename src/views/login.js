import clsx from "clsx";
import React, { Component, useEffect } from "react";
// import "./login.scss"
import {Url, ApiLoginDomain,DataBaseName } from "../api/Url";
import { POST_DATA_TOKEN } from "../api/Fetch";
import Swal from "sweetalert2";
import { Path } from "../api/Path";
import { ApiLogin } from "../api/User";
import Loading from "../shares/Loading";
import { dashboard } from "../api/SubUrl";
import {POST_BEARER} from "../api/Center"
import { ApiGetToken } from "../api/User";
import { ApiDecrypt } from "../api/User";
import { CheckFullName } from "../shares/Func";
import { loginTemplate } from "../utils/utils";
import { useState } from "react";
import { ApiAuthority } from "../api/User";

function Login(){
   
    const [userDomain,setUserDomain] = useState('')
    const [pass,setPass] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
      localStorage.clear();
      // if(window.location.href.slice(window.location.href.lastIndexOf('=')+1))
      // {
      //     fnHandleSubLogin()
      // }
    },[])


    const fnCheckLogin = ()=>{
        
        const UrlToken =Url + ApiLoginDomain
        if(userDomain ==='' || pass ==='')
        {
         
            Swal.fire({
              title: 'Vui lòng nhập đủ thông tin',
              timer: 2000,
              timerProgressBar: true,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            })
        }
        else{
           
            fnHandleLogin(UrlToken,userDomain,pass)
        }

    }
    
   
   
    const fnHandleLogin = async (UrlToken,userDomain,pass)=>
    {
        setIsLoading(true)
        let valuef = {
            "DataBaseName":Path.DataBaseName,
            "Params":  [
                userDomain,
                pass
,
            ],
            "StoreProcedureName": "SP_TB_USER_CHECKACCOUNT",
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef));
        let user = {
            UserName: userDomain,
            Password: pass,
          }
         
        ApiLogin(formData, user, async res => {
          
           
            if (res.Status === 200) {
                handleGetIDUser(res.Token,user,pass)
                setIsLoading(false)
                if (res.Token) { 
                    let user = {"username":userDomain,"password": pass}
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('token', JSON.stringify(res.Token));
                    
                    window.location= dashboard
                }
                else {
                    Swal.fire({
                        title: 'Tài khoản hoặc mật khẩu không đúng',
                        timer: 2000,
                        timerProgressBar: true,
                      }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                          
                        }
                      })
                }
            }
            else {
            
            }
        });
    }

  //   const fnHandleSubLogin = async ()=>{
  //     let tokenget= window.location.href.slice(window.location.href.lastIndexOf('=')+1)
  //     var  parser, xmlDoc;
  //     ApiGetToken(tokenget,async handleData=>{
          
  //         if(handleData.status===200)
  //         {
  //             console.log('handleData',handleData)
  //             parser = new DOMParser();
  //             xmlDoc = parser.parseFromString(handleData.data,"text/xml"); 
             

  //             if(xmlDoc.getElementsByTagName("User_Name")[0].innerHTML)
  //             {
                  
  //                 setUserDomain(xmlDoc.getElementsByTagName("User_Name")[0].innerHTML) 
  //                 console.log('login',JSON.stringify(xmlDoc.getElementsByTagName("Full_Name")[0].innerHTML) )
  //                 localStorage.setItem("fullname",JSON.stringify(xmlDoc.getElementsByTagName("Full_Name")[0].innerHTML))

                  
                 

  //                 // this.handlegetpass(xmlDoc.getElementsByTagName("User_Name")[0].innerHTML)
  //                 fnHandleDecrypt(xmlDoc.getElementsByTagName("Session_No")[0].innerHTML,xmlDoc.getElementsByTagName("User_Name")[0].innerHTML)
  //             }
  //             else{
  //                 localStorage.clear();
  //             }
  //         }
  //     })
  // }
  // const fnHandleDecrypt = async (token,useDomain)=>{
   
  //   console.log('token',token,useDomain)
  //     var  parser, xmlDoc;
  //     // fnCheckLogin
  //     ApiDecrypt(token,async handleData=>{
  //         if(handleData.status===200)
  //         {

  //             parser = new DOMParser();
  //             xmlDoc = parser.parseFromString(handleData.data,"text/xml"); 
  //             if(xmlDoc.getElementsByTagName("decryptResult")[0].innerHTML)
  //             {
  //                 setPass(xmlDoc.getElementsByTagName("decryptResult")[0].innerHTML)
  //                 fnCheckLogin()
  //                 // this.fnCheckLoginfa(useDomain,xmlDoc.getElementsByTagName("decryptResult")[0].innerHTML)
  //             }
  //             else{
  //                 localStorage.clear();
  //             }

  //         }
  //     })
  // }

    const  handleGetIDUser=async(Token,username,password)=>
    {
     
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
    
                username.UserName,
                username.Password,
            ],
            StoreProcedureName: "SP_USER_GETID",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority( username.UserName, username.Password, Token, formData, async res => {
          if(res.Status===200)
          {
            console.log(res.Data[0].User_ID)
            localStorage.setItem('userid', JSON.stringify(res.Data[0].User_ID));
            
          } 
        })
       
    }


    
     
    
        return(
            <div className="flex-grow-1" style={{height:'100vh'}}>
             {/* {
                isLoading ? <Loading /> : ""
                } */}
<header className="top-header">
</header>

<div id="mainCoantiner">
 


  <div>
    <div className="starsec"></div>
    <div className="starthird"></div>
    <div className="starfourth"></div>
    <div className="starfifth"></div>
  </div>


  <div className="container text-center text-dark mt-5">
    <div className="row">
      <div className="col-lg-4 d-block mx-auto mt-5">
        <div className="row">
          <div className="col-xl-12 col-md-12 col-md-12">
            <div className="card">
              <div className="card-body wow-bg" id="formBg">
                <h3 className="colorboard">Đăng nhập</h3>

                <p className="text-muted">Đăng nhập bằng User Domain</p>

                <div className="input-group mb-3"> 
                <input onKeyPress={event => {if(event.key === 'Enter'){fnCheckLogin()}}} value={userDomain} type="text" onChange={(e)=>setUserDomain(e.target.value)}   className="form-control textbox-dg" placeholder="User Domain"/> </div>
                <div className="input-group mb-4"> 
                <input onKeyPress={event => {if(event.key === 'Enter'){fnCheckLogin()}}} value={pass} type="password" onChange={(e)=>setPass(e.target.value)} className="form-control textbox-dg" placeholder="Password"/> </div>

                <div className="row">
                  <div className="col-12"> 
                  <button type="button" onClick={()=>{fnCheckLogin()}} className="btn btn-primary btn-block logn-btn">Login</button> </div>
                  <div className="col-12"> 
                
                  </div>
                </div>

              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

            </div>
        )

}
export default Login