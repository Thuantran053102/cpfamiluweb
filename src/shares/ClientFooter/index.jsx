import React, { Component } from "react";
import { Link } from "react-router-dom";
import {  } from "../../api/SubUrl";
class ClientFooter extends Component{
    constructor(props)
    {
        super(props)
    }
    render(){
        return(
            <>
            <div className="p-3 " style={{backgroundColor:'black' , zIndex:'99', color:'white'}}>
                @ Asset Managerment
                {/* <Link className="px-2" onClick={()=>{ window.location=generalterm}} style={{color:'black'}}>Điều khoảng chung</Link>
                <Link className="px-2" onClick={()=>{ window.location=security}}  style={{color:'black'}}>Bảo mật thông tin</Link> */}
            </div>
            </>
        )
    }
}
export default ClientFooter