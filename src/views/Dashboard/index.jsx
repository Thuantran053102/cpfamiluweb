import React from "react";
import { Component } from "react";
import { CheckTOkenRule } from "../../shares/Func";
class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            listtow:[]
        }
    }
    componentDidMount=()=>{
        const a = CheckTOkenRule()
        console.log(a)
    }
    handleTable2=async()=>{
        // let Token = await CheckTOkenRule();
        // let User = await CheckUserRule();
        // const username=JSON.parse(User).username
        // const password= JSON.parse(User).password
        // const valuef={
        //     "DataBaseName": Path.DataBaseName,
        //     Params:  [
                
        //     ],
        //     StoreProcedureName: "SP_FILTER",
        //     SchemaName:"SQL01UAT"
        //     }
        // let formData = new FormData();
        // formData.append('data',JSON.stringify(valuef))
        // ApiAuthority(username,password,JSON.parse(Token),formData,async res => {
        //     if(res.Status===200)
        //     {   
        //         this.setState({listtow:res.Data})
                
        //         // await this.setState({list:res.Data}) 
        //         // this.handleFilter()
        //     }
        // })
    }
    render(){
        return(
            <>
            <div>
                <span>hiadasidhail</span>
            </div>
            </>
        )
    }
}
export default Dashboard