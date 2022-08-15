import React, { useEffect , useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectConfig1, selectUrl } from '../Slicers/configSlicer'
import {selectFeed,selectPostID,setFeed, setPostID} from '../Slicers/feedSlicer'
import {selectUser} from '../Slicers/userSlicer'
import { selectAllComments, selectCommentsPost, setAllComments, setCommentsPost } from '../Slicers/commentsSlicer'
const Home = () => {
  const config = useSelector(selectConfig1)
  const Feed = useSelector(selectFeed)
  const dispatch = useDispatch()
  const imgurl = useSelector(selectUrl)
  const user = useSelector(selectUser)
  const nav = useNavigate()
  

const getLike=async(post)=>{
    let data = JSON.stringify({
      post_id:post.id,
    })
    axios.put('https://n2mu-server.herokuapp.com/like/',data,config).then((response)=>{
      }).then(()=>{
        let likesCount =  Number(document.getElementById(post.id).value);
        let Nvalue = likesCount +1
        document.getElementById(post.id).value=Nvalue
        });
};

// Post Feed
const [IMG, setIMG] = useState('')
const [Content, setContent] = useState('')

const uploadFeed = async()=>{
    const data = new FormData();
    let config = {headers:{'Content-Type':'multipart/form-data'}}
    data.append('content',Content);
    data.append('img',IMG);
    data.append('user',user.id);
    axios.post('https://n2mu-server.herokuapp.com/upload-feed/',data,config).then((res)=>{
      if(res.status===200){
        alert(res.data)
        dispatch(setFeed([]));
        nav('/')
      }
    })
};

// Comments
const postID = useSelector(selectPostID)
const AllComments = useSelector(selectAllComments)
const commentsPost = useSelector(selectCommentsPost)
useEffect(()=>{
  if(AllComments.length===0){
    return async()=>{
      axios.get('https://n2mu-server.herokuapp.com/comments/',config).then((response)=>{
        dispatch(setAllComments(response.data));
      })}}
},[AllComments,dispatch,config])

function PreviewImage() {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

  oFReader.onload = function (oFREvent) {
      document.getElementById("uploadPreview").src = oFREvent.target.result;
  };
}; 
useEffect(()=>{
   function getComments(){
    const selectedFew = []
    AllComments.forEach((comment)=>{
      if(comment.post===postID){
        selectedFew.push(comment)
      }
    });
    dispatch(setCommentsPost(selectedFew));
    dispatch(setPostID(0))
  };
  if(postID!==0){
    getComments();
  }
},[dispatch,AllComments,postID])      
    
// Testing mp3
// const player = new Audio(process.env.PUBLIC_URL+'/images/test.mp3')


  return (
    <div className='home'>
  
 {/* Post Modal Start */}
 <div className="modal fade" id="exampleModalLong"  role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header" style={{background:'black'}}>
        <h5 className="modal-title" id="exampleModalLongTitle" style={{color:' #33ffff'}}>Post</h5>
        <button type="button" className="close" style={{color:' #00ffff'}} data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body" style={{background:'black'}}>
      <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label" style={{color:' #00ffff'}}>Choose Photo</label>
      <input type="file" id="uploadImage" className="form-control" style={{background:'black',color:'#00ffff',border:'4px outset #00ffff'}} accept='.png, .jpg ,.ico, .icon, .jpeg,' onChange={(e)=>{PreviewImage();setIMG(e.target.files[0])}} />
      </div>
      <div className="mb-3" style={{background:'black',position:'relative',left:'36%'}}>
      <img id="uploadPreview" style={{width:' 150px', height: '150px',border:'2px solid #00ffff'}} alt={'...'} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label"></label>
        <textarea className="form-control" style={{border:'10px groove #00ffff',background:'black',color:' #00ffff',borderRadius:'20px'}} id="exampleFormControlTextarea1" rows="3" onChange={(e)=>setContent(e.target.value)}></textarea>
      </div>

      </div>
      <div className="modal-footer" style={{background:'black'}}>
        <button type="button" className='btn btn-light' style={{color:'red',background:' #262626',border:'0px'}} data-dismiss="modal" >discard</button>
        <button type="button" className="btn btn-primary" onClick={()=>uploadFeed()} data-dismiss="modal">Upload</button>
      </div>
    </div>
  </div>
</div>


  {/* Post Modal End */}
  {/* Comments Modal Start */}
  <div className="modal fade" id="Comments" tabIndex="-1" role="dialog" aria-labelledby="Comments" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Comments</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      {commentsPost ? (
        <>
        {commentsPost.map((comment,index)=>{
          return(
      <div className="container mt-0" key={index}>
      <div className="d-flex justify-content-left row" style={{display:'strech',alignItems:'left'}}>
      <div className="col-md-10" >
      <div className="d-flex flex-column comment-section">
      <div className="bg-white p-2" >
      <div className="d-flex flex-row user-info"><img className="rounded-circle" src={imgurl+comment._user_img} alt='' width="40"/>
      <div className="d-flex flex-column justify-content-start ml-2"><span className="d-block font-weight-bold name">{comment._username}</span><span className="date text-black-50"></span></div>
      </div>
      <div className="alert alert-secondary" style={{padding:'0',paddingTop:'10',borderRadius:'10%'}} >
      <p className="comment-text" >{comment._content}</p>
      </div></div></div></div></div></div>
          )
        })}
        </>
      ):(
        <>Be The First One To Comment On This Post!</>
      )}

      </div>
      <div className="modal-footer">
        <div className='container' style={{display:'strech'}}>
      <div className="bg-light p-2" style={{maxWidth:'100%',width:'auto'}}>
      <div className="d-flex flex-row align-items-start">{user ? (<img className="rounded-circle" src={imgurl+user.profileImg} alt='' width="40"/>):(<img className="rounded-circle" src={process.env.PUBLIC_URL+'/images/user.png'} alt='' width="40"/>)}<textarea className="form-control ml-1 shadow-none textarea"></textarea></div>
      <div className="mt-2 text-right"><button className="btn btn-primary btn-sm shadow-none" type="button">Post comment</button><button className="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button" data-dismiss="modal">Cancel</button></div>
      </div>
      </div></div>
    </div>
  </div>
</div>
  {/* Comments Modal End */}


  <section className="discount_section">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-md-5 offset-md-2">
          <div className="detail-box">
            <h2>
              Not a Premium member yet? <br/>
              try it now <br/>
              on
              <span>
                20% discount
              </span>
            </h2>
            <p>
              I always wanted to do this type of advertisement...<br/>
              by clicking "buy" you will be gifted with a video of a scraming goats.            
            </p>
            <div>
              <a href={process.env.PUBLIC_URL +'/images/scream.mp4'}>
                Buy Now
              </a>
            </div>
          </div>
        </div>
       </div>
       </div>
  </section>


  <section className="health_section layout_padding">
  
  <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-md-5 offset-md-2">
          <div className="detail-box">
            <h2>
             New Here ? <br/>
               <br/>
              <span>
                Try posting something.
              </span>
            </h2>
            
           {user ? (<div>
              <Link to={'#'}  data-toggle="modal" data-target="#exampleModalLong">
                Whats On Your Mind ?
              </Link>
            </div>):(
              <div>
              <Link to={'login'}  >
                    Login is required              
                    </Link>
            </div>
            )}
          </div>
        </div>
       </div>
       </div>

        {Feed.map((post,index)=>{
          
          return(
            <div id='FeedLooper' key={index}>
            <div className="health_carousel-container" style={{padding: '50px'}}>
              <div className="card" style={{background: 'black', borderRadius: '50px',paddingBottom: '10px'}}>
                <div className="card-body">
                  <h5 className="card-title" style={{color:'#00ffff'}}><img src={imgurl+post.userImg} style={{height:'30px',width:'30px',borderRadius:'10px'}} alt={process.env.PUBLIC_URL+'/images/client.png'}/>{post.username}</h5>
                  <p className="card-text" style={{color: 'white',paddingLeft:'50px'}}>{post.content}
                  </p>
                </div>
                <img src= {imgurl+post.img} style={{display:'block',maxHeight:'500px',maxWidth:'50%',height:'auto',width:'auto',position:'relative',left:' 20%'}} className="card-img-bottom" alt="..."/>
                <div className='container' style={{position:'relative',top: '89%', left: '0%'}}>
                <div className="bg-black" style={{color:'white',borderRadius:'15px'}}>
                  <div className="d-flex flex-row fs-12" >
                  <div className="like p-2 cursor" onClick={()=>{getLike(post);}}><i className="fa fa-thumbs-o-up" ></i><span className="ml-1">Like</span><input style={
                    {maxWidth:'30px',
                    width:'auto',
                    background:'black',
                    border:'none',
                    position:'relative',
                    color:' #0066ff',
                          }} disabled type={'text'} defaultValue={Number(post.likes)} id={post.id}></input></div>
                  {user ? (<div className="like p-2 cursor"><i className="fa fa-commenting-o"></i><span className="ml-1" data-toggle="modal" data-target="#Comments" onClick={()=>{dispatch(setPostID(post.id)); }}>Comment</span></div>):(<div className="like p-2 cursor"><i className="fa fa-commenting-o"></i><span className="ml-1" data-toggle="modal" data-target="#Comments" onClick={()=>{alert('You Need to login/register to comment');nav('/login') }}>Comment</span></div>)}
                  <div className="like p-2 cursor"><i className="fa fa-share"></i><span className="ml-1">Share</span></div>
  {/* RIGHT HERE !  */}
                  <div className="like p-2 cursor"><img src={process.env.PUBLIC_URL+'/images/headphones.png'}  style={{maxHeight:'20px',maxWidth:'20px',borderRadius:'2px',width:'auto',height:'auto'}} alt="" onClick={()=>{let player = new Audio(imgurl+post.audio);player.play()}}/></div>
  {/*               */}
                  </div>
                  </div>
          
                  </div>        
            </div>
            </div>
            </div>
          )
        })}
    </section>
</div>
  )
}

export default Home


// commentBox

// <div className="bg-light p-2">
// <div className="d-flex flex-row align-items-start"><img className="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" width="40"/><textarea className="form-control ml-1 shadow-none textarea"></textarea></div>
// <div className="mt-2 text-right"><button className="btn btn-primary btn-sm shadow-none" type="button">Post comment</button><button className="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel</button></div>
// </div>