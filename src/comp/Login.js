import React ,{useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import {  setUser } from '../Slicers/userSlicer';
import { selectConfig1} from '../Slicers/configSlicer';
import { useSelector , useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
const Login = () => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const config = useSelector(selectConfig1)
  const dispatch = useDispatch()
  const nav = useNavigate()
const login = async()=>{
    let data = JSON.stringify({
      username:username,
      password:password
    })
    axios.post('https://n2mu-server.herokuapp.com/login/',data,config).then((response)=>{
      if(response.status===200){
      localStorage.setItem('token',JSON.stringify(response.data.access));
      let decodedToken = jwt_decode(response.data.access);
      let user = {
        id:decodedToken.user_id,
        username:decodedToken.username,
        email:decodedToken.email,
        profileImg:decodedToken.profileImg
      };
      dispatch(setUser(user));
      nav('/')
    }
    }).catch((error)=>alert(error+'\n Check Username/Password and try again !'))
};
// Register
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [Email, setEmail] = useState('')
  const [ProfileImg, setProfileImg] = useState()

const register = async()=>{
  const data =new FormData();
  data.append('username',Username)
  data.append('password',Password)
  data.append('email',Email)
  data.append('img',ProfileImg)  
  let config = {headers:{'Content-Type':'multipart/form-data'}}
  axios.post('https://n2mu-server.herokuapp.com/register/',data,config).then((response)=>{if(response.status===200){
    alert(response.data.output+'\nYou can Login now.')
    window.location.href='/login'
    
  }}).catch((error)=>alert(error))
}


  return (
    <div>
    
  {/* Register Modal */}
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Register</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
            </div>
                 <div className="modal-body">
                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                          <input type="text"  className="form-control" id="email" placeholder="Email@gmail.com" value={Email} onChange={((e)=>setEmail(e.target.value))}/>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                          <input type="password" className="form-control" id="inputPassword" placeholder='*****' value={Password} onChange={((e)=>setPassword(e.target.value))}/>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="username" placeholder='JackTheReaper1888' value={Username} onChange={((e)=>setUsername(e.target.value))}/>
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label htmlFor="profileImg" className="col-sm-2 col-form-label">Profile Image</label>
                        <div className="col-sm-10">
                          <input type="file" accept='.png,.jpg,.ico,.jpeg' className="form-control" id="profileImg"  onChange={(e)=>setProfileImg(e.target.files[0])}/>
                        </div>
                      </div>
                </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={()=>register()}>SignUp</button>
            </div>
          </div>
        </div>
      </div>
    {/*  */}

    <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-white" style={{background:'black'}}>
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
      
                      <div className="text-center">
                        <img src={process.env.PUBLIC_URL+'/images/logo.png'}
                          style={{width: '155px', border: '2px solid white',borderRadius: '50px'}} alt="logo"/>
                        <h4 className="mt-1 mb-5 pb-1">Nice 2 Meet U !</h4>
                      </div>
      
                      <form>
                        <p>Please login to your account</p>
      
                        <div className="form-outline mb-4">
                          <input type="email" id="form2Example11" className="form-control"
                            placeholder="Username "  value={username} onChange={(e)=>setusername(e.target.value)}/>
                          <label className="form-label" htmlFor="form2Example11">Username</label>
                        </div>
      
                        <div className="form-outline mb-4">
                          <input type="password" placeholder="Password" id="form2Example22" className="form-control" value={password}
                          onChange={(e)=>setpassword(e.target.value)}/>
                          <label className="form-label" htmlFor="form2Example22">Password</label>
                        </div>
      
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-outline-primary" type="button" onClick={()=>login()}>
                            Login
                        </button>
                          <Link className="btn btn-link" to={'#'}>Forgot password?</Link>
                        </div>
      
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" className="btn btn-outline-success"data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create new</button>
                        </div>
      
                      </form>
      
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2" style={{background:'linear-gradient(to left,  #00ffff,   #008080)'}}>
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">A Social Network Application</h4>
                      <p className="small mb-0">The one thing that makes us the best social platform, <br/> <strong>Unlimited Likes!</strong>
                        we let every single one of our users to determine how many like he/she gets on a post,
                        dont be shy and join us! 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Login