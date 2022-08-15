import React, { useEffect } from 'react';
import { Outlet , Link } from 'react-router-dom';
import { selectUser, setUser } from '../Slicers/userSlicer';
import {selectConfig1, selectUrl} from '../Slicers/configSlicer';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { selectFeed, setFeed } from '../Slicers/feedSlicer';
const Nav = () => {
  const imgurl = useSelector(selectUrl);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const Feed = useSelector(selectFeed)
  const config = useSelector(selectConfig1)
useEffect(() => {
    async function getFeed(){
      axios.get('https://n2mu-server.herokuapp.com/feed/',config).then((response)=>{
        console.log('requested')
        dispatch(setFeed(response.data))
      }).catch((error)=>{console.log(error)})
    };
    if(Feed.length===0){
      getFeed();
    } 
}, [config,Feed,dispatch]);
  
  return (
<div className="hero_area">  
    <header className="header_section">
        <div className="container">
          <div className="top_contact-container">
            <div className="tel_container">
              <Link to={"#"} onClick={()=>alert('+9728724433')}>
                <img src={process.env.PUBLIC_URL +'/images/telephone-symbol-button.png'} alt=""/>
              </Link>
            </div>
            <div className="social-container">
              <Link to={"https://www.facebook.com/login.php/"}>
                <img src={process.env.PUBLIC_URL +'/images/fb.png'} alt="" className="s-1"/>
              </Link>
              <Link to={"https://www.instagram.com/"}>
                <img src={process.env.PUBLIC_URL +'/images/instagram.png'} alt="" className="s-3"/>
              </Link>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
            <Link className="navbar-brand" to={'/'}>
              <img src={process.env.PUBLIC_URL +'/images/logo.png'} alt=""/>
              <span>
                Nice2MeetU
              </span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
  
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex  flex-column flex-lg-row align-items-center w-100 justify-content-between">
                <ul className="navbar-nav  ">
                  <li className="nav-item active">
                    <Link className="nav-link" to={"/"}>Feed <span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item">
                    <Link className='nav-link' to={'#'}>About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'#'}> News </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"#"}>Contact us</Link>
                  </li>
                </ul>
                <div className="login_btn-contanier ml-0 ml-lg-5">
               {user ? (
              <>
                 <Link  to={'#'} onClick={()=>{localStorage.removeItem('token');dispatch(setUser(null));window.location.reload()}}>
                      <img src={imgurl+user.profileImg} alt='images/user.png' style={{height:'30px',width:'25px',borderRadius:'10px',border:'2px groove #00ffff'}}/>
                    <span>
                     {user.username}
                    </span>
                  </Link>
                  </>
               ):(
                <>
                <Link to={'login'}>
                   <img src={process.env.PUBLIC_URL +'/images/user.png'} alt=""/>
                   <span>
                     Login
                   </span>
                 </Link>
               </>
               )}
               </div>  
              </div>
            </div>
          </nav>
        </div>
      </header>



        <Outlet/> 
      </div>

  )
}

export default Nav