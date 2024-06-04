import { useEffect, useState } from "react"
import apiServices from "../../services/apiServices"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import { useNavigate, useParams } from "react-router-dom"
export default function EditService(){
    const [loading,setLoading]=useState(true)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"55%",
        "zIndex":"1",
    }
    const navigate=useNavigate()
    const param=useParams()
    const id=param.id
    const [type,setType]=useState()
    const [name,setName]=useState()
    const [price,setPrice]=useState()
    const [description,setDescription]=useState()
    const [image,setImage]=useState()
    const [allType,setAllType]=useState()
    useEffect(()=>{
        apiServices.allType().then((data)=>{
            if(data.data.success){
              setAllType(data.data.data)
            }
            else{
              toast.error(data.data.message)
            }
          }).catch((err)=>{toast.error("Something went wrong!! Try again later")})
          let data={
            _id:id,
          }
          apiServices.singleService(data).then((data)=>{
            setTimeout(()=>{
            setLoading(false)
            },1500)
            if(data.data.success){
                setName(data.data.data.name)
                setPrice(data.data.data.price)
                setDescription(data.data.data.description)
                setImage(data.data.data.image)
                setType(data.data.data.vehicleTypeId?._id)
            }
            else{
                setTimeout(()=>{
                    setLoading(false)
                    },1500)
              toast.error(data.data.message)
            }
          }).catch((err)=>{toast.error("Something went wrong!! Try again later")})
    },[])
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data=new FormData()
        data.append("name",name)
        data.append("description",description)
        data.append("service_image",image)
        data.append("price",price)
        data.append("vehicleTypeId",type)
        data.append("_id",id)
        apiServices.updateService(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
              setTimeout(()=>{
                navigate("/mechanic/viewservice")
              },1500)
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
            <div className="container my-3 py-5 animated slideInDown">
            <h2>UPDATE SERVICE</h2>
                <div className="card text-bg-light my-5 mb-3">
                    <div className="card-body p-5 fs-5">
                    <form method="post" onSubmit={handleForm}>
                        <div className="row my-3">
                            <div className="col-md-2">
                                <label htmlFor="inputState">Type</label>
                            </div>
                            <div className="col-md-9">
                            <select className="form-control" onChange={(e)=>{setType(e.target.value)}} value={type} >
                                <option  disabled value="">Choose one</option>
                                {allType?.map((el,index)=>(
                                <option value={el?._id} selected={el?._id==type}>{el?.name}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2">
                                <label htmlFor="inputState">Service Name</label>
                            </div>
                            <div className="col-md-9">
                                <input required type="text" id="form3Example3cg" className="form-control form-control-lg" value={name} onChange={(e)=>{setName(e.target.value)}} />
                            </div>
                        </div> 
                        <div className="row my-3">
                            <div className="col-md-2">
                                <label htmlFor="inputState">Price</label>
                            </div>
                            <div className="col-md-9">
                                <input required type="number" id="form3Example3cg" className="form-control form-control-lg"  value={price} onChange={(e)=>{setPrice(e.target.value)}} min="0"/>
                            </div>
                        </div>       
                        <div className="row my-3">
                            <div className="col-md-2">
                                <label htmlFor="inputState">Description</label>
                            </div>
                            <div className="col-md-9">
                                <textarea className="form-control" rows="3" placeholder=""  value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                            </div>
                        </div>  
                        <div className="row my-3">
                            <div className="col-md-2">
                                <label htmlFor="inputState">Image</label>
                            </div>
                            <div className="col-md-9">
                                <input required className="form-control form-control-lg" id="formFileLg" type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                            </div>
                        </div> 
                        <button type="submit" className="btn btn-primary my-2 d-block mx-auto w-25" >SUBMIT</button>
                    </form> 
                    </div> 
                </div>
            </div>
            </div>
        </>
    )
}