import {Link,useNavigate} from "react-router-dom"
export default function Header(){
    const user_type=sessionStorage.getItem('user_type')
    const authenticate=sessionStorage.getItem('authenticate')
    const navigate=useNavigate()
    const logout=()=>{
        window.alert("Do you really Want To Logout?");
        sessionStorage.clear()
        setTimeout(()=>{
            sessionStorage.setItem("message","Logout Successfully")
            navigate("/login")
        },500)
    }
    return(
        <>
        

  {/* <!-- Navbar Start --> */}
  <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
            <h2 className="m-0 text-primary"><i className="fa fa-car me-3"></i>CarServ</h2>
        </a>
        <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav mx-auto p-4 p-lg-0">
            <Link className="m-3" to="/">Home</Link>
            {/* <Link className='m-3' to="/about">About</Link> */}
            {/* <div className="nav-item dropdown m-3"> */}
                <Link className="m-3" to="/view_type">Type</Link>
                <Link className="m-3" to="/servicetype">Services</Link>
                <Link className="m-3" to="/view_mechanic">Mechanic</Link>
            {/* </div> */}
            <Link className="m-3" to="/contact">Contact</Link>
                {authenticate  ?
                <>
                 <Link className="m-3" to="/mybooking">Bookings</Link>
                 <Link className='m-3' to="/rating">Ratings</Link>
                 <a className="m-3" onClick={logout}>Logout</a>
                </>
                :
                <>
                <div className="nav-item dropdown m-3 text-danger">
                Register
                <div className="dropdown-menu">
                <ul>
                 <li><Link to="/userRegister">Users</Link></li>
                 <li><Link to="/mechanicRegister">Mechanic</Link></li>
                 </ul>
                </div>
                </div>
               
                <Link className="m-3" to="/login">Login</Link>
                </>
                }
                
               
            </div>
        </div>
    </nav>
    {/* <!-- Navbar End --> */}
      {/* <!-- Topbar Start --> */}
      <div className="container-fluid bg-light p-0">
        <div className="row gx-0 d-none d-lg-flex">
            <div className="col-lg-7 px-5 text-start">
                <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                    <small className="fa fa-map-marker-alt text-primary me-2"></small>
                    <small>Sodal Road Jalandhar, Punjab, India</small>
                </div>
                <div className="h-100 d-inline-flex align-items-center py-3">
                    <small className="far fa-clock text-primary me-2"></small>
                    <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
                </div>
            </div>
            <div className="col-lg-5 px-5 text-end">
                <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                    <small className="fa fa-phone-alt text-primary me-2"></small>
                    <small>+918976539609</small>
                </div>
                {/* <div className="h-100 d-inline-flex align-items-center">
                    <a className="btn btn-sm-square bg-white text-primary me-1" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-1" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-1" href=""><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-sm-square bg-white text-primary me-0" href=""><i className="fab fa-instagram"></i></a>
                </div> */}
            </div>
        </div>
    </div>
   

        </>
    )
}