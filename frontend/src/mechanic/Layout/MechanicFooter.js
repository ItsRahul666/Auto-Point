import React from "react"
import {Link} from "react-router-dom"
const divStyle={
    style:'width: 3rem 45px,80px,400px; height: 3rem,400px,45px,350px,55px,80px; role:status;object-fit: cover;background: rgba(0, 0, 0, .08)'
}

export default function MechanicFooter(){
    return(
        <>
         {/* <!-- Footer Start --> */}
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-4 col-md-6">
                    <h4 className="text-light mb-4">Address</h4>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Sodal Road Jalandhar, Punjab, India</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+918976539609</p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i>pinkichauhan4866@gmail.com</p>
                    {/* <div className="d-flex pt-2">
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
                        <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
                    </div> */}
                </div>
                <div className="col-lg-4 col-md-6">
                    <h4 className="text-light mb-4">Opening Hours</h4>
                    <h6 className="text-light">Monday - Friday:</h6>
                    <p className="mb-4">09.00 AM - 09.00 PM</p>
                    <h6 className="text-light">Saturday - Sunday:</h6>
                    <p className="mb-0">09.00 AM - 12.00 PM</p>
                </div>
                <div className="col-lg-4 col-md-6">
                    <h4 className="text-light mb-4">Services</h4>
                    <a className="btn btn-link" href="">Diagnostic Test</a>
                    <a className="btn btn-link" href="">Engine Servicing</a>
                    <a className="btn btn-link" href="">Tires Replacement</a>
                    <a className="btn btn-link" href="">Oil Changing</a>
                    <a className="btn btn-link" href="">Vacuam Cleaning</a>
                </div>
                {/* <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Newsletter</h4>
                    <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                    <div className="position-relative mx-auto" style={divStyle}>
                        <input required className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email"/>
                        <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                    </div>
                </div> */}
            </div>
        </div>
        <div className="container">
            <div className="copyright">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a className="border-bottom" href="#">CarServ</a>, All Right Reserved.

                        {/* This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support.  */}
                        {/* Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a> */}
                    </div> 
                    <div className="col-md-6 text-center text-md-end">
                        <div className="footer-menu">
                        <Link className="m-3" to="/home">Home</Link>
                        <Link className='m-3' to="/about">About</Link>
                        <Link className='m-3' to="/contact">Contact</Link>
              
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Footer End --> */}
        </>
    )
}