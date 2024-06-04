import {toast} from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import apiServices, { BASE_URL_IMG } from "../../services/apiServices";
export default function ViewTypes(){
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
    let data={
        mechanicId:sessionStorage.getItem("user_id")
    }
    apiServices.allService(data).then((data)=>{
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
    apiServices.changeStatusService(data).then((data)=>{
      // console.log(data)
      setTimeout(()=>{
          setLoading(false)
      },1000)
      if(data.data.success){
          toast.success(data.data.message)
          setTimeout(()=>{
          window.location.reload()
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
                <h1>VIEW SERVICES</h1>
            </div>
            <div className="container table-responsive  animated slideInLeft">
               <table className="table table-striped table-hover  table-bordered">
                    <thead>
                        <tr>
                            <td>Sr No</td>
                            <td>Image</td>  
                            <td>Service Name</td>
                            <td>Type</td>
                            <td>Price</td>
                            <td>Description</td>
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
                                <td>{element?.name}</td>
                                <td>{element?.vehicleTypeId?.name}</td>
                                <td>{element?.price}</td>
                                <td>{element?.description}</td>
                                {element?.status?<td>Active</td>:<td>In-active</td>}
                                <td>
                                    <Link to={"/mechanic/updateService/"+element?._id}>
                                        <button className="btn btn-outline-success">EDIT</button>
                                    </Link>
                                    <button type="submit" className='btn btn-outline-danger mx-2' onClick={()=>{changeStatus(element?._id,element?.status)}}>Change Status</button>
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