export default function ViewMechanics(){
  
 
    const projects=[
        {
            mech_name:"Sandeep Kumar",
            email:"sandeep@gmail.com",
            contact:"123456789",
            address:"jalandhar",
            // Publish:'22-10-22',
            // status:'sucess'
        },
        {
            mech_name:"Sandeep Kumar",
            email:"sandeep@gmail.com",
            contact:"123456789",
            address:"jalandhar",
            // Publish:'22-10-22',
            // status:'sucess'
        },
        {
            mech_name:"Sandeep Kumar",
            email:"sandeep@gmail.com",
            contact:"123456789",
            address:"jalandhar",
            // Publish:'22-10-22',
            // status:'sucess'
        }
       
    ]
    return(
        <>
        <div className="container my-3 py-3 text-center  animated slideInDown">
                <h1>VIEW USERS</h1>
                
            </div>
            
            <div className="container table-responsive">
               <table className="table table-striped table-hover table-primary table-bordered animated slideInLeft">
                    <thead>
                        <tr>
                            <td>Sr No</td>
                            <td>User Name</td>
                            <td>Email</td>
                            <td>Contact</td>
                            <td>Address</td>
                            
                            {/* <td>Download</td> */}
                            
                        </tr>
                    </thead>
                    
                        {projects.map((element,index)=>(
                            <tbody key={index}>
                            <tr>
                                <td>{index+1}</td>
                                <td>{element.mech_name}</td>
                                <td>{element.email}</td>
                                <td>{element.contact}</td>
                                <td>{element.address}</td>
                               

                                {/* <td>
                                    
                                    <button className="btn btn-success">ACCEPT</button>
                                    <button className="btn btn-primary">DELETE</button>
                                </td> */}
                               

                            </tr>
                            </tbody>
                        ))}
                    
                </table> 
            </div>
        </>
    )
}