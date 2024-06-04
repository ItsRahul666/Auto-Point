import { useEffect, useState } from "react"
import {toast} from "react-toastify";
import {ClipLoader} from 'react-spinners';
import apiServices,{BASE_URL_IMG} from "../../services/apiServices";
import Moment from "react-moment";
import Modal from "react-modal";
import { Navigate } from "react-router-dom";
export default function UserBooking(){
    const [loading,setLoading]=useState(true)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"55%",
        "zIndex":"1",
    }
    const [myData,setMyData]=useState()
    const [isOpen,setIsOpen]=useState(false)
    const [id,setId]=useState()
    const [rating,setRating]=useState(5)
    const [message,setMessage]=useState()
    useEffect(()=>{
       let data={
        userId:sessionStorage.getItem("user_id")
       }
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
    },[loading])
    function closeModal() {
        setIsOpen(false);
    }
    const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        width:'60%'
    },
    };
    const changeStatus=(id)=>{
        setId(id)
        setIsOpen(true)
    }
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        setIsOpen(false)
        let data={
            userId:sessionStorage.getItem("user_id"),
            bookingId:id,
            rating:rating,
            message:message
        }
        apiServices.addRating(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
                setMessage("")
                setRating("")
                isOpen(false)
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
        let data_b={
            _id:id,
            bookingStatus:"Rated"
        }
        updateBookingStatus(data_b)
    }
    const authenticate=sessionStorage.getItem("authenticate")
    if(!authenticate){
        sessionStorage.setItem("message", "Please Login!!")
        return <Navigate replace to="/main/login"/>
    }
    const cancelBooking=(id)=>{
        if(window.confirm("Do you really Want to cancel booking?")){
            let data={
                _id:id,
                bookingStatus:"Cancelled By User"
            }
            updateBookingStatus(data)
        }
         
    }
    const updateBookingStatus=(data)=>{
        setLoading(true)
        apiServices.updateBooking(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
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
                            <th>Action</th>
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
                                <td>{el?.serviceId?.name}</td>
                                <td>{el?.vehicleTypeId?.name}</td>
                                <td>{el?.name}<br/>{el?.email} <br/>{el?.contact}<br/>
                                {el?.address}, {el?.city}, {el?.state}</td>
                                <td>{el?.mechanicId?.name}<br/>{el?.mechanicId?.email} <br/>{el?.mechanicId?.contact}</td>
                                <td>
                                   
                                    &#8377; {el?.price}
                                 
                                </td>
                                <td>{el?.bookingStatus}</td>
                                <td>
                                {el?.bookingStatus=='pending'?<>
                                <button className="btn btn-outline-danger"  onClick={()=>{cancelBooking(el?._id)}}>Cancel</button>
                                    </>:el?.bookingStatus=='completed'? <button className="btn btn-outline-success" onClick={()=>{changeStatus(el?._id)}} >Rate</button>:el?.bookingStatus=='Rated'? "Completed":el?.bookingStatus}
                                </td>
                            </tr>
                        ))}
                </table>
            </div>
        </div>
        <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        >
        <div className='d-flex justify-content-end'>
            <button onClick={closeModal} className='btn btn-close'></button>
        </div>
        <h3 className='text-center'>Update Status</h3>
        <form onSubmit={handleForm}>
            <div className='row my-3'>
                <div className="col-md-2 offset-md-1">Ratings</div>
                <div className='col-md-8'>
                    <input required type="number" min="0" max="5" className='form-control' required value={rating} onChange={(e)=>{setRating(e.target.value)}}/>
                </div>
            </div>  
            <div className='row my-3'>
                <div className="col-md-2 offset-md-1">Message</div>
                <div className='col-md-8'>
                    <textarea className='form-control' required value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
                </div>
            </div>    
            <div className='d-flex justify-content-center my-3'>
                <button className='btn btn-success w-25' >ADD</button>
            </div>        
        </form>
        </Modal>
        </>
    )
}