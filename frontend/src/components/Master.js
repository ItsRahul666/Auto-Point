import { Outlet } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Master(){
    return(
        <>
       <Header/>
       <Outlet/>
       <Footer/>
       <ToastContainer/>
        </>
    )
}