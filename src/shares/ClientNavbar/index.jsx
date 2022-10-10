import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import clsx from "clsx";
import Style from "./ClientNavbar.module.scss"
import vn from '../../images/vn.gif';
import us from '../../images/us.gif';
import pexels from '../../images/pexels-pixabay-33045.jpg'
import logo from '../../images/logo.png'
import { bindActionCreators } from 'redux';//
import { changeToEng, changeToVn } from '../../actions';//
import { LoadLang } from '../../components/Lang';//
import { connect } from 'react-redux';
import { CartContext } from '../../contexts/CartContext';
import { dashboard ,member,log,users} from "../../api/SubUrl";
import { Path } from "../../api/Path";
import { CheckTOkenRule,CheckUserRule } from "../Func";
import { ApiAuthority } from "../../api/User";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import { handleGetLable } from "../../utils/utils";
import Swal from 'sweetalert2'

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
      selectProvince:[]
    }
  }
  componentDidMount=()=>{
    this.handleGetName()
    this.fnHandleDeptGetAll()
  }
    handleLang = (language) => {

      if (language === "en") {
        // console.log(23)
        this.props.changeToEng();
        console.log(this.props)
      } else {
        this.props.changeToVn();
      }
      document.location.reload();
    }

    handleSingout=()=>{
      localStorage.clear();
      window.location='/login'
    }
    handleChangePage=(type)=>{
      if(type===dashboard)
      {

        window.location=dashboard;
      }
      else if(type===member)
      {
          window.location=member;
      }
      else if(type===log)
      {
          window.location=log;
      }
      else if(type===users)
      {
          window.location=users;
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
          StoreProcedureName: "SP_USER_GET",
          SchemaName:"SQL01UAT"
          }
      let formData = new FormData();
      formData.append('data',JSON.stringify(valuef))
      ApiAuthority(username,password,Token,formData,async res => {
         
        
          if(res.Status===200)
          {   
            this.setState({nameuser:res.Data[0].Full_Name,isLoading:false,Permission_ID:res.Data[0].Permission_ID})
          }
      })
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
        SchemaName:"SQL01UAT"
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
            SchemaName: "SQL01UAT"
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

        fnHandleDeptGetAll=async()=>{
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username = User.username
        const password = User.password
        const valuef = {
            "DataBaseName": Path.DataBaseName,
            Params: [ 
            ],
            StoreProcedureName: "CP_DEPT_GETALL",
            SchemaName: "SQL01UAT"
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(valuef))
        ApiAuthority(username, password, Token, formData, async res => {
            if(res.Status===200)
            {
         
                this.setState({optionDeptI:res.Data.map((item)=>{
                  return({
                      value: item.DEPT_ID,
                      label: item.DEPT_Name
                  })

              })}) 
              
            }
           
           
        })
    }

    fnHandleGetProvinceByUserID = async(id)=>{
        
      let Token = await CheckTOkenRule();
      let User = await CheckUserRule();
      const username = User.username
      const password =User.password
      
      const valuef = {
          "DataBaseName": Path.DataBaseName,
          Params: [
              id
          ],
          StoreProcedureName: "SP_PROVINCE_GETBYUSERID",
          SchemaName: "SQL01UAT"
      }
      let formData = new FormData();
      formData.append('data', JSON.stringify(valuef))
      await ApiAuthority(username, password, Token, formData, async res => {
          if(res.Status===200)
          {
              
              this.setState({selectProvince:res.Data.map(function(item){
                return{
                    value:item.Province_ID,
                    label:item.Province_Name
                }
            })}) 
             
             
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
              userItem.DeptID.value?userItem.DeptID.value:userItem.DeptID,
              userItem.Email,
              userItem.Phone
          ],
          StoreProcedureName: "SP_USER_UPDATE",
          SchemaName: "SQL01UAT"
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
               
          }
          else
          {
              this.fnHandleDeptGetAll()
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
    render(){
      const {pathname,nameuser,Permission_ID,showModal,selectProvince,userItem,optionsProvinceI,optionDeptI} = this.state
    
      
        return(
            <>
              <Navbar className={clsx(Style.main)} style={{zIndex:2}}  expand="lg">
                <Container style={{width:'100% '}}>
                  <Navbar.Brand className={clsx(Style.brand)} href="#home">
                    <div className={clsx(Style.wrapLogo)}>

                      <img src={logo} className={clsx(Style.imgLogo,'img-fluid')}  alt='avatar'/>
                    </div>
                  </Navbar.Brand>
                  <Navbar.Toggle className={clsx(Style.btnMenu)} aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse className={clsx(Style.Collapse)} id="basic-navbar-nav">
                    <Nav className={clsx(Style.nav,"me-auto")}>
                      <Nav.Link onClick={()=>{this.handleChangePage(dashboard)}} className={clsx(Style.itemNav,pathname===dashboard ||pathname=='/' ? 'headnav' :null)} >{lang.home}</Nav.Link>
                      <Nav.Link onClick={()=>{this.handleChangePage(member)}} className={clsx(Style.itemNav,pathname===member ? 'headnav' :null)} >{lang.member}</Nav.Link>
                      <Nav.Link onClick={()=>{this.handleChangePage(log)}} className={clsx(Style.itemNav,pathname===log ? 'headnav' :null)} >{lang.history}</Nav.Link>
                      {
                        userItem.Permission_ID==='ADM001'?
                        <Nav.Link onClick={()=>{this.handleChangePage(users)}} className={clsx(Style.itemNav,pathname===users ? 'headnav' :null)} >{lang.users}</Nav.Link>
                        :null
                      }
                      
                     
                    </Nav>
                    <div className={clsx(Style.blockRight,"d-flex")}>
                      <button className={clsx( Style.btnTranslate,"btn btn-link nav-link")} onClick={() => this.handleLang("vn")}>
                        <img src={vn} /></button>
                      <button className={clsx(Style.btnTranslate,"btn btn-link nav-link")} onClick={() => this.handleLang("en")}>
                        <img src={us} />
                        </button>
                        <div className={clsx(Style.userWrap)}>
                          <div className={clsx(Style.decription)}>
                          <div className="d-flex flex-column text-end">
                            <span id="admin-navbar-email" className="px-2">{lang.hello}
                             <span className="fw-bold"style={{color:'var(--love-color-5)'}}>  {userItem.Full_Name}</span>!</span>
                             
                             </div>
                              
                            <NavDropdown  className={clsx(Style.dropdown,'dropNav')} title="Donor" id="basic-nav-dropdown">
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
                                <label>Mã người dùng</label>
                                <input readOnly style={{backgroundColor:'#c5c5c5', padding:'5px'}}  
                                className="w-100" placeholder="" 
                                value={userItem.User_ID}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Tên người dùng</label>
                                <input  className="w-100 p-2"placeholder="" value={userItem.Full_Name}
                                onChange={(e)=>this.setState({userItem:{...userItem,Full_Name:e.target.value}})}

                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>User Domain</label>
                                <input readOnly style={{backgroundColor:'#c5c5c5'}} 
                                className="w-100 p-2" placeholder="" value={userItem.User_Name}
                               
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Email</label>
                                <input  className="w-100 p-2" placeholder="" value={userItem.Email}
                               
                                onChange={(e)=>this.setState({userItem:{...userItem,Email:e.target.value}})}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Số điện thoại</label>
                                <input  className="w-100 p-2" placeholder="" value={userItem.Phone}
                                 onChange={(e)=>this.setState({userItem:{...userItem,Phone:e.target.value}})}
                                 />
                            </div>
                            <div className="col-12 col-md-6">
                                <label>Bộ Phận</label>
                                <Select style={{backgroundColor:'#c5c5c5', padding:'5px'}} 
                                   
                                    className={clsx(Style.category, 'w-100')} 
                                   
                                    defaultValue={handleGetLable(optionDeptI,userItem.DeptID)}  
                                />
                               
                            </div>
                            <div className="col-12 ">
                                <label>Các tỉnh đang quản lý</label>
                            
                                
                                <Select readOnly={true}  backgroundColor={'#c5c5c5'}
                                    value={ selectProvince} 
                                    
                                    defaultValue={optionsProvinceI} 
                                    className={clsx(Style.category,'w-100')}
                                    isMulti 
                                 ></Select>
                               
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
