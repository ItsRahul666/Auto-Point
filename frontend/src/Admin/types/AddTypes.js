import { useState } from "react"
import {toast} from "react-toastify";
import { ClipLoader } from "react-spinners";
import apiServices from "../../services/apiServices";
export default function AddTypes(){
    const [name,setName]=useState()
    const [image,setImage]=useState()
    const [loading,setLoading]=useState(false)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"55%",
        "zIndex":"1",
    }
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data=new FormData()
        data.append("name",name)
        data.append("vehicleType_image",image)
        apiServices.addType(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
                setName("")
                setImage("")
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            // console.log(error)
            toast.error("Something went wrong")
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
            <div className="container my-3 py-5 animated slideInDown w-50" >
            <h2>ADD SERVICE TYPES</h2>
                <div className="card text-bg-light my-5 mb-3">
                    <div className="card-body">
                    <form onSubmit={handleForm}>
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputState">Type Name</label>
                                <input required type="text" id="form3Example3cg" className="form-control form-control-lg" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputState">Image</label>
                                <input required type="file" id="form3Example3cg" className="form-control form-control-lg" onChange={(e)=>{setImage(e.target.files[0])}} />
                            </div>
                        </div>
                        <center>
                            <button type="submit" className="btn btn-primary my-3 w-25" >SUBMIT</button>
                        </center>
                    </form>  
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}