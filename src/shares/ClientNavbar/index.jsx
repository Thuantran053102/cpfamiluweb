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
import { dashboard ,member} from "../../api/SubUrl";
import { Path } from "../../api/Path";
import { CheckTOkenRule,CheckUserRule } from "../Func";
import { ApiAuthority } from "../../api/User";
const lang = LoadLang();
class ClientNavbar extends Component{
  constructor(props)
  {
    super(props)
    this.state={
      nameuser:'',
      pathname:window.location.pathname,
      isLoading:false
    }
  }
  componentDidMount=()=>{
    this.handleGetName()
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
          StoreProcedureName: "SP_USER_NAME",
          SchemaName:"SQL01UAT"
          }
      let formData = new FormData();
      formData.append('data',JSON.stringify(valuef))
      ApiAuthority(username,password,Token,formData,async res => {
         
          if(res.Status===200)
          {   
            
              this.setState({nameuser:res.Data[0].Full_Name,isLoading:false})
          }
      })
  }
    render(){
      const {pathname,nameuser} = this.state
      console.log(pathname)
        return(
            <>
              <Navbar className={clsx(Style.main)}  expand="lg">
                <Container>
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

                      {/* <NavDropdown  className={clsx(Style.dropdown)} title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item className={clsx(Style.dropdownItem)} href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                          Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                          Separated link
                        </NavDropdown.Item>
                      </NavDropdown> */}
                      
                     
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
                             <span className="fw-bold"style={{color:'var(--love-color-5)'}}>  {  nameuser}</span>!</span>
                             
                             </div>
                              
                            <NavDropdown  className={clsx(Style.dropdown,'dropNav')} title="Donor" id="basic-nav-dropdown">
                              <NavDropdown.Item className={clsx(Style.dropdownItem)} href="#action/3.1">Cá nhân</NavDropdown.Item>
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
