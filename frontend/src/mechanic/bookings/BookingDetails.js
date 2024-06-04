import {  useParams } from "react-router-dom";
import apiServices ,{ BASE_URL_IMG } from "../../services/apiServices";
import { ClipLoader } from "react-spinners";
import {toast} from "react-toastify"
import Moment from "react-moment";
import { useState,useEffect } from "react";
export default function BookingDetails(){
    const [loading,setLoading]=useState(true)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"55%",
        "zIndex":"1",
    }
    const param=useParams()
    const id=param.id
    const [myData,setMyData]=useState()
    useEffect(()=>{
       let data_id={
        _id:id,
       }
        apiServices.singleBooking(data_id).then((data)=>{
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
    return(
        <>
        <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>  
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2 p-5">
                        <div className="card">
                            <div className="row text-capitalize">
                                <div className="col-md-5">
                                    <img src={BASE_URL_IMG+myData?.serviceId?.image} className="card-img-top h-100"/>
                                </div>
                                <div className="col-md-7">
                                    <h4>{myData?.serviceId?.name}</h4>
                                    <h5>Booking Date- <Moment format="YYYY/MM/DD">{myData?.appointmentDate}</Moment> {myData?.appointmentTime}</h5>
                                    <p>instruction- {myData?.instruction}</p>
                                    <p><strong>User Information- </strong><br/>{myData?.firstName} {myData?.lastName}, <br/>
                                    {myData?.email}, <br/>
                                    {myData?.contact}</p>
                                    <p><strong>Address</strong><br/>
                                    {myData?.address}, {myData?.city}, {myData?.state}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}