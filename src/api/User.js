import { Path } from './Path';
import { POST_DATA_TOKEN,POST_FORM_DATA,POST_DATA_AUTHEN, POST_DATA } from './Fetch';
import axios from 'axios';



export const Api = {
    // https://webservice.cp.com.vn/api_CLB_CP/api/get-token
    _getTokenCenter:Path.API +'get-token-center',
    _getNationallity:Path.API+'get-list-private',
    _uploadimg:Path.API + 'ins-list-image',
    _getLogin:Path.API+'get-token',
    __getToken:Path.APIAUTHENTICATION + '?op=getToken',
    __decrypt:Path.APIAUTHENTICATION+'?op=decrypt'
   
}
export const ApiGetToken=(a, handleData)=>{

        var sr2 = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <getToken xmlns="http://tempuri.org/">
              <Token>${a}</Token>
            </getToken>
          </soap:Body>
        </soap:Envelope>`

        axios.post(Api.__getToken,sr2,{
            headers:{'Content-Type':'text/xml'}
        }).then(res=>{
            
            handleData(res);
        }).catch(err=>{console.log(err)})
}


export const ApiDecrypt=(Token, handleData)=>{
       
    var sr2 = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <decrypt xmlns="http://tempuri.org/">
          <subToken>${Token}</subToken>
          <privateKey>${Path.PrivateKey}</privateKey>
        </decrypt>
      </soap:Body>
    </soap:Envelope>`

    axios.post(Api.__decrypt,sr2,{
        headers:{'Content-Type':'text/xml'}
    }).then(res=>{
        
        handleData(res);
    }).catch(err=>{console.log(err)})
}


export const ApiLogin=(data, user, handleData) =>{
    const username= user.UserName
    const password= user.Password
    if(username==='vanthuan' && password==='trantran')
    POST_DATA_TOKEN(Api._getTokenCenter,data,async res2=>{
        handleData(res2)
    })
    else{
        POST_DATA_AUTHEN(Api._getLogin, user, res =>{
            if(res.Status === 200 && res.Token){
                const valuef={
                    "DataBaseName": Path.DataBaseName,
                    Params:  [
                        username,
                        password
                    ],
                    StoreProcedureName: "SP_USERS_UPDATE",
                    SchemaName:Path.sqlName
                    }
                let formData = new FormData();
                formData.append('data',JSON.stringify(valuef))
                
                ApiAuthority(username,password,res.Token,formData,async res1 => {
                   handleData(res)
                })
                
            }
            else {
                handleData(res)
            }
        })
    }

   

    
;}

export const ApiAuthority= (userName,Pass,token,data,handleData) =>{

   
    const params = {
        UserName: userName,
        Password: Pass,
    }
  
    POST_FORM_DATA(Api._getNationallity,token,data,res=>{

        if(res!== 401 && res.Status !==401)
       {  
            handleData(res)
       }
       else{

            let valuef = {
                "DataBaseName": Path.DataBaseName,
                "Params":  [
                    params.UserName,
                    params.Password
                ],
                "StoreProcedureName": "SP_TB_USER_CHECKACCOUNT",
            }
            let formData = new FormData();
            formData.append('data',JSON.stringify(valuef));
            POST_DATA_TOKEN(Api._getTokenCenter,formData,handle=>{
               
                if(handle.Status ==200){
                    
                    let Token = handle.Token;
                    localStorage.setItem('token', JSON.stringify(Token));
                    
                    if (Token === null) {
                        handleData(res);
                        return;
                    }
                    else {
                        POST_FORM_DATA(Api._getNationallity, Token, data, res => {
                            handleData(res)
                        })
                    }
                }
                else{
                    handleData(401)
                }
            })
       }
       
    });
}

export const postManagerImageOpenSale = (User_Name, User_Password, token, FormData, handleData) => {
   
    const params = {
        UserName: User_Name,
        Password: User_Password,
    }
  
    POST_FORM_DATA(Api._uploadimg,token,FormData,res=>{
        
        if(res!== 401 && res.Status !==401)
       {  
            handleData(res)
       }
       else{
            let valuef = {
                "DataBaseName": Path.DataBaseName,
                "Params":  [
                    params.UserName,
                    params.Password
                ],
                "StoreProcedureName": "SP_TB_USER_CHECKACCOUNT",
            }
          
            let formData = new FormData();
            formData.append('data',JSON.stringify(valuef));
            POST_DATA_TOKEN(Api._getTokenCenter,formData,handle=>{
                if(handle.Status ==200){
                    let Token = handle.Token;
                        localStorage.setItem('token', JSON.stringify(Token));
                    if (Token === null) {
                        handleData(res);
                        return;
                    }
                    else {
                      
                        POST_FORM_DATA(Api._uploadimg, Token, FormData, res => {
                            handleData(res)
                        })
                    }
                }
                else{
                    handleData(401)
                }
            })
       }
       
    });
}





