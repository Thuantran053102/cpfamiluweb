import React from "react";
import { Component } from "react";
import { Path } from "../../api/Path";
import { CheckTOkenRule,CheckUserRule } from "../../shares/Func";
import { ApiAuthority } from "../../api/User";
import Style from './dashboard.module.scss'
import clsx from "clsx";
import Loading from "../../shares/Loading";
import { login } from "../../api/SubUrl";
import MychartAsset from "../../components/charAsset";
import { useState } from "react";
import MychartTransactionExtend from "../../components/chartTransaction";
import MychartTransfer from "../../components/chartTransfer";
import TransactionList from "../../components/ListDadboard";
import MychartMaintainace from "../../components/chartMaintainace";
function Dashboard(){

    const [isLoading,setIsLoading]= useState(false)



        return(
            <div className="flex-grow-1">
            {
               isLoading ? <Loading /> : ""
               }
             <div className='container'>
                <div className='row mt-5' >
                <div className="col-md-12">
                    <div className="container-fluid">
                        <div className="row">
                                <div className="col-md-12">

                                < MychartMaintainace/>
                                </div>
                        </div>
                    </div>
                   
                 </div>
               
                <div className="col-md-12">
                    <div className="container-fluid">
                        <div className="row">
                                <div className="col-md-6">

                                <MychartTransactionExtend/>
                                </div>
                                <div className="col-md-6">
                                <MychartTransfer/>
                                </div>
                        </div>
                    </div>
                   
                 </div>
                 <div className="col-md-12">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-md-6">

                                <MychartAsset/> 
                            </div>
                            <div className="col-md-6">
                                <TransactionList/>
                            </div>
                        </div>
                    </div>
                 </div>
                
                

                </div> 
                </div>
            </div>
        )
   
}
export default Dashboard