import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import clsx from "clsx";
import Style from "./ClientNavbar.module.scss"
import vn from '../../images/vn.gif';
import us from '../../images/us.gif';
import pexels from '../../images/default-avatar.jpg'
import logo from '../../images/logo.png'
import { bindActionCreators } from 'redux';//
import { changeToEng, changeToVn } from '../../actions';//
import { LoadLang } from '../../components/Lang';//
import { connect } from 'react-redux';
import { CartContext } from '../../contexts/CartContext';
import { dashboard } from "../../api/SubUrl";
import { Path } from "../../api/Path";
import { CheckTOkenRule,CheckUserRule,CheckFullName, CheckUseID } from "../Func";
import { ApiAuthority } from "../../api/User";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import { handleGetLable } from "../../utils/utils";
import Swal from 'sweetalert2'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  NavLink,
  useRouteMatch,
  useLocation
} from "react-router-dom";
import { login,subUrl,log,statistical,users,logoff,logoffTest,properties } from "../../api/SubUrl";
const lang = LoadLang();
class ClientNavbar extends Component{
  constructor(props)
  {
    super(props)
    this.state={
      nameuser:'',
      pathname:window.location.pathname,
      isLoading:false,
      Permission_ID:'',
      showModal:false,
      userItem:{},
      optionsProvinceI:[],
      optionDeptI:[],
      selectProvince:[],
      fullName:'',
      optionACC:[]
    }
  }
  componentDidMount=async ()=>{


    this.fnHandleGetByUserID()
    this.handleCCAGetAllAPI()
    // this.fnHandleDeptGetAll()
  }
    handleLang = (language) => {

      if (language === "en") {
      
        this.props.changeToEng();
     
      } else {
        this.props.changeToVn();
      }
      document.location.reload();
    }

    handleSingout=()=>{
      localStorage.clear();
      
      if(window.location.href.includes('cpvdev'))
      {
        window.location=`${logoffTest}`
      }
      else{
        window.location=`${logoff}`
      }
    }

   

  handleGetName=async()=>{
    this.setState({isLoading:true})
    let Token = await CheckTOkenRule();
    let User = await CheckUserRule();
    const username=User.username
    const password= User.password

    const valuef={
        "DataBaseName": Path.DataBaseName,
        Params:  [
          username,
          password
        ],
        StoreProcedureName: "SP_USER_GETBYID",
        SchemaName:Path.sqlName
        }
    let formData = new FormData();
    formData.append('data',JSON.stringify(valuef))
    ApiAuthority(username,password,Token,formData,async res => {
       
     
        if(res.Status===200)
        {   
          this.setState({userItem:res.Data[0]})
          this.fnHandleGetProvinceByUserID(res.Data[0].User_ID)
        }
    })
}

      fnHandleGetAuthority= async()=>{
              
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password =User.password
        
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [

                username,
                password,
                ''
            ],
            StoreProcedureName: "SP_NATIONALLITY_PROVINCE_GET",
            SchemaName: Path.sqlName
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        await ApiAuthority(username, password, Token, formData, async res => {

          
            if(res.Status===200)
            {
               
                this.setState({ optionsProvinceI:
                  res.Data.map((item)=>{
                    return({
                        value: item.Province_ID,
                        label: item.Province_Name
                    })
                })})
              
            }
          
        })
    }

