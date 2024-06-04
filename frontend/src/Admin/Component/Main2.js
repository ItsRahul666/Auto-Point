import { Outlet } from "react-router-dom";
import AdminFooter from "../Layout/AdminFooter";
import AdminHeader from "../Layout/AdminHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Main2(){
    return(
        <>
        <AdminHeader/>
        <Outlet/>
        <AdminFooter/>
        <ToastContainer/>
        </>
    )
}