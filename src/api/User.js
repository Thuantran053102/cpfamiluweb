import { Path } from './Path';
import { POST_DATA_TOKEN,POST_FORM_DATA,POST_DATA_AUTHEN, POST_DATA } from './Fetch';
import { AsyncStorage } from 'react-native';

export const Api = {
    // _getInfo: Path.API + 'GetUserInfo?userid=',

    _getTokenCenter:Path.API +'get-token-center',
    _getNationallity:Path.API+'get-list-private',
    _uploadimg:Path.API + 'ins-list-image',
    _getLogin:Path.API+'get-token',
    // _login: Path.API + 'Login',
    // _userActive: Path.API + 'GetVacation?',
    // _userUpdateActive: Path.API + 'UpdateVacation?',
    // _listEngineer: Path.API +'GetListEnginner?',
    // _pushNoti: 'https://exp.host/--/api/v2/push/send',
    // _register: Path.API + 'SignUp',
    // _registerManager: Path.API + 'SignUpManager',
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
                    SchemaName:"SQL01UAT"
                    }
                let formData = new FormData();
                formData.append('data',JSON.stringify(valuef))
                console.log(12321)
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

// const handeSaveStore=async (value)=>{ 
//     await AsyncStorage.setItem("token",JSON.stringify(value));
// }

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
                   
                    // handeSaveStore(Token)
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
    console.log(Api._uploadimg,token,FormData)
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

            //lấy lại token
      
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
                    // localStorage.setItem("_Token", Token);
                    // handeSaveStore(Token)
                   

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
//     POST_BEARER_CENTER(Api._uploadimg, User_Name, User_Password, Token, FormData,  res => {
//     handleData(res);
// }



// const Body = {
//     "DataBaseName": Path.DataBaseName,
//     "Params":  [
//         PRODUCT_CODE,
//     ],
//     "StoreProcedureName": "SP_INS_UPDATE_PRODUCT_MANAGER",
//     "SchemaName":Path.SchemaName
// }
// const formData = new FormData();
// formData.append('data',JSON.stringify(Body));
// images.forEach(item => {
//     formData.append("files[]", item);
// })



// export const ApiRegister = (data, handleData) => POST_DATA_LOGIN(Api._register, data, res => {
//     handleData(res);
// });
// export const ApiRegisterManager = (data, handleData) => POST_DATA_LOGIN(Api._registerManager, data, res => {
//     handleData(res);
// });

// export const PushNotification = (data, handleData) => POST_DATA_WITHOUT_AUTH(Api._pushNoti, data, res => {
//     handleData(res);
// })

// // export const ApiLogin = (data, handleData) => POST_DATA_LOGIN(Api._login, data, res => {
// //     handleData(res);
// // });

// export const ApiGetUserInfo = (id, db, handleData) => GET_DATA(Api._getInfo + id + '&db_name=' + db, res => {
//     handleData(res);
// })

// export const ApiGetListEngineer = (userid, db_name, handleData) => GET_DATA(Api._listEngineer + `userid=${userid}&db_name=${db_name}`, res => {
//     handleData(res);
// })

// export const ApiUserActive = (userid, db_name, handleData) => GET_DATA(Api._userActive + `userid=${userid}&db_name=${db_name}`, res => {
//     handleData(res);
// })

// export const ApiUserUpdateActive = (vc_status, userid, db_name, handleData) => GET_DATA(Api._userUpdateActive + `vc_status=${vc_status}&userid=${userid}&db_name=${db_name}`, res => {
//     handleData(res);
// })





