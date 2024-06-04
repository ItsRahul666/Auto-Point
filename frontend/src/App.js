
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Pages from './components/Pages';
import Contact from './components/Contact';
import Master from './components/Master';
import Teams from './components/Teams';
import Technicians from './components/Technicians';
import Testimonial from './components/Testimonial';
import Main2 from './Admin/Component/Main2';
import AdminHome from './Admin/Component/AdminHome';
import Users from './Admin/Component/Users';
import AdminBooking from './Admin/Component/AdminBooking';
import AddTypes from './Admin/types/AddTypes';
import ViewTypes from './Admin/types/ViewTypes';
import ViewMechanics from './Admin/mechanics/ViewMechanics';
import MechanicHome from './mechanic/dashboard/MechanicHome';
import AddService from './mechanic/services/AddService';
import ServiceType from './components/ServiceType';
import Mechanicbook from './components/Mechanicbook';
import Login from './auth/Login';
import UpdateTypes from './Admin/types/UpdateType';
import MechanicRegister from './mechanic/auth/MechanicRegister';
import MechanicMaster from './mechanic/Layout/MechanicMaster';
import ViewService from './mechanic/services/ViewService';
import EditService from './mechanic/services/EditService';
import UserRegister from './users/auth/UserRegister';
import ViewVehicleType from './users/views/ViewVehicleType';
import UserViewServices from './users/views/UserViewServices';
import ViewSingleService from './users/views/ViewSingleService';
import BookService from './users/booking/BookService';
import UserBooking from './users/booking/UserBooking';
import UpdateProfile from './users/auth/UpdateProfle';
import MechanincBooking from './mechanic/bookings/MechanicBooking';
import Booking from './Admin/bookings/Booking';
import BookingDetails from './mechanic/bookings/BookingDetails';
import Rating from './users/booking/Rating';
import ViewContact from './Admin/contacts/ViewContact';
import UpdateProfileMech from './mechanic/auth/UpdateProfileMech';
import ViewMechanic from './users/views/ViewMechanic';
import UserViewServicesMech from './users/views/UserViewServicesMech';
import ViewFeedback from './Admin/contacts/ViewFeedback';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Master/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/pages" element={<Pages/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/teams" element={<Teams></Teams>}/>
        <Route path="/technicians" element={<Technicians/>}/>
        <Route path="/testimonial" element={<Testimonial/>}/>
        <Route path='/userRegister' element={<UserRegister/>}/>
        <Route path='/mechanicRegister' element={<MechanicRegister/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/servicetype' element={<ServiceType/>}/>
        <Route path='/mechanicbook' element={<Mechanicbook/>}/>
        <Route path='/view_type' element={<ViewVehicleType/>}/>
        <Route path="/view_service/:id" element={<UserViewServices/>}/>
        <Route path="/view_service_mech/:id" element={<UserViewServicesMech/>}/>
        <Route path="/view_single_service/:id" element={<ViewSingleService/>}/>
        <Route path="/book_mechanic/:id" element={<BookService/>}/>
        <Route path="/mybooking" element={<UserBooking/>}/>
        <Route path='/updateProfile' element={<UpdateProfile/>}/>
        <Route path='/rating' element={<Rating/>}/>
        <Route path='/view_mechanic' element={<ViewMechanic/>}/>
      </Route>
      <Route path="/admin" element={<Main2/>}>
        {/* <Route path='admin' element={<Admin/>}/> */}
        <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/admin/viewmechanics" element={<ViewMechanics/>}/>
        <Route path="/admin/user" element={<Users/>}/>
          <Route path="/admin/user" element={<AdminBooking/>}/>
          <Route path="/admin/addtypes" element={<AddTypes/>}/>
          <Route path="/admin/viewtypes" element={<ViewTypes/>}/>
          <Route path="/admin/updateType/:id" element={<UpdateTypes/>}/>
          <Route path="/admin/viewbooking" element={<Booking/>}/>
          <Route path='/admin/view_contact' element={<ViewContact/>}/>
          <Route path="/admin/feedback" element={<ViewFeedback/>}/>
        </Route>
        <Route path="/mechanic" element={<MechanicMaster/>}>
          <Route path="/mechanic" element={<MechanicHome/>}/>
          <Route path="/mechanic/addservice" element={<AddService/>}/>
          <Route path="/mechanic/viewservice" element={<ViewService/>}/>
          <Route path="/mechanic/viewbooking" element={<MechanincBooking/>}/>
          <Route path="/mechanic/updateService/:id" element={<EditService/>}/>
          <Route path="/mechanic/view_booking_details/:id" element={<BookingDetails/>}/>
          <Route path='/mechanic/profile' element={<UpdateProfileMech/>}/>
        </Route>
      </Routes>
  </Router>
  
  );
}

export default App;
