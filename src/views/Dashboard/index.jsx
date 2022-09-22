import React from "react";
import { Component } from "react";
import { Path } from "../../api/Path";
import { CheckTOkenRule,CheckUserRule } from "../../shares/Func";
import { ApiAuthority } from "../../api/User";
import Style from './dashboard.module.scss'
import clsx from "clsx";
import Loading from "../../shares/Loading";
class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            listtow:[],
            isLoading:false,
        }
    }
    componentDidMount=()=>{
        const token = CheckTOkenRule()
        if(!token)
        {
            window.location='/login'
        }
        this.handleTableGetAll()
    }
    handleTableGetAll=async()=>{
        this.setState({isLoading:true})
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=User.username
        const password= User.password
    
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                
            ],
            StoreProcedureName: "SP_FILTER",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        ApiAuthority(username,password,Token,formData,async res => {
           
            if(res.Status===200)
            {   
                this.setState({listtow:res.Data,isLoading:false})
                // this.setState({isLoading:true})
            }
        })
    }


    render(){
        const {listtow,isLoading} = this.state

        console.log('listtow',listtow)
        let TLam=0, VLam=0,VNghi=0,Three=0,Sumall=0
        listtow.forEach((item)=>{
            if(item.National_ID===2)
                {
                    TLam+= item.Danglam
                }
                if(item.National_ID===1)
                {
                    VLam=VLam+ Number(item.Danglam)
                    VNghi=VNghi+ Number(item.Nghilam)
                    Three=Three+ Number(item.threeNam)
                }
        })
     
        Sumall=TLam+VLam+VNghi+Three
        return(
            <div className="flex-grow-1">
            {
               isLoading ? <Loading /> : ""
               }
             <div className='container'>
                <div className='row mt-5' >
                    <div className="col-lg-3 " style={{}}>
                        <div className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
                        <div className={clsx('col-9')}>
                            <h5 className='text-secondary'>Thai đang làm</h5>
                            <span className=' text-secondary font-weight-bold'><b className='' style={{ fontSize: '1.5rem' }}>{TLam}</b> người</span>
                        </div>
                        <div className={clsx('col-3 d-flex justify-content-end ')}>
                            <span className="mdi mdi-projector-screen px-2 mb-2 text-white rounded "
                            style={{ fontSize: '1.5rem', backgroundColor: '#2bb9c4', maxHeight: '40px' }}></span>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-3 " style={{}}>
                        <div className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
                        <div className={clsx('col-9')}>
                            <h5 className='text-secondary'>VietNam đang làm</h5>
                            <span className=' text-secondary font-weight-bold'><b className='' style={{ fontSize: '1.5rem' }}>{VLam}</b> người</span>
                        </div>
                        <div className={clsx('col-3 d-flex justify-content-end ')}>
                            <span className="mdi mdi-projector-screen px-2 mb-2 text-white rounded "
                            style={{ fontSize: '1.5rem', backgroundColor: '#2bb9c4', maxHeight: '40px' }}></span>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-3 ">
                        <div className='card-cv shadow-sm p-3 mb-2 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
                        <div className={clsx('col-9')}>
                            <h5 className='text-secondary'>VietNam đã nghỉ</h5>
                            <span className=' text-secondary font-weight-bold'><b className='' style={{ fontSize: '1.5rem' }}>{VNghi}</b> người</span>
                        </div>
                        <div className={clsx('col-3 d-flex justify-content-end ')}>
                            <span className="mdi mdi-projector-screen px-2 mb-2 text-white rounded "
                            style={{ fontSize: '1.5rem', backgroundColor: '#FA6767', maxHeight: '40px' }}></span>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-3 ">
                        <div className='card-cv shadow-sm p-3 mb-3 bg-body rounded bg-white p-4 d-flex justify-content-between text-decoration-none'>
                        <div className={clsx('col-9')}>
                            <h5 className='text-secondary'>VietNam 3 năm</h5>
                            <span className=' text-secondary font-weight-bold'><b className='' style={{ fontSize: '1.5rem' }}>{Three}</b> người</span>
                        </div>
                        <div className={clsx('col-3 d-flex justify-content-end ')}>
                            <span className="mdi mdi-projector-screen px-2 mb-2 text-white rounded "
                            style={{ fontSize: '1.5rem', backgroundColor: '#fa6800', maxHeight: '40px' }}></span>
                        </div>
                        </div>
                    </div>

                    <div className='col-6 mt-5 '>
                        <h5 className='text-secondary mb-2'>Thống kê theo tỉnh thành</h5>
                        <div className='bg-white my-3 px-2 py-3' style={{position:'relative'}} >
                            <div style={{position:'absolute',top:-10,left:0, display:'inline-block', backgroundColor:'rgb(43, 185, 196)'}}>
                                <span className="p-4 text-white">Người Việt Nam </span>
                                
                                </div>
                            <table className="table ">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tỉnh thành</th>
                                <th className="text-center" scope="col">Đang làm</th>
                                <th className="text-center" scope="col">Đã nghỉ</th>
                                <th className="text-center" scope="col">3 năm</th>
                            </tr>
                            </thead>
                            <tbody style={{overflow:'scroll', maxHeight:600}}>
                            {
                                listtow.map(function (item, index, arr) {
                                    if(item.National_ID==1)  
                                    {

                                        return (
                                        <tr key={index} style={{ lineHeight: '2rem' }}>
                                        <th scope="row">{index + 1}</th>
                                        <td className={clsx(Style.lh,)} >{item.Province_Name}</td>
                                        <td className={clsx(Style.lh, 'text-center')} >{item.Danglam}</td>
                                        <td className={clsx(Style.lh, 'text-center')} >{item.Nghilam}</td>
                                        <td className={clsx(Style.lh, 'text-center')} >{item.threeNam}</td>
                                        </tr>
                                        )
                                    } 
                                    })
                                }


                            </tbody>
                        </table>
                        </div>
                        <div className='bg-white my-3 px-2 py-3' style={{position:'relative'}} >
                            <div style={{position:'absolute',top:-10,left:0, display:'inline-block', backgroundColor:'rgb(43, 185, 196)'}}>
                                <span className="p-4 text-white">Người Thái </span>
                                
                                </div>
                            <table className="table ">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tỉnh thành</th>
                                <th className="text-center" scope="col">Đang làm</th>
                                <th className="text-center" scope="col">Đã nghỉ</th>
                                <th className="text-center" scope="col">3 năm</th>
                            </tr>
                            </thead>
                            <tbody style={{overflow:'scroll', maxHeight:600}}>
                            {
                                listtow.map(function (item, index, arr) {
                                    if(item.National_ID==2)  
                                    {

                                        return (
                                        <tr key={index} style={{ lineHeight: '2rem' }}>
                                        <th scope="row">{index + 1}</th>
                                        <td className={clsx(Style.lh,)} >{item.Province_Name}</td>
                                        <td className={clsx(Style.lh, 'text-center')} >{item.Danglam}</td>
                                        <td className={clsx(Style.lh, 'text-center')} >{item.Nghilam}</td>
                                        <td className={clsx(Style.lh, 'text-center')} >{item.threeNam}</td>
                                        </tr>
                                        )
                                    } 
                                    })
                                }


                            </tbody>
                        </table>
                        </div>
                    </div>

                    <div className='col-6 mt-5 ' style={{maxHeight:'200px'}}>

                    <h5 className='text-secondary mb-2'>Thống kê</h5>
                    <div className='bg-white my-3 px-2 py-3'  style={{maxHeight:'200px'}} >
                    <table className="table ">
                        <thead>
                        <tr>
                            
                            <th className="text-center" scope="col">Đang làm</th>
                            <th className="text-center" scope="col">Đã nghỉ</th>
                            <th className="text-center" scope="col">3 năm</th>
                        </tr>
                        </thead>
                        <tbody style={{overflow:'scroll'}}>
                        
                                <tr  style={{ lineHeight: '2rem' }}>
                                    

                                    <td className={clsx(Style.lh, 'text-center')} >{VLam+TLam}</td>
                                    <td className={clsx(Style.lh, 'text-center')} >{VNghi}</td>
                                    <td className={clsx(Style.lh, 'text-center')} >{Three}</td>
                                </tr>
                            


                        </tbody>
                    </table>
                    </div>

                    </div>
                </div>
              
                </div>
            </div>
        )
    }
}
export default Dashboard