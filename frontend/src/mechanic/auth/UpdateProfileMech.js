import { useState ,useEffect } from "react";
import {useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { ClipLoader } from "react-spinners";
import apiServices from "../../services/apiServices";
export default function UpdateProfileMech()
{
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
    const [email, setEmail]=useState()
    const [pass, setPassword]=useState()
    const [fname,setFname]=useState()
    const [lname,setLname]=useState()
    const [address,setAddress]=useState()
    const [city,setCity]=useState()
    const [state,setState]=useState()
    const [gender,setGender]=useState()
    const [contact,setContact]=useState()
    const [image,setImage]=useState()
    const [speciality,setSpeciality]=useState()
    const [description,setDescription]=useState()
    const [typeId,setTypeId]=useState()
    const [allTypes,setAllTypes]=useState()
    useEffect(()=>{
      apiServices.allType().then((data)=>{
        if(data.data.success){
          setAllTypes(data.data.data)
        }
        else{
          toast.error(data.data.message)
        }
      }).catch((err)=>{toast.error("Something went wrong!! Try again later")})
      let data={
        _id:sessionStorage.getItem("user_id")
      }
      apiServices.singleMechanic(data).then((data)=>{
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
          setImage(data.data.data.image)
          setTypeId(data.data.data.vehicleTypeId?._id)
          setSpeciality(data.data.data.speciality)
          setDescription(data.data.data.description)
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
        let data=new FormData()
            data.append("email",email)
            data.append("password",pass)
            data.append("firstName",fname)
            data.append("lastName",lname)
            data.append("address",address)
            data.append("city",city)
            data.append("state",state)
            data.append("gender",gender)
            data.append("contact",contact)
            data.append("speciality", speciality)
            data.append("description", description)
            data.append("vehicleTypeId", typeId)
            data.append("mechanic_image", image)
            data.append("_id",sessionStorage.getItem("user_id"))
        // console.log("data is ", data)
        apiServices.updateMechanic(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1000)
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
            },1000)
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
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <h1 className="text-dark mb-4 mt-3 m-auto">Update Profile</h1>
              <form method="post" onSubmit={handleForm}>
              <div className="card" style={{borderRadius: "15px"}}>
                <div className="card-body">
                  <div className="row align-items-center pt-4 pb-3">
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">First name</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <input required type="text" className="form-control form-control-lg" value={fname} onChange={(e)=>{setFname(e.target.value)}} />
                    </div>
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">Last name</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <input required type="text" className="form-control form-control-lg" value={lname} onChange={(e)=>{setLname(e.target.value)}}/>
                    </div>
                  </div>
                  <hr className="mx-n3"/>
                  <div className="row align-items-center py-3">
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">Email address</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <input required type="email" className="form-control form-control-lg" placeholder="example@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="contact" onBlur={checkContact}/>
                      <span id="error_contact" class="text-danger"></span>
                    </div>
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">Password</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <input required type="password" className="form-control form-control-lg" value={pass} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                  </div>
                  <hr className="mx-n3"/>
                  <div className="row align-items-center py-3">
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">Speciality</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <input required className="form-control" placeholder="" value={speciality} onChange={(e)=>{setSpeciality(e.target.value)}}/>
                    </div>
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">Vehicle Type</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <select className="form-control" onChange={(e)=>{setTypeId(e.target.value)}} value={typeId} >
                        <option selected disabled value="">Choose one</option>
                        {allTypes?.map((el,index)=>(
                          <option value={el?._id}>{el?.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <hr className="mx-n3"/>
                  <div className="row align-items-center pt-4 pb-3">
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">Contact</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <input required type="text" className="form-control form-control-lg" value={contact} onChange={(e)=>{setContact(e.target.value)}} id="contact" onBlur={checkContact}/>
                      <span id="error_contact" class="text-danger"></span>
                    </div>
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <input required type="text" className="form-control form-control-lg"  value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                    </div>
                  </div>
                  <hr className="mx-n3"/>
                  <div className="row align-items-center pt-4 pb-3">
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">City</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <input required type="text" className="form-control form-control-lg" value={city} onChange={(e)=>{setCity(e.target.value)}} />
                    </div>
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">State</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <input required type="text" className="form-control form-control-lg" value={state} onChange={(e)=>{setState(e.target.value)}}/>
                    </div>
                  </div>
                  <hr className="mx-n3"/>
                  <div className="row align-items-center pt-4 pb-3">
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <input required type="radio" className="form-check-input" name="gender"/><span className="px-2" checked={gender=='Male'} onClick={(e)=>{setGender('Male')}}>Male</span>
                      <input required type="radio" className="form-check-input" name="gender" /><span className="ps-2" checked={gender=='Female'}  onClick={(e)=>{setGender('Female')}}>Female</span>
                    </div>
                    <div className="col-md-2 ps-5">
                      <h6 className="mb-0">Upload ID Proof</h6>
                    </div>
                    <div className="col-md-4 pe-5">
                      <input required className="form-control form-control-lg" id="formFileLg" type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                    </div>
                  </div>
                  <hr className="mx-n3"/>
                  <div className="row">
                    <div className="col-md-2">Description</div>
                    <div className="col-md-10">
                      <textarea className="form-control" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                    </div>
                  </div>
                  <hr className="mx-n3"/>
                  <div className="px-5 py-4 d-flex justify-content-center">
                    <button type="submit" className="btn btn-success btn-lg">Update</button>
                  </div>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
      </>
    )
}