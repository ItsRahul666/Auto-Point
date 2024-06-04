
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../Layout/AdminHeader';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
export default function Dashboard(){
    return(
        <>
            <AdminHeader/>
            <Outlet/>
            <ToastContainer/>
        </>
    )
}