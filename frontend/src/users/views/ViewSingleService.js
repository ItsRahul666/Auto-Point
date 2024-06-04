import { useEffect,useState } from "react"
import apiServices, { BASE_URL_IMG } from "../../services/apiServices";
import {useParams, Link} from "react-router-dom"
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners"; 
export default function ViewSingleService(){
    const param=useParams()
    const id=param.id
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
            _id:id
        }
        apiServices.singleService(data).then((data)=>{
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
        }).catch((error)=>{
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
        <div className={loading?"disabled-screen-full":"my-5"}>   
            <main id="main">
                <section className="intro-single">
                    <div className="container border border-success border-2 rounded pt-3">
                        <h1 className="text-center text-success">{myData?.name}</h1>
                        <div className="container ">
                            <div className="card text-capitalize p-5 mb-4">
                                <div className="row">
                                    <div className="col-md-5">
                                        <img src={BASE_URL_IMG+`${myData?.image}`} className="card-img"/>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <h4>Price- &#8377;{myData?.price} </h4>
                                            <h3>Mechanic- {myData?.mechanicId?.name}, {myData?.mechanicId?.email}</h3>
                                            <h4>Location- {myData?.location}</h4>
                                            <p className="card-text">{myData?.description}</p>
                                            <div className="d-flex justify-content-center">
                                            <Link to={"/book_mechanic/"+`${myData?._id}`}>
                                            <button className="btn btn-outline-success">
                                                Book
                                            </button>
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
        </>
    )
}