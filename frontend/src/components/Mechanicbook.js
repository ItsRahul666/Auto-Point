import { Link } from "react-router-dom"
export default function Mechanicbook() {
    const restaurant=[
        {
           mech_image:"mech2.jpg",
            mech_name:"Mr. Rajinder Kumar",
            speciality:"Tyre Changer",
           
            
            

        },
        {
           mech_image:"mech3.jpg",
            mech_name:"Mr.Akshay Soodh",
            speciality:"Heavy Equipment Mechanic",
           

        },
        {
           mech_image:"mech4.jpg",
            mech_name:"Mr.Rajesh Paswan",
            speciality:"Heavy Equipment Mechanic",
           
        },
        {
           mech_image:"mech5.jpg",
            mech_name:"Mr.Rajesh Paswan",
            speciality:"Heavy Equipment Mechanic",
           
        },             
        {
           mech_image:"a1.jpg",
            mech_name:"Mr.Rajesh Paswan",
            speciality:"Heavy Equipment Mechanic",
           
        },           
        {
           mech_image:"a2.jpg",
            mech_name:"Mr.Rajesh Paswan",
            speciality:"Heavy Equipment Mechanic",
           
        },           
        {
           mech_image:"a3.jpg",
            mech_name:"Mr.Rajesh Paswan",
            speciality:"Heavy Equipment Mechanic",
           
        },        

        {
           mech_image:"a4.jpg",
            mech_name:"Mr.Rajesh Paswan",
            speciality:"Heavy Equipment Mechanic",
           
        }
        ]
    return (
        <>

            {/* <div className="container-xxl py-5 bg-dark hero-header mb-5">
                <div className="container text-center my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Food Menu</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center text-uppercase">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Pages</a></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">Menu</li>
                        </ol>
                    </nav>
                </div>
            </div> */}
            <div className="container  my-0 p-4">
   
   <h1 className="mt-5"><center>MECHANICS</center>  </h1>   <form className="d-flex">
  <input required className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>
</div>

            <div className="container-fluid d-flex ">
                
                <div className="row">
                    {restaurant.map((element,index)=>(
                    <div className="col-md-3 p-2 ">
                        <div className=" card " style={{width: "18rem"}}>
                        <img className="card-img-top" src={"/assets/img/"+`${element.mech_image}`}  alt="image"/>
                        <div className="card-body">
                            <h5 className="card-title">{element?.mech_name}</h5>
                            {/* <p className="card-text">{element?.speciality}</p> */}
                            <h6>{element?.speciality}</h6>
                            <center>

                            <a href="/booking" className="btn btn-primary">BOOK</a>
                            </center>
                        </div>
                        </div>
                    </div>
                    ))}
                    </div>  
            </div>
        </>
    )
}