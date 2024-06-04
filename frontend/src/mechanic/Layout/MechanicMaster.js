import { Outlet } from "react-router-dom";
import MechanicHeader from "./MechanicHeader";
import MechanicFooter from "./MechanicFooter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
export default function MechanicMaster(){
    return(
        <>
        <MechanicHeader/>
        <Outlet/>
        <MechanicFooter/>
        <ToastContainer/>
        </>
    )
}