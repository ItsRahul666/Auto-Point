import { useState } from "react"
import apiServices from "../services/apiServices"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"

const divStyle={
    style:'width: 3rem 45px,80px,400px; height: 3rem,400px,45px,350px,55px,80px,500px; role:status;object-fit: cover;background: rgba(0, 0, 0, .08);backgroundImage: "url(assets/img/carousel-bg-1.jpg)";'
}


export default function Contact(style={divStyle}){
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [message,setMessage]=useState()
    const [subject,setSubject]=useState()
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data={
            name:name,
            email:email,
            subject:subject,
            message:message
        }
        apiServices.addContact(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
               setName("")
               setEmail("")
               setMessage("")
               setSubject("")
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
    const [loading,setLoading]=useState(false)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"55%",
        "zIndex":"1",
    }
    return(
        <>
    <div className="d-flex justify-content-center">
        <ClipLoader loading={loading} cssOverride={override} size={120}/>
    </div>
    <div className={loading?"disabled-screen-full":""}>  
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="text-primary text-uppercase">Contact Us</h6>
                    <h1 className="mb-5">Contact For Any Query</h1>
                </div>
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row gy-4">
                            <div className="col-md-4">
                                <div className="bg-light d-flex flex-column justify-content-center p-4">
                                    <h5 className="text-uppercase">Call</h5>
                                    <p className="m-0"><i className="fa fa-envelope-open text-primary me-2"></i>+918976539609</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="bg-light d-flex flex-column justify-content-center p-4">
                                    <h5 className="text-uppercase">Location</h5>
                                    <p className="m-0"><i className="fa fa-envelope-open text-primary me-2"></i>Jalandhar</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="bg-light d-flex flex-column justify-content-center p-4">
                                    <h5 className="text-uppercase">Email</h5>
                                    <p className="m-0"><i className="fa fa-envelope-open text-primary me-2"></i>pinkichauhan4866@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
                        <iframe className="position-relative rounded w-100 h-100"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.5320001410605!2d75.57373981390023!3d31.344295481428244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a7bc7d891d1%3A0x7196963d39d39659!2sSodal%20Rd%2C%20Shiv%20Nagar%2C%20Industrial%20Area%2C%20Jalandhar%2C%20Punjab!5e0!3m2!1sen!2sin!4v1679625394564!5m2!1sen!2sin"
                            frameborder="0" style={divStyle} allowfullscreen="" aria-hidden="false"
                            tabindex="0"></iframe>
                    </div>
                    <div className="col-md-6">
                        <div className="wow fadeInUp" data-wow-delay="0.2s">
                            <form onSubmit={handleForm} method="post">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input required type="text" className="form-control" id="name" placeholder="Your Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                            <label for="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input required type="email" className="form-control" id="email" placeholder="Your Email"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                            <label for="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input required type="text" className="form-control" id="subject" placeholder="Subject"  value={subject} onChange={(e)=>{setSubject(e.target.value)}}/>
                                            <label for="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a message here" id="message" style={divStyle}  value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
                                            <label for="message">Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </div>
        </>
    )
}