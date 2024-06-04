const divStyle={
    style:'width: 3rem 45px,80px,400px; height: 3rem,400px,45px,350px,55px,80px; role:status;object-fit: cover;background: rgba(0, 0, 0, .08);backgroundImage:url(assets/img/carousel-bg-2.jpg);backgroundImage: url(assets/img/carousel-bg-1.jpg)'
    
}

export default function Testimonial(style={divStyle}){
    return(
        <>
         {/* <!-- Spinner Start -->
    <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
     <!-- Spinner End -->  */}


   

    {/* <!-- Testimonial Start --> */}
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
            <div className="text-center">
                <h6 className="text-primary text-uppercase"> Testimonial</h6>
                <h1 className="mb-5">Our Clients Say!</h1>
            </div>
            <div className="owl-carousel testimonial-carousel position-relative">
                <div className="testimonial-item text-center">
                    <img className="bg-light rounded-circle p-2 mx-auto mb-3" src="assets/img/c1.jpg" style={divStyle}/>
                    <h5 className="mb-0">Rajeev Kumar</h5>
                    {/* <p>Profession</p> */}
                    <div className="testimonial-text bg-light text-center p-4">
                    <p className="mb-0">Would highly recommend this auto shop! He was very professional, very helpful & had great prices. Will definitely come back</p>
                    </div>
                </div>
                <div className="testimonial-item text-center">
                    <img className="bg-light rounded-circle p-2 mx-auto mb-3" src="assets/img/user1.jpg" style={divStyle}/>
                    <h5 className="mb-0">Abhishek Mehra</h5>
                    {/* <p>Profession</p> */}
                    <div className="testimonial-text bg-light text-center p-4">
                    <p className="mb-0">My car needed a new fuel pump. Took my car in and had the repairs done in the same day. Didn’t have issues and the car has been working fine.</p>
                    </div>
                </div>
                <div className="testimonial-item text-center">
                    <img className="bg-light rounded-circle p-2 mx-auto mb-3" src="assets/img/user2.jpg" style={divStyle}/>
                    <h5 className="mb-0">Dheeraj Verma</h5>
                    {/* <p>Profession</p> */}
                    <div className="testimonial-text bg-light text-center p-4">
                    <p className="mb-0">Good honest work, considerate about my needs, didn’t try to oversell, just did exactly what I needed done.</p>
                    </div>
                </div>
                <div className="testimonial-item text-center">
                    <img className="bg-light rounded-circle p-2 mx-auto mb-3" src="assets/img/user3.jpg" style={divStyle}/>
                    <h5 className="mb-0">Rakesh Mishra</h5>
                    {/* <p>Profession</p> */}
                    <div className="testimonial-text bg-light text-center p-4">
                    <p className="mb-0">Great auto service. Great Customer care service. I was greeted and helped as soon as I walked in.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Testimonial End --> */}
        

    {/* <!-- Back to Top --> */}
    <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>


        </>
    )
}