    handleCCAGetAllAPI=async()=>{
      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      const username = User.username
      const password =User.password

      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [
           
          ],
          StoreProcedureName: "SP_CCA_GETALL",
          SchemaName: Path.sqlName
      }
      let formData = new FormData();
      formData.append('data', JSON.stringify(valuef))
      await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status===200)
          {
            let filterData
            filterData=res.Data.map((item,index)=>{
              return({
                  value: item.CCA_CODE,
                  label: item.CCA_Name_Loc
              })
            })
            console.log('filterData',filterData)
            this.setState({optionACC:[...filterData]}) 
          }
         
      })
    }
    

    fnHandleGetByUserID = async(id)=>{
        
      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      let UserID = await CheckUseID()
      const username = User.username
      const password =User.password
      
      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [
            UserID
          ],
          StoreProcedureName: "SP_USER_GETBID",
          SchemaName: Path.sqlName
      }
      let formData = new FormData();
      formData.append('data', JSON.stringify(valuef))
      await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status===200)
          {
            console.log(res.Data)
              const {userItem}= this.state
            this.setState({userItem:{...userItem,User_ID:res.Data[0].User_ID,Full_Name:res.Data[0].Full_Name,Phone:res.Data[0].Phone,User_Name:res.Data[0].User_Name,CCA:res.Data[0].CCA_CODE}})  
          }
         
      })
    }

    fnHandleUpdateUser=async()=>{
   
      const {userItem}= this.state
      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      const username = User.username
      const password = User.password
      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [ 
              userItem.User_ID,
              userItem.Full_Name,
              userItem.Phone,
              userItem.CCA
          ],
          StoreProcedureName: "SP_USER_UPDATE",
          SchemaName: Path.sqlName
      }
      let formData = new FormData();
      formData.append('data', JSON.stringify(valuef))
      ApiAuthority(username, password, Token, formData, async res => {
         
          if(res.Status===200)
          {
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Cập nhật thành công',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.handleGetName()
              this.setState({showModal:false})
          }
          else
          {
              // this.fnHandleDeptGetAll()
              Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Không được để trống ',
                  showConfirmButton: false,
                  timer: 1500
                })
               
          }
         
      })
  }
  handleGetItemOption= (valueItem,option)=>{
    var value 
    if(valueItem)
    {

      value= option.filter((item)=>{
       
        if(Number(item.value)=== Number(valueItem))
        {
         
          return item
        }
        else if(item.value=== valueItem || item.label===valueItem)
        {
          return item
        }
       
        
      })
    }
    return value
  }
    render(){
      const {pathname,nameuser,fullName,optionACC,Permission_ID,showModal,selectProvince,userItem,optionsProvinceI,optionDeptI} = this.state
      
      console.log('userItem',userItem)
        return(
            <>
              <Navbar className={clsx(Style.main)} style={{zIndex:2}}  expand="lg">
                <Container style={{width:'100% '}}>
                  <Navbar.Brand className={clsx(Style.brand)} href="#home">
                    <div className={clsx(Style.wrapLogo)}>

                      <img src={logo} className={clsx(Style.imgLogo,'img-fluid')} style={{padding:'10px'}}  alt='avatar'/>
                    </div>
                  </Navbar.Brand>
                  <Navbar.Toggle className={clsx(Style.btnMenu)} aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse className={clsx(Style.Collapse)} id="basic-navbar-nav">
                    <Nav className={clsx(Style.nav,"me-auto")}>
                      <Nav.Link to={dashboard}  as={NavLink}   className={clsx(Style.itemNav,pathname===dashboard ||pathname=='/' ? 'headnav' :null)} >{lang.home}</Nav.Link>
                      <Nav.Link to={statistical}  as={NavLink}  className={clsx(Style.itemNav,pathname===statistical ? 'headnav' :null)} >Thống Kê</Nav.Link>
                      <Nav.Link to={users}  as={NavLink}   className={clsx(Style.itemNav,pathname===users ? 'headnav' :null)} >Người Dùng</Nav.Link>
                      <Nav.Link  to={log}  as={NavLink}  className={clsx(Style.itemNav,pathname===log ? 'headnav' :null)} >{lang.history}</Nav.Link>
                      <Nav.Link  to={properties}  as={NavLink} className={clsx(Style.itemNav,pathname===properties ? 'headnav' :null)} >Thuộc tính</Nav.Link>
                      {
                        userItem.Permission_ID==='ADM001'?
                        <Nav.Link onClick={()=>{this.handleChangePage(statistical)}} className={clsx(Style.itemNav,pathname===statistical ? 'headnav' :null)} >{lang.users}</Nav.Link>
                        :null
                      }
                      
                     
                    </Nav>
                    <div className={clsx(Style.blockRight,"d-flex")}>
                      
                        <div className={clsx(Style.userWrap)}>
                          <div className={clsx(Style.decription)}>
                          <div className="d-flex flex-column text-end">
                            <span id="admin-navbar-email" className="px-2">{lang.hello}
                             <span className="fw-bold"style={{color:'var(--love-color-5)'}}>{CheckFullName()}  </span>!</span>
                             
                             </div>
                              
                            <NavDropdown  className={clsx(Style.dropdown,'dropNav')} title="Tùy Chỉnh" id="basic-nav-dropdown">
                              <NavDropdown.Item onClick={()=>this.setState({showModal:true})} className={clsx(Style.dropdownItem)} href="#action/3.1">Cá nhân</NavDropdown.Item>
                              <NavDropdown.Item onClick={()=>{this.handleSingout()}} className={clsx(Style.dropdownItem)}  href="#action/3.2">đăng xuất</NavDropdown.Item>
                            </NavDropdown>
                            
                          </div>
                         
                        </div>
                        <div className={clsx(Style.imgAvatar)}>
                            <img src={pexels} className={clsx(Style.imgAvatarItem,'img-fluid')}  alt='avatar'/>
                        </div>
                    </div>
                  </Navbar.Collapse>
                      
                   
                  
                </Container>
              </Navbar>
             
              <Modal show={showModal} size="lg"  onHide={()=>this.setState({showModal:false})}  centered>
                <Modal.Header closeButton>
                <Modal.Title>Chi tiết:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div className="row">

                            <div className="col-12 col-md-6">
                                <label>User ID</label>
                                <input readOnly style={{backgroundColor:'#c5c5c5', padding:'5px'}}  
                                className="w-100" placeholder="" 
                                value={userItem.User_ID}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Fullname</label>
                                <input  className="w-100 p-2"placeholder="" value={userItem.Full_Name}
                                onChange={(e)=>this.setState({userItem:{...userItem,Full_Name:e.target.value}})}

                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>UserDomain</label>
                                <input readOnly style={{backgroundColor:'#c5c5c5'}} 
                                className="w-100 p-2" placeholder="" value={userItem.User_Name}
                               
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Phone Number</label>
                                <input  className="w-100 p-2" placeholder="" value={userItem.Phone}
                               
                                onChange={(e)=>this.setState({userItem:{...userItem,Phone:e.target.value}})}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>CCA </label>
                              <Select className=" input inputRadius selectInsert "  
                                value={this.handleGetItemOption(userItem.CCA,optionACC)}
                                onChange={(e)=>this.setState({userItem:{...userItem,CCA:e.value}})}
                                options={optionACC}
                              />
                            </div>
                           
                           
                    
                        </div>
                    </Form.Group>
                   
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>this.setState({showModal:false})}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={()=>this.fnHandleUpdateUser()} >
                    Cập nhật
                </Button>
                </Modal.Footer>
            </Modal>
             
            </>
        )
    }
   
}
function ShareState(state) {
	return {
		cart: state.cart
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ changeToEng, changeToVn }, dispatch);
}
export default connect(ShareState, mapDispatchToProps, null)(ClientNavbar);
ClientNavbar.contextType = CartContext;
// export default ClientNavbar
