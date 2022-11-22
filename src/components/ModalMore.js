import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import { CheckTOkenRule,CheckUseID,CheckUserRule } from '../shares/Func';
import { Path } from '../api/Path';
import { ApiAuthority } from '../api/User';
import Swal from 'sweetalert2';
function ModalMoreSelect(prop) {
    const {showModal,type}= prop
    
    const [show, setShow] = showModal
    const [optionArea,setOptionArea] = useState([])
    const [optionID,setOptionID]= useState([])
    const [valueInsert,setValueInsert] = useState('')
    const [areaValue,setAreaValue]= useState('')

    const [iDHDRValue,setIDHDRValue]= useState('')
    const handleClose = () =>{
        setShow(false)
        setValueInsert('')
        setAreaValue('')
    } 

    useEffect(()=>{
            hanldeGetValuesFilterArea()
            handleGetValueFilterIDHDR()
    },[])

    const hanldeGetValuesFilterArea=async()=>{
        
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                username,
                password,
            ],
            StoreProcedureName: "SP_AREA_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
       
          if(res.Status=200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.Area_ID,
                  label: item.Area_Name
              })
            })
          
            setOptionArea([...filterData]) 
          } 
        })
  
    }

    const handleGetValueFilterIDHDR=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [
                username,
                password,
            ],
            StoreProcedureName: "SP_ID_HDR_GETALL",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {
       
          if(res.Status=200)
          {

            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.ID,
                  label: item.ID_ASSET_TYPE_Code
              })
            })
          
            setOptionID([...filterData]) 
          } 
        })
  
    }

    const handleCheckValues=()=>{
        
        var check= true
        var timerInterval
      
        if(type==='area' && valueInsert.length<3) // check area
        {
           
            Swal.fire({
              title: 'too short',
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
            check=false
        }
        else if(type==='siteName') // check site name
        {
            if( valueInsert.length>3)
            {
                if(!areaValue)
                {
                    Swal.fire({
                        title: 'area absurd',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                          Swal.showLoading()
                          const b = Swal.getHtmlContainer().querySelector('b')
                          timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                          }, 100)
                        },
                        willClose: () => {
                          clearInterval(timerInterval)
                        }
                      }).then((result) => {
                       
                        if (result.dismiss === Swal.DismissReason.timer) {
                          console.log('I was closed by the timer')
                        }
                      })
                    check=false
                }
                
            }
            else{
                Swal.fire({
                    title: 'too short',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                      Swal.showLoading()
                      const b = Swal.getHtmlContainer().querySelector('b')
                      timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                      }, 100)
                    },
                    willClose: () => {
                      clearInterval(timerInterval)
                    }
                  }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                      console.log('I was closed by the timer')
                    }
                  })
                  check=false
            }
        }
        else if(type==='id')
        {
           
            if( valueInsert.length>1)
            {
                if(!iDHDRValue)
                {
                    Swal.fire({
                        title: 'type absurd',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                          Swal.showLoading()
                          const b = Swal.getHtmlContainer().querySelector('b')
                          timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                          }, 100)
                        },
                        willClose: () => {
                          clearInterval(timerInterval)
                        }
                      }).then((result) => {
                       
                        if (result.dismiss === Swal.DismissReason.timer) {
                          console.log('I was closed by the timer')
                        }
                      })
                    check=false
                }
                
            }
            else{
                Swal.fire({
                    title: `${type} too short`,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                      Swal.showLoading()
                      const b = Swal.getHtmlContainer().querySelector('b')
                      timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                      }, 100)
                    },
                    willClose: () => {
                      clearInterval(timerInterval)
                    }
                  }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                      console.log('I was closed by the timer')
                    }
                  })
                  check=false
            }
        }
        else if(type==='type' && valueInsert.length<3)
        {
            Swal.fire({
                title: `${type} too short`,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                  const b = Swal.getHtmlContainer().querySelector('b')
                  timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                  }, 100)
                },
                willClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log('I was closed by the timer')
                }
              })
              check=false
        }
        else if(type==='brand' && valueInsert.length<3)
        {
            Swal.fire({
                title: `${type} too short`,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                  const b = Swal.getHtmlContainer().querySelector('b')
                  timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                  }, 100)
                },
                willClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log('I was closed by the timer')
                }
              })
              check=false
        }
        else if(type==='assetType' && valueInsert.length<3)
        {
            Swal.fire({
                title: `${type} too short`,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                  const b = Swal.getHtmlContainer().querySelector('b')
                  timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                  }, 100)
                },
                willClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log('I was closed by the timer')
                }
              })
              check=false
        }
        else if(type==='location' && valueInsert.length<3)
        {
            Swal.fire({
                title: `${type} too short`,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                  const b = Swal.getHtmlContainer().querySelector('b')
                  timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                  }, 100)
                },
                willClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log('I was closed by the timer')
                }
              })
              check=false
        }
        else if(type==='suplierInstall' && valueInsert.length<3){
            Swal.fire({
                title: `${type} too short`,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                  const b = Swal.getHtmlContainer().querySelector('b')
                  timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                  }, 100)
                },
                willClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log('I was closed by the timer')
                }
              })
              check=false
        }

        if(check)
        {
            handleInsertAPI(type)
        }
        
        // handleClose()
    }
    const handleInsertAPI= async (type)=>{
      
      // valueInsert
      // areaValue
      // iDHDRValue
      // type

      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      let UserID= await CheckUseID()
      const username = User.username
      const password =User.password
      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [
            type==='id' ||  type==='rackId' ? iDHDRValue.label+valueInsert:valueInsert,
            type,
            areaValue,
            iDHDRValue.value
            ,UserID
          ],
          StoreProcedureName: "SP_INSERT_PROPERTIES",
          SchemaName: Path.sqlName
      }
      let formData = new FormData();
      formData.append('data', JSON.stringify(valuef))
      await ApiAuthority(username, password, Token, formData, async res => {
     
        if(res.Status=200)
        {

          if(res.Data.length>0)
          {
            var timerInterval
            Swal.fire({
              title: `${res.Data[0].Column1}`,
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
             
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
          }
          else{

            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
            })
            handleClose()
          }
         
          
        } 
      })

      
    }

  return (
    <>
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Insert {type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {
                type!=='id' && type!=='rackId'?
                <div className="mb-3">
                    <label>{type} </label>
                    <input className='d-block p-2 input inputRadius w-100'
                      value={valueInsert}
                        onChange={(e)=>{
                            setValueInsert(e.target.value)
                        }}
                        type="text"
                        placeholder={type}
                        autoFocus
                    />
                </div>:
                <div className="mb-3">
                    <label>{type} </label>
                    <input className='d-block p-2 input inputRadius w-100'
                        value={valueInsert}
                        onChange={(e)=>{ if (Number.isFinite(Number(e.target.value))) {
                            setValueInsert(e.target.value)

                          }}}
                        type="text"
                        placeholder={type}
                        autoFocus
                    />
                </div>
            }

            {
                type==='siteName'?
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Area</Form.Label>
                    <Select className=" input inputRadius selectInsert "  
                        onChange={(e)=>{setAreaValue(e.value)}}
                        options={optionArea}        
                    />
                    </Form.Group>:null
            } 
            {
                type==='id' || type==='rackId'? <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Type</Form.Label>
                <Select className=" input inputRadius selectInsert "  
                    value={iDHDRValue}
                    onChange={(e)=>{setIDHDRValue(e)}}
                    options={optionID}        
                />
                </Form.Group>:null
            }
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={()=>{handleCheckValues()}} variant="primary" >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMoreSelect;