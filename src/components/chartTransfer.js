import { Component, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Path } from '../api/Path';
import { CheckUserRule,CheckTOkenRule } from '../shares/Func';
import { ApiAuthority } from '../api/User';
import * as $ from 'jquery'
import { getYear, set } from 'rsuite/esm/utils/dateUtils';
import Select from 'react-select'
import {
    Chart as ChartJs,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';

  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );
  

let dataMonth = []
let labels = []

function MychartTransfer(){

    const [labelsValues,setLabelsValues]= useState([])
    const [dataValues,setDataValues]= useState([])
    const [valueChange,setValueChange] = useState([])

    const [dataYear,setDataYear] = useState({
        value:'2021',
        label:'2021'
    })
    
    const [optionYear,setOptionYear] = useState([])
    let arr=[]
    useEffect(()=>{
        let d = new Date();
        setDataYear(
            {
                value:d.getFullYear(),
                label:d.getFullYear()
            }
        )
        
        for(let i =d.getFullYear()-10 ; i<=d.getFullYear(); i++ )
        {
            arr.push({
                value:i,
                label:i
            })
        }
        setOptionYear([...arr])
    },[])

    useEffect(()=>{
        handleGetDataChart()
    },[dataYear])



    const handleGetDataChart=async()=>{

        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                dataYear.value
            ],
            StoreProcedureName: "SP_TRANSACTION_EXTEND_CHART",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status=200)
          {
            
            let _month_= res.Data.map((item)=>{
                
                return item.month_+ '/' + dataYear.value
            })
            
            let _data_= res.Data.map((item)=>{
              
                return item.number
            })
           
            setLabelsValues(_month_)
            
            setDataValues(_data_)

            setValueChange(res.Data)
          
          } 
        })
  
    }
   
    useEffect(()=>{

        handleChart()

    },[valueChange])

 

    const handleChart=()=>{
        const data = {
            labels: labelsValues,
            datasets: [
              {
                label: 'Số lần',
                data: dataValues,
                backgroundColor: [
                    'rgba(233,30,99,1)',
                    'rgba(181,104,63,1)',
                    'rgba(63,81,181,1)',
                    'rgba(0,150,136,1)',
                    'rgba(138,74,243,1)',
                    'rgba(255,87,34,1)',
                    'rgba(0,188,212,1)',
                    'rgba(244,67,54,1)',
                    'rgba(33,150,243,1)',
                    'rgba(195,74,78,1)',
                    'rgba(63,140,181,1)',
                    'rgba(255,197,34,1)'

                  ]
              },
      
            ]
          }
          const config = {
            type: 'bar',
            data: data,
            options: {
              plugins: {
                title: {
                  display: true,
                  text: `¤ Tổng số lần chuyển nhượng Tài sản vào hàng tháng ¤`,
                  color: '#6c757d',
                  font: {
                    size: 24,
                    weight: 'bold'
                  },
                  padding: {
                    top: 10,
                    bottom: 20
                  }
                }
              },
              scales: {
                x: {
                  stacked: true
                },
                y: {
                  stacked: true
                },
      
              }
            }
      
          };
          $("canvas#myChart2").remove();
          $("div.chart-report2").append('<canvas id="myChart2"></canvas>')
          let myChart2 = new Chart(document.getElementById('myChart2'), config);
    }
    
 
    return(
        <>
        <div className='' >
            <div style={{width:"150px", backgroundColor:'white',height:'40px'}}>
                
                <Select styles={{width:'100px', backgroundColor:'white'}} className="input" 
                    value={dataYear}
                    onChange={(e)=>{setDataYear(e)}}
                    options={optionYear}
                />
            </div>
            <div className='col-12 mb-3'>
            <div className=" bg-white">
              <div className="d-none d-md-block row p-3 ">
                <div className="col-md-12 chart-report2 ">
                  <canvas id="myChart2"></canvas>
                </div>
              </div>
            </div>

          </div>
         
        </div>

        </>
    )
    
}
export default MychartTransfer