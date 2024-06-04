import axios from "axios"
import * as qs from "qs"
const BASE_URL="http://localhost:3004/api/";
export const BASE_URL_IMG="http://localhost:3004/"
class apiServices{
    login(data){
        return  axios.post(BASE_URL+"user/login",qs.stringify(data))
    } 
    dashboard(){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.get(BASE_URL+"dashboard/",{headers:header})
    }
    addType(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"vehicleType/add",data,{headers:header})
    }
    allType(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"vehicleType/all",data,{headers:header})
    }
    singleType(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"vehicleType/single",data,{headers:header})
    }
    changeStatusType(data){
        let header={
          Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"vehicleType/changeStatus",qs.stringify(data),{headers:header})
      }
    updateType(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"vehicleType/update",data,{headers:header})
    }
    addMechanic(data){
        return axios.post(BASE_URL+"mechanic/add",data)
    }
    allMechanic(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"mechanic/all",data,{headers:header})
    }
    singleMechanic(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"mechanic/single",data,{headers:header})
    }
    updateMechanic(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"mechanic/update",data,{headers:header})
    }
    changeStatusMechanic(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
    return axios.post(BASE_URL+"mechanic/changeStatus",qs.stringify(data),{headers:header})
    }
    addService(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"service/add",data,{headers:header})
    } 
    allService(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"service/all",data,{headers:header})
    }
    changeStatusService(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
    return axios.post(BASE_URL+"service/changeStatus",qs.stringify(data),{headers:header})
    }
    singleService(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"service/single",data,{headers:header})
    }
    updateService(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"service/update",data,{headers:header})
    }
    addCustomer(data){
        return axios.post(BASE_URL+"customer/add",data)
    }
    updateCustomer(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"customer/update",data,{headers:header})
    }
    singleCustomer(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"customer/single",data,{headers:header})
    }
    addBooking(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"booking/add",data,{headers:header})
    }
    allBooking(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"booking/all",data,{headers:header})
    }
    updateBooking(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"booking/changeStatus",data,{headers:header})
    }
    singleBooking(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"booking/single",data,{headers:header})
    }
    addRating(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"feedback/add",data,{headers:header})
    }
    allRating(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"feedback/all",data,{headers:header})
    }
    addContact(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"contact/add",data,{headers:header})
    }
    allContact(data){
        let header={
            Authorization:sessionStorage.getItem("token")
        }
        return axios.post(BASE_URL+"contact/all",data,{headers:header})
    }
}
export default new apiServices