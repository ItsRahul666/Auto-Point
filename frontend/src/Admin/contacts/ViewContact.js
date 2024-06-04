import {toast} from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import apiServices, { BASE_URL_IMG } from "../../services/apiServices";
export default function ViewContact(){
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
    apiServices.allContact().then((data)=>{
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
                <h1>VIEW CONTACT</h1>
            </div>
            <div className="container table-responsive  animated slideInLeft">
               <table className="table table-striped table-hover  table-bordered">
                    <thead>
                        <tr>
                            <td>Sr No</td>
                            <td>Name</td>
                            <td>Email</td>  
                            <td>Subject</td>    
                            <td>Message</td>
                        </tr>
                    </thead>
                    
                    <tbody >
                        {myData?.map((element,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{element?.name}</td>
                                <td>{element?.email}</td>
                                <td>{element?.subject}</td>
                                <td>{element?.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </div>
        </div>
        </>
    )
}