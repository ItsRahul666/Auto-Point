import { useState ,useEffect } from "react";
import {useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { ClipLoader } from "react-spinners";
import apiServices from "../services/apiServices";
export default function Login(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const[message,setMessage]=useState()
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"55%",
        "zIndex":"1",
    }
    useEffect(()=>{
        setMessage(sessionStorage.getItem("message"))
        if(message){
            toast.error(message)
            setTimeout(()=>{
                sessionStorage.removeItem("message")
            },2000)
        }
    },[message])
    const [email, setEmail]=useState()
    const [pass, setPassword]=useState()
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data={
            email:email,
            password:pass
        }
        // console.log("data is ", data)
        apiServices.login(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1000)
            if(data.data.success){
                // console.warn(data.data.token)
                sessionStorage.setItem("user_name", data.data.data.userId.name)
                sessionStorage.setItem("user_email", data.data.data.email)
                sessionStorage.setItem("token", data.data.token)
                sessionStorage.setItem("user_type", data.data.data.userId?.userType)
                sessionStorage.setItem("authenticate",true)
                sessionStorage.setItem("status",data.data.data.status)
                    toast.success(data.data.message)
                    if(data.data.data.userType==1|| data.data.data.userType=="1"){
                        navigate("/admin")
                    }
                    else if(data.data.data.userId?.userType==3|| data.data.data.userId?.userType=="3"){
                        navigate("/mechanic")
                      sessionStorage.setItem("user_id", data.data.data.userId?._id)

                    }
                    else{
                        navigate("/")
                        sessionStorage.setItem("user_data", JSON.stringify(data.data.data))
                        sessionStorage.setItem("user_id", data.data.data.userId?._id)
                    }
            }
            else{
                toast.error("Invalid credentials or access block, please contact admin!!")
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went Wrong")
            setTimeout(()=>{
                setLoading(false)
            },1000)
        })
    }
    const changeEmail=(e)=>{
        setEmail(e.target.value)
    }
    const password=(e)=>{
        setPassword(e.target.value)
    }
    return(
        <>
        <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>  
        <section className=" mt-5 bg-image"
        style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3 mt-5">
          <div className="container h-100 mt-3">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: "15px"}}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center  mb-5">Login</h2>
      
                    <form onSubmit={handleForm}>
      
                      {/* <div className="form-outline mb-4">
                        <input required type="text" id="form3Example1cg" className="form-control form-control-lg" />
                        <label className="form-label" for="form3Example1cg">Your Name</label>
                      </div> */}
      
                      <div className="form-outline mb-4">
                        <input required type="email" id="form3Example3cg" className="form-control form-control-lg" value={email} onChange={changeEmail}/>
                        <label className="form-label" for="form3Example3cg">Your Email</label>
                      </div>
      
                      <div className="form-outline mb-4">
                        <input required type="password" id="form3Example4cg" className="form-control form-control-lg" value={pass} onChange={password}/>
                        <label className="form-label" for="form3Example4cg">Password</label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit"
                          className="btn btn-info btn-block btn-lg gradient-custom-4 text-body">Login</button>
                      </div>
      
                   
                    </form>
      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      </>
    )
    }