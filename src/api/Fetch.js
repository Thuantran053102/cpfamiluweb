import axios from "axios";
const apiKey = 'yhTMTlGGQyPKhlr8IHKMHc4mB7qo3R5t';


const username = 'SQL01UAT';
const password = 'daoductien';

export const POST_FORM_DATA = (Url, Token, Data, handleData) => {
   
    axios.post(Url, Data,{        
        headers: { 
            'Content-Type': 'multipart/form-data', 
            "Access-Control-Allow-Origin": "*", 
            "Accept": "application/json",
            'Authorization': `Bearer ${Token}`, 
        }
    }).then(res => {
       
        handleData(res.data)
    }).catch(function(error) 
    {
       
        handleData({ Status: error.response.status });
    });
}



export const POST_DATA_TOKEN = (Url, Data, handleData) => {
   
    axios.post(Url, Data,
    {
        headers: { 
            'Content-Type': 'multipart/form-data', 
            "Access-Control-Allow-Origin": "*", 
            "Accept": "application/json",
        },
      auth: 
      {
        username: "SQL01UAT",
        password: "btR/RLAB95C2XR9pxSYnaQ=="
      }
    }).then(res => {
        //console.log(res.data)
        handleData(res.data);
    }).catch(function(error) 
      {
        //console.log(1)
        handleData({ Status: error.response.status });
      });
}

export const POST_DATA_AUTHEN = (Url, Body, handleData) => {
    axios.post(Url, Body, {
        auth: {
            username: username,
            password: password
        }
    }).then(res => {
        handleData(res.data);
    }).catch(function (error) {
        if (error.response) {
            handleData({ Status: error.response.status });
        }
    });
}

export const POST_DATA = (Url, Data, handleData) => {
    axios.post(Url, Data).then(res => {
        handleData(res.data);
    });
}