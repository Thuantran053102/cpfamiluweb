import { POST_DATA_TOKEN, POST_FORM_DATA } from './Fetch';
import { Url,ApiLoginDomain,DataBaseName,ApiGetListPrivate} from './Url';

export const POST_BEARER = async (UserName, Password, UrlPost, Body, handleData) => {

    
    const params = {
        UserName: UserName,
        Password: Password,
    }
    
    const URLPOST = Url + ApiGetListPrivate;

    await POST_FORM_DATA(URLPOST,UrlPost, Body, res => {
       
        // thành công 
       if(res!== 401 && res.Status !==401)
       {
            console.log('res',res)
            handleData(res)
           
       }
       else{
            //lấy lại token
            const URLToken= Url+ApiLoginDomain
            let valuef = {
                "DataBaseName": DataBaseName,
                "Params":  [
                    params.UserName,
                    params.Password
                ],
                "StoreProcedureName": "SP_TB_USER_CHECKACCOUNT",
            }
            let formData = new FormData();
            formData.append('data',JSON.stringify(valuef));

            POST_DATA_TOKEN(URLToken,formData,handle=>{
                if(handle.Status ==200){
                    let Token = handle.Token;
                    localStorage.setItem("_Token", Token);

                    if (Token === null) {
                        handleData(res);
                        return;
                    }
                    else {
                        console.log('URLToken',URLPOST)
                        POST_FORM_DATA(URLPOST, Token, Body, res => {
                            handleData(res)
                        })
                    }
                }
                else{
                    handleData(401)
                }
            })
       }
    })
}