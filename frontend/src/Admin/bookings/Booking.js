import { useEffect, useState } from "react"
import {toast} from "react-toastify";
import {ClipLoader} from 'react-spinners';
import apiServices,{BASE_URL_IMG} from "../../services/apiServices";
import Moment from "react-moment";
import { Navigate } from "react-router-dom";
export default function Booking(){
    const [loading,setLoading]=useState(false)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"55%",
        "zIndex":"1",
    }
    const [myData,setMyData]=useState()
    useEffect(()=>{
        let data={}
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
    },[])
    const authenticate=sessionStorage.getItem("authenticate")
    if(!authenticate){
        sessionStorage.setItem("message", "Please Login!!")
        return <Navigate replace to="/main/login"/>
    }
    return(
        <>
        <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>  
            <div className="container table-responsive">
                <h1 className="text-info text-center my-3">My Booking</h1>
                <table className="table table-bordered my-3">
                    <thead className="bg-info text-light ">
                        <tr>
                            <th>Sno</th>
                            <th>Image</th>
                            <th>DateTime</th>
                            <th>Service Name</th>
                            <th>Vehicle Type</th>
                            <th>User Info</th>
                            <th>Mechanic Info</th>
                            <th>Price</th>
                            <th>Request Status</th>
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
                                <td>{el?.mechanicId?.name}<br/>{el?.mechanicId?.email} <br/>{el?.mechanicId?.contact}</td>
                                <td>
                                   
                                    &#8377; {el?.price}
                                 
                                </td>
                            
                                {/* <td>{el?.requestStatus=='1'||el?.requestStatus==1?"Pending":el?.requestStatus=='2'||el?.requestStatus==2?"Approved":el?.requestStatus=='3'||el?.requestStatus==3?"Completed":"Cancelled"}</td> */}
                                <td>{el?.bookingStatus}</td>
                            </tr>
                        ))}
                </table>
            </div>
        </div>
        </>
    )
}