import { useState ,useEffect } from "react";
import {useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { ClipLoader } from "react-spinners";
import apiServices from "../../services/apiServices";
export default function UpdateProfile(){
  const navigate=useNavigate()
  const [loading,setLoading]=useState(true)
  const override={
      "display":"block",
      "margin":"0 auto",
      "position":"absolute",
      "top":"55%",
      "zIndex":"1",
  }
  const [email, setEmail]=useState()
  const [pass, setPassword]=useState()
  const [fname,setFname]=useState()
  const [lname,setLname]=useState()
  const [address,setAddress]=useState()
  const [city,setCity]=useState()
  const [state,setState]=useState()
  const [gender,setGender]=useState()
  const [contact,setContact]=useState()
  useEffect(()=>{
    let data={
        _id:sessionStorage.getItem("user_id")
    }
    apiServices.singleCustomer(data).then((data)=>{
      setTimeout(()=>{
        setLoading(false)
    },1500)
      if(data.data.success){
        setAddress(data.data.data.address)
        setContact(data.data.data.contact)
        setFname(data.data.data.firstName)
        setLname(data.data.data.lastName)
        setCity(data.data.data.city)
        setEmail(data.data.data.email)
        setGender(data.data.data.gender)
        setState(data.data.data.state)
      }
      else{
        toast.error(data.data.message)
    }
    }).catch((err)=>{
        toast.error("Something Went Wrong!!")
        setTimeout(()=>{
            setLoading(false)
        },1500)
    })
  },[])
  const handleForm=(e)=>{
      e.preventDefault()
      setLoading(true)
      let data={
         "email":email,
         "password":pass,
         "firstName":fname,
         "lastName":lname,
         "address":address,
         "city":city,
         "state":state,
         "gender":gender,
         "contact":contact,
         "id":sessionStorage.getItem("user_id")
      }
      // console.log(data, gender)
      apiServices.updateCustomer(data).then((data)=>{
        setTimeout(()=>{
          setLoading(false)
        },1500)
          setTimeout(()=>{
              setLoading(false)
          },1000)
          if(data.data.success){
            toast.success(data.data.message)
          
          }
          else{
              toast.error(data.data.message)
          }
      }).catch((error)=>{
          console.log(error)
          toast.error("Something went Wrong")
          setTimeout(()=>{
              setLoading(false)
          },1500)
      })
    }
    function checkContact(){
      var contact=document.getElementById('contact').value 
      var pattern_contact=/^[6-9]{1}[0-9]{9}$/
      if(pattern_contact.test(contact)){
          document.getElementById('error_contact').innerHTML=""
      }
      else{
          document.getElementById('contact').value=""
          document.getElementById('error_contact').innerHTML="Please Enter Valid Contact"
      }
  }
  function checkEmail(){
      var email=document.getElementById('email').value
      // console.log(email)
      var pattern_email=/^[a-zA-Z0-9/./-/_]+\@+[a-zA-Z0-9]+\.+[a-zA-Z]{2,3}$/
      if(pattern_email.test(email)){
          console.log('valid')
          document.getElementById('error_email').innerHTML=""
      }
      else{
          console.log('invalid')
          document.getElementById('email').value=""
          document.getElementById('error_email').innerHTML="Please Enter Valid email"
      }
  }
    return(
    <>
    <div className="d-flex justify-content-center">
      <ClipLoader loading={loading} cssOverride={override} size={120}/>
    </div>
    <div className={loading?"disabled-screen-full":""}> 
      <section className=" mt-5 bg-image">
        <div className="container pt-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="card card-registration my-4">
                  <div className="col-xl-10 offset-md-1">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">User registration form</h3>
                      <form method="post" onSubmit={handleForm}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input required type="text" className="form-control form-control-lg" value={fname} onChange={(e)=>{setFname(e.target.value)}} />
                            <label className="form-label" for="form3Example1m">First name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input required type="text" className="form-control form-control-lg" value={lname} onChange={(e)=>{setLname(e.target.value)}}/>
                            <label className="form-label" for="form3Example1n">Last name</label>
                          </div>
                        </div>
                      </div>

                      
                      <div className="form-outline mb-4">
                        <input required type="text" className="form-control form-control-lg"  value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                        <label className="form-label" for="form3Example8">Address</label>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input required type="text" className="form-control form-control-lg" value={city} onChange={(e)=>{setCity(e.target.value)}} />
                            <label className="form-label" for="form3Example1m">City</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input required type="text" className="form-control form-control-lg" value={state} onChange={(e)=>{setState(e.target.value)}}/>
                            <label className="form-label" for="form3Example1n">State</label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input required type="text" className="form-control form-control-lg" value={contact} onChange={(e)=>{setContact(e.target.value)}} id="contact" onBlur={checkContact}/>
                            <span id="error_contact" class="text-danger"></span>
                            <label className="form-label" for="form3Example1m">Contact</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline border pt-3 pb-2 ps-3">
                            <input required type="radio" className="form-check-input"  name="gender"/><span className="px-2" checked={gender=='Male'} onClick={(e)=>{setGender('Male')}}>Male</span>
                            <input required type="radio" className="form-check-input" name="gender" /><span className="ps-2" checked={gender=='Female'}  onClick={(e)=>{setGender('Female')}}>Female</span>
                            </div>
                            <label className="form-label" for="form3Example1n">Gender</label>
                          
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <input required type="email" className="form-control form-control-lg" placeholder="example@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" onBlur={checkEmail}/>
                  <span id="error_email" class="text-danger"></span>
                        <label className="form-label" for="form3Example97">Email Id</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input required type="password" className="form-control form-control-lg" value={pass} onChange={(e)=>{setPassword(e.target.value)}} />
                          <label className="form-label" for="form3Example99">Password</label>
                        </div>

                      <div className="d-flex justify-content-end pt-3">
                        <button   type="submit"
                        className="btn btn-primary btn-lg ms-2">Update</button>
                      </div>
                      </form>
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