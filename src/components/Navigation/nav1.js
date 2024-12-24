import React,{ useState } from 'react';
import  {NavLink} from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import logo from '../../logo.svg';
import './navbar.css'
function Navigation(){
  const [toggleMenu, setToggleMenu] = useState(false);
  const [navbar, setNavbar]= useState(false);
function showDropDown(){
  console.log('a')
}

const changeBackground = ()=>{
  if( window.scrollY >= 80){  
    setNavbar(true);
  }else{
    setNavbar(false);
  }
 
}
window.addEventListener('scroll', changeBackground);
  return (

    <AuthUserContext.Consumer>
      
      {authUser =>
        authUser ? (
          <div className={navbar? 'rap  active ' : 'rap'}>
  <div className="gpt3__navbar " >
            <div className="gpt3__navbar-links ">
            <div className='myLogo'><p>AASTU-IOT </p></div>
          
           
          
            
            </div>
            <NavigationAuth authUser={authUser} />

            <div className="gpt3__navbar-menu">
            {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
          <p>
      <NavLink to={ROUTES.LANDING}activeClassName="active-class" exact>Landing</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.HOME} activeClassName="active-class" exact>Home</NavLink>
    </p>
    <div class="nav-item dropdown">
      <p>
      <p  activeClassName="active-class" exact>Pages</p>

      </p>
                    <div class="dropdown-content">
                    <NavLink to={ROUTES.ACCOUNT} activeClassName="active-class" exact>Generic</NavLink>
                    <NavLink to={ROUTES.ACCOUNT} activeClassName="active-class" exact>Element</NavLink>
                    </div>
                </div>
    <p>
      <NavLink to={ROUTES.ACCOUNT} activeClassName="active-class" exact>Account</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.EDIT_PORTFOLIO} activeClassName="active-class" exact>Edit-Portfolio</NavLink>
    </p>
    <p>
      <NavLink to={`portfolio/${authUser.uid}/home`} activeClassName="active-class" exact>See-Portfolio</NavLink>
    </p>
    {!!authUser.roles[ROLES.ADMIN] && (
      <p>
        <NavLink to={ROUTES.ADMIN} activeClassName="active-class" exact>Admin</NavLink>
      </p>
    )}
    <div className="gpt3__navbar-sign">
    <p>
      <SignOutButton />
    </p>
    </div>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
          <SignOutButton />

          </div>
        </div>
        )}
            </div>
          </div>
         
          </div>
        
  
        ) : (
          <div className={navbar? 'rap active' : 'rap'}>
            <div className="gpt3__navbar  ">
            <div className="gpt3__navbar-links ">
            <div className='myLogo'><p>AASTU IOT </p></div>
             
            
          
            
            </div>
            <NavigationNonAuth />
            <div className="gpt3__navbar-menu">
            {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
         
    <p>
      <NavLink to={ROUTES.LANDING} activeClassName="active-class" exact>Landing</NavLink>
    </p>
     <p>
     {/* <NavLink to={ROUTES.PORTFOLIO} activeClassName="active-class" exact>Portfolio</NavLink> */}

     </p>
    <div className="gpt3__navbar-sign">
    <p>
      <button>
      <NavLink to={ROUTES.SIGN_IN} >Sign In</NavLink>
    </button>
    </p>
    </div>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
          <button>
      <NavLink to={ROUTES.SIGN_IN} >Sign In</NavLink>
    </button>
          </div>
        </div>
        )}
            </div>
          </div>
          </div>
        )
      }
    </AuthUserContext.Consumer>
  )
};

const NavigationAuth = ({ authUser }) => (
  
 <div className="gpt3__navbar-links_container"> 
 <p>
      <NavLink to={ROUTES.LANDING} activeClassName="active-class" exact>Landing</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.EDIT_PORTFOLIO} activeClassName="active-class" exact>Edit-Portfolio</NavLink>
    </p>
    <p>
    <NavLink to={`portfolio/${authUser.uid}/home`} activeClassName="active-class" exact>See-Portfolio</NavLink>

    </p>
    <p>
      <NavLink to={ROUTES.HOME} activeClassName="active-class" exact>Home</NavLink>
    </p>
    <div class="nav-item dropdown">
      <p>
      <NavLink to={''} activeClassName="active-class" exact>Pages</NavLink>

      </p>
                    <div class="dropdown-content">
                    <NavLink to={''} activeClassName="active-class" exact>Generic</NavLink>
                    <NavLink to={''} activeClassName="active-class" exact>Element</NavLink>
                    </div>
                </div>
    <p>
      <NavLink to={ROUTES.ACCOUNT} activeClassName="active-class" exact>Account</NavLink>
    </p>
    {!!authUser.roles[ROLES.ADMIN] && (
      <p>
        <NavLink to={ROUTES.ADMIN} activeClassName="active-class" exact>Admin</NavLink>
      </p>
    )}
    <div className="gpt3__navbar-sign">
    <p>
      <SignOutButton />
    </p>
    </div>
   
 </div>
    



);

const NavigationNonAuth = () => (
 <div className="gpt3__navbar-links_container">


    <p>
      <NavLink to={ROUTES.LANDING} activeClassName="active-class" exact>Landing</NavLink>
    </p>
    <p>
    {/* <NavLink to={ROUTES.PORTFOLIO} activeClassName="active-class" exact>Portfolio</NavLink> */}

    </p>
    <div className="gpt3__navbar-sign">
    <button>
      <NavLink to={ROUTES.SIGN_IN} >Sign In</NavLink>
    </button>
    </div>
  

 </div>


 
);

export default Navigation;
