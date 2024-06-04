const User = require('../user/userModel')
const Service = require('../service/serviceModel')
const VehicleType = require('../vehicleType/vehicleTypeModel')
const Booking = require('../booking/bookingModel')
const Contact = require('../contact/contactModel')
const Feedback = require('../feedback/feedbackModel')


exports.dashboard = async (req, res) => {
    let totalCustomers = await User.find({ userType: 2 })
    let totalMechanics = await User.find({ userType: 3 })
    let totalContacts = await Contact.countDocuments()
    let totalFeedbacks = await Feedback.countDocuments()
    let totalBookings = await Booking.countDocuments()
    let totalServices = await Service.countDocuments()
    let totalVehicleTypes = await VehicleType.countDocuments()
    res.send({ success: true, status: 200, 
        totalBookings: totalBookings, 
        totalServices: totalServices, 
        totalVehicleTypes: totalVehicleTypes, 
        totalCustomers: totalCustomers.length, 
        totalMechanics: totalMechanics.length, 
        totalContacts: totalContacts,
        totalFeedbacks: totalFeedbacks, })
}

