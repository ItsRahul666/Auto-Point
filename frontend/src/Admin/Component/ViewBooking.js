export default function ViewBooking(){
    
    const projects=[
        {
            booking_date:'10-04-2023',
            type:"Two Wheeler",
            service:"Oil Changing",
            user_detail:"Sandeep Kumar",
            mechanic:"Rakesh Sharma",
            status:'sucess'
        },
        {

            booking_date:'11-04-2023',
            type:"Four Wheeler",
            service:"Engine Repairing",
            user_detail:"Sandeep Kumar",
            mechanic:"Rakesh Sharma",
            status:'sucess'
        },
        {
            booking_date:'13-04-2023',
            type:"Two Wheeler",
            service:"Emergency Repair",
            user_detail:"Sandeep Kumar",
            mechanic:"Rakesh Sharma",
            status:'sucess'
        },

    ]
    return(
        <>
            <div className="container my-3 py-3 text-center  animated slideInDown">
                <h1>VIEW BOOKING</h1>
                
            </div>
            
            <div className="container table-responsive">
               <table className="table table-striped table-hover table-primary table-bordered animated slideInLeft">
                    <thead>
                        <tr>
                            <td>Sr No</td>
                            <td>Booking Date</td>
                            <td>Type</td>
                            <td>Service</td>
                            <td>User Detail </td>
                            <td>Mechanic</td> 
                            <td>Status</td>
                           
                        </tr>
                    </thead>
                    
                        {projects.map((element,index)=>(
                            <tbody key={index}>
                            <tr>
                                <td>{index+1}</td>
                                <td>{element.booking_date}</td>
                                <td>{element.type}</td>
                                <td>{element.service}</td>
                                <td>{element.user_detail}</td>
                                <td>{element.mechanic}</td>
                                <td>{element.status}</td>
                                {/* <td>
                                <i className="fa fa-check"></i>
                                </td>
                                <td>
                                <i className="fa fa-trash"></i>
                                </td> */}
                               

                            </tr>
                            </tbody>
                        ))}
                    
                </table> 
            </div>
        </>
    )
}