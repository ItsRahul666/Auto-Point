import { useEffect, useState } from "react"
import {toast} from "react-toastify";
import {ClipLoader} from 'react-spinners';
import Moment from "react-moment";
import {Link, Navigate } from "react-router-dom";
import apiServices,{BASE_URL_IMG} from "../../services/apiServices";
export default function MechanincBooking(){
    const [loading,setLoading]=useState(true)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"55%",
        "zIndex":"1",
    }
    const [myData,setMyData]=useState()
    useEffect(()=>{
       let data={
        userId:sessionStorage.getItem("user_id")
       }
    // let data={}
        apiServices.allBooking(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                setMyData(data.data.data)
                toast.success(data.data.message)
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
    },[loading])
    const authenticate=sessionStorage.getItem("authenticate")
    if(!authenticate){
        sessionStorage.setItem("message", "Please Login!!")
        return <Navigate replace to="/main/login"/>
    }
    const rejectBooking=(id)=>{
        if(window.confirm("Do You really want to Reject it?")){
            let data={
                _id:id,
                bookingStatus:"rejected"
            }
            updateBookingStatus(data)
        }
         
    }
    const acceptBooking=(id)=>{
        if(window.confirm("Do You really want to Accept it?")){
            let data={
                _id:id,
                bookingStatus:"accepted"
            }
            updateBookingStatus(data)
        }
         
    }
    const completeBooking=(id)=>{
        if(window.confirm("Order Completed!! You want to save it?")){
            let data={
                _id:id,
                bookingStatus:"completed"
            }
            updateBookingStatus(data)
        }
         
    }
    const updateBookingStatus=(data)=>{
        setLoading(true)
        apiServices.updateBooking(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
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
    }
    return(
        <>
        <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>  
            <div className="container table-responsive">
                <h1 className="text-info text-center my-3">Booking</h1>
                <table className="table table-bordered my-3">
                    <thead className="bg-info text-light ">
                        <tr>
                            <th>Sno</th>
                            <th>Image</th>
                            <th>DateTime</th>
                            <th>Service Name</th>
                            <th>Vehicle Type</th>
                            <th>User Info</th>
                            <th>Price</th>
                            <th>Booking Status</th>
                            <th>Action</th>
                            <th>View Details</th>
                        </tr>
                    </thead>
                        {myData?.map((el,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    <img src={BASE_URL_IMG+el?.serviceId?.image} style={{height:"150px"}}/>
                                </td>
                                <td>
                                <Moment format="YYYY/MM/DD">{el?.appointmentDate}</Moment>
                                {el?.appointmentTime}
                                </td>
                                <td>{el?.name}</td>
                                <td>{el?.vehicleTypeId?.bikeType}</td>
                                <td>{el?.name}<br/>{el?.email} <br/>{el?.contact}<br/>
                                {el?.address}, {el?.city}, {el?.state}</td>
                                <td>
                                   
                                    &#8377; {el?.price}
                                 
                                </td>
                                <td>{el?.bookingStatus}</td>
                                <td>
                                
                                {el?.bookingStatus!='Cancelled By User'?el?.bookingStatus=='pending'?<>
                                    <i className="bi bi-check-lg text-success " style={{fontSize:"30px"}} onClick={()=>{acceptBooking(el?._id)}}></i>
                                    <i className="bi bi-x-lg text-danger" style={{fontSize:"30px"}} onClick={()=>{rejectBooking(el?._id)}}></i>
                                    </>:el?.bookingStatus=='accepted'?<>
                                    <button className="btn btn-outline-success"  onClick={()=>{completeBooking(el?._id)}}>Complete</button>
                                    </>:el?.bookingStatus=='completed'?"Completed":"Cancelled":el?.bookingStatus}
                                </td>
                                <td className="text-center"><Link to={"/mechanic/view_booking_details/"+el?._id}><i className="bi bi-eye-fill text-info fs-3"></i></Link></td>
                            </tr>
                        ))}
                </table>
            </div>
        </div>
        </>
    )
}