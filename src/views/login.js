import clsx from "clsx";
import React, { Component } from "react";
import Style from "./login.module.scss"
import {Url, ApiLoginDomain,DataBaseName } from "../api/Url";
import { POST_DATA_TOKEN } from "../api/Fetch";
import Swal from "sweetalert2";
import { Path } from "../api/Path";
import { ApiLogin } from "../api/User";
import Loading from "../shares/Loading";
import { dashboard } from "../api/SubUrl";
import {POST_BEARER} from "../api/Center"

class Login extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            customerCode:'',
            password:'',
            isLoading:false,
        }
    }
    onChangeText= (key,value)=>{
        if(key=='pass')
        {
            this.setState({password:value})
          
            
        }
        if(key=='user')
        {
            this.setState({customerCode:value})
          
            
        }
    }
    fnCheckLogin = ()=>{
        const { password, customerCode } = this.state;
        const UrlToken =Url + ApiLoginDomain
        if(password ==='' || customerCode ==='')
        {
            let timerInterval
            Swal.fire({
              title: 'Vui lòng nhập đủ thông tin',
              timer: 2000,
              timerProgressBar: true,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
        }
        else{
            this.fnHandleLogin(UrlToken,customerCode,password)
        }

    }

    fnHandleLogin = async (UrlToken,customerCode,password)=>
    {
        this.setState({isLoading:true})
        console.log(1231)
        // let { username, password } = this.state;
        let valuef = {
            "DataBaseName":Path.DataBaseName,
            "Params":  [
                customerCode,
                password
,
            ],
            "StoreProcedureName": "SP_TB_USER_CHECKACCOUNT",
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef));
        let user = {
            UserName: customerCode,
            Password: password,
          }
        ApiLogin(formData, user, async res => {
            if (res.Status === 200) {
                this.setState({isLoading:false})
                if (res.Token) { 
                    let user = {"username":customerCode,"password": password}
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
                          console.log('I was closed by the timer')
                        }
                      })
                }
            }
            else {
            
            }
        });
    }
        fnHandleSubLogin = async ()=>{
            let Token = localStorage.getItem("_Token");
            const User = JSON.parse(localStorage.getItem('_User'));
 
            const valuef={
                "DataBaseName": DataBaseName,
                Params:  [
                    "ID04",
                    `${'Thuận'}`
                ],
                StoreProcedureName: "SP_MEM_TEST_UPDATE",
                SchemaName:"SQL01UAT"
                }
            let formData = new FormData();
            formData.append('data',JSON.stringify(valuef))
            
            await  POST_BEARER(User.customerCode,User.password,Token,formData,res=>{
                
            })

          
        }
        
    render(){
        const {isLoading} = this.state
        return(
            <div className="flex-grow-1">
             {
                isLoading ? <Loading /> : ""
                }
                <div className={clsx(Style.main,"container-fluid")}>
                    <div className={clsx(Style.mainWrap,"w-100")}>
                        <div className={clsx(Style.containerWrap,"container")}>
                            <div className={clsx(Style.Wrap,"row")}>
                                {/* top */}
                                <div className={clsx(Style.topWrap,"col-12")}>
                                    <div className={clsx(Style.topLeftWrap)}>
                                        <h1 className={clsx(Style.titleWrap,"")}>Gia đình CP Liên Thế Hệ</h1>
                                        <p className={clsx(Style.line,"w-100")}></p>
                                        {/* <div className={clsx(Style.registeredWrap)}>
                                            <span className={clsx(Style.registere)}>Đăng ký tài khoản</span>
                                            <span className="mdi mdi-arrow-right"></span>
                                        </div> */}
                                    </div>
                                </div>
                                {/* body */}
                                <div className={clsx(Style.bodyWrap,"col-12 ")}>
                                    <div className={clsx(Style.loginWrap,"px-xl-5 py-xl-3 px-3 py-2 mt-xl-5 mt-2")}>
                                        <div className={clsx(Style.headLoginWrap)}>
                                            <h2 className={clsx(Style.titleLogin)}>Đăng nhập</h2>
                                            <p className={clsx(Style.decriptionLogin)}>
                                                Người dùng, Đăng nhập vào domain của bạn
                                            </p>
                                        </div>
                                        <div className={clsx(Style.bodyLoginWrap ,"py-2")}>
                                            <div className={clsx(Style.inputWrap)}>
                                                <input  onChange={(e)=>{this.onChangeText('user',e.target.value)}} className={clsx(Style.input ,"py-2 px-2 w-100")} type="text" placeholder="Customer Code "></input>
                                            </div>
                                            <div className={clsx(Style.inputWrap)}>
                                                <input onChange={(e)=>{this.onChangeText('pass',e.target.value)}} className={clsx(Style.input ,"py-2 px-2  w-100")} type="password" placeholder="Nhập mật khẩu"></input>
                                            </div>
                                            <span className={clsx(Style.trouble  ,"d-block pt-3")}>
                                                Gặp sự cố trong đăng nhập?
                                            </span>
                                            <button onClick={()=>{this.fnCheckLogin()}} className={clsx(Style.btnLogin,"w-100 my-2 py-1")}>
                                                Đăng nhập
                                            </button>
                                            {/* <button onClick={()=>{this.fnHandleSubLogin()}} className={clsx(Style.btnLogin,"w-100 my-2 py-1")}>
                                                Đăng nhập1
                                            </button> */}
                                            
                                        </div>
                                        <div className={clsx(Style.bootomLoginWrap)}>

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
}
export default Login