import {toast} from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import apiServices,{BASE_URL_IMG} from "../../services/apiServices";
export default function ViewMechanic(){
  const [myData,setMyData]=useState()
  const [loading,setLoading]=useState(false)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"55%",
        "zIndex":"1",
    }
  useEffect(()=>{
    apiServices.allMechanic().then((data)=>{
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
            <div className="container my-3 py-3 text-center  animated slideInDown">
                <h1>Our Mechanics</h1>
            </div>
            <div className="container table-responsive  animated slideInLeft">
               <div className="row">
               {myData?.map((element,index)=>(
                <div className="col-md-4 p-5">
                    <div className="card">
                        <img src={BASE_URL_IMG+element?.image} className="card-img-top" style={{height:"250px"}}/>
                        <div className="card-body">
                            <h1>{element?.firstName} {element?.lastName}</h1>
                            <p>Speciality- {element?.speciality}</p>
                            <div style={{ maxHeight:"200px"}}>{element?.description}</div>
                            <p>Address- {element?.address}, {element?.city}, {element?.state}</p>
                            <p>Contact- {element?.contact}</p>
                        </div>
                        <Link to={"/view_service_mech/"+element?.userId?._id} className=" my-2 d-block mx-auto btn btn-primary">View</Link>
                    </div>
                </div>
                ))}
               </div>
            </div>
        </div>
        </>
    )
}