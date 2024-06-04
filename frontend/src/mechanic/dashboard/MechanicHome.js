import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import { ClipLoader } from "react-spinners";
import apiServices from "../../services/apiServices";
export default function MechanicHome(){
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"55%",
        "zIndex":"1",
      }
      const [loading,setLoading]=useState(true)
      const [data,setData]=useState()
      useEffect(()=>{
        apiServices.dashboard().then((data)=>{
          console.log(data)
          setTimeout(()=>{
            setLoading(false)
          },1500)
          if(data.data.success){
            setData(data.data)
          }
          else{
            toast.error(data.data.message)
          }
          }).catch((error)=>{
          // console.log(error)
          toast.error("Something went wrong!!Try Again Later")
          setTimeout(()=>{
            setLoading(false)
          },1000)
          })
        },[])
    return(
<>
<div className="d-flex justify-content-center">
      <ClipLoader loading={loading} cssOverride={override} size={120}/>
    </div>
    <div className={loading?"disabled-screen-full":""}>  
      <div className="container mt-5 pt-0">
        <h1 className="text-primary mt-5 pt-3 text-center">Welcome {sessionStorage.getItem("user_name")}</h1>
        <div className="container row row-cols-1 row-cols-md-3 ms-1 g-5 mt-2 mb-5">
          <div className="col-4">
            <div className="card">
              {/* <img src="\assets\img\mech.png" className="card-img-top" alt="..."/> */}
              <div className="card-body">
                <h2 className="card-title text-center">Mechanics</h2>
                <h2 className="text-center">{data?.totalMechanics}</h2>
                {/* <button className=" d-grid  card-text btn btn-info btn-block btn-lg gradient-custom-3 text-dark m-auto "><Link to="/admin/viewmechanics">View Mechanics</Link></button> */}
            </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              {/* <img src="\assets\img\users.png" className="card-img-top" alt="..."/> */}
              <div className="card-body">
              <h2 className="card-title text-center">Users</h2>
              <h2 className="text-center">{data?.totalCustomers}</h2>
                {/* <button className=" d-grid  card-text btn btn-info btn-block btn-lg gradient-custom-3 text-dark m-auto "><Link to="user">View Users </Link></button> */}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              {/* <img src="\assets\img\verification.png" className="card-img-top" alt="..."/> */}
              <div className="card-body">
              <h2 className="card-title text-center">Bookings</h2>
              <h2 className="text-center">{data?.totalBookings}</h2>
              {/* <button className=" d-grid btn-info btn-block btn-lg gradient-custom-3 text-dark m-auto "><Link to="">Verification</Link></button> */}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              {/* <img src="\assets\img\verification.png" className="card-img-top" alt="..."/> */}
              <div className="card-body">
              <h2 className="card-title text-center">Vehicle Type</h2>
              <h2 className="text-center">{data?.totalVehicleTypes}</h2>
              {/* <button className=" d-grid btn-info btn-block btn-lg gradient-custom-3 text-dark m-auto "><Link to="">Verification</Link></button> */}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              {/* <img src="\assets\img\verification.png" className="card-img-top" alt="..."/> */}
              <div className="card-body">
              <h2 className="card-title text-center">Services</h2>
              <h2 className="text-center">{data?.totalServices}</h2>
              {/* <button className=" d-grid btn-info btn-block btn-lg gradient-custom-3 text-dark m-auto "><Link to="">Verification</Link></button> */}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              {/* <img src="\assets\img\verification.png" className="card-img-top" alt="..."/> */}
              <div className="card-body">
              <h2 className="card-title text-center">Contact</h2>
              <h2 className="text-center">{data?.totalContacts}</h2>
              {/* <button className=" d-grid btn-info btn-block btn-lg gradient-custom-3 text-dark m-auto "><Link to="">Verification</Link></button> */}
              </div>
            </div>
          </div>
    </div>

      </div>
    </div>
  </>
 
    )
}
