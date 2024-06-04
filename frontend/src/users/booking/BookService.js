import { useEffect,useState } from "react"
import apiServices from "../../services/apiServices"
import {useParams, Link, useNavigate, Navigate} from "react-router-dom"
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners"; 
import moment from "moment";
export default function BookService(){
    const param=useParams()
    const id=param.id
    const [loading,setLoading]=useState(false)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"55%",
        "zIndex":"1",
    }
    const [time,setTime]=useState()
    const [date,setDate]=useState("")
    const [vehicleNo,setVehicleNo]=useState()
    const [modalNo,setModalNo]=useState()
    const [instruction,setInstruction]=useState()
    const [firstname,setFirstname]=useState(sessionStorage.getItem("user_name"))
    const [email, setEmail]=useState(sessionStorage.getItem("user_email"))
    const [lastName,setLastName]=useState()
    const [address,setAddress]=useState()
    const [city,setCity]=useState()
    const [state,setState]=useState()
    const [contact,setContact]=useState()
    const [vehicleTypeId,setVehicleTypeId]=useState()
    const [price,setPrice]=useState()
    const [mechanicId,setMechanicId]=useState()
    const navigate=useNavigate()
    // useEffect(()=>{
    //     console.log(date)
    // },[date])
    useEffect(()=>{
        let data={
            _id:id
        }
        apiServices.singleService(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                setPrice(data.data.data.price)
                setVehicleTypeId(data.data.data.vehicleTypeId?._id)
                setMechanicId(data.data.data.mechanicId?._id)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
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
           userId:sessionStorage.getItem("user_id"),
           serviceId:id,
           vehicleTypeId:vehicleTypeId,
           appointmentTime:time,
           appointmentDate:date,
           vehicleNumber:vehicleNo,
           mechanicId:mechanicId,
           modelName:modalNo,
           price:price,
           instruction:instruction,
           firstName:firstname,
           lastName:lastName,
           contact:contact,
           address:address,
           email:email,
           city:city,
           state:state,
        }
        apiServices.addBooking(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
                setTimeout(()=>{
                    navigate("/mybooking")
                },1500)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            toast.error("Something Went Wrong!!")
            setTimeout(()=>{
                setLoading(false)
            },1500)
        })
    }
    const authenticate=sessionStorage.getItem("authenticate")
    if(!authenticate){
        sessionStorage.setItem("message", "Please Login!!")
        return <Navigate replace to="/login"/>
    }
    const checkDate=()=>{
        // console.log("book ",date)
        const date1=new Date()
        const n_date=moment().format("YYYY-MM-DD",date1);
        // console.log(n_date)
        if(n_date>date){
            document.getElementById('date').value=""
            document.getElementById('date_err').innerHTML="Please Enter Valid Time"
            console.log("invalid")
        }
        else{
            document.getElementById('date_err').innerHTML=""
            console.log("valid")
        }
    }
    const checkTime=()=>{
        // console.log("book ", time)
        const date=new Date()
        const n_date=moment().format("hh:mm",date);
        // console.log(n_date)

        if(n_date>time){
            document.getElementById('time').value=""
            document.getElementById('time_err').innerHTML="Please Enter Valid Time"
        }
        else{
            document.getElementById('time_err').innerHTML=""
        }
    }
   
    return(
        <>
        <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":"my-5"}>   
            <main id="main">
                <section className="intro-single">
                    <div className="container pt-3">
                        <h1 className="text-center text-success">Book Service</h1>
                        <form onSubmit={handleForm}>
                        <div className="container ">
                            <div className="card text-capitalize p-5 mb-4">
                                <div className="row my-3">
                                    <div className="col-md-2 offset-md-1">
                                        <label>Date Of Booking</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input required type="date" className="form-control" value={date} onChange={(e)=>{setDate(e.target.value)}} onBlur={checkDate} id="date" required/>
                                        <span id="date_err" class="text-danger"></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2 offset-md-1">
                                        <label>Time Of Booking</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input required type="time" className="form-control" value={time} onChange={(e)=>{setTime(e.target.value)}}  id="time" required/>
                                        <span id="time_err" class="text-danger"></span>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2 offset-md-1">
                                        <label>Vehicle Number</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input required type="text" className="form-control" value={vehicleNo} onChange={(e)=>{setVehicleNo(e.target.value)}} required />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2 offset-md-1">
                                        <label>Model Number</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input required type="number" className="form-control" value={modalNo} onChange={(e)=>{setModalNo(e.target.value)}} required id="time"/>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2 offset-md-1">
                                        <label>Instruction</label>
                                    </div>
                                    <div className="col-md-8">
                                        <textarea className="form-control" value={instruction} onChange={(e)=>{setInstruction(e.target.value)}} required/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <h1 className="text-center text-success">User Information</h1>
                        <div className="container ">
                            <div className="card text-capitalize p-5 mb-4">
                                <div className="row my-3">
                                    <div className="col-md-2 ">
                                        <label>First Name</label>
                                    </div>
                                    <div className="col-md-4">
                                        <input required type="text" className="form-control" value={firstname} required onChange={(e)=>{setFirstname(e.target.value)}}/>
                                    </div>
                               
                                    <div className="col-md-2 ">
                                        <label>Last Name</label>
                                    </div>
                                    <div className="col-md-4">
                                        <input required type="text" className="form-control" value={lastName} required onChange={(e)=>{setLastName(e.target.value)}}  />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2 ">
                                        <label>Email</label>
                                    </div>
                                    <div className="col-md-4">
                                        <input required type="text" className="form-control" value={email} required onChange={(e)=>{setEmail(e.target.value)}} />
                                    </div>
                               
                                    <div className="col-md-2 ">
                                        <label>Contact</label>
                                    </div>
                                    <div className="col-md-4">
                                        <input required type="number" className="form-control" value={contact} required onChange={(e)=>{setContact(e.target.value)}}  id="time"/>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2 ">
                                        <label>City</label>
                                    </div>
                                    <div className="col-md-4">
                                        <input required className="form-control" value={city} required onChange={(e)=>{setCity(e.target.value)}}/>
                                    </div>
                                    <div className="col-md-2 ">
                                        <label>State</label>
                                    </div>
                                    <div className="col-md-4">
                                        <input required className="form-control" value={state} required onChange={(e)=>{setState(e.target.value)}}/>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-md-2">
                                        <label>Address</label>
                                    </div>
                                    <div className="col-md-10">
                                        <textarea class="form-control" value={address} required onChange={(e)=>{setAddress(e.target.value)}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-success w-25">Book</button>
                        </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
     
        </>
    )
}