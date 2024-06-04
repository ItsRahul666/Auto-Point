import {toast} from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import apiServices, { BASE_URL_IMG } from "../../services/apiServices";
import Moment from "react-moment";
export default function Rating(){
    const [myData,setMyData]=useState()
    const [loading,setLoading]=useState(false)
      const override={
          "display":"block",
          "margin":"0 auto",
          "position":"absolute",
          "top":"55%",
          "zIndex":"1",
      }
      const param=useParams()
      const id=param.id
      useEffect(()=>{
        let data={
           userId:sessionStorage.getItem("user_id") 
        }
        apiServices.allRating(data).then((data)=>{
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
        <>
         <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>  
            <div className="container my-3 py-3 text-center  animated slideInDown">
                <h1>Ratings</h1>
            </div>
            <div className="container table-responsive  animated slideInLeft">
                <div className="row">
                {myData?.map((element,index)=>(
                    <div className="col-md-4 text-capitalize p-5" key={index}>
                        <Link to={"/view_mech"+element?._id}>
                        <div className="card">
                            <div className="card-body">
                                <h2>{element?.rating} stars</h2>
                                <div style={{maxHeight:"200px", overflow:"hidden"}}>{element?.description}</div>
                                <p> {element?.message}</p>
                                <p>Date-<Moment format="YYYY/MM/DD">{element?.bookingId?.appointmentDate}</Moment> {element?.bookingId?.appointmentTime}</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
                </div>
            </div>
        </div>
        </>
        </>
    )
}