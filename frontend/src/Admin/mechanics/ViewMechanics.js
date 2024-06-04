import {toast} from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import apiServices, { BASE_URL_IMG } from "../../services/apiServices";
export default function ViewMechanics(){
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
  const changeStatus=(id,status)=>{
    setLoading(true)
    if(status==true){
     var upstatus=false
    }
    else{
     var upstatus=true
    }
    let data={
      _id:id, 
      status:upstatus
    }
    apiServices.changeStatusMechanic(data).then((data)=>{
      // console.log(data)
      setTimeout(()=>{
          setLoading(false)
      },1000)
      if(data.data.success){
          toast.success(data.data.message)
          setTimeout(()=>{
        //   window.location.reload()
          },900)
      }
      else{
          toast.error(data.data.message)
      }
  }).catch((error)=>{
      // console.log(error)
      toast.error("Something went wrong!!Try Again Later")
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
            <div className="container my-3 py-3 text-center  animated slideInDown">
                <h1>VIEW VEHICLE TYPES</h1>
            </div>
            <div className="container table-responsive  animated slideInLeft">
               <table className="table table-striped table-hover  table-bordered">
                    <thead>
                        <tr>
                            <td>Sr No</td>
                            <td>Id Proof</td>  
                            <td>Name</td>
                            <td>Email</td>
                            <td>Speciality</td>
                            <td>Type</td>
                            <td>Contact</td>
                            <td>Description</td>
                            <td>Address</td>
                            <td>Gender</td>
                            <td>Status</td>    
                            <td>Action</td>
                        </tr>
                    </thead>
                    
                    <tbody >
                        {myData?.map((element,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    <img src={BASE_URL_IMG+element?.image} style={{height:"200px", width:"200px"}}/>
                                </td>
                                <td>{element?.firstName} {element?.lastName}</td>
                                <td>{element?.userId?.email}</td>
                                <td>{element?.speciality}</td>
                                <td>{element?.vehicleTypeId?.name}</td>
                                <td>{element?.contact}</td>
                                <td>{element?.description}</td>
                                <td>{element?.address}, {element?.city}, {element?.state}</td>
                                <td>{element?.gender}</td>
                              
                                {element?.userId?.status?<td>Active</td>:<td>In-active</td>}
                                <td style={{"width":"400px"}}>
                                    <button type="submit" className='btn btn-outline-danger mx-2' onClick={()=>{changeStatus(element?.userId?._id,element?.status)}}>Change Status</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </div>
        </div>
        </>
    )
}